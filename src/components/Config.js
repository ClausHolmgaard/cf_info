import React, {useState} from 'react';
import { Grid, Col } from '../Helpers/FlexGrid'
import { ConfigButton } from "../Helpers/MyStyles";

import MainConfig from "./Panels/MainConfig";
import InfoConfig from "./Panels/InfoConfig";
import CoachConfig from "./Panels/CoachConfig";

const Config = ({infoUrl, coachUrl}) => {
    const [configPane, setConfigPane] = useState(MainConfig);

    const InfoConfigWithUrl = () => {
        return (
            <InfoConfig infoUrl={infoUrl} />
        )
    }

    const CoachConfigWithUrl = () => {
        return (
            <CoachConfig coachUrl={coachUrl} />
        )
    }

    return (
            <Grid>
                <Col size={1}>
                    {/*<ConfigButton onClick={() => setConfigPane(MainConfig)}>Main</ConfigButton>*/}
                    <ConfigButton onClick={() => setConfigPane(InfoConfigWithUrl)}>Info</ConfigButton>
                    <ConfigButton onClick={() => setConfigPane(CoachConfigWithUrl)}>Coaches</ConfigButton>
                </Col>
                <Col size={4}>
                    {configPane}
                </Col>
            </Grid>
    )
}

export default Config;