import React, { Component, PropTypes } from 'react'
import styles from '../../../css/style.css';
import { Link } from 'react-router';

export default class ArticleTag extends Component {
  render() {
    const { name } = this.props

    return (
      <div>{name}</div>
    )
  }
}

ArticleTag.propTypes = {
  name: PropTypes.string.isRequired
}
