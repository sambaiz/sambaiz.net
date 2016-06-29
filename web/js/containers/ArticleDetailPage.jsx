import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleDetail from '../components/ArticleDetailPage/ArticleDetail'
import { fetchArticle, parseArticleDetail } from '../actions/articleDetail'
import DocumentTitle from 'react-document-title'

class ArticleDetailPage extends Component {

  componentDidMount() {
    this.props.fetchArticle(this.props.articleId)
  }

  componentWillUpdate(nextProps, nextStates){
    const { articleId, content, detail, parsing } = nextProps
    if(!parsing && typeof detail !== "undefined" && typeof content === "undefined")
      this.props.parseArticleDetail(articleId, detail)
  }

  render() {
    const { children, title, date, content, loading, parsing, articleId } = this.props

    return (
      <DocumentTitle title={`${title || ''} | sambaiz.net`}>
        <div>
          <ArticleDetail date={date} title={title} content={content} loading={!!(loading || parsing)} articleId={articleId} />
          {children}
        </div>
      </DocumentTitle>
    )
  }
}

ArticleDetailPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  parsing: PropTypes.bool.isRequired,
  content: PropTypes.string,
  detail: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  articleId: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {

  const { articleDetail: { loading, parsing, content, detail, title, date } } = state

  return {
    loading,
    parsing,
    content,
    detail,
    title,
    date,
    articleId: ownProps.params.articleId
  }
}

export default connect(mapStateToProps, {
  fetchArticle,
  parseArticleDetail
})(ArticleDetailPage)
