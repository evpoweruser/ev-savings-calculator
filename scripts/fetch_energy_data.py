import requests
import json

URL = "https://ourworldindata.org/energy"
OUTPUT_FILE = "data/energy_values.json"

def fetch_energy_data():
    response = requests.get(URL)
    data = response.json()
    with open(OUTPUT_FILE, 'w') as file:
        json.dump(data, file)

if __name__ == "__main__":
    fetch_energy_data()
