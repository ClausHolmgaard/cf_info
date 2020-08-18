import styled from "styled-components";

const PanelDiv = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: ${(props) => props.justifyContent};
    //border: 1px solid yellow;
    height: 100%;
    width: 100%;
`;

export default PanelDiv