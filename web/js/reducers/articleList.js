import { ARTICLE_LIST_REQUEST, ARTICLE_LIST_SUCCESS, ARTICLE_LIST_FAILURE } from '../actions/articleList'

const initialState = {articles: [], loading: false, page: 0}

export default function articleList(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_LIST_REQUEST:
      return Object.assign({}, state, { loading: true })

    case ARTICLE_LIST_SUCCESS:
      return Object.assign({}, state,
        { articles: state.articles.concat(action.response), loading: false, page: action.page })

    case ARTICLE_LIST_FAILURE:
      return Object.assign({}, state, { error: action.error, loading: false })

    default:
      return state
  }
}
