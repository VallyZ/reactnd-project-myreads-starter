import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Search from './Search'
import Books from './Books'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  updateShelf = (book, shelf) => {
    let books;
    if (this.state.books.findIndex(b => b.id === book.id) > 0) {
      books = this.state.books.map(b => {
        if (b.id === book.id) {
          return {...book, shelf}
        } else {
          return b
        }
      })
    } else {
      //new book to the shelf
      books = [...this.state.books, {...book, shelf}]
    }
    this.setState({books})
    BooksAPI.update(book, shelf).then((data) => {})
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            books={this.state.books}
            onChangeShelf={(book, shelf) => this.updateShelf(book, shelf)}
           />
        )}/>
        <Route exact path='/' render={({ history }) => (
          <Books
            books={this.state.books}
            onChangeShelf={(book, shelf) => this.updateShelf(book, shelf)}
            />
        )}/>
      </div>
    )}
  }

export default BooksApp
