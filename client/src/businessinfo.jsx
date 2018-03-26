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

  async componentDidMount() {
    console.log('this is called inside of component did mount before data catch initiated');
    const businessInfoData = await axios.get(`http://localhost:3003/api/restaurants/${this.props.restaurantId}/businessinfo`);
    console.log('here is the data', businessInfoData);
    // await this.setStateAsync({ restaurant: businessInfoData });
    await this.setState({ restaurant: businessInfoData });
    console.log('state has been set');
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      resolve(this.setState(state));
    });
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

// export { App };
export default BusinessInfo;
