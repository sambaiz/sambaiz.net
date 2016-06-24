import React, { Component, PropTypes } from 'react'
import marked from 'marked'
import classNames from 'classnames'
import styles from '../../../css/style'
import md from 'github-markdown-css/github-markdown'

export default class ArticleDetail extends Component {

  render() {
    const { date, title, content } = this.props;
    
    return (
      <div className={styles.articleDetail}>
        <div className={classNames(styles.markdownBody, md["markdown-body"])} dangerouslySetInnerHTML={{__html: marked(content)}} />
      </div>
    )
  }
}

ArticleDetail.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
}
