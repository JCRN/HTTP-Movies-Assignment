import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button } from 'semantic-ui-react'

const initialMovie = {
  id: 0,
  title: '',
  director: '',
  metascore: 0,
  stars: []
}

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie)

  useEffect(() => {
    const id = props.match.params.id
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        console.log('get movie from update form params id: ', response.data)
        setMovie(response.data)
      })
      .catch(error => console.log('get movie error: ', error))
  }, [props.match.params.id])

  const handleChange = event => {
    setMovie({ ...movie, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(response => {
        console.log(response.data)
        setMovie(initialMovie)
        // props.updateItems(response.data)
        // props.history.push('/item-list')
      })
      .catch(error => console.log(error.response))
  }

  return (
    <Form className="movie-update-wrapper" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Input
          label="Title"
          placeholder="Enter title"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
        <Form.Input
          label="Director"
          placeholder="Enter director"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
        <Form.Input
          label="Metascore"
          placeholder="Enter metascore"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        {movie.stars.map(star => {
          return (
            <Form.Input
              key={star}
              label="Actor"
              placeholder="Enter Actor"
              name="actor"
              value={star}
              onChange={handleChange}
            />
          )
        })}
        <Button>Submit Changes</Button>
      </Form.Group>
    </Form>
  )
}

export default UpdateForm
