import React, {useEffect, useState} from "react";
import {ChildGrid, Col, Row} from '../../Helpers/FlexGrid'
import {ConfigButton, ContentDiv, DividerH, DividerV, EditButton} from "../../Helpers/MyStyles";
import styled from "styled-components";

const EditButtonRight = styled(EditButton)`
    position: absolute;
    right: 0;
`;

const InfoConfig = ({infoUrl}) => {
    const [json, setJson] = useState(0);
    const [hasError, setErrors] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [editValue, setEditValue] = useState('');
    const [reFetch, setReFetch] = useState(false);

    const setIndex = (index) => {
        setCurrentIndex(index);
        setEditValue(getLines(index));
    }

    const getData = (url) => {
        fetch(`${url}`)
            .then(data => {
                return data.json();
            })
            .then(json => {
                setJson(json);
            })
            .catch(err => {
                console.log(`Error when getting info data: ${err}`);
                setErrors(err);
            });
    }

    useEffect( () => {
        getData(infoUrl);
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

        return json[index]['Text']
    }

    const showError = () => {
        if(hasError) {
            return <div>Error when getting data</div>
        }
    }

    const updatePost = () => {
        const url = new URL(infoUrl);

        if(currentIndex !== undefined) {
            url.searchParams.append('id', json[currentIndex]['id']);
        }
        const postBody = {Text: editValue};

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

    const deletePost = () => {
        const url = new URL(infoUrl);
        url.searchParams.append('id', json[currentIndex]['id']);

        fetch(url.toString(), {
            method: 'delete',
        }).then(() => {
            console.log(`Deleted post`);
            setReFetch(!reFetch);
        })
        // Todo: Handle delete errors
    }

    const showEditButtonRight = () => {
        if(currentIndex !== undefined) {
            return <EditButtonRight onClick={deletePost}>Delete</EditButtonRight>
        }
    }

    const showEditArea = () => {
        if(currentIndex === 0) {
            return <div></div>
        }
        return (
            <ContentDiv>
                <h1>{`Editing info message ${currentIndex}`}</h1>
                <textarea name="Text1" rows="20" value={editValue} onChange={handleChange} />
                <DividerV height={'5px'}/>
                <div>
                    <EditButton onClick={updatePost}>Save</EditButton>
                    {showEditButtonRight()}
                </div>
            </ContentDiv>
        );
    }

    return (
        <ChildGrid>
            <Col size={1}>
                {Object.keys(json).map(i => <ConfigButton key={i} onClick={() => setIndex(i)}>{i}</ConfigButton>)}
                <ConfigButton onClick={() => setIndex(undefined)}>New</ConfigButton>
            </Col>
            <Col size={4}>
                {showEditArea()}
            </Col>

        </ChildGrid>

    )
}

export default InfoConfig;