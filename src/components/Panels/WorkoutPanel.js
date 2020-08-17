import React, {useState, useEffect} from "react";
import TopText from "../TopText";
import PanelDiv from "./PanelDiv";
import TextBlock from "../TextBlock";
import useInterval from "../../Helpers/UseInterval";
import isEmpty from "../../Helpers/Misc";
import {SubText} from "../../Helpers/MyStyles";

const REGEX_SPLIT = /\n-?/;

const WorkoutPanel = (props) => {
    const [hasError, setErrors] = useState(false);
    const [workoutJson, setWorkoutJson] = useState({});
    const [trackJson, setTrackJson] = useState({});
    const [trackIndex, setTrackIndex] = useState(0);
    const [validTracks, setValidTracks] = useState([]);
    const [title, setTitle] = useState('');

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
        //getData().then(() => updateIndex());
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useInterval( () => {
        //getData().then(() => updateIndex());
        getData();


        // Find all tracks in todays workouts

        //console.log('valid tracks: ' + validTracks);
        //console.log('current index: ' + trackIndex);

        /*
        const numTracks = Object.keys(trackJson.data).length;

        if(trackIndex === numTracks - 1) {
            setTrackIndex(0);
        } else {
            setTrackJson(trackIndex + 1);
        }
        */
        //console.log(`WorkoutIndex: ${workoutIndex}`);
    }, parseInt(props.update, 10))

    useEffect(() => {
        updateIndex();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workoutJson])

    useEffect(() => {
        const newTitle = getTitle(trackIndex);
        setTitle(newTitle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validTracks])

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
        //getTrackWorkouts(index);

        /*
        return getTrackWorkouts(index).map((t, index) =>
            <div key={index}>
                <SubText>{t['attributes'] === undefined ? '' : t['attributes']['title']}</SubText>
                <TextBlock textArr={getDescription(t)}></TextBlock>
            </div>
        )
        */

        const workoutBlock = getTrackWorkouts(index).filter(x => x['attributes'] !== undefined).map((t, index) =>
            <div key={index}>
                <SubText>{t['attributes'] === undefined ? '' : t['attributes']['title']}</SubText>
                <TextBlock textArr={getDescription(t)} fontSize={'20px'}></TextBlock>
            </div>
        )

        // Need to move the text up a bit, if theres only one entry
        // TODO: is there a better way to do this in the layout?
        if(workoutBlock.length === 1) {
            return workoutBlock.concat(<div key={-1}></div>);
        } else {
            return workoutBlock;
        }
    }

    return (
        <PanelDiv justifyContent={'space-between'}>
            {/*<TopText text={getTitle(trackIndex)}/>*/}
            <TopText text={title}></TopText>
            {/*<TextBlock textArr={getDescription(trackIndex)} fontSize={'20px'}/>*/}

            {workoutTextAndTitle(trackIndex)}

            {/*<TextBlock textArr={getScoreType(workoutIndex)} />*/}
            <div></div>

        </PanelDiv>

    )
}

export default WorkoutPanel