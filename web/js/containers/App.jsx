import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Header from '../components/Header'
import DocumentTitle from 'react-document-title'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children } = this.props
    return (
      <DocumentTitle title={'sambaiz.net'}>
        <div>
          <Header breadcrumb={[]} />
          {children}
        </div>
      </DocumentTitle>
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
