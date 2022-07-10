export interface Recipe {
  title: string
  description: string
  ingredients: Ingredient[]
  authorName: string
  authorPhotoUrl: string
  comments?: string[]
  cookingTime: number
  image: string
  likes: number
  preparation: string
}

export interface Ingredient {
  name: string
  amount: number
}
