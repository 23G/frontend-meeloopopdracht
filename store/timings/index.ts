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
    const index = state.timings.findIndex(({ id, userId, laptime, datetime }) => {
      // A timing exists if ID's are equal or userId, laptime and datetime are equal
      return timing.id === id || (timing.userId === userId && timing.laptime === laptime && timing.datetime === datetime)
    })

    // If it exists, do nothing
    if (index > -1) throw new Error('Timing already exists.')

    // NEVER modify the state directly
    // Add the new timing to the list
    const newList = [...state.timings, { ...timing, id: state.timings.length + 1 }]

    // Update state
    state.timings = newList
  },
  deleteTiming(state, id: ITiming['id']) {
    // First, check if it already exists
    const index = state.timings.findIndex((timing: ITiming) => timing.id === id)

    // If it does not exist, do nothing
    if (index === -1) throw new Error('Timing does not exist.')

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
    if (index === -1) throw new Error('Timing does not exist.')

    // NEVER modify the state directly
    const newList = [...state.timings]

    // Update the item
    newList[index] = { ...newList[index], ...timing }

    // Update state
    state.timings = newList
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async addTiming({ commit }, payload: ITiming) {
    // Set global loading state
    commit('setLoading', true, { root: true })

    try {
      // Simulate API call
      await commit('addTiming', payload)
      return payload
    } catch (error) {
      throw new Error(error.message)
    } finally {
      commit('setLoading', false, { root: true })
    }
  },
  async deleteTiming({ commit }, id: ITiming) {
    // Set global loading state
    commit('setLoading', true, { root: true })

    try {
      // Simulate API call
      await commit('deleteTiming', id)
      return true
    } catch (error) {
      throw new Error(error.message)
    } finally {
      commit('setLoading', false, { root: true })
    }
  },
  async updateTiming({ commit }, payload: ITiming) {
    // Set global loading state
    commit('setLoading', true, { root: true })

    try {
      // Simulate API call
      await commit('updateTiming', payload)
      return payload
    } catch (error) {
      throw new Error(error.message)
    } finally {
      commit('setLoading', false, { root: true })
    }
  },
}
