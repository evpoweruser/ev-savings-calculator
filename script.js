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

    // Check if all input values are valid
    if (isNaN(distance) || isNaN(evEfficiency) || isNaN(electricityCost) || isNaN(petrolCost) || isNaN(petrolMileage)) {
        alert("Please enter valid inputs");
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

    // Update the results in the HTML
    document.getElementById('savings').textContent = `Monthly EV Savings: Rs ${savings.toFixed(2)}`;
    document.getElementById('co2Emissions').textContent = `Monthly CO2 Emissions from Petrol Car: ${petrolCO2Emissions.toFixed(2)} kg`;
    document.getElementById('co2ReductionCurrentMix').textContent = `CO2 Reduction with Current Energy Mix: ${co2ReductionCurrentMix.toFixed(2)} kg`;
    document.getElementById('co2ReductionRenewable').textContent = `CO2 Reduction with Renewable Energy: ${co2ReductionRenewable.toFixed(2)} kg`;
    document.getElementById('equivalentEVDistance').textContent = `Equivalent EV Distance to produce same CO2 as Petrol Car: ${equivalentEVDistance.toFixed(2)} km`;

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
    Plotly.newPlot('savingsBarChart', savingsData, savingsLayout);

    // Plotly bar chart for CO2 emissions reduction
    const co2ReductionData = [{
        x: ['Petrol CO2 Emissions', 'EV CO2 Emissions', 'CO2 Reduction (Current Mix)', 'CO2 Reduction (Renewable)'],
        y: [petrolCO2Emissions, evCO2EmissionsCurrentMix, co2ReductionCurrentMix, co2ReductionRenewable],
        type: 'bar'
    }];
    const co2ReductionLayout = {
        title: 'CO2 Emissions Reduction Comparison'
    };
    Plotly.newPlot('co2ReductionBarChart', co2ReductionData, co2ReductionLayout);
}

// Scroll to top function with slingshot animation
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Adding an event listener to run the function when the button is clicked
document.getElementById('takeToTop').addEventListener('click', scrollToTop);
