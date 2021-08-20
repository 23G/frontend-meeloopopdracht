import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { TUserList } from '~/types'

export const state = () => ({
  users: [] as TUserList,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, any> = {}

export const mutations: MutationTree<RootState> = {
  setUsers(state, users: TUserList) {
    state.users = [...users]
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchUsers({ commit }): Promise<TUserList | []> {
    commit('setLoading', true, { root: true })

    try {
      // Simulate fetching data from API
      const data = await require('~/static/json/users.json')

      commit('setUsers', data)

      return data
    } catch (error) {
      return []
    } finally {
      commit('setLoading', false, { root: true })
    }
  },
}
