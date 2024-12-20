import pandas as pd
import requests

# Fetch the data.
df = pd.read_csv("https://ourworldindata.org/grapher/electricity-prod-source-stacked.csv?v=1&csvType=full&useColumnShortNames=true", storage_options={'User-Agent': 'Our World In Data data fetch/1.0'})

# Fetch the metadata
metadata = requests.get("https://ourworldindata.org/grapher/electricity-prod-source-stacked.metadata.json?v=1&csvType=full&useColumnShortNames=true").json()

# Save the data to a CSV file
df.to_csv('electricity_mix_data.csv', index=False)
