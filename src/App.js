import s from './App.module.css';
import WeatherWindow from "./components/WeatherWindow/WeatherWindow";

function App() {
  return (
    <div className={s.app}>
        <WeatherWindow/>
    </div>
  );
}

export default App;
