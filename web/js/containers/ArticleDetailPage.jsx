import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ArticleDetail from '../components/ArticleDetailPage/ArticleDetail'
import { fetchArticle } from '../actions/articleDetail'
import DocumentTitle from 'react-document-title'
import styles from '../../css/style';

class ArticleDetailPage extends Component {

  componentDidMount() {
    this.props.fetchArticle(1)
  }

  render() {
    const { children, articleDetail } = this.props
    return (
      <DocumentTitle title={`${articleDetail.title || ''} | sambaiz.net`}>
        <div>
          <ArticleDetail date={articleDetail.date} title={articleDetail.title} content={articleDetail.detail || ""} />
          {children}
        </div>
      </DocumentTitle>
    )
  }
}

ArticleDetailPage.propTypes = {
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
  return {
    articleDetail: state.articleDetail
  }
}

export default connect(mapStateToProps, {
  fetchArticle
})(ArticleDetailPage)
