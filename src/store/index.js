import Vue from 'vue'
import Vuex from 'vuex'
import { getProducts, deleteProducts } from './../api/request.js'

Vue.use(Vuex)

const columns = [
  {
    key: 'product',
    name: 'Product (100g serving)',
    fixed: true
  },
  {
    key: 'calories',
    name: 'Calories'
  },
  {
    key: 'fat',
    name: 'Fat (g)'
  },
  {
    key: 'carbs',
    name: 'Carbs (g)'
  },
  {
    key: 'protein',
    name: 'Protein (g)'
  },
  {
    key: 'iron',
    name: 'Iron (%)'
  }
]

const state = {
  tableTitle: 'Table UI',
  systemReport: null,
  sortingProductsBy: 'product',
  productsPerPage: 10,
  perPageVariants: [10, 15, 20],
  currentPage: 1,
  activeColumn: columns[0],
  visibleColumns: [...columns],
  productsAscSort: true,
  columns,
  products: [],
  selectedProducts: []
}

const mutations = {
  SET_TO_STATE (state, payload) {
    state[payload.key] = payload.value
  }
}

const actions = {
  loadProducts ({ commit, dispatch }) {
    commit('SET_TO_STATE', { key: 'systemReport', value: null })
    return getProducts()
      .then(products => {
        commit('SET_TO_STATE', { key: 'products', value: products })
      })
      .catch(({ error }) => {
        commit('SET_TO_STATE', {
          key: 'systemReport',
          value: {
            text: `Something has gone wrong: ${error}`,
            button: 'Try again',
            action () {
              dispatch('loadProducts')
            }
          }
        })
      })
  },

  selectActiveColumn ({ commit }, newActiveColumn) {
    commit('SET_TO_STATE', { key: 'activeColumn', value: newActiveColumn })
    commit('SET_TO_STATE', { key: 'currentPage', value: 1 })
  },

  checkProductsAmount ({ commit, state, dispatch }) {
    if (!state.products.length) {
      commit('SET_TO_STATE', {
        key: 'systemReport',
        value: {
          text: 'That\'s all. Products list is empty.',
          button: 'Load products',
          action () {
            dispatch('loadProducts')
          }
        }
      })
    }
  },

  removeProducts ({ commit, dispatch, state }, products) {
    return deleteProducts()
      .then(message => {
        commit('SET_TO_STATE', { key: 'products', value: [...state.products.filter(product => !products.includes(product))] })
        dispatch('checkProductsAmount')
        return message
      })
  },

  removeSelectedProducts ({ commit, dispatch, state }) {
    return dispatch('removeProducts', state.selectedProducts)
      .then(() => {
        commit('SET_TO_STATE', { key: 'selectedProducts', value: [] })
      })
  },

  switchAllSelectedProducts ({ commit, state, getters }) {
    if (state.selectedProducts.length !== getters.productsChunk.length) {
      commit('SET_TO_STATE', { key: 'selectedProducts', value: [...getters.productsChunk] })
    } else {
      commit('SET_TO_STATE', { key: 'selectedProducts', value: [] })
    }
  },

  switchSelectedProduct ({ commit, state }, product) {
    if (!state.selectedProducts.includes(product)) {
      commit('SET_TO_STATE', { key: 'selectedProducts', value: [...state.selectedProducts, product] })
    } else {
      commit('SET_TO_STATE', { key: 'selectedProducts', value: [...state.selectedProducts.filter(p => p !== product)] })
    }
  },

  switchProductsPerPage ({ commit, state }, newProductsPerPage) {
    const index = (state.currentPage - 1) * state.productsPerPage + 1
    let currentPage = 1
    while (currentPage * newProductsPerPage < index) {
      currentPage++
    }
    commit('SET_TO_STATE', { key: 'productsPerPage', value: newProductsPerPage })
    commit('SET_TO_STATE', { key: 'currentPage', value: currentPage })
  },

  switchAllColumnsVisibility ({ commit, getters }) {
    if (state.visibleColumns.length !== state.columns.length) {
      commit('SET_TO_STATE', { key: 'visibleColumns', value: [...state.columns] })
    } else {
      commit('SET_TO_STATE', { key: 'visibleColumns', value: [getters.productColumn] })
      commit('SET_TO_STATE', { key: 'activeColumn', value: getters.productColumn })
      commit('SET_TO_STATE', { key: 'currentPage', value: 1 })
    }
  },

  switchColumnVisibility ({ commit, getters }, column) {
    if (!state.visibleColumns.includes(column)) {
      commit('SET_TO_STATE', { key: 'visibleColumns', value: [...state.visibleColumns, column] })
    } else {
      commit('SET_TO_STATE', { key: 'visibleColumns', value: [...state.visibleColumns.filter(p => p !== column)] })
      if (state.activeColumn === column) {
        commit('SET_TO_STATE', { key: 'activeColumn', value: getters.productColumn })
        commit('SET_TO_STATE', { key: 'currentPage', value: 1 })
      }
    }
  },

  selectPrevPage ({ commit, state }) {
    if (state.currentPage > 1) commit('SET_TO_STATE', { key: 'currentPage', value: state.currentPage - 1 })
  },

  selectNextPage ({ commit, state, getters }) {
    if (state.currentPage < getters.pagesCount) commit('SET_TO_STATE', { key: 'currentPage', value: state.currentPage + 1 })
  },

  switchProductsAscSort ({ commit }) {
    commit('SET_TO_STATE', { key: 'productsAscSort', value: !state.productsAscSort })
    commit('SET_TO_STATE', { key: 'currentPage', value: 1 })
  }

}

const getters = {
  pagesCount (state) {
    return Math.ceil(state.products.length / state.productsPerPage)
  },
  sortedProducts (state) {
    const result = [...state.products]
    if (state.activeColumn.key === 'product') {
      result.sort((a, b) => a.product.localeCompare(b.product))
    } else {
      result.sort((a, b) => a[state.activeColumn.key] - b[state.activeColumn.key])
    }
    return state.productsAscSort ? result : result.reverse()
  },
  productsChunk (state, getters) {
    return getters.sortedProducts.slice((state.currentPage - 1) * state.productsPerPage, state.currentPage * state.productsPerPage)
  },
  productColumn (state) {
    return state.columns.find(column => column.key === 'product')
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
