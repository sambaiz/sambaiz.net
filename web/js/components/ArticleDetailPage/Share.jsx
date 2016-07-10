import React, { Component, PropTypes } from 'react'
import styles from '../../../css/share.css'
import classNames from 'classnames'

export default class Share extends Component {

  render() {
    const { url, title } = this.props;

    return (
      <div>
        <div className={styles.share}>シェアボタン</div>
        <ul className={classNames(styles.circle_group, styles.clearfix)}>
          <li className={classNames(styles.sns_circle, styles.hatebu)}><span><i className={classNames("fa", styles["fa-hatena"])}></i></span><a data-hatena-bookmark-title={`${title} - [sambaiz.net]`} href={`http://b.hatena.ne.jp/entry/${url}`}></a></li>
          <li className={classNames(styles.sns_circle, styles.twitter)}><span><i className={classNames("fa", "fa-twitter")}></i></span><a href={`https://twitter.com/share?url=${url}&amp;text=${encodeURIComponent(title)}`}></a></li>
          <li className={classNames(styles.sns_circle, styles.googleplus)}><span><i className={classNames("fa", "fa-google-plus")}></i></span><a href={`https://plus.google.com/share?hl=ja&amp;url=${encodeURIComponent(url)}`}></a></li>
          <li className={classNames(styles.sns_circle, styles.pocket)}><span><i className={classNames("fa", "fa-get-pocket")}></i></span><a href={`http://getpocket.com/edit?url=${url}&amp;title=${encodeURIComponent(`${title} - [sambaiz.net]`)}`}></a></li>
        </ul>
      </div>
    )
  }
}

Share.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string
}
