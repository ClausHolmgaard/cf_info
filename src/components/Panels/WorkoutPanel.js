import React, {useState, useEffect} from "react";
import TopText from "../TopText";
import PanelDiv from "./PanelDiv";
import TextBlock from "../TextBlock";
import useInterval from "../../Helpers/UseInterval";

const REGEX_SPLIT = /\n-?/;

const WorkoutPanel = (props) => {
    const [hasError, setErrors] = useState(false);
    const [workoutJson, setWorkoutJson] = useState({});
    const [workoutIndex, setWorkoutIndex] = useState(0);

    const getData = () => {
        const currentTime = new Date();
        const year = currentTime.getFullYear();
        const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
        const day = currentTime.getDate().toString().padStart(2, '0');
        const currentTimeString = `${year}${month}${day}`;

        //console.log(`Current time: ${currentTimeString}`);

        const workoutUrl = new URL(`${props.url}`);
        workoutUrl.searchParams.append('dates', currentTimeString);
        workoutUrl.searchParams.append('track_id', 'NR6EwZlfwy');
        //console.log(workoutUrl.toString());

        fetch(workoutUrl.toString())
            .then(data => {
                //console.log(data);
                return data.json();
            })
            .then(json => {
                setWorkoutJson(json);
            })
            .catch(err => setErrors(err));

        //console.log(`Workout: ${JSON.stringify(workoutJson)}`)
    }

    useEffect( () => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useInterval( () => {
        getData();

        if(workoutJson.data === undefined) {
            return;
        }

        const numWorkouts = Object.keys(workoutJson.data).length;
        if(workoutIndex === numWorkouts - 1) {
            setWorkoutIndex(0);
        } else {
            setWorkoutIndex(workoutIndex + 1);
        }
        //console.log(`WorkoutIndex: ${workoutIndex}`);
    }, parseInt(props.update, 10))

    const getTitle = (index) => {
        if(workoutJson.data === undefined) {
            return 'No data';
        }
        return workoutJson.data[index].attributes.title;
    }

    const getDescription = (index) => {
        if(workoutJson.data === undefined) {
            return ['No data'];
        }

        return workoutJson.data[index].attributes.description.split(REGEX_SPLIT);
    }

    const getScoreType = (index) => {
        if(workoutJson.data === undefined) {
            return ['No data'];
        }
        return workoutJson.data[index].attributes.score_type.split('\n');
    }

    const showError = () => {
        if(hasError) {
            return <div>Error when getting data</div>
        } else {
            return;
        }
    }

    return (
        <PanelDiv justifyContent={'space-evenly'}>
            <TopText text={getTitle(workoutIndex)}/>
            <TextBlock textArr={getDescription(workoutIndex)} fontSize={'30px'}/>

            <TextBlock textArr={getScoreType(workoutIndex)} />

            {showError()}
        </PanelDiv>
    )
}

export default WorkoutPanel