import React from 'react';
import styled from "styled-components";
import InfoPanel from "./Panels/InfoPanel";
import WorkoutPanel from "./Panels/WorkoutPanel";
import CoachPanel from "./Panels/CoachPanel";

const workoutUrl = 'http://localhost:3300/workouts';
const infoUrl = 'http://localhost:3300/info';
const coachUrl = 'http://localhost:3300/coaches';
const updateInterval =  5 * 1000;  // in ms

const Grid = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: stretch;
    flex-direction: row;
`;

const Col = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    flex: ${(props) => props.size};
`;

const Row = styled.div`
    display: flex;
    flex: ${(props) => props.size};
    flex-direction: column;
    justify-content: space-between;
    padding-top: ${(props) => props.paddingTop};
`;

function App() {
  return (
    <Grid>
        <Col size={1}>
            <Row size={1}>
                <WorkoutPanel url={workoutUrl} update={updateInterval} />
            </Row>
        </Col>
        <Col size={1}>
            <Row size={1} paddingTop={'10px'}>
                <InfoPanel url={infoUrl} update={updateInterval} />
            </Row>
            <Row size={1}>
                <CoachPanel url={coachUrl} update={updateInterval} />
            </Row>
        </Col>
    </Grid>

  );
}

export default App;
