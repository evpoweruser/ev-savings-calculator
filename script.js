function getElectricityMix(country) {
    const mixes = {
        india: {
            coal: 49.1,
            lignite: 1.6,
            gas: 6.0,
            diesel: 0.1,
            hydro: 11.2,
            wind: 10.3,
            solar: 16.1,
            biomass: 2.5,
            waste: 0.1,
            smallHydro: 1.2,
            nuclear: 1.6
        },
        usa: {
            coal: 19.3,
            naturalGas: 38.3,
            nuclear: 19.7,
            renewables: 20.1, // Including wind, solar, hydro, biomass
            others: 2.6
        },
        germany: {
            coal: 31.9,
            naturalGas: 15.3,
            nuclear: 11.1,
            renewables: 41.1, // Including wind, solar, hydro, biomass
            others: 0.6
        },
        china: {
            coal: 57.7,
            naturalGas: 8.6,
            hydro: 17.2,
            nuclear: 5.0,
            wind: 10.4,
            solar: 5.0,
            others: 1.1
        },
        tamilnadu: {
            coal: 37,
            wind: 26.7,
            solar: 20,
            gas: 6,
            hydro: 5,
            biomass: 2.5,
            nuclear: 1.6,
            lignite: 1.2
        }
    };
    return mixes[country];
}

function calculateCo2Emissions(kilometers, evEfficiencyKwhPerKm, electricityMix) {
    // CO2 emissions factors (kg CO2 per kWh)
    const emissionsFactors = {
        coal: 0.820,
        gas: 0.490,
        diesel: 0.650,
        nuclear: 0,
        renewables: 0  // Assuming zero emissions for renewables like wind, solar, hydro, biomass
    };

    // Calculate weighted average CO2 emissions per kWh
    let weightedCo2Emissions = 0;
    for (const source in electricityMix) {
        const factor = emissionsFactors[source] || 0;  // Default to 0 for renewables
        weightedCo2Emissions += (electricityMix[source] / 100) * factor;
    }

    // Calculate total energy consumption
    const totalEnergyKwh = kilometers * evEfficiencyKwhPerKm;

    // Calculate total CO2 emissions
    return totalEnergyKwh * weightedCo2Emissions;
}

function calculateSavings() {
    const country = document.getElementById('country').value;
    const electricityMix = getElectricityMix(country);

    const distance = parseFloat(document.getElementById('distance').value);
    const evEfficiencyWhPerKm = parseFloat(document.getElementById('evEfficiency').value);
    const electricityCostRsPerKwh = parseFloat(document.getElementById('electricityCost').value);
    const petrolCostRsPerLitre = parseFloat(document.getElementById('petrolCost').value);
    const petrolMileageKmPerLitre = parseFloat(document.getElementById('petrolMileage').value);

    // Convert EV efficiency from Wh/km to kWh/km
    const evEfficiencyKwhPerKm = evEfficiencyWhPerKm / 1000;

    // Calculate monthly petrol cost
    const monthlyPetrolCost = (distance / petrolMileageKmPerLitre) * petrolCostRsPerLitre;

    // Calculate monthly EV energy cost
    const monthlyEvEnergyCost = distance * evEfficiencyKwhPerKm * electricityCostRsPerKwh;

    // Calculate total savings
    const totalSavings = monthlyPetrolCost - monthlyEvEnergyCost;

    // Calculate CO2 emissions for the petrol car
    const co2EmissionsPerLitre = 2.31;  // kg of CO2 per liter of petrol burned
    const monthlyPetrolConsumption = distance / petrolMileageKmPerLitre;
    const monthlyCo2Emissions = monthlyPetrolConsumption * co2EmissionsPerLitre;

    // Calculate monthly CO2 emissions for EV with current electricity mix
    const monthlyEvCo2EmissionsCurrentMix = calculateCo2Emissions(distance, evEfficiencyKwhPerKm, electricityMix);

    // Calculate monthly CO2 emissions for EV with 100% renewable energy
    const renewableMix = { renewables: 100 };
    const monthlyEvCo2EmissionsRenewable = calculateCo2Emissions(distance, evEfficiencyKwhPerKm, renewableMix);

    // Calculate CO2 reduction
    const co2ReductionCurrentMix = monthlyCo2Emissions - monthlyEvCo2EmissionsCurrentMix;
    const co2ReductionRenewable = monthlyCo2Emissions - monthlyEvCo2EmissionsRenewable;

    // Update results in HTML
    document.getElementById('savings').innerText = `Monthly EV Savings: Rs ${totalSavings.toFixed(2)}`;
    document.getElementById('co2Emissions').innerText = `Monthly CO2 Emissions from Petrol Car: ${monthlyCo2Emissions.toFixed(2)} kg`;
    document.getElementById('co2ReductionCurrentMix').innerText = `Monthly CO2 Reduction with Current Mix: ${co2ReductionCurrentMix.toFixed(2)} kg`;
    document.getElementById('co2ReductionRenewable').innerText = `Monthly CO2 Reduction with 100% Renewable: ${co2ReductionRenewable.toFixed(2)} kg`;

    // Create pie chart for CO2 emissions breakdown
    const co2Data = [{
        values: [monthlyEvCo2EmissionsCurrentMix * 0.7, monthlyEvCo2EmissionsCurrentMix * 0.05, monthlyEvCo2EmissionsCurrentMix * 0.25],
        labels: ['Generation', 'Transmission', 'Conversion Efficiency'],
        hovertext: ['Source: Generation', 'Source: Transmission', 'Source: Conversion Efficiency'],
        type: 'pie'
    }];
    
    const co2Layout = {
        title: 'CO2 Emissions Breakdown'
    };
    
    Plotly.newPlot('pieChart', co2Data, co2Layout);

    // Create pie chart for electricity mix
    const electricityData = [{
        values: Object.values(electricityMix),
        labels: Object.keys(electricityMix),
        hovertext: Object.keys(electricityMix).map(source => `Source: ${source}`),
        type: 'pie'
    }];
    
    const electricityLayout = {
        title: 'Electricity Mix for EV Charging'
    };
    
    Plotly.newPlot('electricityPieChart', electricityData, electricityLayout);
}
