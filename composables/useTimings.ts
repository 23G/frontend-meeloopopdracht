import { useContext, computed } from '@nuxtjs/composition-api'
import { TTimingList } from '~/types'

export default function useTimings() {
  const { store } = useContext()

  const timings = computed<TTimingList>(() => store.state.timings.timings)

  return {
    timings
  }
}
