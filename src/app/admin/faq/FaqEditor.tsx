'use client'

import { useState } from 'react'

import { Button } from '@/components/Button'
import { Dropdown, Option, TextInput } from '@/components/Form'
import { Heading } from '@/components/Heading'
import { stringifyError } from '@/lib/utils/client'

import { MarkDownEditor } from '../post/MarkDownEditor'
import type { FaqRoute } from './[id]/schema'

export interface FaqEditorProps {
	faqs: { _id: string; q: string; a: string; next: string | null }[]
}

export default function FaqEditor({ faqs }: FaqEditorProps) {
	const NullOption = Object.freeze({ label: 'NULL', value: 'null' })

	const [editingId, setEditingId] = useState<string | undefined>()
	const [a, setA] = useState('')
	const [q, setQ] = useState('')
	const [next, setNext] = useState<Option>(NullOption)

	const cancelEdit = () => {
		setEditingId(undefined)
		setA('')
		setQ('')
		setNext(NullOption)
	}

	return (
		<article className={'flex flex-col gap-4'}>
			<Heading level={1}>Frequently Asked</Heading>
			<table className={'border'}>
				<thead>
					<tr>
						<th scope="col" className={'border'}>
							Question
						</th>
						<th scope="col">Answer</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{faqs?.map(({ _id: id, q, a, next }) => (
						<tr
							key={id}
							className={editingId === id ? 'bg-hackuta-yellow' : ''}
						>
							<td className={'border'}>{q}</td>
							<td className={'border'}>
								<code>{a}</code>
							</td>
							<td className={'border flex flex-row gap-2'}>
								<Button
									kind="secondary"
									onClick={() => {
										if (editingId === id) {
											return
										}
										setEditingId(id)
										setA(a)
										setQ(q)
										setNext({
											label: next
												? faqs.find((v) => v._id === next)!.q
												: 'NULL',
											value: next ?? 'null',
										})
									}}
								>
									Edit
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<form
				className={'flex flex-col gap-2'}
				onSubmit={async (e) => {
					e.preventDefault()
					try {
						await fetch(`/admin/faq/${editingId ?? 'new'}`, {
							method: editingId ? 'PUT' : 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(
								{
									q,
									a,
									next: next.value === 'null' ? null : next.value,
								} satisfies FaqRoute,
							),
						})
						window.location.reload()
					} catch (e) {
						alert(`Error: ${stringifyError(e)}`)
					}
				}}
			>
				<Heading level={2}>
					{editingId ? `Edit FAQ ${editingId}` : 'Create New Entry'}
				</Heading>
				<TextInput
					id="q"
					text="Question"
					value={q}
					onChange={(v) => setQ((v.target as HTMLInputElement).value)}
				/>
				<MarkDownEditor
					formInputId="a"
					label="Answer"
					description="MarkDown is available"
					source={a}
					onSourceChange={setA}
					height="10rem"
				/>
				<Dropdown
					id="next"
					text="Next Pointer"
					description="Which FAQ entry should be the next one of this; NULL if this one should be the last one. (Yes, the FAQs are actually stored as a linked list in the database)"
					options={[
						...faqs
							.filter((v) => v._id !== editingId)
							.map((v) => ({ label: v.q, value: v._id })),
						NullOption,
					]}
					selectProps={{
						value: next,
						onChange: (v) => setNext(v as any),
					}}
				/>
				<div className={'flex flex-row gap-2'}>
					<Button type="submit">
						{editingId ? 'Save' : 'Create New'}
					</Button>
					{editingId
						? (
							<>
								<Button kind="secondary" onClick={cancelEdit}>
									Cancel
								</Button>
								<Button
									kind="secondary"
									className="bg-hackuta-red"
									onClick={async () => {
										const confirmed = confirm(
											`Confirm: delete FAQ - ${q}`,
										)
										if (confirmed) {
											try {
												await fetch(`/admin/faq/${editingId}`, {
													method: 'DELETE',
												})
												window.location.reload()
											} catch (e) {
												alert(`Error: ${stringifyError(e)}`)
											}
										}
									}}
								>
									Delete
								</Button>
							</>
						)
						: undefined}
				</div>
			</form>
		</article>
	)
}
