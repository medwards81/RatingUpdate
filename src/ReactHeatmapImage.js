import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHeatmap from './ReactHeatmap';
import requestImageSize from 'request-image-size';

const heatmapConfig = {
  radius: 30,
  //maxOpacity: 0.5,
  minOpacity: 0,
  blur: 0.75
};

class ReactHeatmapImage extends Component {
  static propTypes = {
    imgURL: PropTypes.string.isRequired
  };

  state = {
    heatmapData: [],
    imgSize: { width: 0, height: 0 }
  };

  componentDidMount() {
    const { imgURL } = this.props;
    requestImageSize(`${imgURL}`)
      .then(size => {
        console.log(size);
        this.setState({
          imgSize: { width: size.width, height: size.height }
        });
      })
      .catch(err => console.error(err));
  }

  handleHeatmapClick = e => {
    const target = e.target || e.srcElement,
      rect = target.getBoundingClientRect(),
      offsetX = e.clientX - rect.left,
      offsetY = e.clientY - rect.top;
    this.addClick(offsetX, offsetY);
  };

  addClick = (x, y) => {
    this.setState({
      heatmapData: [...this.state.heatmapData, { x, y, value: 1 }]
    });
  };

  clearClicks = () => {
    this.setState({
      heatmapData: []
    });
  };

  render() {
    const { imgURL } = this.props;
    return (
      <div>
        <div style={{ textAlign: 'right', width: '500px', margin: '0 auto' }}>
          <button className="btn btn-primary" onClick={this.clearClicks}>
            Reset
          </button>
        </div>
        <div
          style={{
            margin: '0 auto',
            position: 'relative',
            backgroundImage: `url(${imgURL})`,
            width: '500px',
            height: '646px',
            border: '1px solid #ccc'
          }}
          onClick={this.handleHeatmapClick}
        >
          <ReactHeatmap
            configObject={heatmapConfig}
            containerRef
            data={this.state.heatmapData}
            max={1}
            //data={[{ x: 150, y: 150, value: 1 }, { x: 80, y: 60, value: 1 }]}
          />
        </div>
      </div>
    );
  }
}

export default ReactHeatmapImage;
