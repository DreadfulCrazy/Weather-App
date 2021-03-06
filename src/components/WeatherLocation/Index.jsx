import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import transformWeather from '../../services/transformWeather';
import Location from './Location';
import getUrlWeatherBycity from '../../services/getUrlWeatherByCity'
import WeatherData from './WeatherData/Index';
import './styles.css';

class WeatherLocation extends Component {
    constructor(props) {
        super(props);
        const { city } = props;
        this.state = {
            city,
            data: null

        }
    }
    componentDidMount() {
        this.handleUpdateClick();
    }


    handleUpdateClick = () => {

        fetch(getUrlWeatherBycity(this.state.city))

            .then(resolve => {
                return resolve.json();
            })
            .then(data => {
                const newWeather = transformWeather(data);
                
                this.setState({
                    data: newWeather
                });

            })


    }

    render() {
        const { onWeatherLocationClick } = this.props;
        const { city, data } = this.state;
        return (

            <div className="weatherLocationCont" onClick={ onWeatherLocationClick }>
                <Location city={city} />
                {data ?
                    <WeatherData data={data} /> :
                    <CircularProgress size={50} />
                }
            </div>

        );
    }
}

WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func
}

export default WeatherLocation;