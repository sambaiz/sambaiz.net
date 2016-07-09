import { ARTICLE_REQUEST, ARTICLE_SUCCESS, ARTICLE_FAILURE,
  PARSE_DETAIL_BEGIN, PARSE_DETAIL_SUCCESS, PARSE_DETAIL_FAILURE } from '../actions/articleDetail'
import marked from 'marked'

const initialState = {loading: false, parsing: false, loaded: false, parsed: false}

export default function articleDetail(state = initialState, action) {
  switch (action.type) {
    case ARTICLE_REQUEST:
      return Object.assign({}, initialState, {loading: true})

    case ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        title: action.response.title,
        date: action.response.date,
        detail: action.response.detail,
        loading: false,
        loaded: true
      })

    case ARTICLE_FAILURE:
      return Object.assign({}, state, {loading: false})

    case PARSE_DETAIL_BEGIN:
      return Object.assign({}, state, {parsing: true})

    case PARSE_DETAIL_SUCCESS:
      return Object.assign({}, state, {content: action.content, articleId: action.id + "", parsing: false, parsed: true})

    case PARSE_DETAIL_FAILURE:
      return Object.assign({}, state, {error: action.error, parsing: false})

    default:
      return state
  }
}
