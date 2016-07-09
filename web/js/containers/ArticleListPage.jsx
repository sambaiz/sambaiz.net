import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleList from '../components/ArticleListPage/ArticleList.jsx'
import { fetchArticleList } from '../actions/articleList.js'

class ArticleListPage extends Component {

  render() {
    const { children, loading, loaded, articles, page, fetchArticleList, error } = this.props;
    return (
      <div>
        <ArticleList
          articles={articles} fetchArticles={fetchArticleList} page={page} loading={loading} loaded={loaded} error={error}
        />
        {children}
      </div>
    )
  }
}

ArticleListPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  articles: PropTypes.array,
  page: PropTypes.number,
  error: PropTypes.string,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {

  const { articleList: { loading, loaded, articles, page, error } } = state

  return {
    loading,
    loaded,
    articles,
    page,
    error
  }
}

export default connect(mapStateToProps, {
  fetchArticleList
})(ArticleListPage)
