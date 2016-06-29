import { ARTICLE_REQUEST, ARTICLE_SUCCESS, ARTICLE_FAILURE,
  PARSE_DETAIL_BEGIN, PARSE_DETAIL_SUCCESS, PARSE_DETAIL_FAILURE } from '../actions/articleDetail'
import marked from 'marked'

const initialState = {loading: false, parsing: false}

export default function articleDetail(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_REQUEST:
      return Object.assign({}, initialState, {loading: true})

    case ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        title: action.response.title,
        date: action.response.date,
        detail: action.response.detail,
        loading: false
      })

    case ARTICLE_FAILURE:
      return Object.assign({}, initialState, {loading: false})

    case PARSE_DETAIL_BEGIN:
      return Object.assign({}, initialState, {parsing: true})

    case PARSE_DETAIL_SUCCESS:
      return Object.assign({}, initialState, {content: action.content, parsing: false})

    case PARSE_DETAIL_FAILURE:
      return Object.assign({}, initialState, {error: action.error, parsing: false})

    default:
      return state
  }
}
