import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Heatmap from 'heatmap.js';

// This is a fork of the npm react-heatmap.js package
// https://github.com/benweizhu/react-heatmap.js
// There was an issue with the old package using React.PropTypes,
// Which is now ecapsulated in its own package, which I've
// imported above
class ReactHeatmap extends React.Component {
  componentDidMount() {
    const configObject = Object.assign(
      {
        container: ReactDOM.findDOMNode(this)
      },
      this.props.configObject
    );

    this.heatmap = Heatmap.create(configObject);

    this.setData(this.props.min, this.props.max, this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.setData(nextProps.min, nextProps.max, nextProps.data);
  }

  setData = (min, max, data) => {
    this.heatmap.setData({ min, max, data });
  };

  render() {
    return <div style={{ width: '100%', height: '100%' }} />;
  }
}

ReactHeatmap.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
  configObject: PropTypes.object
};

ReactHeatmap.defaultProps = {
  max: 5,
  min: 0,
  data: [],
  configObject: {}
};

export default ReactHeatmap;
