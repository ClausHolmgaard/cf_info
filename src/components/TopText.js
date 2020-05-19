import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
    //align-self: stretch;
    //background-color: #b1c2e6;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
`;

const StyledText = styled.h1`
    text-align: center;
`;

const TopText = ({text}) => {
    return (
        <StyledHeader>
            <StyledText>{text}</StyledText>
        </StyledHeader>

    )
}

export default TopText