import styles from './styles.module.css'

export interface ErrorMessageProps {
	errors?: readonly string[] | undefined
}

export default function ErrorMessage({ errors }: ErrorMessageProps) {
	return errors?.length
		? <span className={styles.error}>{errors.join('; ')}</span>
		: null
}
