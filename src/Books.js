import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Shelf from './ShelfTemplate'

class Books extends Component {
  state = {
    currentlyReading : [],
    wantToRead : [],
    read : []
  }

  render(){
    let currentlyReading=this.props.ourBooks.filter(book=>book.shelf==="currentlyReading");
    let wantToRead=this.props.ourBooks.filter(book=>book.shelf==="wantToRead");
    let read=this.props.ourBooks.filter(book=>book.shelf==="read");
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title='Currently Reading' onChangeShelf={this.props.onChangeShelf} shelf={currentlyReading=this.props.ourBooks.filter(book=>book.shelf==="currentlyReading")}/>
            <Shelf title='Want to Read' onChangeShelf={this.props.onChangeShelf} shelf={wantToRead=this.props.ourBooks.filter(book=>book.shelf==="wantToRead")}/>
            <Shelf title='read' onChangeShelf={this.props.onChangeShelf} shelf={read=this.props.ourBooks.filter(book=>book.shelf==="read")}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>

    )
  }
}

export default Books
