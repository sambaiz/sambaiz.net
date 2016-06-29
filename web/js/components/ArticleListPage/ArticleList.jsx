import React, { Component, PropTypes } from 'react'
import styles from '../../../css/article'
import loadingStyle from '../../../css/loading'
import ArticleListItem from './ArticleListItem'

export default class ArticleList extends Component {

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const { fetchArticles, page, loading, error } = this.props;
    if(!loading && !error) fetchArticles(page+1);
  }

  render() {
    const { articles, loading } = this.props;

    return <div className={styles.articleList}>
      { articles.map((a) => <ArticleListItem key={a.id} id={a.id} date={a.date} title={a.title} tags={a.tags} />) }
      { loading ? <div className={loadingStyle.loader}></div> : <div></div> }
    </div>
  }
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
}
