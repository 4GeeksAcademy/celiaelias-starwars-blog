import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";


const DetailsVehicle = () => {
    const { actions, store } = useContext(Context);
    const params = useParams();
    const [vehicleDetails, setVehicleDetails] = useState(null);

    useEffect(() => {
        // Obtén los detalles del vehículo utilizando el ID de los parámetros de la URL
        const fetchVehicleDetails = async () => {
            const id = params.id;
            const details = await actions.getVehicleDetails(id);

            if (details) {
                setVehicleDetails(details);
            }
        };

        fetchVehicleDetails();
    }, [params.id, actions]);

    const vehicleUid = store.vehicles.find(p => p.name === vehicleDetails?.name)?.uid;


    return (
        <div>
            {vehicleDetails ? (
                <div>
                    <div className="container d-flex flex-row justify-content-around ml-5 mr-5">
                        <div>
                            <img className="" alt="character" src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleUid}.jpg`} />
                        </div>
                        <div className="container text-left grey-background" >
                            <h2>{vehicleDetails.name}</h2>
                            <p> "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolo voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? </p>
                        </div>
                    </div>
                    
                    <div className="container">
                        <table className="table table-borderless">
                            <thead className="text-white">
                                <tr className="">
                                    <th>Model</th>
                                    <th>passengers</th>
                                    <th>Max atmosphering Speed</th>
                                    <th>Cargo Capacity</th>
                                    <th>Length</th>
                                    <th>manufacturer</th>
                                </tr>
                            </thead>
                            <tbody  className="text-danger">
                                <tr>
                                    <td>{vehicleDetails.model}</td>
                                    <td>{vehicleDetails.passengers}</td>
                                    <td>{vehicleDetails.max_atmosphering_speed}</td>
                                    <td>{vehicleDetails.cargo_capacity}</td>
                                    <td>{vehicleDetails.length}</td>
                                    <td>{vehicleDetails.manufacturer}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            ) : (
                <div className="d-flex justify-content-center"><Spinner animation="border" /></div>
            )}
        </div>
    );
};

export default DetailsVehicle;