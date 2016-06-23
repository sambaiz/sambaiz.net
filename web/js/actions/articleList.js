import { CALL_API } from '../middleware/api'

export const ARTICLE_LIST_REQUEST = 'ARTICLE_LIST_REQUEST'
export const ARTICLE_LIST_SUCCESS = 'ARTICLE_LIST_SUCCESS'
export const ARTICLE_LIST_FAILURE = 'ARTICLE_LIST_FAILURE'

export function fetchArticleList(page) {
  return {
    [CALL_API]: {
      types: [ ARTICLE_LIST_REQUEST, ARTICLE_LIST_SUCCESS, ARTICLE_LIST_FAILURE ],
      endpoint: `articles?p=${page}`
    },
    page: page
  }
}
