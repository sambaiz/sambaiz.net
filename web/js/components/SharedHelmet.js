import React, { Component, PropTypes } from 'react'
import Helmet from "react-helmet";

export default class SharedHelmet extends Component {
  render() {
    const { title } = this.props

    return (
      <Helmet title={title} />
    )
  }
}

SharedHelmet.propTypes = {
  title: PropTypes.string.isRequired
}
