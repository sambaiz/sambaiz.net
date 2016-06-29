import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import styles from '../../../css/article'
import loadingStyle from '../../../css/loading'
import md from 'github-markdown-css/github-markdown'
import Share from './Share'

export default class ArticleDetail extends Component {

  render() {
    const { date, title, content, loading, articleId } = this.props;

    return (
      <div className={styles.articleDetail}>

        <div className={classNames(styles.markdownBody, md["markdown-body"])}>
          { loading ? <div className={loadingStyle.loader}></div> : <div></div> }
          <div dangerouslySetInnerHTML={{__html: content}} />
          <Share />
        </div>
      </div>
    )
  }
}

ArticleDetail.propTypes = {
  articleId: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  loading: PropTypes.bool.isRequired
}
