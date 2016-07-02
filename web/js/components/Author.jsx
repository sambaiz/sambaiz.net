import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from '../../css/author.css'
import classNames from 'classnames'

export default class Author extends Component {
  render() {
    const {} = this.props
    return (
      <div className={styles.author}>
        <img src="http://d2wgaf7ubdj1mv.cloudfront.net/my.jpg" className={styles.authorImage}></img>
        <div className={styles.authorText}>
          <div>書いてる人: sambaiz</div>
          <div>渋谷でプログラム書いてる</div>
          <div>
            <a href="https://twitter.com/sambaiz"><i className={classNames("fa", "fa-twitter", styles.twitter)} aria-hidden="true"></i></a>
            <a href="https://github.com/sambaiz"><i className={classNames("fa", "fa-github", styles.github)} aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    )
  }
}

Author.propTypes = {
}
