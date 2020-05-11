import React from "react";
import styled from 'styled-components';

const StyledList = styled.ul`
    list-style: none;
    text-align: center;
    //position: relative;
    //top: 30%;
    //transform: translateY(-50%);
`;

const List = () => {
    return (
        <StyledList>
            <li>Item 1</li>
            <li>An item with a longer text, which is this item...</li>
            <li>Item 2</li>
        </StyledList>
    );
}

export default List