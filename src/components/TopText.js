import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
    //align-self: stretch;
    //background-color: #b1c2e6;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    border-image-source: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 90%);
    border-image-slice: 1;
    padding-top: ${(props) => props.paddingTop};
    font-family: antonFont;
`;

const StyledText = styled.h1`
    text-align: center;
`;

const TopText = ({text, paddingTop, id}) => {
    return (
        <StyledHeader paddingTop={paddingTop} id={id}>
            <StyledText>{text}</StyledText>
        </StyledHeader>

    )
}

export default TopText