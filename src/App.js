import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Search from './Search'
import Books from './Books'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    ourBooks: []
  }

  componentWillMount(){
    BooksAPI.getAll().then((ourBooks) => {
      this.setState({ ourBooks })
    }),
    BooksAPI.search().then((books)=>{
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search books={this.state.books} />
        )}/>
        <Route exact path='/' render={({ history }) => (
          <Books ourBooks={this.state.ourBooks}/>
        )}/>
      </div>
    )}
  }

export default BooksApp
