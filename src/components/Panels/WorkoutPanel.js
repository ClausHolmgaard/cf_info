import React, {useState, useEffect} from "react";
import List from "../List";
import TopText from "../TopText";
import PanelDiv from "./PanelDiv";



const WorkoutPanel = (props) => {
    const [hasError, setErrors] = useState(false);
    const [planets, setPlanets] = useState({});

    async function fetchData() {
        fetch(props.url, {
            headers: {

            }
        })
            .then(data => data.json())
            .then(json => setPlanets(json))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
        console.log(`Planets: ${JSON.stringify(planets)}`)
    }, [planets]);

    return (
        <PanelDiv justifyContent={'space-between'}>
            <TopText text={'Workout'}/>
            <List />
            <div></div>

            <span>{JSON.stringify(planets)}</span>
            <span>Has error: {JSON.stringify(hasError)}</span>
        </PanelDiv>
    )
}

export default WorkoutPanel