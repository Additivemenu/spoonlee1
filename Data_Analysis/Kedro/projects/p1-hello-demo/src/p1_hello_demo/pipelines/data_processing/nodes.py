"""
This is a boilerplate pipeline 'data_processing'
generated using Kedro 0.19.7
"""

import pandas as pd

def load_data(filepath: str) -> pd.DataFrame:
    return pd.read_csv(filepath)

def process_data(data: pd.DataFrame) -> pd.DataFrame:
    # For this demo, we'll just add a new column "processed" with a constant value
    data['processed'] = True
    return data

def save_data(data: pd.DataFrame, filepath: str) -> None:
    data.to_csv(filepath, index=False)
  