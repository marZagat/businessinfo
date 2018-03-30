import React from 'react';
import axios from 'axios';
import Promise from 'bluebird';
import { InfoList } from './InfoList.jsx';
import MapContainer from './MapContainer.jsx';
const businessInfoHost = process.env.BUSINESS_INFO_HOST || 'ec2-52-53-104-137.us-west-1.compute.amazonaws.com';

class BusinessInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: this.props.restaurant,
    };
    this.getRestaurantData(props.id);
  }

  getRestaurantData(id) {
    console.log(`In React component, the host to do the axios get is ${businessInfoHost}`);
    axios.get(`http://${businessInfoHost}:3003/api/restaurants/${id}/businessinfo`)
      .then((response) => {
        console.log('received:', response.data);
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
