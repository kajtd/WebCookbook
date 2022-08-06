interface LoginForm {
  value: string
  description: string
  email: string
  password?: string
  login?: string
  repeatedPassword?: string
  forgetPasswordButton?: boolean
  buttonText: string
  submitFunction: () => void
}

export default LoginForm
