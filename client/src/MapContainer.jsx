import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const mapKey = process.env.MAP_KEY;

const Marker = ({ icon }) => <div><img src="http://res.cloudinary.com/madlicorice/image/upload/v1520470825/map_icon_small.png"/></div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: this.props.lat,
        lng: this.props.lng,
      },
      zoom: 0,
    };
  }

  render() {
    return (
      <div style={{ height: '320px', width: '280px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapKey }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <Marker 
            lat={this.props.lat}
            lng={this.props.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
