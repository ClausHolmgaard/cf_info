import React from "react";
import styled from "styled-components";
import TopText from "./TopText";
import TextBlock from "./TextBlock";

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
        <>
            <TopText text={'Info'} />
            <TextDiv>
                <TextBlock textArr={InfoText}/>
            </TextDiv>
            <div></div>
        </>
    )
}

export default InfoPanel