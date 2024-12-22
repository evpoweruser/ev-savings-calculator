function updateValue(id) {
    const slider = document.getElementById(id);
    const value = slider.value;
    document.getElementById(id + 'Value').textContent = value;
    slider.title = value; // Update the title attribute to show the value as a tooltip
}

function calculateSavings() {
    // Get input values
    const distance = parseFloat(document.getElementById('distance').value);
    const evEfficiency = parseFloat(document.getElementById('evEfficiency').value) / 1000; // convert Wh/km to kWh/km
    const electricityCost = parseFloat(document.getElementById('electricityCost').value);
    const petrolCost = parseFloat(document.getElementById('petrolCost').value);
    const petrolMileage = parseFloat(document.getElementById('petrolMileage').value);
    const co2PerLitrePetrol = 2.31; // kg of CO2 per litre of petrol
    const co2PerKwhCurrentMix = 0.5; // kg of CO2 per kWh of electricity

    // Input validation (positive values only)
    if (isNaN(distance) || distance <= 0 ||
        isNaN(evEfficiency) || evEfficiency <= 0 ||
        isNaN(electricityCost) || electricityCost <= 0 ||
        isNaN(petrolCost) || petrolCost <= 0 ||
        isNaN(petrolMileage) || petrolMileage <= 0) {
        alert("Please enter valid positive inputs");
        return;
    }

    // Calculate savings
    const electricityConsumption = distance * evEfficiency; // kWh
    const evCost = electricityConsumption * electricityCost;
    const petrolConsumption = distance / petrolMileage; // litres
    const petrolCostTotal = petrolConsumption * petrolCost;
    const savings = petrolCostTotal - evCost;

    // Calculate CO2 emissions
    const petrolCO2Emissions = petrolConsumption * co2PerLitrePetrol;
    const evCO2EmissionsCurrentMix = electricityConsumption * co2PerKwhCurrentMix;
    const co2ReductionCurrentMix = petrolCO2Emissions - evCO2EmissionsCurrentMix;
    const co2ReductionRenewable = petrolCO2Emissions;

    // Calculate equivalent EV distance to produce same CO2 as petrol car
    const equivalentEVDistance = (petrolCO2Emissions / co2PerKwhCurrentMix) / evEfficiency;

    // Calculate trees planted
    const treesPerKgCO2 = 0.068; // Approximate number of trees to offset 1 kg of CO2
    const treesPlanted = co2ReductionRenewable * treesPerKgCO2;

    // Update the results in the HTML
    document.getElementById('savings').textContent = `Monthly EV Savings: Rs ${savings.toFixed(2)}`;
    document.getElementById('co2Emissions').textContent = `Monthly CO2 Emissions from Petrol Car: ${petrolCO2Emissions.toFixed(2)} kg`;
    document.getElementById('co2ReductionCurrentMix').textContent = `CO2 Reduction with Current Energy Mix: ${co2ReductionCurrentMix.toFixed(2)} kg`;
    document.getElementById('co2ReductionRenewable').textContent = `CO2 Reduction with Renewable Energy: ${co2ReductionRenewable.toFixed(2)} kg`;
    document.getElementById('equivalentEVDistance').textContent = `Equivalent EV Distance to produce same CO2 as Petrol Car: ${equivalentEVDistance.toFixed(2)} km`;
    document.getElementById('treesPlanted').textContent = `Equivalent Trees Planted: ${Math.round(treesPlanted)}`;

    // Plotly pie chart for petrol vs EV cost
    const pieData = [{
        values: [petrolCostTotal, evCost],
        labels: ['Petrol Cost', 'EV Cost'],
        type: 'pie'
    }];
    const pieLayout = {
        title: 'Cost Comparison'
    };
    Plotly.newPlot('pieChart', pieData, pieLayout);

    // Plotly pie chart for CO2 emissions
    const co2PieData = [{
        values: [petrolCO2Emissions, evCO2EmissionsCurrentMix],
        labels: ['Petrol CO2 Emissions', 'EV CO2 Emissions'],
        type: 'pie'
    }];
    const co2PieLayout = {
        title: 'CO2 Emissions Comparison'
    };
    Plotly.newPlot('electricityPieChart', co2PieData, co2PieLayout);

    // Plotly bar chart for savings
    const savingsData = [{
        x: ['Petrol Cost', 'EV Cost', 'Savings'],
        y: [petrolCostTotal, evCost, savings],
        type: 'bar'
    }];
    const savingsLayout = {
        title: 'Savings Comparison'
    };
    Plotly.new
