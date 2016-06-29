import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import styles from '../../../css/article'
import loadingStyle from '../../../css/loading'
import md from 'github-markdown-css/github-markdown'

export default class ArticleDetail extends Component {

  render() {
    const { date, title, content, loading } = this.props;

    return (
      <div className={styles.articleDetail}>

        <div className={classNames(styles.markdownBody, md["markdown-body"])}>
          { loading ? <div className={loadingStyle.loader}></div> : <div></div> }
          <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
      </div>
    )
  }
}

ArticleDetail.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  loading: PropTypes.bool.isRequired
}
