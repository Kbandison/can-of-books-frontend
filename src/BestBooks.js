import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import books from './img/books.jpg';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

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

  handlecreateBook = async(bookInfo) => {
    console.log(bookInfo)
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bookInfo);
      const newBook = response.data;
      this.setState({
        books: [...this.state.books, newBook],
      })
    } catch (error) {
      console.log('error is book post: ', error.response)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.createBook({
      title: event.target.formName.value,
      description: event.target.formDescription.value,
      status: event.target.formStatus.value
    })
  }

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
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="name" placeholder="Enter Book Title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="name" placeholder="Enter Book Description" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Check type="checkbox" placeholder="Enter Book Status" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
      </>
    )
  }
}
export default BestBooks;
