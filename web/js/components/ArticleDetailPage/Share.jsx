import React, { Component, PropTypes } from 'react'
import styles from '../../../css/share'
import classNames from 'classnames'

export default class Share extends Component {

  render() {
    const url = window.location.href;
    const title = document.title.replace('|', '%7c');

    return (
      <div>
        <div className={styles.share}>シェアボタン</div>
        <ul className={classNames(styles.circle_group, styles.clearfix)}>
          <li className={classNames(styles.sns_circle, styles.hatebu)}><span><i className={classNames("fa", styles["fa-hatena"])}></i></span><a href={`http://b.hatena.ne.jp/entry/${url}`}></a></li>
          <li className={classNames(styles.sns_circle, styles.twitter)}><span><i className={classNames("fa", "fa-twitter")}></i></span><a href={`https://twitter.com/share?url=${url}&amp;text=${title}`}></a></li>
          <li className={classNames(styles.sns_circle, styles.facebook)}><span><i className={classNames("fa", "fa-facebook")}></i></span><a href={`http://www.facebook.com/share.php?u=${url}`}></a></li>
          <li className={classNames(styles.sns_circle, styles.googleplus)}><span><i className={classNames("fa", "fa-google-plus")}></i></span><a href={`https://plus.google.com/share?hl=ja&amp;url=${url}`}></a></li>
          <li className={classNames(styles.sns_circle, styles.pocket)}><span><i className={classNames("fa", "fa-get-pocket")}></i></span><a href={`http://getpocket.com/edit?url=${url}&amp;title=${title}`}></a></li>
        </ul>
      </div>
    )
  }
}

Share.propTypes = {
}
