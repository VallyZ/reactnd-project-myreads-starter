import React, { Component } from 'react'

class SearchBooks extends Component {
  render(){
  const results = this.props.results
  return(
    results.map(book => (
      <li key={book.id}>
        {book.title}
      </li>
    ))
  )
  }
  }

export default SearchBooks
