import React from 'react'

class Movies extends React.Component {
  render() {
    let moviesDays = this.props.moviesData.map((day, i) => (
      <div key={i}>
        <p>{day.title}</p>
        <p>{day.overview}</p>
      </div>
    ))
    return (
      <>
        {moviesDays}
      </>
    )
  }
}

export default Movies;