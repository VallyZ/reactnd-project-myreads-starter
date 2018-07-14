import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Search from './Search'
import Books from './Books'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    ourBooks: [],
    currentlyReading : [],
    wantToRead : [],
    read : []
  }

  componentDidMount(){
    BooksAPI.getAll().then((ourBooks) => {
      this.setState({ ourBooks })
    }),
    BooksAPI.search().then((books)=>{
      this.setState({ books })
    })
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
        } else if (event.target.value !== book.shelf && book.shelf ==="none"){
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
        }
    }


  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            books={this.state.books}
            onChangeShelf={this.onChangeShelf}
           />
        )}/>
        <Route exact path='/' render={({ history }) => (
          <Books
            ourBooks={this.state.ourBooks}
            onChangeShelf={this.onChangeShelf}
            />
        )}/>
      </div>
    )}
  }

export default BooksApp
