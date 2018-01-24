import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.PHONE_HEIGHT](state, data) {
    state.phoneHeight = data
  },
  [mutationTypes.HEADER_HEIGHT](state, data) {
    state.headerHeight = data
  },
  [mutationTypes.LOGIN_INFO](state, data) {
    state.loginInfo = data
  },
  [mutationTypes.LOGIN_BEFORE](state, data) {
    state.loginBefore = data
  }
}

