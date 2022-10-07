import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Edit from './components/Edit';

function App() {
  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path='/home' element={<Home />}  />
          <Route path=':id' element={<Edit />}  />

        </Routes>

        
      </Router>

    </div>
  );
}

export default App;
