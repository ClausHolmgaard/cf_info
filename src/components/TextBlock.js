import React from "react";
import styled from "styled-components";


const StyledText = styled.div`
    text-align: center;
    padding-top: ${(props) => props.paddingTop};
    padding-left: ${(props) => props.paddingLeft};
    font-size: ${(props) => props.fontSize};
    //border: 1px solid blue;
`;

const LineDiv = styled.div`
    white-space: pre-wrap;
`;

const TextBlock = ({textArr, paddingTop, paddingLeft, fontSize}) => {

    return (
        <StyledText paddingTop={paddingTop} paddingLeft={paddingLeft} fontSize={fontSize}>
            {textArr.map((text, i) => <LineDiv key={i}>{text == "" ? ' ' : text}</LineDiv>)}
        </StyledText>
    )
}

export default TextBlock