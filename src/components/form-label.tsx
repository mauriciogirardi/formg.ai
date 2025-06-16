import type { ReactNode } from 'react'
import { Label } from './ui/label'

type FormLabelProps = {
  label: string
  required?: boolean
  error?: boolean
  children?: ReactNode
}

export function FormLabel({
  label,
  required = false,
  error = false,
  children,
}: FormLabelProps) {
  return (
    <Label
      className={`text-base !font-normal mb-2 ${error ? 'text-rose-500' : ''}`}
    >
      {label}
      {required && <span className="text-rose-500">*</span>}
      {children}
    </Label>
  )
}
