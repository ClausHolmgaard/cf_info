import React, {useEffect, useState} from "react";
import styled from "styled-components";
import TextBlock from "../TextBlock";
import TopText from "../TopText";
import PanelDiv from "./PanelDiv";
import useInterval from "../../Helpers/UseInterval";
import isEmpty from "../../Helpers/Misc"

const CoachImgDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    //flex-wrap: nowrap;
    //align-items: stretch;
    justify-content: space-between;
    //border: 1px solid red;
`;

const CoachImg = styled.img`
    //position: absolute;
    //z-index: -1;
    float: left;
    //bottom: 5px;
    left: 5px;
    //max-height: 20%;
    max-width: 20%;
    object-fit: contain;
    align-self: flex-start;
    padding-top: 10px;
    //border: 1px solid blue;
`;

const imageUrl = process.env.PUBLIC_URL + '/stick_face.jpg';

const CoachPanel = (props) => {
    const [hasError, setErrors] = useState(false);
    const [coachJson, setCoachJson] = useState({});
    const [coachIndex, setCoachIndex] = useState(0);

    const getData = () => {
        fetch(`${props.url}`)
            .then(data => {
                //console.log(data);
                return data.json();
            })
            .then(json => {
                setCoachJson(json);
            })
            .catch(err => setErrors(err));
    }

    useEffect( () => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useInterval( () => {
        getData();

        if(coachJson === undefined) {
            return;
        }

        const numCoaches = Object.keys(coachJson).length;
        //console.log(`Number of coahces: ${numCoaches}`);
        if(coachIndex === numCoaches - 1) {
            setCoachIndex(0);
        } else {
            setCoachIndex(coachIndex + 1);
        }
        //console.log(`WorkoutIndex: ${coachIndex}`);
    }, parseInt(props.update, 10))

    const getImage = (index) => {
        if(coachJson === undefined || isEmpty(coachJson)) {
            return;
        }

        const url = coachJson[index].attributes['profile_image_url'];
        if(url === null) {
            return imageUrl;
        } else {
            return url;
        }
    }

    const getName = (index) => {
        //console.log(coachJson);
        if(coachJson === undefined || isEmpty(coachJson)) {
            return [''];
        }

        try{
            const firstName = coachJson[index].attributes['first_name'];
            const lastName = coachJson[index].attributes['last_name'];

            return `${firstName ? firstName : 'XXX'} ${lastName ? lastName : 'XXX'}`;
        } catch (err) {
            return '';
        }

    }

    const getLines = (index) => {
        if(coachJson[index] === undefined) {
            return ['No data'];
        }

        return coachJson[index]['Text'].split('\n')
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
        <PanelDiv>
            <TopText text={getName(coachIndex)} />

            <CoachImgDiv>
                <CoachImg src={getImage(coachIndex)} />
                <TextBlock textArr={getLines(coachIndex)} paddingTop={'10px'} fontSize={'20px'}/>
                <div />
                <div />
            </CoachImgDiv>

        </PanelDiv>
    )
}

export default CoachPanel