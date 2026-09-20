// ==========================================
// TURBULENCE RISK MAPPER - PROTOTYPE
// SIMULATED DATA ONLY
// ==========================================


// ==========================================
// INITIALIZE MAP
// ==========================================

const map = L.map("map").setView([25, 20], 2);


// OpenStreetMap background

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// ==========================================
// RISK ZONES
// ==========================================

const riskZones = [

    {
        lat: 40,
        lng: -75,
        risk: "HIGH",
        radius: 450000
    },

    {
        lat: 45,
        lng: 10,
        risk: "MODERATE",
        radius: 350000
    },

    {
        lat: 20,
        lng: 78,
        risk: "LOW",
        radius: 300000
    },

    {
        lat: -25,
        lng: 135,
        risk: "HIGH",
        radius: 400000
    },

    {
        lat: 5,
        lng: -60,
        risk: "MODERATE",
        radius: 350000
    }

];


const riskColors = {

    HIGH: "#ef476f",

    MODERATE: "#f4a72c",

    LOW: "#19cf9a"

};


riskZones.forEach(zone => {

    L.circle(
        [zone.lat, zone.lng],
        {
            radius: zone.radius,

            color: riskColors[zone.risk],

            fillColor: riskColors[zone.risk],

            fillOpacity: 0.25,

            weight: 2
        }
    )
    .addTo(map)

    .bindPopup(
        `
        <b>${zone.risk} TURBULENCE RISK</b>
        <br>
        Risk Zone
        <br>
        Altitude: FL350
        <br>
        Confidence: 82%
        `
    );

});


// ==========================================
// SIMULATED AIRCRAFT
// ==========================================

const aircraft = [

    {
        flight: "BA215",
        lat: 40.7,
        lng: -74,
        altitude: "FL350",
        risk: "HIGH"
    },

    {
        flight: "AI101",
        lat: 28.6,
        lng: 77.2,
        altitude: "FL320",
        risk: "MODERATE"
    },

    {
        flight: "LH722",
        lat: 50.1,
        lng: 8.6,
        altitude: "FL370",
        risk: "LOW"
    },

    {
        flight: "EK215",
        lat: 25.2,
        lng: 55.3,
        altitude: "FL340",
        risk: "MODERATE"
    },

    {
        flight: "SQ318",
        lat: 1.35,
        lng: 103.8,
        altitude: "FL360",
        risk: "LOW"
    }

];


aircraft.forEach(flight => {

    const marker = L.marker(
        [flight.lat, flight.lng]
    )
    .addTo(map);

    marker.bindPopup(
        `
        <b>✈ ${flight.flight}</b>

        <br><br>

        Altitude: ${flight.altitude}

        <br>

        Risk:
        <b style="color:${riskColors[flight.risk]}">
        ${flight.risk}
        </b>
        `
    );

});


// ==========================================
// TIME FILTER
// ==========================================

document
    .getElementById("timeFilter")
    .addEventListener("change", function () {

        alert(
            "Risk map updated for: " +
            this.value
        );

    });


// ==========================================
// ALTITUDE FILTER
// ==========================================

document
    .getElementById("altitudeFilter")
    .addEventListener("change", function () {

        alert(
            "Displaying turbulence risk at " +
            this.value
        );

    });


// ==========================================
// ROUTE ANALYSIS
// ==========================================

function analyzeRoute() {

    const origin =
        document.getElementById("origin").value;

    const destination =
        document.getElementById("destination").value;

    const altitude =
        document.getElementById("routeAltitude").value;


    if (!origin || !destination) {

        alert(
            "Please enter origin and destination."
        );

        return;

    }


    // Simulated ML result

    const riskScore =
        Math.floor(
            Math.random() * 35
        ) + 55;


    let riskLevel;


    if (riskScore >= 75) {

        riskLevel = "HIGH";

    }

    else if (riskScore >= 55) {

        riskLevel = "MODERATE";

    }

    else {

        riskLevel = "LOW";

    }


    const result =
        document.getElementById("routeResult");


    result.classList.remove("hidden");


    result.innerHTML = `

        <h3>
            Route Analysis Result
        </h3>

        <br>

        <b>
            ${origin} → ${destination}
        </b>

        <br><br>

        Selected Altitude:
        ${altitude}

        <br>

        Predicted Risk Score:
        <strong>${riskScore}/100</strong>

        <br>

        Risk Level:
        <strong
            style="
                color:${riskColors[riskLevel]};
            "
        >
            ${riskLevel}
        </strong>

        <br><br>

        <small>
            ⚠ Prototype result generated using
            simulated ML prediction.
        </small>

    `;

}


// ==========================================
// QUICK ACTIONS
// ==========================================

function planRoute() {

    document
        .getElementById("origin")
        .focus();

}


function checkWeather() {

    alert(
        "Weather module: simulated atmospheric data available."
    );

}


function viewReports() {

    alert(
        "Showing latest turbulence reports."
    );

}


function downloadData() {

    const data = {

        system: "Turbulence Risk Mapper",

        type: "Prototype",

        data: "Simulated",

        generatedAt:
            new Date().toISOString()

    };


    const blob =
        new Blob(
            [JSON.stringify(data, null, 2)],
            {
                type: "application/json"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "turbulence-prototype-data.json";

    link.click();


    URL.revokeObjectURL(url);

}


// ==========================================
// SIMULATE LIVE FLIGHT COUNT
// ==========================================

setInterval(() => {

    const count =
        1248 +
        Math.floor(
            Math.random() * 15
        );

    document
        .getElementById("flightCount")
        .textContent = count;

}, 5000);