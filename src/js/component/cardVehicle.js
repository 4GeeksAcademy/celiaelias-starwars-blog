import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";
import { Context } from "../store/appContext";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";



const VehicleCard = ({ vehicle }) => {

    const { store, actions } = useContext(Context);

    const [vehicleDetails, setVehicleDetails] = useState({});

    const handleAddToFavorites = () => {
        const item = vehicle;
        actions.addToFavorites(item);

    };

    // console.log("vehiculos ---->", vehicle)

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await fetch(vehicle.url);
                const data = await response.json();
                setVehicleDetails(data.result);
            } catch (error) {
                console.error("Error fetching person details:", error);
            }
        };

        fetchVehicleDetails();
    }, [vehicle.url]);

    const vehicleUid = store.vehicles.find(v => v.name === vehicle.name)?.uid;

    return (
        <Card style={{ width: '18rem' }}
            className='ms-4 mt-4 mb-4'
        >
            <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleUid}.jpg`} />
            <Card.Body>
                <Card.Title>{vehicle.name}</Card.Title>
                <Card.Text>
                    Model: {vehicleDetails.properties?.model || 'Loading...'} <br />
                    Cost In Credits: {vehicleDetails.properties?.cost_in_credits || 'Loading...'} <br />

                </Card.Text>
                <div className='d-flex justify-content-between'>
                    <Link to={`/vehicle-details/${vehicle.uid}`} className="btn btn-primary">
                        Learn more!
                    </Link>
                    <Button variant="primary" onClick={handleAddToFavorites}>💓</Button>
                </div>

            </Card.Body>
        </Card>
    )
}

export default VehicleCard;