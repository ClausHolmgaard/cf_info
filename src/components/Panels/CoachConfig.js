import React, {useEffect, useState} from "react";
import {ChildGrid, Col} from "../../Helpers/FlexGrid";
import {ConfigButton, DividerV, EditButton, ContentDiv, DividerH} from "../../Helpers/MyStyles";

const CoachConfig = ({coachUrl}) => {
    const [json, setJson] = useState(0);
    const [hasError, setErrors] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editValue, setEditValue] = useState('');
    const [reFetch, setReFetch] = useState(false);
    const [showCoach, setShowCoach] = useState(true);

    const setIndex = (index) => {
        setCurrentIndex(index);
        setEditValue(getLines(index));
        setShowCoach(json[index]['data']['Show']);
    }

    const getData = (url) => {
        fetch(`${url}`)
            .then(data => {
                return data.json();
            })
            .then(json => {
                //console.log(json)
                setJson(json);
            })
            .catch(err => {
                console.log(`Error when getting info data: ${err}`);
                setErrors(err);
            });
    }

    useEffect( () => {
        getData(coachUrl);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reFetch])

    const handleChange = (event) => {
        setEditValue(event.target.value);
    };

    const getLines = (index) => {
        if(index === undefined) {
            return[''];
        }
        if(json[index] === undefined) {
            return ['No data'];
        }
        //console.log(json)
        return json[index]['data']['Text']
    }

    const updatePost = () => {
        const url = new URL(coachUrl);

        if(currentIndex !== undefined) {
            url.searchParams.append('id', json[currentIndex]['id']);
        }
        const postBody = {Text: editValue,
                          Show: showCoach};
        // TODO: DoShow: showCoach
        // Implement in backend

        fetch(url.toString(), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: currentIndex === undefined ? 'post' : 'put',
            body: JSON.stringify(postBody)
        }).then(() => {
            console.log(`Updated post`);
            setReFetch(!reFetch);
        })
        // Todo: Handle post errors
    }

    const showError = () => {
        if(hasError) {
            return <div>Error when getting data</div>
        }
    }

    const showEditArea = () => {
        if(currentIndex === 0) {
            return <div></div>
        }
        return (
            <ContentDiv>
                <h1>
                    {`${json[currentIndex]['attributes']['first_name']} ${json[currentIndex]['attributes']['last_name']}`}
                    <DividerH width={'10px'}></DividerH>
                    <input
                        name="doShow"
                        type="checkbox"
                        cssclass="e-success"
                        checked={showCoach}
                        onChange={handleShowChange} />
                </h1>
                <textarea name="Text1" rows="20" value={editValue} onChange={handleChange} />
                <DividerV height={'5px'}/>
                <div>
                    <EditButton onClick={updatePost}>Save</EditButton>
                </div>
            </ContentDiv>
            );
    }

    const handleShowChange = (event) => {
        setShowCoach(event.target.checked);
    }

    return (
        <ChildGrid>
            <Col size={2}>
                {Object.keys(json).map(i =>
                    <ConfigButton key={i} onClick={() => setIndex(i)}>
                        {`${json[i]['attributes']['first_name']} ${json[i]['attributes']['last_name']}`}
                    </ConfigButton>)}
            </Col>
            <Col size={4}>
                {showEditArea()}
            </Col>
            {showError()}
        </ChildGrid>
    )
}

export default CoachConfig;