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

  removeBook(book){
        let arrayBook=[];
        let index=-1;

        if (book.shelf === "currentlyReading")  {
            index=this.props.currentlyReading.indexOf(book);
            arrayBook=this.props.currentlyReading;
        } else if( book.shelf === "wantToRead" ){
            index=this.props.wantToRead.indexOf(book);
            arrayBook=this.props.wantToRead;
        } else {
            index=this.props.read.indexOf(book);
            arrayBook=this.props.read;
        }
        arrayBook.splice(index,1);
        return arrayBook;
    }

    updateShelf(fromShelf,newArray){
        if (fromShelf === "currentlyReading")  {
         this.setState({ currentlyReading: newArray})
       } else if( fromShelf === "wantToRead" ){
            this.setState({ wantToRead: newArray})
        } else {
            this.setState({ read: newArray})
        }
    }

    updateToShelf(toShelf,toNewArray){
        if (toShelf === "currentlyReading")  {
         this.setState({ currentlyReading: toNewArray})
       } else if( toShelf === "wantToRead" ){
            this.setState({ wantToRead: toNewArray})
        } else {
            this.setState({ read: toNewArray})
        }
    }

    onChangeShelf(book,event){
        let tmpBook=book;
        let fromShelf=book.shelf;
        let toShelf=event.target.value;
        let toNewArray=[];

        if (event.target.value!=="none" && book.shelf !==event.target.value){
            let newArray=this.removeBook(book);

            if (toShelf === "currentlyReading")  {
                   this.updateShelf(fromShelf,newArray);
                   toNewArray=this.props.currentlyReading;
                   book.shelf=toShelf;
                   toNewArray.push(book);
                   this.updateToShelf(toShelf,toNewArray);
            }else if( toShelf === "wantToRead" ){
                this.updateShelf(fromShelf,newArray);
                toNewArray=this.props.wantToRead;
                book.shelf=toShelf;
                toNewArray.push(book);
                this.updateToShelf(toShelf,toNewArray);
            }else {
                this.updateShelf(fromShelf,newArray);
                toNewArray=this.props.read;
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
            <Shelf title='Currently Reading' currentlyReading={this.state.currentlyReading} wantToRead={this.state.wantToRead} read={this.state.read} shelf={currentlyReading=this.props.ourBooks.filter(book=>book.shelf==="currentlyReading")}/>
            <Shelf title='Want to Read' currentlyReading={this.state.wantToRead} wantToRead={this.state.wantToRead} read={this.state.read} shelf={wantToRead=this.props.ourBooks.filter(book=>book.shelf==="wantToRead")}/>
            <Shelf title='read' currentlyReading={this.state.read} wantToRead={this.state.wantToRead} read={this.state.read} shelf={read=this.props.ourBooks.filter(book=>book.shelf==="read")}/>
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
