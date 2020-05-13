import React from "react";
import styled from "styled-components";


const StyledText = styled.div`
    text-align: center;
    border: 1px solid blue;
    padding-top: ${(props) => props.paddingTop};
    padding-left: ${(props) => props.paddingLeft};
`;


const TextBlock = ({textArr, paddingTop, paddingLeft}) => {
    return (
        <StyledText paddingTop={paddingTop} paddingLeft={paddingLeft}>
            {textArr.map((text, i) => <div key={i}>{text}</div>)}
        </StyledText>
    )
}

export default TextBlock