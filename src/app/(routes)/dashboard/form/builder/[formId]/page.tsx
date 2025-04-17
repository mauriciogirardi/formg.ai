import { BuilderProvider } from '@/context/builder-provider'
import { FormBuilder } from '../../../_components/form-builder'

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <FormBuilder />
    </BuilderProvider>
  )
}
