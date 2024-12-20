function calculateSavings() {
    // Get input values
    const distance = parseFloat(document.getElementById('distance').value);
    const evEfficiency = parseFloat(document.getElementById('evEfficiency').value);
    const electricityCost = parseFloat(document.getElementById('electricityCost').value);
    const petrolCost = parseFloat(document.getElementById('petrolCost').value);
    const petrolMileage = parseFloat(document.getElementById('petrolMileage').value);

    // Calculate savings
    const electricityConsumption = (distance * evEfficiency) / 1000; // kWh
    const evCost = electricityConsumption * electricityCost;
    const petrolConsumption = distance / petrolMileage; // litres
    const petrolCostTotal = petrolConsumption * petrolCost;
    const savings = petrolCostTotal - evCost;

    // Update the results in the HTML
    document.getElementById('savings').textContent = `Monthly EV Savings: Rs ${savings.toFixed(2)}`;
    document.getElementById('co2Emissions').textContent = `Monthly CO2 Emissions from Petrol Car: ${(petrolConsumption * 2.31).toFixed(2)} kg`;
    document.getElementById('co2ReductionCurrentMix').textContent = `CO2 Reduction with Current Energy Mix: ${(petrolConsumption * 2.31 - electricityConsumption * 0.5).toFixed(2)} kg`;
    document.getElementById('co2ReductionRenewable').textContent = `CO2 Reduction with Renewable Energy: ${(petrolConsumption * 2.31).toFixed(2)} kg`;

    // Optionally, you can also update the charts here if you have any
}
