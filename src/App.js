import React from 'react';
import About from './About';
import Books from './Books';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            <Route
              exact path="/about"
              element={<About />}
              >
              </Route>
              <Route
              exact path="/Books"
              element={<Books />}
              >
              </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
