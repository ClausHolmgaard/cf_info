import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main'
import Config from './Config'

const workoutUrl = 'http://localhost:3300/workouts';
const infoUrl = 'http://localhost:3300/info';
const coachUrl = 'http://localhost:3300/coaches';
const trackUrl = 'http://localhost:3300/tracks';
const updateInterval =  30 * 1000;  // in ms

function App() {
  return (
      <div className="App">
          <Switch>
              <Route
                  exact path='/'
                  render = {(props) => (
                      <Main {...props}
                            workoutUrl={workoutUrl}
                            infoUrl={infoUrl}
                            coachUrl={coachUrl}
                            trackUrl={trackUrl}
                            updateInterval={updateInterval}
                      />
                  )}

              />
              <Route
                  exact path='/Config'
                  render = {(props) => (
                      <Config
                          {...props}
                          infoUrl={infoUrl}
                          coachUrl={coachUrl}
                      />
                  )}

              />
          </Switch>
      </div>
  );
}

export default App;
