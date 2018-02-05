import React, { Component } from 'react';
import Rating from 'react-rating-anchors';
import ReactHeatmapImage from './ReactHeatmapImage';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Rating
          stop={11}
          anchors={['Unbelievable', 'Neutral', 'Very Believable']}
        />
        <Rating
          stop={7}
          anchors={['Uninspiring', 'Neutral', 'Very Insipriring']}
        />
        <ReactHeatmapImage
          imgURL={`https://qualtools.com/uploads/0ed1df1821ec47129dd412908530e181.jpg`}
        />
      </div>
    );
  }
}

export default App;
