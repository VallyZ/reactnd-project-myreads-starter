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

  handleInputChange = (query) => {
    this.setState({ query: this.search.value},
       () => {
          BooksAPI.search(this.state.query).then((showingBooks)=>{this.setState({showingBooks:showingBooks})})
    })
  }


  render(){
  let showingBooks
  if (this.props.query){
    const match=new RegExp(escapeRegExp(this.props.books),'i')
    let showingBooks=this.props.books.filter((book)=>match.test( JSON.stringify(book) ))
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
            ref={input => this.search = input}
            onChange={this.handleInputChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.showingBooks && this.state.showingBooks.map(book=>
            <li key={book.id}>
                <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks && book.imageLinks.thumbnail}')` }}></div>
                  <div className="book-shelf-changer">
                    <select id="selector" value={book.shelf} onChange={(event)=>this.props.onChangeShelf(book, event)}>
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
