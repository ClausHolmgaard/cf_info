import React from "react";
import styled from "styled-components";


const StyledText = styled.div`
    text-align: center;
    align-self: center;
    height: 100%;
    //vertical-align: middle;
    //position: relative;
    //top: 50%;
    //transform: translateY(-50%);
    //border: 1px solid red;
`;


const TextBlock = ({textArr}) => {
    return (
        <StyledText>
            {textArr.map((text, i) => <div key={i}>{text}</div>)}
        </StyledText>
    )
}

export default TextBlock