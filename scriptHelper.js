// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   document.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`
}

function validateInput(testInput) {
    if (testInput.value === '') {
        return "Empty";
    }
    if (isNaN(Number(testInput.value))) {
        return "Not a Number";
    }
    if (!isNaN(Number(testInput.value))) {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let launchStatus = document.getElementById("launchStatus");
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty"|| 
        validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
        alert("All fields required!");
    }
    else if (validateInput(pilot) === "Is a Number") {
        alert("Make sure to enter valid information for each field!");
    }
    else if (validateInput(copilot) === "Is a Number") {
        alert("Make sure to enter valid information for each field!");
    }
    else if (validateInput(fuelLevel) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");
    }
    else if (validateInput(cargoMass) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");
    }

    if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        faultyItems.style.visibility = "visible";
        faultyItems.innerHTML = `
        <ol>
            <li id="pilotStatus" data-testid="pilotStatus">Pilot ${pilot.value} Ready</li>
            <li id="copilotStatus" data-testid="copilotStatus">Co-pilot ${copilot.value} Ready</li>
            <li id="fuelStatus" data-testid="fuelStatus">Fuel level too low for launch</li>
            <li id="cargoStatus" data-testid="cargoStatus">Cargo mass too high for launch</li>
        </ol>` 
    }
    else if (fuelLevel.value < 10000) {
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        faultyItems.style.visibility = "visible";
        faultyItems.innerHTML = `
        <ol>
            <li id="pilotStatus" data-testid="pilotStatus">Pilot ${pilot.value} Ready</li>
            <li id="copilotStatus" data-testid="copilotStatus">Co-pilot ${copilot.value} Ready</li>
            <li id="fuelStatus" data-testid="fuelStatus">Fuel level too low for launch</li>
            <li id="cargoStatus" data-testid="cargoStatus">Cargo mass low enough for launch</li>
        </ol>` 
    }
    else if (cargoMass.value > 10000) {
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
        faultyItems.style.visibility = "visible";
        faultyItems.innerHTML = `
        <ol>
            <li id="pilotStatus" data-testid="pilotStatus">Pilot ${pilot.value} Ready</li>
            <li id="copilotStatus" data-testid="copilotStatus">Co-pilot ${copilot.value} Ready</li>
            <li id="fuelStatus" data-testid="fuelStatus">Fuel level high enough for launch</li>
            <li id="cargoStatus" data-testid="cargoStatus">Cargo mass too high for launch</li>
        </ol>` 
    }
    else {
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
        faultyItems.style.visibility = "visible";
        faultyItems.innerHTML = `
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">Pilot ${pilot.value} Ready</li>
                <li id="copilotStatus" data-testid="copilotStatus">Co-pilot ${copilot.value} Ready</li>
                <li id="fuelStatus" data-testid="fuelStatus">Fuel level high enough for launch</li>
                <li id="cargoStatus" data-testid="cargoStatus">Cargo mass low enough for launch</li>
            </ol>`
    }
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor((Math.random() * planets.length))]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
