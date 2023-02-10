import "./App.css";
import { Map } from "./Components/Map";
import DetailsCordinate from "./Components/DetailsCordinate";

function App() {
  return (
    <div className="d-flex">
      <Map />
      <DetailsCordinate />
    </div>
  );
}

export default App;
