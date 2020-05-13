import React from "react";
import styled from 'styled-components';

const StyledList = styled.ul`
    list-style: none;
    text-align: center;
    //flex: ${(props) => (props.flex ? 0 : 1)};
    border: 1px solid red;
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