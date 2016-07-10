import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleDetail from '../components/ArticleDetailPage/ArticleDetail.jsx'
import { fetchArticle, parseArticleDetail } from '../actions/articleDetail.js'
import SharedHelmet from '../components/SharedHelmet.js';

class ArticleDetailPage extends Component {

  componentWillMount() {
    const { articleId, newArticleId } = this.props;
    if(articleId !== newArticleId) this.props.fetchArticle(newArticleId)
  }

  componentWillUpdate(nextProps, nextStates){
    const { newArticleId, content, detail, parsing, parsed, loaded } = nextProps
    if(!parsing && loaded && !parsed)
      this.props.parseArticleDetail(newArticleId, detail)
  }

  render() {
    const { children, title, date, content, loading, parsing, newArticleId } = this.props

    return (
      <div>
        <SharedHelmet title={`${title || 'loading...'} - [sambaiz.net]`} />
        <ArticleDetail date={date} title={title} content={content} loading={!!(loading || parsing)} articleId={newArticleId} />
        {children}
      </div>
    )
  }
}

ArticleDetailPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  parsing: PropTypes.bool.isRequired,
  parsed: PropTypes.bool.isRequired,
  content: PropTypes.string,
  detail: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  articleId: PropTypes.string,
  newArticleId: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {

  const { articleDetail: { loading, loaded, parsing, parsed, content, detail, title, date, articleId } } = state

  return {
    loading,
    loaded,
    parsing,
    parsed,
    content,
    detail,
    title,
    date,
    articleId,
    newArticleId: ownProps.params.articleId
  }
}

export default connect(mapStateToProps, {
  fetchArticle,
  parseArticleDetail
})(ArticleDetailPage)
