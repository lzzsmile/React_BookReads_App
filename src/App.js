import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import Search from './Search'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {this.setState({books})})
  }

  changeShelf = ( book, shelf ) => {
    BooksAPI.update(book, shelf).then(response =>{
      book.shelf = shelf
      var newBooks = this.state.books.filter( b => b.id !== book.id )
      newBooks.push(book);
      this.setState({ books: newBooks })
    })
  }

  render() {
    const {books} = this.state
    const shelfTypes = [{ type: 'currentlyReading', title: 'Currently Reading' },
                        { type: 'wantToRead',  title: 'Want to Read' },
                        { type: 'read', title: 'Read'}]

    return (
      <div className="app">
        <Route path='/search' render={({history}) => (
          <Search
            books={books}
            changeShelf={this.changeShelf}
          />
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
								<div>
									{shelfTypes.map((shelf) => (
										<div key={shelf.type} className="bookshelf">
                      <h2 className="bookshelf-title">{ shelf.title }</h2>
                      <div className="bookshelf-books">
											  <BookShelf
												  books={this.state.books.filter((book) => book.shelf === shelf.type)}
                          changeShelf={this.changeShelf}
											  />
                      </div>
										</div>
									))}
								</div>
							</div>
            <div className="open-search">
              <Link to="/search">Search</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
