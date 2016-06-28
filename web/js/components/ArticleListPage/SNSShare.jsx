import React, { Component, PropTypes } from 'react'
import styles from '../../../css/article';
import { Link } from 'react-router';

export default class SNSShare extends Component {
  render() {
    const { name } = this.props

    return (
      <div>
        {/* Twitter */}
        <a href="https://twitter.com/share" class="twitter-share-button" data-via="sambaiz">Tweet</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
        {/* Facebook */}
        <a href=`http://b.hatena.ne.jp/entry/sambaiz.net/%23/` class="hatena-bookmark-button" data-hatena-bookmark-title="タイトルタイトル" data-hatena-bookmark-layout="standard-balloon" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加">
          <img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" />
        </a>
        <script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>
      </div>
    )
  }
}

ArticleTag.propTypes = {
  name: PropTypes.string.isRequired,
  articleId: PropTypes.number.isRequired
}
