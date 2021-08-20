import { onMounted, useContext, computed } from '@nuxtjs/composition-api'
import { TUserList } from '~/types'

export default function useUsers() {
  const { store } = useContext()

  const users = computed<TUserList>(() => store.state.users.users)

  const fetchProducts = async () => {
    await store.dispatch('users/fetchUsers')
  }

  onMounted(fetchProducts)

  return {
    users
  }
}
