import React from 'react'
import './App.css';
import './assets/css/custom.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Container from './Container'
import Doors from './components/Door'
import Trial from './components/Trial'
import 'bootstrap/dist/css/bootstrap.css'
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route
                path="/"
                element={ <Container /> }
              />        
              
              <Route
                  path="/doors"
                  element={ <Doors /> }
                />    

                <Route
                  path="/trial"
                  element={ <Trial /> }
                />         
          </Routes>
        </Router>
    </div>
  );
}

export default App;
