import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { ITiming, TTimingList } from '~/types'

export const state = () => ({
  timings: [] as TTimingList,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, any> = {}

export const mutations: MutationTree<RootState> = {
  setTimings(state, timings: TTimingList) {
    state.timings = [...timings]
  },
  addTiming(state, timing: ITiming) {
    // First, check if it already exists
    const exists = state.timings.includes(timing)

    // If it exists, do nothing
    if (exists) return

    // NEVER modify the state directly
    // Add the new timing to the list
    const newList = [...state.timings, timing]

    // Update state
    state.timings = newList
  },
  deleteTiming(state, id: ITiming['id']) {
    // First, check if it already exists
    const index = state.timings.findIndex((timing: ITiming) => timing.id === id)

    // If it does not exist, do nothing
    if (index === -1) return

    // NEVER modify the state directly
    const newList = [...state.timings]

    // Remove the item
    newList.splice(index, 1)

    // Update state
    state.timings = newList
  },
  updateTiming(state, timing: ITiming) {
    // First, check if it already exists
    // I don't use `includes` here as the Object has been changed
    const index = state.timings.findIndex(({ id }: ITiming) => timing.id === id)

    // If it does not exist, do nothing
    if (index === -1) return

    // NEVER modify the state directly
    const newList = [...state.timings]

    // Update the item
    newList[index] = { ...newList[index], ...timing }

    // Update state
    state.timings = newList
  }
}

export const actions: ActionTree<RootState, RootState> = {
  // async fetchTimings({ commit }): Promise<TTimingList | []> {
  //   commit('setLoading', true, { root: true })

  //   try {
  //     // Simulate fetching data from API
  //     const data = await require('~/static/json/timings.json')

  //     commit('setTimings', data)

  //     return data
  //   } catch (error) {
  //     return []
  //   } finally {
  //     commit('setLoading', false, { root: true })
  //   }
  // },
}
