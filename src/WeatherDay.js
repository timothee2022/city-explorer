import React from 'react'

class WeatherDays extends React.Component {
  render() {
    return (
      <h1>
        Weather Day Component
        <div key={this.props.i}>
          <p>{this.props.day.description}</p>
          <p>{this.props.day.date}</p>
        </div>
      </h1>
    )
  }


}

// use weather response.body.data.map => to use map over data

export default WeatherDays;