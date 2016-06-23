import React, { Component, PropTypes } from 'react'
import styles from '../../../css/style.css'
import ArticleListItem from './ArticleListItem'

export default class ArticleList extends Component {

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { fetchArticles, page, loading } = this.props;
    if(!loading) fetchArticles(page+1);
  }

  render() {
    const { articles } = this.props;

    return <div className={styles.articleList}>
      { articles.map((a) => <ArticleListItem key={a.id} id={a.id} date={a.date} title={a.title} tags={a.tags} />) }
    </div>
  }
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
}
