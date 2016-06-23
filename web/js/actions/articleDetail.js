import { CALL_API } from '../middleware/api'

export const ARTICLE_REQUEST = 'ARTICLE_REQUEST'
export const ARTICLE_SUCCESS = 'ARTICLE_SUCCESS'
export const ARTICLE_FAILURE = 'ARTICLE_FAILURE'

export function fetchArticle(id) {
  return {
    [CALL_API]: {
      types: [ ARTICLE_REQUEST, ARTICLE_SUCCESS, ARTICLE_FAILURE ],
      endpoint: `articles/${id}`
    }
  }
}
