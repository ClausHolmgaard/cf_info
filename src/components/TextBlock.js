import React from "react";
import styled from "styled-components";


const StyledText = styled.div`
    text-align: center;
    padding-top: ${(props) => props.paddingTop};
    padding-left: ${(props) => props.paddingLeft};
    font-size: ${(props) => props.fontSize};
    //border: 1px solid blue;
`;


const TextBlock = ({textArr, paddingTop, paddingLeft, fontSize}) => {
    return (
        <StyledText paddingTop={paddingTop} paddingLeft={paddingLeft} fontSize={fontSize}>
            {textArr.map((text, i) => <div key={i}>{text}</div>)}
        </StyledText>
    )
}

export default TextBlock