import React, { Component } from 'react'

class Book extends Component {

  componentDidMount() {
    const { book } = this.props;
  }

  changeBookShelf = (event) => {
    this.props.onChangeShelf(this.props.book, event.target.value)
  }

  render(){
    return(
      <li key={this.props.id}>
          <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail}')` }}></div>
            <div className="book-shelf-changer">
              <select id="selector" value={this.props.book.shelf} onChange={this.changeBookShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
