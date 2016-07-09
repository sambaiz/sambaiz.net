import React, { Component, PropTypes } from 'react'
import styles from '../../../css/article.css'
import loadingStyle from '../../../css/loading.css'
import ArticleListItem from './ArticleListItem.jsx'

export default class ArticleList extends Component {

  componentWillMount() {
    this.fetch();
  }

  fetch() {
    const { fetchArticles, page, loading, loaded, error } = this.props;
    if(!loading && !loaded && !error) fetchArticles(page+1);
  }

  render() {
    const { articles, loading } = this.props;

    return <div className={styles.articleList}>
      { articles.map((a) => <ArticleListItem key={a.id} id={a.id} date={a.date.replace('T', ' ')} title={a.title} tags={a.tags} />) }
      { loading ? <div className={loadingStyle.loader}></div> : <div></div> }
    </div>
  }
}

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.string
}
