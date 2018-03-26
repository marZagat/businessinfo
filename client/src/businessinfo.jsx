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
<<<<<<< 9f78012d13e49e34c2d4f126366e1d8a24878654
<<<<<<< 8643cf5158339c5d071d0c53f79c1f06edeff0c7
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
=======
    getRestaurantData(props.id);
>>>>>>> Still working on ssr, commit to compare with previous implementation
=======

    this.getRestaurantData(this.props.id);
>>>>>>> Saving version that mostly works but fails to fetch data prior to render, going to experiment with removing fetch from component
  }

  // componentDidMount() {
  //   this.getRestaurantData(this.props.id);
  // }

  getRestaurantData(id) {
    axios.get(`http://localhost:3003/api/restaurants/${id}/businessinfo`)
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


//* Attempts to wait for render until after initial data fetch */
// this.setStateAsync = (state) => {
//   return new Promise((resolve) => {
//     this.setState(state, resolve);
//   });
// }

// this.getData = async () => {
//   console.log('this is called inside of component did mount before data catch initiated');
//   const businessInfoData = await axios.get(`http://localhost:3003/api/restaurants/${this.props.restaurantId}/businessinfo`);
//   console.log('here is the data', businessInfoData.data);
//   await this.setStateAsync({ restaurant: businessInfoData.data });
//   // await this.setState({ restaurant: businessInfoData });
//   console.log('state has been set');
// };

// this.getData();
// }

// async componentWillMount() {
// console.log('this is called inside of component did mount before data catch initiated');
// const businessInfoData = await axios.get(`http://localhost:3003/api/restaurants/${this.props.restaurantId}/businessinfo`);
// console.log('here is the data', businessInfoData);
// await this.setStateAsync({ restaurant: businessInfoData });
// // await this.setState({ restaurant: businessInfoData });
// console.log('state has been set');
// }

// setStateAsync(state) {
// return new Promise((resolve) => {
//   this.setState(state, resolve);
// });
// }