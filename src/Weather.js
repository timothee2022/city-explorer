import React from 'react'
import WeatherDays from './WeatherDay'

class Weather extends React.Component {
  render() {
    let weatherDays = this.props.weatherData.map((day, i) => (
      <WeatherDays  day={day} i={i}/>

    ))
    return (
      <>
        {weatherDays}
      </>
    )
  }
}

export default Weather;