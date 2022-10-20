import logo from './logo.svg';
import './App.css';
import Weather from "./component/Weather";
import { Provider } from "react-redux";
import WeatherStore from "./redux/Store";
function App() {
  return (
    <Provider store={WeatherStore}>
      <div className="App">
        <Weather />
      </div>
    </Provider>
  );
}

export default App;
