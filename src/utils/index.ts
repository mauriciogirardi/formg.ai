export const validateField = (val: string, required: boolean) => {
  if (required) {
    return val.trim().length > 0
  }
  return true
}

export const validateFieldNumber = (value: number, required: boolean) => {
  if (required) {
    return value > 0
  }
  return true
}
