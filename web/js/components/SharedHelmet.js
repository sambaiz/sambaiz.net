import React, { Component, PropTypes } from 'react'
import Helmet from "react-helmet";

export default class SharedHelmet extends Component {
  render() {
    const { title, url, description } = this.props

    return (
      <Helmet title={title}
        meta={[
            {"name": "twitter:card", "content": "summary"},
            {"name": "twitter:site", "content": "@sambaiz"},
            {"name": "twitter:title", "content": title },
            {"name": "twitter:description", "content": description },
            {"property": "og:title", "content": title },
            {"property": "og:type", "content": "blog"},
            {"property": "og:image", "content": "http://d2wgaf7ubdj1mv.cloudfront.net/my.jpg"},
            {"property": "og:url", "content": url}
        ]}
      />
    )
  }
}

SharedHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}
