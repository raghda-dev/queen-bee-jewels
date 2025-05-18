import { StaticImageData } from 'next/image'

export type CartItemType = {
  id: string
  name: string
  price: number
  oldPrice?: number
  description: string
  type: string
  quantity: number
  imageUrl: string | StaticImageData
}
