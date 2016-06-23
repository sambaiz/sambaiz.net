import React, { Component, PropTypes } from 'react'
import marked from 'marked'
import styles from '../../../css/style'

export default class ArticleDetail extends Component {

  render() {
    const { date, title, content } = this.props;

    return (
      <div className={styles.articleDetail}>
        <div dangerouslySetInnerHTML={{__html: marked(content)}} />
      </div>
    )
  }
}

ArticleDetail.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
}
