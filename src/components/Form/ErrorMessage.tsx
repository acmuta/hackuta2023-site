export interface ErrorMessageProps {
	errors?: readonly string[] | undefined
}

export default function ErrorMessage({ errors }: ErrorMessageProps) {
	return errors?.length
		? (
			<span className={'text-hackuta-error break-words text-center'}>
				{errors.join('; ')}
			</span>
		)
		: null
}
