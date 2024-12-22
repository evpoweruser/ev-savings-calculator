// Function to update the value shown next to each slider
function updateValue(id) {
    const slider = document.getElementById(id);
    const valueSpan = document.getElementById(id + 'Value');
    valueSpan.textContent = slider.value;
}

// Function to calculate savings
function calculateSavings() {
    const distance = parseFloat(document.getElementById("distance").value);
    const evEfficiency = parseFloat(document.getElementById("evEfficiency").value);
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const petrolCost = parseFloat(document.getElementById("petrolCost").value);
    const petrolMileage = parseFloat(document.getElementById("petrolMileage").value);

    // EV energy consumption (Wh/month) and cost (Rs/month)
    const energyConsumed = distance * evEfficiency;
    const evCost = (energyConsumed / 1000) * electricityCost;

    // Petrol car fuel consumption and cost (litres/month)
    const petrolConsumption = distance / petrolMileage;
    const petrolCostTotal = petrolConsumption * petrolCost;

    // Monthly savings
    const savings = petrolCostTotal - evCost;

    // CO2 emissions calculations
    const co2EmissionPetrol = petrolConsumption * 2.31; // CO2 per litre of petrol
    const co2ReductionCurrentMix = co2EmissionPetrol - (energyConsumed * 0.0005); // Assumed CO2 reduction factor
    const co2ReductionRenewable = co2EmissionPetrol - (energyConsumed * 0.0001); // Assuming renewable energy

    // Equivalent EV distance to produce same CO2 as Petrol Car
    const equivalentEVDistance = co2EmissionPetrol / (evEfficiency * 0.0005);

    // Trees planted equivalent calculation
    const treesPlanted = Math.floor(co2ReductionRenewable / 0.3); // 1 tree absorbs 0.3 kg CO2/year

    // Update the results in the DOM
    document.getElementById("savings").textContent = `Monthly EV Savings: Rs ${savings.toFixed(2)}`;
    document.getElementById("co2Emissions").textContent = `Monthly CO2 Emissions from Petrol Car: ${co2EmissionPetrol.toFixed(2)} kg`;
    document.getElementById("co2ReductionCurrentMix").textContent = `CO2 Reduction with Current Energy Mix: ${co2ReductionCurrentMix.toFixed(2)} kg`;
    document.getElementById("co2ReductionRenewable").textContent = `CO2 Reduction with Renewable Energy: ${co2ReductionRenewable.toFixed(2)} kg`;
    document.getElementById("equivalentEVDistance").textContent = `Equivalent EV Distance to produce same CO2 as Petrol Car: ${equivalentEVDistance.toFixed(2)} km`;
    document.getElementById("treesPlanted").textContent = `Equivalent Trees Planted: ${treesPlanted}`;
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
