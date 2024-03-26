import './App.css';
import AllRoute from './routes/Route';
import RouteChangeListener from './routes/RouteChangeListener';

function App() {
  return (
    <div className="">
      <RouteChangeListener />
      <AllRoute />
    </div>
  );
}

export default App;
