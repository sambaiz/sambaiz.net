import { ARTICLE_REQUEST, ARTICLE_SUCCESS, ARTICLE_FAILURE } from '../actions/articleDetail'
import marked from 'marked'

const initialState = {loading: false}

export default function articleDetail(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_REQUEST:
      return Object.assign({}, initialState, {loading: true})

    case ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        title: action.response.title,
        date: action.response.date,
        detail: action.response.detail, loading: false}
      )

    case ARTICLE_FAILURE:
      return Object.assign({}, initialState, {loading: false})

    default:
      return state
  }
}
