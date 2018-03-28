import React from 'react';
import axios from 'axios';
import Promise from 'bluebird';
import { InfoList } from './InfoList.jsx';
import MapContainer from './MapContainer.jsx';
require("babel-polyfill");

class BusinessInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: this.props.restaurant,
    };
    this.getRestaurantData(props.id);
  }

  getRestaurantData(id) {
    axios.get(`http://localhost:3003/api/restaurants/${id}/businessinfo`)
      .then((response) => {
        console.log('received:', response);
        this.setState({ restaurant: response.data });
      }).catch((err) => {
        console.error('Failed to fetch restaurant data from server:', err);
      });
  }

  render() {
    if (!this.state.restaurant) {
      return <div> Loading Sidebar... </div>;
    }
    return (
      <div className="sidebar-flexbox-col sidebar-app">
        <InfoList restaurant={this.state.restaurant} />
        <MapContainer lat={this.state.restaurant.lat} lng={this.state.restaurant.lng} />
      </div>
    );
  }
}

export default BusinessInfo;
