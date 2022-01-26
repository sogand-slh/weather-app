import "./App.css";
import Weather from "./components/Weather";

function App() {
  var today = new Date();
  var isDay = today.getHours() > 18 ? 0 : 1;
  return (
    <div className="app">
      <Weather />
    </div>
  );
}

export default App;
