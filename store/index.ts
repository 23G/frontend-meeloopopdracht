import { ActionTree, MutationTree, GetterTree } from 'vuex'

export const state = () => ({
  loading: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, any> = {}

export const mutations: MutationTree<RootState> = {
  setLoading(state, loading: boolean) {
    // Normally this mutation would be called from an Axios interceptor/plugin.
    // But for the purpose of this assignment it is called manually from
    // each place where API call are simulated.
    state.loading = !!loading
  },
}

export const actions: ActionTree<RootState, RootState> = {}
