import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";
import { Context } from "../store/appContext";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";


const PlanetCard = ({ planet }) => {

    const [planetDetails, setPlanetDetails] = useState({});

    const { store, actions } = useContext(Context);

    const handleAddToFavorites = () => {
        const item = planet;

        actions.addToFavorites(item);

    };

    useEffect(() => {
        const fetchPlanetDetails = async () => {
            try {
                const response = await fetch(planet.url);
                const data = await response.json();
                setPlanetDetails(data.result);

            } catch (error) {
                console.error("Error fetching person details:", error);
            }
        };

        fetchPlanetDetails();
    }, [planet.url]);

    const planetUid = store.planets.find(p => p.name === planet.name)?.uid;


    return (
        <Card style={{ width: '18rem' }}
            className='ms-4 mt-4 mb-4'
        >
            <Card.Img variant="top" src={planetUid == 1 ? `https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Tatooine_%28fictional_desert_planet%29.jpg/220px-Tatooine_%28fictional_desert_planet%29.jpg` : `https://starwars-visualguide.com/assets/img/planets/${planetUid}.jpg`} />
            <Card.Body>
                <Card.Title>{planet.name}</Card.Title>
                <Card.Text>
                    Population: {planetDetails.properties?.population || 'Loading...'}<br />
                    Terrain: {planetDetails.properties?.terrain || 'Loading...'}<br />
                </Card.Text>
                <div className='d-flex justify-content-between'>
                    <Link to={`/planet-details/${planet.uid}`} className="btn btn-primary">
                        Learn more!
                    </Link>
                    <Button variant="primary" onClick={handleAddToFavorites}>💓</Button>
                </div>

            </Card.Body>
        </Card>
    )
}

export default PlanetCard;