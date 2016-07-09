import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Header from '../components/Header.jsx'
import SharedHelmet from '../components/SharedHelmet.js';

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <SharedHelmet title={'sambaiz.net'} url={`http://sambaiz.net`} title={'sambaiz.net'} description={'僕のホームページ'} />
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
