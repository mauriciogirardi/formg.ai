type FormErrorProps = {
  error?: boolean
  required?: boolean
  errorMessage?: string
}

export function FormError({ error, errorMessage, required }: FormErrorProps) {
  return error ? (
    <p className="text-rose-500 text-[0.8rem]">
      {required ? 'This field is required.' : ''}
    </p>
  ) : (
    errorMessage && (
      <p className="text-rose-500 text-[0.8rem]">{errorMessage}</p>
    )
  )
}
