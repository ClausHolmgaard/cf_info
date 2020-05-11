import React from 'react';
import styled from "styled-components";
import InfoPanel from "./InfoPanel";
import WorkoutPanel from "./WorkoutPanel";
import CoachPanel from "./CoachPanel";

/*
const FlexDiv = styled.div`
    display: flex;
`;


const LeftDiv = styled.div`
    flex: 1;
    //width: 50%;
    //height: 100vh;
    //float: left;
    //box-sizing: border-box;
    //border: 1px solid red;
`;

const RightDiv = styled.div`
    flex: 1;
    //width: 50%;
    //height: 100vh;
    //float: left;
    //box-sizing: border-box;
    //border: 1px solid blue;
`;

const RightTopDiv = styled.div`
    flex: 1;
    //height: 40%;
    //float: top;
    //box-sizing: border-box;
    //border: 1px solid green;
`;

const RightBottomDiv = styled.div`
    flex: 1;
    //height: 60%;
    //float: top;
    //box-sizing: border-box;
    //border: 1px solid yellow;
`;
*/

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
    //align-self: stretch;
    flex-direction: column;
    //align-items: stretch;
    //align-content: stretch;
    justify-content: space-between;
`;



function App() {
  return (
      /*
    <FlexDiv>
        <LeftDiv>
            <WorkoutPanel />
        </LeftDiv>

        <RightDiv>
            <RightTopDiv>
                <InfoPanel />
            </RightTopDiv>

            <RightBottomDiv>
                <CoachPanel />
            </RightBottomDiv>

        </RightDiv>


    </FlexDiv>
    */

    <Grid>
        <Col size={1}>
            <Row size={1}>
                <WorkoutPanel />
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
