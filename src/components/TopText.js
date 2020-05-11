import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
    //align-self: stretch;
    background-color: #b1c2e6;
    //border: 1px solid blue;
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