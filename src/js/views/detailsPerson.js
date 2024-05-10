import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";


const DetailsPerson = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [personDetails, setPersonDetails] = useState(null);


    useEffect(() => {

        const fetchPersonDetails = async () => {
            const id = params.id;
            const details = await actions.getCharacterDetails(id);

            if (details) {
                setPersonDetails(details);
            }
        };

        fetchPersonDetails();
    }, [params.id, actions]);

    const personUid = store.people.find(p => p.name === personDetails?.name)?.uid;

    return (
        <div>
            {personDetails ? (
                <div>

                    <div className="container d-flex flex-row justify-content-around ml-5 mr-5">
                        <div>
                            <img className="" alt="character" src={`https://starwars-visualguide.com/assets/img/characters/${personUid}.jpg`} />
                        </div>
                        <div className="container text-left grey-background" >
                            <h2>{personDetails.name}</h2>
                            <p> "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolo voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? </p>
                        </div>
                    </div>
                    
                    <div className="container">
                        <table className="table table-borderless">
                            <thead className="text-white">
                                <tr>
                                    <th>Name</th>
                                    <th>Birth Year</th>
                                    <th>Gender</th>
                                    <th>Height</th>
                                    <th>Skin Color</th>
                                    <th>Eye Color</th>
                                </tr>
                            </thead>
                            <tbody className="text-danger">
                                <tr>
                                    <td >{personDetails.name}</td>
                                    <td >{personDetails.birth_year}</td>
                                    <td >{personDetails.gender}</td>
                                    <td >{personDetails.height}</td>
                                    <td >{personDetails.skin_color}</td>
                                    <td >{personDetails.eye_color}</td>
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

export default DetailsPerson;