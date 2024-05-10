import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import CardStarWars from "../component/card";
import { Context } from "../store/appContext";
import PlanetCard from "../component/cardPlanet";
import VehicleCard from "../component/cardVehicle";

export const Home = () => {

	const { store, actions } = useContext(Context);


	return (
		<div className="container">

			<div className="row">
				<h1>Characters</h1>
				{store.people.map((person, index) => (
					<CardStarWars key={index} person={person}/>
					
				))}
			</div>
			<div className="row">
				<h1 className="h1">Planets</h1>
				{store.planets.map((planet, index) => (
					<PlanetCard key={index} planet={planet} />
				))}

			</div>
			<div className="row">
				<h1>Vehicles</h1>
				{store.vehicles.map((vehicle, index) => (
					<VehicleCard
						key={index}
						vehicle={vehicle}
					/>
				))}

			</div>
		</div>
	)
}