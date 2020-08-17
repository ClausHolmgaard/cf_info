import React, {useEffect, useState} from "react";
import styled from "styled-components";
import TopText from "../TopText";
import TextBlock from "../TextBlock";
import PanelDiv from "./PanelDiv";
import useInterval from "../../Helpers/UseInterval";

const TextDiv = styled.div`
    //position: relative;
    //top: 30%;
    //transform: translateY(-50%);
`;

const InfoPanel = (props) => {
    const [hasError, setErrors] = useState(false);
    const [infoJson, setInfoJson] = useState({});
    const [infoIndex, setInfoIndex] = useState(0);

    const getData = () => {
        fetch(`${props.url}`)
            .then(data => {
                //console.log(data);
                return data.json();
            })
            .then(json => {
                setInfoJson(json);
            })
            .catch(err => setErrors(err));
    }

    useEffect( () => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useInterval( () => {
        getData();

        //console.log(infoJson);
        if(infoJson === undefined) {
            return;
        }

        const numInfo = Object.keys(infoJson).length;
        //console.log(`Number of info's: ${numInfo}`);
        if(infoIndex === numInfo - 1) {
            setInfoIndex(0);
        } else {
            setInfoIndex(infoIndex + 1);
        }
        //console.log(`InfoIndex: ${infoIndex}`);
    }, parseInt(props.update, 10))

    const getLines = (index) => {
        if(infoJson[index] === undefined) {
            return ['No data'];
        }

        return infoJson[index]['Text'].split('\n')
    }

    // showError currently only used for debugging, ignoring warning
    // eslint-disable-next-line
    const showError = () => {
        if(hasError) {
            return <div>Error when getting data</div>
        } else {
            return;
        }
    }

    return (
        <PanelDiv justifyContent={'space-between'}>
            <TopText text={'Info'} />
            <TextDiv>
                <TextBlock textArr={getLines(infoIndex)} fontSize={'20px'}/>
            </TextDiv>
            <div></div>

        </PanelDiv>
    )
}

export default InfoPanel