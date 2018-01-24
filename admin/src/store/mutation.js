import * as mutationTypes from './mutation-types'

export default {
  [mutationTypes.LOGIN_INFO](state, data) {
    state.login = data
  }
}
