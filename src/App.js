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

    let url1 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=12&size=500x500&format=jpeg`

    let cityData = await axios.get(url);

    this.setState({
      cityLat: cityData.data[0].lat,
      cityLon: cityData.data[0].lon,
      mapState: url1,
    })

    catch(error){
      
      this.setState({
        error: true,
        errorMessage: `An Error Occured: ${error.message}`
      });
    }

    console.log(cityData.data[0]);

  }

  render() {
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
