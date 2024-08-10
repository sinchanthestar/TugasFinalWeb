import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const API_KEY = 'ec3a213a2e07a3a0217aa70e9a900b1f';
const API_URL = 'https://api.themoviedb.org/3/search/movie';

const MovieCard = ({ movie }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="mb-4"
  >
    <Card>
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.overview}</Card.Text>
      </Card.Body>
    </Card>
  </motion.div>
);

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      setMovies(response.data.results);
      setError('');
    } catch (err) {
      setError('Error fetching data');
      setMovies([]);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Final WEB Rindiani Saputri</h1>
      <Form className="d-flex mb-4">
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <Button variant="primary" onClick={handleSearch} className="ml-2">
          Search
        </Button>
      </Form>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Col md={4} key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </Row>
    </Container>
  );
};

export default App;
