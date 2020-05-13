import React from "react";
import styled from "styled-components";
import TopText from "../TopText";
import TextBlock from "../TextBlock";
import PanelDiv from "./PanelDiv";

const TextDiv = styled.div`
    //position: relative;
    //top: 30%;
    //transform: translateY(-50%);
`;

const InfoText = [
    'First line of info text',
    'Second line of info text',
    'And another line',
    'Event more line!',
    ':O',
    'Event more line!',
    'Event more line!',
]


const InfoPanel = () => {
    return (
        <PanelDiv justifyContent={'space-between'}>
            <TopText text={'Info'} />
            <TextDiv>
                <TextBlock paddingTop={'100px'} textArr={InfoText}/>
            </TextDiv>
            <div></div>
        </PanelDiv>
    )
}

export default InfoPanel