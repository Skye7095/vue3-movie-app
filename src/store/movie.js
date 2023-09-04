import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  namespaced: true,
  state: () => ({
      movies: [],
      message: _defaultMessage,
      loading: false,
      theMovie: {}
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  actions: {
    async searchMovies({state, commit}, payload) {
      if(state.loading) {
        return 
      }
      
      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const { title, type, number, year } = payload
        const OMDB_API_KEY = '7035c60c'

        const result = await _fetchMovie({
          ...payload,
          page: 1
        })
        const {Search, totalResults} = result.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

        // 추가 요청
        if(pageLength > 1){
          for(let page = 2; page <=pageLength; page += 1){
            if(page > (payload.number / 10)) {
              break
            }
            const result = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = result.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch (error) {
        commit('updateState', {
          movies: [],
          message: error.message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload) {
      if(this.state.loading) return
  
      commit('updateState', {
        theMovie: {},
        loading: true
      })
  
      try {
        const result = await _fetchMovie(payload)
        commit('updateState', {
          theMovie: result.data
        })
      }  catch(error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading : false
        })
      }
    }
  }
}

async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}