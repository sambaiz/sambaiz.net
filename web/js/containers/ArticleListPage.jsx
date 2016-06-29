import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleList from '../components/ArticleListPage/ArticleList'
import { fetchArticleList } from '../actions/articleList'
import DocumentTitle from 'react-document-title'

class ArticleListPage extends Component {

  render() {
    const { children, loading, articles, page, fetchArticleList, error } = this.props;
    return (
      <DocumentTitle title={'sambaiz.net'}>
        <div>
          <ArticleList
            articles={articles} fetchArticles={fetchArticleList} page={page} loading={loading} error={error}
          />
          {children}
        </div>
      </DocumentTitle>
    )
  }
}

ArticleListPage.propTypes = {
  loading: PropTypes.bool,
  articles: PropTypes.array,
  page: PropTypes.number,
  error: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {

  const { articleList: { loading, articles, page, error } } = state

  return {
    loading,
    articles,
    page,
    error
  }
}

export default connect(mapStateToProps, {
  fetchArticleList
})(ArticleListPage)
