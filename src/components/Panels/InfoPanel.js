import React, {useEffect, useState} from "react";
import TopText from "../TopText";
import TextBlock from "../TextBlock";
import PanelDiv from "./PanelDiv";
import useInterval from "../../Helpers/UseInterval";
import {TextDiv} from "../../Helpers/MyStyles";

const Scroll = require('react-scroll');
const scroller = Scroll.scroller;

const InfoPanel = (props) => {
    const [hasError, setErrors] = useState(false);
    const [infoJson, setInfoJson] = useState({});
    const [infoIndex, setInfoIndex] = useState(0);
    const [currentScroll, setCurrentScroll] = useState(0);

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

    useInterval(() => {
        const infoPanelHeight =  document.getElementById('InfoPanel').clientHeight;
        const infoContentHeight = document.getElementById('InfoContent').clientHeight;

        const difference = infoContentHeight - infoPanelHeight - currentScroll;

        //console.log(`infoPanelHeight: ${infoPanelHeight}`);
        //console.log(`infoContentHeight: ${infoContentHeight}`);
        //console.log(`difference: ${difference}`);

        if(difference > 0) {
            const scrollDistance = difference > infoPanelHeight ? infoPanelHeight : difference;
            scroller.scrollTo('InfoPanel', {
                duration: 1500,
                delay: 100,
                smooth: true,
                containerId: 'InfoPanel',
                offset: scrollDistance
            })
            setCurrentScroll(currentScroll + infoPanelHeight);
        } else {
            scroller.scrollTo('InfoPanel', {
                duration: 1500,
                delay: 100,
                smooth: true,
                containerId: 'InfoPanel',
                offset: 0, // Scrolls to element + 50 pixels down the page
            })
            setCurrentScroll(0);
        }

    }, parseInt(props.scrollInterval, 10))

    const getLines = (index) => {
        if(infoJson[index] === undefined) {
            return [''];
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
            <TextDiv id={'InfoPanel'}>
                <TextBlock textArr={getLines(infoIndex)} fontSize={'20px'} id={'InfoContent'}/>
            </TextDiv>
            <div></div>

        </PanelDiv>
    )
}

export default InfoPanel