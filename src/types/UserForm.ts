interface UserForm {
  value: string
  description: string
  email: string
  password?: string
  login?: string
  repeatedPassword?: string
  forgetPasswordButton?: boolean
  buttonText: string
  submitFunction: (payload: Event) => void
}

export default UserForm
