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

  static propTypes={
    ourBooks: PropTypes.array.isRequired,
  }

  removeBook = (book) => {
        let arrayBook=[];
        let index=-1;

        if (book.shelf === "currentlyReading")  {
            index=this.state.currentlyReading.indexOf(book);
            arrayBook=this.state.currentlyReading;
        } else if( book.shelf === "wantToRead" ){
            index=this.state.wantToRead.indexOf(book);
            arrayBook=this.state.wantToRead;
        } else {
            index=this.state.read.indexOf(book);
            arrayBook=this.state.read;
        }
        arrayBook.splice(index,1);
        return arrayBook;
    }

    updateShelf = (fromShelf,newArray) =>{
        if (fromShelf === "currentlyReading")  {
         this.setState({ currentlyReading: newArray})
       } else if( fromShelf === "wantToRead" ){
            this.setState({ wantToRead: newArray})
        } else {
            this.setState({ read: newArray})
        }
    }

    updateToShelf = (toShelf,toNewArray) => {
        if (toShelf === "currentlyReading")  {
         this.setState({ currentlyReading: toNewArray})
       } else if( toShelf === "wantToRead" ){
            this.setState({ wantToRead: toNewArray})
        } else {
            this.setState({ read: toNewArray})
        }
    }

    onChangeShelf = (book,event) => {
        let tmpBook=book;
        let fromShelf=book.shelf;
        let toShelf=event.target.value;
        let toNewArray=[];

        if (event.target.value!=="none" && book.shelf !==event.target.value){
            let newArray=this.removeBook(book);

            if (toShelf === "currentlyReading")  {
                   this.updateShelf(fromShelf,newArray);
                   toNewArray=this.state.currentlyReading;
                   book.shelf=toShelf;
                   toNewArray.push(book);
                   this.updateToShelf(toShelf,toNewArray);
            }else if( toShelf === "wantToRead" ){
                this.updateShelf(fromShelf,newArray);
                toNewArray=this.state.wantToRead;
                book.shelf=toShelf;
                toNewArray.push(book);
                this.updateToShelf(toShelf,toNewArray);
            }else {
                this.updateShelf(fromShelf,newArray);
                toNewArray=this.state.read;
                book.shelf=toShelf;
                toNewArray.push(book);
                this.updateToShelf(toShelf,toNewArray);
            }
        } else if (event.target.value ==="none" && book.shelf !==event.target.value){
            let newArray=this.removeBook(book);
            book.shelf="none";
            this.updateShelf(fromShelf,newArray);
        }
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
            <Shelf title='Currently Reading' onChangeShelf={this.onChangeShelf} currentlyReading={this.props.currentlyReading} wantToRead={this.props.wantToRead} read={this.props.read} shelf={currentlyReading=this.props.ourBooks.filter(book=>book.shelf==="currentlyReading")}/>
            <Shelf title='Want to Read' onChangeShelf={this.onChangeShelf} currentlyReading={this.props.wantToRead} wantToRead={this.props.wantToRead} read={this.props.read} shelf={wantToRead=this.props.ourBooks.filter(book=>book.shelf==="wantToRead")}/>
            <Shelf title='read' onChangeShelf={this.onChangeShelf} currentlyReading={this.props.read} wantToRead={this.props.wantToRead} read={this.props.read} shelf={read=this.props.ourBooks.filter(book=>book.shelf==="read")}/>
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
