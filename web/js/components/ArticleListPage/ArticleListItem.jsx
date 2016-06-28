import React, { Component, PropTypes } from 'react'
import styles from '../../../css/article';
import { Link } from 'react-router';
import ArticleTag from './ArticleTag'

export default class ArticleListItem extends Component {
  render() {
    const { id, date, title, tags } = this.props

    return (
      <Link to={`/article/${id}`}>
        <div className={styles.articleListItem}>
            <div className={styles.articleListItemTitle}>{title}</div>
            <div className={styles.articleListItemDate}>{date}</div>
            { /* tags.map((t) => <ArticleTag name={t} />) */ }
        </div>
      </Link>
    )
  }
}

ArticleListItem.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired
}