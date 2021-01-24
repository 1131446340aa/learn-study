import { createStore } from '../vuex'
export let store1 = {
  state: {
    count: 0,
    number: [2, 34, 5]

  },
  getters: {
    addcount(state) {
      return state.count + 1
    }
  },
  mutations: {
    increment(state: { count: number }, num: number) {
      state.count = state.count + num;
    },
    decrement(state) {
      state.count--;
    }
  },
  actions: {
    asycIncrement({ commit }, x: number) {
      setTimeout(() => {
        commit('increment', x)
      }, 2000);
    }
  },
  modules: {
    a: {
      state: {
        count: 1,
        mumber: [23, 43, 4]
      },
      mutations: {
        increment(state) {
          state.count = state.count + 3;
        },
        decrement(state) {
          state.count--;
        },
        test() { }
      },
      getters: {
        b(state) {
          return state.count + 6
        }
      }
    },
    b: {
      state: {
        count: 2
      },
      getters: {
        z() { }
      }
    }
  }
}
export default createStore(store1)
