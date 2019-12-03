import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'

import SavedList from './Movies/SavedList'
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'
import UpdateForm from './Movies/UpdateForm'

const App = () => {
  const [movies, setMovies] = useState([])
  const [savedList, setSavedList] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(response => setMovies(response.data))
      .catch(err => console.log(err.response))
  }, [])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie])
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateForm {...props} />
        }}
      />
    </>
  )
}

export default App
