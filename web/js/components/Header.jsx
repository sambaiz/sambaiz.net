import React, { Component, PropTypes } from 'react'
import styles from '../../css/header.css'
import { Link } from 'react-router'
import Author from './Author.jsx'

export default class Header extends Component {
  render() {
    const { breadcrumb } = this.props

    return (
      <div className={styles.header}>
        <Author />
        <Link to={''}>[sambaiz.net]</Link>
      </div>
    )
  }
}

Header.propTypes = {
  breadcrumb: PropTypes.array.isRequired
}
