import React from 'react';
import styled from "styled-components";
import InfoPanel from "./Panels/InfoPanel";
import WorkoutPanel from "./Panels/WorkoutPanel";
import CoachPanel from "./Panels/CoachPanel";

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
`;



function App() {
  return (
    <Grid>
        <Col size={1}>
            <Row size={1}>
                <WorkoutPanel url={'https://api.sugarwod.com/v2'}/>
            </Row>
        </Col>
        <Col size={1}>
            <Row size={1}>
                <InfoPanel />
            </Row>
            <Row size={1}>
                <CoachPanel />
            </Row>
        </Col>
    </Grid>

  );
}

export default App;
