import React, {Component} from 'react'
import PropTypes from 'prop-types'
import noCover from './icons/no-cover-placeholder.png'



class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const {book, books, changeShelf} = this.props
    const coverImage = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover
    const title = book.title ? book.title : 'Not Available'
    let currentShelf = 'none'
    for (let item of books ) {
      if (item.id === book.id)  {
        currentShelf = item.shelf
        break
      }
    }
    const author = book.authors ? book.authors.join(',') : ''

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverImage})`}}></div>
            <div className="book-shelf-changer">
              <select onChange={(event) => changeShelf(book, event.target.value)} defaultValue={ currentShelf }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    )
  }
}

export default Book
