import React from "react";
import styled from 'styled-components';

const StyledList = styled.ul`
    list-style: none;
    text-align: center;
    font-size: 40px;
    //flex: ${(props) => (props.flex ? 0 : 1)};
    //border: 1px solid red;
`;

const List = ({textArr}) => {
    return (
        <StyledList>
            {textArr.map(text => text ? <li>{text}</li> : <li>{'    '}</li> )}
        </StyledList>
    );
}

export default List