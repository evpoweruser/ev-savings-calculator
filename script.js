/* General styling */
body {
    font-family: 'Roboto', sans-serif;
    background-color: #0a0a0a;
    color: #00ffff;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h1, h2 {
    text-align: center;
    color: #00ffff;
}

/* Container styling */
.container {
    max-width: 800px;
    padding: 20px;
    background-color: #1a1a1a;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
    border-radius: 8px;
}

/* Label and input styling */
label {
    display: block;
    margin: 20px 0 10px;
    color: #00ffff;
    font-weight: bold;
}

select, input[type="range"], button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    background-color: #1a1a1a;
    color: #00ffff;
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
    transition: box-shadow 0.3s;
}

select:hover, input[type="range"]:hover, button:hover {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
}

/* Slider styling */
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    background: #007BFF;
    border-radius: 20px; /* Rounded edges */
    outline: none;
    position: relative;
    overflow: hidden;
    margin: 20px 0;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #00ffff;
    border: 2px solid #007BFF;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px #00ffff;
    animation: electric 1s infinite;
}

input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #00ffff;
    border: 2px solid #007BFF;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px #00ffff;
    animation: electric 1s infinite;
}

@keyframes electric {
    0% {
        box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #007BFF, 0 0 40px #007BFF;
    }
    50% {
        box-shadow: 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #007BFF, 0 0 50px #007BFF;
    }
    100% {
        box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #007BFF, 0 0 40px #007BFF;
    }
}

/* Button styling */
button {
    background-color: #007BFF;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    margin-top: 20px;
}

button:hover {
    background-color: #0056b3;
    box-shadow: 0 5px 15px rgba(0, 91, 187, 0.4);
}

/* Results section styling */
p {
    font-size: 18px;
    line-height: 1.5;
    margin: 10px 0;
}

/* Chart styling */
#pieChart, #electricityPieChart, #savingsBarChart, #co2ReductionBarChart {
    margin-top: 30px;
    width: 100%;
    height: 400px;
}

/* Take to Top Button */
#takeToTop {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: rgba(0, 0, 139, 0.5); /* Dark blue with transparency */
    border-radius: 50%;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 91, 187, 0.4);
    transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s;
}

#takeToTop img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
}

#takeToTop:active {
    transform: scale(0.9);
}

@keyframes slingshot {
    0% {
        transform: translateY(0);
    }
    20% {
        transform: translateY(-30px);
    }
    40% {
        transform: translateY(10px);
    }
    60% {
        transform: translateY(-10px);
    }
    80% {
        transform: translateY(5px);
    }
    100% {
        transform: translateY(0);
    }
}

.slingshot-effect {
    animation: slingshot 0.5s ease-out;
}
