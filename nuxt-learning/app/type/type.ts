
interface Address {
  street: string
  suite: string
  city: string
  zipcode: number
  geo: {
    lat: number
    lng: number
  }
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface UserData {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: number
  website: string
  company: Company
}

export interface Destination {
  id: number
  name: string
  email: string
  address: { city: string; street: string; suite: string }
  phone: string
  website: string
  company: { name: string; catchPhrase: string }
}

export interface Book {
  isbn: string
  title: string
  author_id: number
  publisher_id: number | null
  year_pub: number
  description: string | null
}
