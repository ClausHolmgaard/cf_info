import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
    //align-self: stretch;
    //background-color: #b1c2e6;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    padding-top: ${(props) => props.paddingTop};
`;

const StyledText = styled.h1`
    text-align: center;
`;

const TopText = ({text, paddingTop}) => {
    return (
        <StyledHeader paddingTop={paddingTop}>
            <StyledText>{text}</StyledText>
        </StyledHeader>

    )
}

export default TopText