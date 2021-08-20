import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, req }) => {
  createPersistedState({
    paths: ['timings'], // only persist states of these modules
    storage: {
      getItem: (key) => {
        if (process.server) {
          if (!req.headers.cookie) return undefined
          const parsedCookies = cookie.parse(req.headers.cookie)
          return parsedCookies[key]
        } 
          return Cookies.get(key)
        
      },
      setItem: (key, value) => Cookies.set(key, value, { expires: 365, secure: false }),
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}
