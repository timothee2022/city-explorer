import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
      cityLat: 0,
      cityLon: 0,
      city: '',
      weather: [],
      movies: [],
      error: false,
      errorMessage: '',
    }
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();


    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

    let url1 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=12&size=500x500&format=jpeg`

    try {
      let cityData = await axios.get(url);

      this.setState({
        cityLat: cityData.data[0].lat,
        cityLon: cityData.data[0].lon,
        mapState: url1,
      })

      await this.getWeather();
      await this.getMovies();

    } catch (error) {

      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.message}`
      });
    }


  }

  getWeather = async () => {
    let url = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}`;

    try {
      let weatherResponse = await axios.get(url);
      this.setState({
        weather: weatherResponse.data
      })
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${e.message}`
      });
      console.log(e.message);
    }
  }



  getMovies = async () => {

    console.log(this.state);

    let url = `${process.env.REACT_APP_SERVER}/movies?movies=${this.state.city}`;

    try {
      let moviesResponse = await axios.get(url);
      this.setState({
        movies: moviesResponse.data
      })
    } catch (e) {
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${e.message}`
      });
      console.log(e.message);
    }
  }


  render() {
    console.log(this.state.weather);
    return (
      <>
        <h1> City Explorer</h1>

        <form onSubmit={this.getCityData}>
          <label> <h3>Pick a city!</h3>
            <input type="text" onInput={this.handleInput} />
          </label>
          <button type='submit'>Explore!</button>
        </form>

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Lattitude</Card.Title>
            <Card.Text>
              {this.state.cityLat}
            </Card.Text>
            <Button variant="primary">Display Lattitude</Button>
          </Card.Body>
        </Card>
      </>
    );
  }
}




export default App;
