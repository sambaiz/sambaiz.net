import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from '../../css/header'

export default class Author extends Component {
  render() {
    const {} = this.props
    return (
      <div className={styles.author}>
        <img src="http://d2wgaf7ubdj1mv.cloudfront.net/my.jpg" className={styles.autorImage}></img>
        <div className={styles.autorText}>
          <div>書いてる人: sambaiz</div>
          <div>渋谷でプログラム書いてる</div>
        </div>
      </div>
    )
  }
}

Author.propTypes = {
}
