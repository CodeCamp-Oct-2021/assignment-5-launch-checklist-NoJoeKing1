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
    if (testInput === "") {
        return "Empty";
    }
    if (isNaN(Number(testInput))) {
        return "Not a Number";
    }
    if (!isNaN(Number(testInput))) {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    list.style.visibility = "hidden";
    document.innerHTML = "Awaiting Information Before Launch";
    document.style.color = "black";
    if (validateInput(pilot.value) === "Empty" || validateInput(copilot.value) === "Empty"|| 
        validateInput(fuelLevel.value) === "Empty" || validateInput(cargoMass.value) === "Empty") {
        alert("All fields required!");
    }
    else if (validateInput(pilot.value) === "Is a Number") {
        alert("Make sure to enter valid information for each field!");
    }
    else if (validateInput(copilot.value) === "Is a Number") {
        alert("Make sure to enter valid information for each field!");
    }
    else if (validateInput(fuelLevel.value) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");
    }
    else if (validateInput(cargoMass.value) === "Not a Number") {
        alert("Make sure to enter valid information for each field!");
    }
    else {
        if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
            document.innerHTML = "Shuttle not ready for launch";
            document.style.color = "red";
            list.style.visibility = "visible";
            list.innerHTML = `
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">Pilot ${pilot.value} Ready</li>
                <li id="copilotStatus" data-testid="copilotStatus">Co-pilot ${copilot.value} Ready</li>
                <li id="fuelStatus" data-testid="fuelStatus">Fuel level too low for launch</li>
                <li id="cargoStatus" data-testid="cargoStatus">Cargo mass too high for launch</li>
            </ol>` 
        }
        else if (fuelLevel.value < 10000) {
            document.innerHTML = "Shuttle not ready for launch";
            document.style.color = "red";
            list.style.visibility = "visible";
            list.innerHTML = `
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">Pilot ${pilot.value} Ready</li>
                <li id="copilotStatus" data-testid="copilotStatus">Co-pilot ${copilot.value} Ready</li>
                <li id="fuelStatus" data-testid="fuelStatus">Fuel level too low for launch</li>
                <li id="cargoStatus" data-testid="cargoStatus">Cargo mass low enough for launch</li>
            </ol>` 
        }
        else if (cargoMass.value > 10000) {
            document.innerHTML = "Shuttle not ready for launch";
            document.style.color = "red";
            list.style.visibility = "visible";
            list.innerHTML = `
            <ol>
                <li id="pilotStatus" data-testid="pilotStatus">Pilot ${pilot.value} Ready</li>
                <li id="copilotStatus" data-testid="copilotStatus">Co-pilot ${copilot.value} Ready</li>
                <li id="fuelStatus" data-testid="fuelStatus">Fuel level high enough for launch</li>
                <li id="cargoStatus" data-testid="cargoStatus">Cargo mass too high for launch</li>
            </ol>` 
        }
        else {
            document.innerHTML = "Shuttle is ready for launch";
            document.style.color = "green";
            list.style.visibility = "visible";
            list.innerHTML = `
                <ol>
                    <li id="pilotStatus" data-testid="pilotStatus">Pilot ${pilot.value} Ready</li>
                    <li id="copilotStatus" data-testid="copilotStatus">Co-pilot ${copilot.value} Ready</li>
                    <li id="fuelStatus" data-testid="fuelStatus">Fuel level high enough for launch</li>
                    <li id="cargoStatus" data-testid="cargoStatus">Cargo mass low enough for launch</li>
                </ol>`
        }
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
