
// Write your JavaScript code here!

window.addEventListener("load", function() {
    let form = document.querySelector("form");
    let list = document.getElementById("faultyItems");
    list.style.visibility = "hidden";
    let missionTarget = document.getElementById("missionTarget");
    
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets);
        console.log(planet)
        addDestinationInfo(missionTarget, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)

    });   

    form.addEventListener("submit", function (event) {
        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoMass = document.querySelector("input[name=cargoMass]");
        
        event.preventDefault();
        formSubmission(launchStatus, list, pilotName, copilotName, fuelLevel, cargoMass);
        
    });
});