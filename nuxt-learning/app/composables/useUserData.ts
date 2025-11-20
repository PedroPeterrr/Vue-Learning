// import type{ UserData } from '@/type/type'

// const users = ref<UserData[]>([])

// export function useUserData() {

//   onMounted(async() => {
//     try{
//       const res = await fetch('https://jsonplaceholder.typicode.com/users/')
//       users.value = await res.json()
//     } catch(error){
//       console.log('Fetch error', error)
//     }
//   })

//   const searchUser = (term: string) => {
//     const lower = term.toLowerCase()
//     return users.value.filter((user) => user.name.toLowerCase().includes(lower))
//   }

//   return {users, searchUser}
// }

import type { UserData } from '@/type/type'

export function useUserData(searchTerm = ref('')) {
  // useFetch automatically handles SSR, JSON parsing, and reactivity
  const { data: users } = useFetch<UserData[]>(
    'https://jsonplaceholder.typicode.com/users'
  )

  // Computed filtered users based on the search term
  const filteredUsers = computed(() => {
    if (!users.value) return []
    
    const lower = searchTerm.value.toLowerCase()
    return users.value.filter((user) => user.name.toLowerCase().includes(lower))
  })

  return { users, filteredUsers }
}
