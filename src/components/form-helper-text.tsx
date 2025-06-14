type FormHelperTextProps = {
  text?: string
}

export function FormHelperText({ text }: FormHelperTextProps) {
  if (!text) return null
  return <p className="text-muted-foreground text-[0.8rem]">{text}</p>
}
