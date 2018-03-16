import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export var MapContainer = (props) => (
  <div className="sidebar-map-container">
    <Map google={props.google} zoom={16}
      initialCenter={{lat: props.lat, lng: props.lng}}
      style={{
        height: '320px',
        width: '280px'
       }} >
      <Marker position={{lat: props.lat, lng: props.lng}}
        icon="http://res.cloudinary.com/madlicorice/image/upload/v1520470825/map_icon_small.png"
      />
    </Map>
  </div>
);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZeaxvjPuMA8T8pyjr7Fkld8zLYgtn8Mo'
})(MapContainer);
