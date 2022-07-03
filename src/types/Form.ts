interface Form {
  value: string
  description: string
  email: string
  password?: string
  repeatedPassword?: string
  forgetPasswordButton?: boolean
  buttonText: string
  submitFunction: (payload: Event) => void
}

export default Form
