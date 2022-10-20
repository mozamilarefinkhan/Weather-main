import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { GetWeatherDetails } from "../redux/Actions";
import { ToastContainer } from "react-toastify";



class Weather extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      searchInput: ""
    };
  }

  componentDidMount() {
    // const { GetWeatherDetails  } = this.props.action;
    // GetWeatherDetails();

  }
  handleSubmit = e => {
    e.preventDefault();
    const { searchInput } = this.state;
    const { GetWeatherDetails } = this.props.action;
    if (searchInput) GetWeatherDetails(this.state.searchInput);
    this.setState({ searchInput: "" });
  };
  handleOnChange = e => {
    this.setState({
      searchInput: e.target.value
    });
  };
  render() {
    const { data, success, city,loading ,error } = this.props.weatherData;
    const { searchInput } = city;
    console.log(data);

    return (
      <>
        <div className="container">
          <div className="heading">Weather Finder</div>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Search Weather by City"
              value={searchInput}
              onChange={e => this.handleOnChange(e)}
            />
            <button>Find</button>
          </form>
          <div className="helper-text">Type City Name and Hit Enter</div>
         { success && data && 
          <div className="info">
            <div className="sub-heading">
              Weather Forecast <div>on</div>
            </div>
            <div className="location">
              {success ? data.location.name : null}
              <small>({success ? data.location.country : null})</small>
            </div>
            <div className="forecast-info">
              <div className="forecast-icon">
                {success ? (
                  <img
                    src={data.current.weather_icons[0]}
                    alt=""
                  />
                ) : null}
              </div>
              <div className="forecast-value">
                <div className="degrees">
                  <span className="degrees-count">
                    {success ? data.current.temperature : null}
                  </span>
                  C
                </div>
                <span className="weather-condition">
                  {success ? data.current.weather_descriptions[0] : null}
                </span>
              </div>
            </div>
            <div className="additional-info">
              <ul className="list">
                <li>
                  <b>Pressure</b> {success ? data.current.pressure : null}
                </li>
                <li>
                  <b>Time</b> {success ? data.current.observation_time : null}
                </li>
                <li>
                  <b>Humidity</b> {success ? data.current.humidity : null}
                </li>
                <li>
                  <b>Wind Speed</b> {success ? data.current.wind_speed : null}
                </li>
              </ul>
            </div>
          </div>
          }
           { loading && <div> Loading... </div> }  
           { error && <div> Something Went Worng... or enter a valid input </div> }  
        </div>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  weatherData: state
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ GetWeatherDetails }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Weather);
