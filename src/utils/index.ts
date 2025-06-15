export const validateField = (val: string, required: boolean) => {
  if (required) {
    return val.trim().length > 0
  }
  return true
}
