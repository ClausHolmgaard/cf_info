import styled from "styled-components";

const ConfigButton = styled.h1`
    &:hover {
        border: 2px solid grey;
        border-radius: 5px;
        cursor:pointer;
      }
      
    text-align: center;

    border-bottom: 1px solid grey;
    border-image-source: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 1) 80%);
    border-image-slice: 1;
`;

const DividerH = styled.div`
    width: ${(props) => props.width};
    height: auto;
    display: inline-block;
`;

const DividerV = styled.div`
    width: auto;
    height: ${(props) => props.height};
    display: inline-block;
`

const EditButton = styled.button`
    //width: 20%;
    border-radius: 12px;
    border: none;
    padding: 10px 10px;
    
`;

export {ConfigButton, DividerV, DividerH, EditButton};