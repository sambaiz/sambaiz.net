import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Header from '../components/Header.jsx'
import Helmet from "react-helmet";

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <Helmet title={'sambaiz.net'} />
        <Header breadcrumb={[]} />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state, ownProps) {
  return {
  }
}

export default connect(mapStateToProps, {
})(App)
