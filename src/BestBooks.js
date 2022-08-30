import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import books from './img/books.jpg';
import { Container } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  getBooks = async() => {
    try{
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: bookData.data
      });
    } catch(error){
      console.log('We have an error: ', error.response);
    }
  };

  componentDidMount(){
    this.getBooks();
  }

  render() {

    let bookCarousel = this.state.books.map(book => (
      <Carousel.Item key={book._id}>
        <img
          className={book._id}
          src={books}
          alt={book.name}
        />
        <Carousel.Caption>
          <h3>{book.name}</h3>
          <p>{book.description}</p>
          <p>{book.status}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ));

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
        <Container>
          <Carousel>
            {bookCarousel}
          </Carousel>
        </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}
export default BestBooks;
