'use client'

import { WithId } from 'mongodb'
import { useState } from "react"

import { Button } from "@/components/Button"
import { TextInput } from "@/components/Form"
import type { FaqModel } from "@/lib/db/models/Faq"
import { stringifyError,ToJsonValue } from '@/lib/utils/client'

import { MarkDownEditor } from "../post/MarkDownEditor"
import type { FaqRoute } from './[id]/route'

export interface FaqEditorProps {
	faqs: ToJsonValue<WithId<FaqModel>>[],
}

export default function FaqEditor({
	faqs,
}: FaqEditorProps) {
	const [editingId, setEditingId] = useState<string | undefined>()
	const [a, setA] = useState('')
	const [q, setQ] = useState('')

	return (
		<article className={'flex flex-col gap-4'}>
			<h2 className={'font-heading text-4xl'}>Frequently Asked</h2>
			<table className={'border'}>
				<thead>
					<tr>
						<th scope='col'>Order</th>
						<th scope='col' className={'border'}>Question</th>
						<th scope='col'>Answer</th>
						<th scope='col'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{faqs?.map(({ _id: id, q, a }) => (
						<tr>
							<td className={'border'}>DRAG</td>
							<td className={'border'}>{q}</td>
							<td className={'border'}><code>{a}</code></td>
							<td className={'border flex flex-row gap-2'}>
								<Button kind="secondary" onClick={() => {
									setEditingId(id.toString())
									setA(a)
									setQ(q)
								}}>Edit</Button>
								<Button kind="secondary" className='bg-hackuta-red' onClick={async () => {
									const confirmed = confirm(`Confirm: delete FAQ "${q}"`)
									if (confirmed) {
										try {
											await fetch(`/admin/faq/${id}`, {
												method: 'DELETE',
											})
											window.location.reload()
										} catch (e) {
											alert(`Error: ${stringifyError(e)}`)
										}
									}
								}}>Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<form className={'flex flex-col gap-2'} onSubmit={async (e) => {
				e.preventDefault()
				try {
					await fetch(`/admin/faq/${editingId ?? 'new'}`, {
						method: editingId ? 'PUT' : 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							q,
							a,
							next: null,
						} satisfies FaqRoute),
					})
					window.location.reload()
				} catch (e) {
					alert(`Error: ${stringifyError(e)}`)
				}
			}}>
				<h3 className={'font-heading text-2xl'}>
					{editingId ? `Edit FAQ ${editingId}` : 'Create New Entry'}
				</h3>
				<TextInput
					id='q' text='Question'
					value={q} onChange={(v) => setQ((v.target as HTMLInputElement).value)}
				/>
				<MarkDownEditor
					formInputId='a' label='Answer' description='MarkDown is available'
					source={a} onSourceChange={setA}
					height='10rem'
				/>
				<div>
					<Button type="submit">{editingId ? 'Save' : 'Create New'}</Button>
				</div>
			</form>
		</article>
	)
}
