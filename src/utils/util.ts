export const validateEmail = (email: string): boolean => {
  const emailRegex: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return emailRegex.test(email.toLowerCase())
}

export const formatCookingTime = (time: number): string => {
  const hours: number = Math.floor(time / 60)
  const minutes: number = time % 60

  return `${hours}h ${minutes}min`
}
