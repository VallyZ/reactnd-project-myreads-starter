import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Search from './Search'
import Books from './Books'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
    books: [],
    ourBooks: []
  }

  componentWillMount(){
    BooksAPI.getAll().then((ourBooks) => {
      this.setState({ ourBooks })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search ourBooks={this.state.ourBooks}/>
        )}/>
        <Route exact path='/' render={({ history }) => (
          <Books ourBooks={this.state.ourBooks}/>
        )}/>
      </div>
    )}
  }

export default BooksApp
