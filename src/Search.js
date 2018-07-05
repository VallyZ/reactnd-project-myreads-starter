import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import BooksApp from './App'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    showingBooks:[]
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  }


  render(){
  let showingBooks
  if (this.props.query){
    const match=new RegExp(escapeRegExp(this.props.ourBooks),'i')
    let showingBooks=this.props.ourBooks.filter((book)=>match.test( JSON.stringify(book) ))
  }else {
    showingBooks=[]
  }

  return(
    <div className="search-books">
      <div className="search-books-bar">
        <Link to='/' className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
        {}
          <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {showingBooks.map(book=>
            <li key={book.id}>
                <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
                  <div className="book-shelf-changer">
                    <select id="selector">
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
