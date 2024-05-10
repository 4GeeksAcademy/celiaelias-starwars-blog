import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const PersonCard = ({ person }) => {
    const { actions, store } = useContext(Context);

    const [personDetails, setPersonDetails] = useState({});

    const handleAddToFavorites = () => {
        const item = person;
        actions.addToFavorites(item);
    };

    useEffect(() => {
        const fetchPersonDetails = async () => {
            try {
                const response = await fetch(person.url);
                const data = await response.json();
                setPersonDetails(data.result);

            } catch (error) {
                console.error("Error fetching person details:", error);
            }
        };

        fetchPersonDetails();
    }, [person.url]);

    const personUid = store.people.find(p => p.name === person.name)?.uid;

    return (
        <Card style={{ width: '18rem' }} className='ms-4 mt-4 mb-4'>
            <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/characters/${personUid}.jpg`} />
            <Card.Body>
                <Card.Title>{person.name}</Card.Title>
                <Card.Text>
                    Gender: {personDetails.properties?.gender || 'Loading...'} <br />
                    Hair color: {personDetails.properties?.hair_color || 'Loading...'} <br />
                    Eye color: {personDetails.properties?.eye_color || 'Loading...'} <br />
                </Card.Text>
                <div className='d-flex justify-content-between'>
                    <Link to={`/person-details/${person.uid}`} className="btn btn-primary">
                        Learn more!
                    </Link>
                    <Button variant="primary" onClick={handleAddToFavorites}>💓</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default PersonCard;