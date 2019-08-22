import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialMovie = {
  id: null,
  title: '',
  director: '',
  metascore: null,
  stars: []
}

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie)
  return (
    <div className="movie-update-wrapper">
      <div>Hi There!</div>
    </div>
  )
}

export default UpdateForm
