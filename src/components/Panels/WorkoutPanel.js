import React, {useState, useEffect} from "react";
import TopText from "../TopText";
import PanelDiv from "./PanelDiv";
import TextBlock from "../TextBlock";
import useInterval from "../../Helpers/UseInterval";
import isEmpty from "../../Helpers/Misc";
import {SubText, ContentDiv} from "../../Helpers/MyStyles";
import styled from "styled-components";

const Scroll = require('react-scroll');
const scroller = Scroll.scroller;

const REGEX_SPLIT = /\n-?/;

const WorkoutContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    height: 100%;
    justify-content: space-between;
    
    // disable visible scrollbar
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`;


const WorkoutPanel = (props) => {
    const [hasError, setErrors] = useState(false);
    const [workoutJson, setWorkoutJson] = useState({});
    const [trackJson, setTrackJson] = useState({});
    const [trackIndex, setTrackIndex] = useState(0);
    const [validTracks, setValidTracks] = useState([]);
    const [title, setTitle] = useState('');
    const [currentScroll, setCurrentScroll] = useState(0);

    const getData = () => {
        const currentTime = new Date();
        const year = currentTime.getFullYear();
        const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
        const day = currentTime.getDate().toString().padStart(2, '0');
        const currentTimeString = `${year}${month}${day}`;

        //console.log(`Current time: ${currentTimeString}`);

        const workoutUrl = new URL(`${props.url}`);
        workoutUrl.searchParams.append('dates', currentTimeString);
        //workoutUrl.searchParams.append('track_id', 'NR6EwZlfwy');

        const trackUrl = new URL(`${props.trackUrl}`);
        trackUrl.searchParams.append('dates', currentTimeString);

        fetch(trackUrl.toString())
            .then(data => {
                //console.log(data);
                return data.json();
            })
            .then(json => {
                setTrackJson(json['data']);
            })
            .catch(err => setErrors(err));

        fetch(workoutUrl.toString())
            .then(data => {
                //console.log(data);
                return data.json();
            })
            .then(json => {
                setWorkoutJson(json);
            })
            .catch(err => setErrors(err));

        //console.log(`track: ${JSON.stringify(trackJson)}`)
        //return Promise.all([f1, f2]);
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        updateIndex();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workoutJson])

    useEffect(() => {
        const newTitle = getTitle(trackIndex);
        setTitle(newTitle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validTracks])

    useInterval( () => {
        getData();
    }, parseInt(props.update, 10))

    useInterval(() => {
        const workoutPanelHeight =  document.getElementById('WorkoutPanel').clientHeight;
        const workoutContentHeight = document.getElementById('WorkoutContent').clientHeight;

        const difference = workoutContentHeight - workoutPanelHeight - currentScroll;

        if(difference > 0) {
            const scrollDistance = difference > workoutPanelHeight ? workoutPanelHeight : difference;
            scroller.scrollTo('WorkoutPanel', {
                duration: 1500,
                delay: 100,
                smooth: true,
                containerId: 'WorkoutPanel',
                offset: scrollDistance
            })
            setCurrentScroll(currentScroll + workoutPanelHeight);
        } else {
            scroller.scrollTo('WorkoutPanel', {
                duration: 1500,
                delay: 100,
                smooth: true,
                containerId: 'WorkoutPanel',
                offset: 0, // Scrolls to element + 50 pixels down the page
            })
            setCurrentScroll(0);
        }

    }, parseInt(props.scrollInterval, 10))

    const updateIndex = () => {
        if(!isEmpty(workoutJson)){
            const workoutTracks = workoutJson.data.map(w => w.attributes.track.id);
            const uniqueWorkoutTracks = [...new Set(workoutTracks)];
            setValidTracks(uniqueWorkoutTracks);

            const numTracks = uniqueWorkoutTracks.length;

            if(trackIndex === numTracks - 1) {
                setTrackIndex(0);
            } else {
                setTrackIndex(trackIndex + 1);
            }
        }
    }

    const getTitle = (index) => {
        if(validTracks.length > 0 && !isEmpty(trackJson)) {
            const title = getTitleFromTrack(validTracks[index])[0];
            return title;
        } else {
            return ' ';
        }
    }

    const getTitleFromTrack = (trackId) => {
        //console.log(trackJson);
        const title = trackJson.map(t => {
            if(t.id === trackId) {
                return t.attributes.name;
            }
            return undefined;
        }).filter(w => w !== undefined);
        return title;
    }

    const getTrackWorkouts = (index) => {

        if(workoutJson.data === undefined) {
            return [''];
        }
        if(trackJson === undefined || trackJson[index] === undefined) {
            return [''];
        }
        if(!validTracks.length > 0) {
            return [''];
        }

        const workouts = getAllWorkoutWÍnTrack(index)
        //console.log(workouts)
        return workouts
        //return workoutJson.data[index].attributes.description.split(REGEX_SPLIT);
    }

    const getAllWorkoutWÍnTrack = (index) => {
        const thisTrack = validTracks[index];
        const trackWorkouts = workoutJson.data.map(w => {
            if(w.attributes.track.id === thisTrack) {
                return w;
            }
            return '';
        }).filter(t => t !== undefined);

        return trackWorkouts;
    }

    /*
    const getScoreType = (index) => {
        if(workoutJson.data === undefined) {
            return ['No data'];
        }
        return workoutJson.data[index].attributes.score_type.split('\n');
    }
    */

    // showError currently only used for debugging, ignoring warning
    // eslint-disable-next-line
    const showError = () => {
        if(hasError) {
            return <div>Error when getting data</div>
        } else {
            return;
        }
    }

    const getDescription = (workoutJson) => {
        return workoutJson['attributes'] === undefined ? [''] : workoutJson['attributes']['description'].split(REGEX_SPLIT)
    }

    const workoutTextAndTitle = (index) => {

        const workoutBlock = getTrackWorkouts(index).filter(x => x['attributes'] !== undefined).map((t, index) =>
            <div key={index}>
                <SubText>{t['attributes'] === undefined ? '' : t['attributes']['title']}</SubText>
                <TextBlock textArr={getDescription(t)} fontSize={'20px'} textAlign={'center'}></TextBlock>
            </div>
        )

        /*
        // Need to move the text up a bit, if theres only one entry
        // TODO: is there a better way to do this in the layout?
        if(workoutBlock.length === 1) {
            return <ContentDiv id={'WorkoutContent'}>{workoutBlock.concat(<div key={-1}></div>)}</ContentDiv>;
        } else {
            return <ContentDiv id={'WorkoutContent'}>{workoutBlock}</ContentDiv>;
        }
        */
        return <ContentDiv justifyContent={'space-around'} id={'WorkoutContent'}>{workoutBlock}</ContentDiv>
    }

    return (
        <PanelDiv justifyContent={'space-between'}>

            {/*<TopText text={getTitle(trackIndex)}/>*/}
            <TopText id={'WorkoutTitle'} text={title}></TopText>
            {/*<TextBlock textArr={getDescription(trackIndex)} fontSize={'20px'}/>*/}

            <WorkoutContentDiv id={'WorkoutPanel'}>
                {workoutTextAndTitle(trackIndex)}
            </WorkoutContentDiv>
            {/*<TextBlock textArr={getScoreType(workoutIndex)} />*/}

        </PanelDiv>

    )
}

export default WorkoutPanel