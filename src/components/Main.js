import React from 'react';
import { Grid, Col, Row } from '../Helpers/FlexGrid'
import InfoPanel from "./Panels/InfoPanel";
import WorkoutPanel from "./Panels/WorkoutPanel";
import CoachPanel from "./Panels/CoachPanel";

const Main = ({workoutUrl, infoUrl, coachUrl, updateInterval}) => {
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

export default Main;