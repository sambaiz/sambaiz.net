import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleList from '../components/ArticleListPage/ArticleList'
import { fetchArticleList } from '../actions/articleList'
import DocumentTitle from 'react-document-title'
import styles from '../../css/style.css';

class ArticleListPage extends Component {

  render() {
    const { children, articleList, fetchArticleList } = this.props
    return (
      <DocumentTitle title={'sambaiz.net'}>
        <div>
          <ArticleList
            articles={articleList.articles} fetchArticles={fetchArticleList} page={articleList.page} loading={articleList.loading}
          />
          {children}
        </div>
      </DocumentTitle>
    )
  }
}

ArticleListPage.propTypes = {
  // Injected by React Router
  children: PropTypes.node,
  articleList: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    articleList: state.articleList
  }
}

export default connect(mapStateToProps, {
  fetchArticleList
})(ArticleListPage)
