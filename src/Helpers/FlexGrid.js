import styled from "styled-components";

const MainHeadline = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: row;
    align-self: center;
    font-family: antonFont;
`;

const MainGrid = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: stretch;
    flex-direction: column;
`;

const Grid = styled.div`
    display: flex;
    //height: 100vh;
    //width: 100vw;
    height: 100%;
    width: 100%;
    align-items: stretch;
    flex-direction: row;
`;

const ChildGrid = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    align-items: stretch;
    flex-direction: row;
`;

const Col = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    flex: ${(props) => props.size};
`;

const Row = styled.div`
    display: flex;
    flex: ${(props) => props.size};
    flex-direction: column;
    justify-content: space-between;
    padding-top: ${(props) => props.paddingTop};
`;

export {Grid, ChildGrid, Col, Row, MainGrid, MainHeadline};