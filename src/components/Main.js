import React from 'react';
import { Grid, Col, Row, MainGrid, MainHeadline } from '../Helpers/FlexGrid'
import InfoPanel from "./Panels/InfoPanel";
import WorkoutPanel from "./Panels/WorkoutPanel";
import CoachPanel from "./Panels/CoachPanel";
import styled from "styled-components";
import {css} from "styled-components";

import antonFontURL from '../font/Anton-Regular.ttf';

export const fontFaces = css`
  @font-face {
    font-family: 'antonFont';
    src: url(${antonFontURL}) format('woff2');
    font-style: normal;
  }
`;

const LogoImg = styled.img`
    max-width: 15%;
`;

const LogoText = styled.h1`
    margin-top: auto;
    margin-bottom: auto;
`;

const logoUrl = process.env.PUBLIC_URL + '/cfh_logo.png';

const Main = ({workoutUrl, infoUrl, coachUrl, trackUrl, updateInterval, scrollInterval}) => {
    return (
        <MainGrid id={'MainGrid'}>
            <MainHeadline>
                <LogoImg src={logoUrl} />
                <LogoText>CROSSFIT HERNING</LogoText>
            </MainHeadline>
            <Grid>
                <Col size={1}>
                    <Row size={1} paddingTop={'10px'}>
                        <WorkoutPanel url={workoutUrl} trackUrl={trackUrl} update={updateInterval} scrollInterval={scrollInterval} />
                    </Row>
                </Col>
                <Col size={1}>
                    <Row size={1} paddingTop={'10px'}>
                        <InfoPanel url={infoUrl} update={updateInterval} scrollInterval={scrollInterval} />
                    </Row>
                    <Row size={1}>
                        <CoachPanel url={coachUrl} update={updateInterval} scrollInterval={scrollInterval} />
                    </Row>
                </Col>
            </Grid>
        </MainGrid>
    );
}

export default Main;