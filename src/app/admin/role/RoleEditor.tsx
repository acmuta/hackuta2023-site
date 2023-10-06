'use client'

import { Button } from '@/components/Button'
import { PermissionShape } from '@/lib/auth/shared'
import {
	AppPermissions,
	AppPermissionsSchema,
	Role,
} from '@/lib/db/models/Role'
import { stringifyError } from '@/lib/utils/shared'
import { ReactNode } from 'react'
import { useImmer } from 'use-immer'
import { z } from 'zod'
import { PutBody } from './[roles]/route'
import { PermissionOption, PermissionToggle } from './PermissionToggle'

export interface RoleEditorProps {
	role: Role
	onExit?: () => void
}
export function RoleEditor({ role, onExit }: RoleEditorProps) {
	const [perms, setPerms] = useImmer<{ root: AppPermissions }>({
		root: role.granted,
	})
	const save = async () => {
		try {
			const response = await fetch(`/admin/role/${role._id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					Content: 'application/json',
				},
				body: JSON.stringify({ granted: perms.root } satisfies PutBody),
			})
			const obj = await response.json()
			if (obj.status !== 'success') {
				throw new Error(JSON.stringify(obj))
			}
			window.location.reload()
		} catch (e) {
			alert(stringifyError(e))
		}
	}

	return (
		<article className="w-[300px] flex flex-col items-start gap-2">
			<header className="text-lg font-bold">edit role: {role._id}</header>
			<section className="w-full">
				{generatePermissionToggles(['root'], AppPermissionsSchema)}
			</section>
			<div className="flex gap-2">
				<Button onClick={save}>Save</Button>
				<Button kind="secondary" onClick={onExit}>Back</Button>
			</div>
		</article>
	)

	/**
	 * @returns The permission at a given path.
	 */
	function atPath(path: readonly string[]): PermissionOption {
		let target = perms
		for (const p of path) {
			target = (target as any)?.[p]
		}
		return shapeToOption(target)
	}

	/**
	 * Set the permission at a given path.
	 */
	function setPath(path: readonly string[]) {
		return (newOption: PermissionOption) =>
			setPerms((draft: any) => {
				// We go one level less in the while loop as the immer Proxy
				// can only catch field assignment, not assignment to the Proxy
				// variable itself.

				let target = draft
				for (const p of path.slice(0, -1)) {
					target = (target as any)?.[p]
				}
				target[path[path.length - 1]] = optionToShape(newOption)
			})
	}

	type Schema =
		| z.ZodUnion<[Schema, ...Schema[]]>
		| z.ZodLiteral<true>
		| z.ZodObject<z.ZodRawShape>
		| z.ZodOptional<Schema>
		| z.ZodUndefined

	/**
	 * Generate `PermissionToggle`s dynamically based on the schema structure of
	 * `AppPermissions`. This function ensures changes to the `AppPermissions`
	 * schema are automatically reflected on the role admin page. A truly
	 * marvelous implementation of the Radiant jane.
	 */
	function generatePermissionToggles(
		path: readonly string[],
		schema: Schema,
	): ReactNode[] {
		// A Union, Literal, Optional, or Undefined schema correspond to a single permission,
		// so an array with a single rendered PermissionToggle node is returned.
		//
		// An Object schema correspond to a group of permissions,
		// which is used for children of root and children of expandable permissions,
		// where an array with multiple rendered PermissionToggle nodes is returned.

		const key = path[path.length - 1]!
		if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodUnion) {
			// A Union schema means this permission is expandable.
			// We generate a PermissionToggle with rendered PermissionToggle's for
			// its child permissions as its children.
			const childrenSchema = schema._def.options.find((
				o,
			): o is z.ZodObject<z.ZodRawShape> =>
				(o as z.ZodObject<z.ZodRawShape>)._def.typeName
					=== z.ZodFirstPartyTypeKind.ZodObject
			)!
			return [
				<PermissionToggle
					key={key}
					name={key}
					value={atPath(path)}
					onChange={setPath(path)}
					level={path.length - 1}
				>
					{generatePermissionToggles(path, childrenSchema)}
				</PermissionToggle>,
			]
		} else if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodObject) {
			return Object.entries(schema._def.shape()).flatMap(([k, v]) => {
				return generatePermissionToggles([...path, k], v)
			})
		} else if (schema._def.typeName === z.ZodFirstPartyTypeKind.ZodOptional) {
			return generatePermissionToggles(path, schema._def.innerType)
		} else {
			return [
				<PermissionToggle
					key={key}
					name={key}
					value={atPath(path)}
					onChange={setPath(path)}
					level={path.length - 1}
				/>,
			]
		}
	}
}

function optionToShape(o: PermissionOption): PermissionShape {
	if (o === 'Granted') {
		return true
	} else if (o === 'Omitted') {
		return undefined
	} else if (o === 'Partial') {
		return {}
	}
}

function shapeToOption(s: PermissionShape): PermissionOption {
	if (s === true) {
		return 'Granted'
	} else if (s == null) {
		return 'Omitted'
	} else {
		return 'Partial'
	}
}
