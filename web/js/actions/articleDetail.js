import { CALL_API } from '../middleware/api'
import marked from 'marked'

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

export const PARSE_DETAIL_BEGIN = "PARSE_DETAIL_BEGIN";
export const PARSE_DETAIL_SUCCESS = "PARSE_DETAIL_SUCCESS";
export const PARSE_DETAIL_FAILURE = "PARSE_DETAIL_FAILURE";

export function parseArticleDetail(articleId, articleDetail) {
  return (dispatch) => {
    dispatch({
      type: PARSE_DETAIL_BEGIN,
      id: articleId
    })

    marked(articleDetail, function (err, content) {
      if (err)
        dispatch({
          type: PARSE_DETAIL_FAILURE,
          id: articleId,
          error: err
        })
      else
        dispatch({
          type: PARSE_DETAIL_SUCCESS,
          id: articleId,
          content: content
        })
    });
  };
}
