import React, { Component, PropTypes } from 'react'
import styles from '../../css/style.css'
import { Link } from 'react-router'

export default class Header extends Component {
  render() {
    const { breadcrumb } = this.props

    return (
      <div className={styles.header}>
        <Link to={''}>sambaiz.net(WIP)</Link>
      </div>
    )
  }
}

Header.propTypes = {
  breadcrumb: PropTypes.array.isRequired
}
