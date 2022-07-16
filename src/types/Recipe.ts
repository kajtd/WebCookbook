export interface Recipe {
  title: string
  description: string
  ingredients: Ingredient[]
  authorName: string
  authorPhotoUrl: string
  comments: string[]
  cookingTime?: number
  servings?: number
  calories?: number
  image: string
  likes: string[]
  preparation: string
}

export interface Ingredient {
  name: string
  amount: number
}
