import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    newBooks: [],
    query: '',
    error: false
  }

  getNewBooks = (event) => {
    const query = event.target.value
    this.setState({query: query})
    if (query) {
      BooksAPI.search(query).then((books) => {
        books.length > 0 ? this.setState({newBooks: books, error: false}) : this.setState({newBooks: [], error: true})
      })
    } else {
      this.setState({newBooks: [], error: false})
    }
  }

  render() {
    const {query, newBooks, error} = this.state
    const {books, changeShelf} = this.props

    return (
      <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search"  to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                placeholder="Search by title or author"
                value={ query }
                onChange={ this.getNewBooks } />
            </div>
          </div>
          <div className="search-books-results">
            { newBooks.length > 0 && (
              <div>
                <div>
                  <h3>Search returned { newBooks.length } books </h3>
                </div>
                <ol className="books-grid">
                  {newBooks.map((book) => (
                    <Book
                      book={ book }
                      books={ books }
                      key={ book.id }
                      changeShelf={ changeShelf }
                    />
                  ))}
                </ol>
              </div>
            )}
            { error  && (
              <div>
                <div>
                  <h3>Search returned 0 books.  Please try again!</h3>
                  </div>
                </div>
            )}
          </div>
        </div>
    )
  }
}

export default Search
