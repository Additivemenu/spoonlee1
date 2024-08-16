Using a virtual environment is a best practice for managing dependencies in Python projects, including Kedro projects. Below is an extended version of the demo that includes setting up and using a virtual environment.

### Step 1: Set Up a Virtual Environment

First, navigate to the directory where you want to create your Kedro project. Then, create and activate a virtual environment.

#### On macOS/Linux:

```bash
python3 -m venv kedro_env
source kedro_env/bin/activate
```

#### On Windows:

```bash
python -m venv kedro_env
kedro_env\Scripts\activate
```

### Step 2: Install Kedro in the Virtual Environment

With the virtual environment activated, install Kedro:

```bash
pip install kedro
```

### Step 3: Create a New Kedro Project

Now, create a new Kedro project:

```bash
kedro new
```

Follow the prompts to set up your project. For example:

- Project Name: `kedro_demo`
- Repository Name: `kedro_demo`
- Python Package Name: `kedro_demo`
- Generate Example Pipeline: No

### Step 4: Define the Pipeline and Nodes

Navigate to the `src/kedro_demo/pipelines` directory and create a new pipeline:

```bash
kedro pipeline create data_processing
```

Define the nodes in `src/kedro_demo/pipelines/data_processing/nodes.py`:

```python
import pandas as pd

def load_data(filepath: str) -> pd.DataFrame:
    return pd.read_csv(filepath)

def process_data(data: pd.DataFrame) -> pd.DataFrame:
    # For this demo, we'll just add a new column "processed" with a constant value
    data['processed'] = True
    return data

def save_data(data: pd.DataFrame, filepath: str) -> None:
    data.to_csv(filepath, index=False)
```

Define the pipeline in `src/kedro_demo/pipelines/data_processing/pipeline.py`:

```python
from kedro.pipeline import Pipeline, node
from .nodes import load_data, process_data, save_data

def create_pipeline(**kwargs) -> Pipeline:
    return Pipeline(
        [
            node(
                func=load_data,
                inputs="raw_data_filepath",
                outputs="raw_data",
                name="load_data_node",
            ),
            node(
                func=process_data,
                inputs="raw_data",
                outputs="processed_data",
                name="process_data_node",
            ),
            node(
                func=save_data,
                inputs=dict(data="processed_data", filepath="output_filepath"),
                outputs=None,
                name="save_data_node",
            ),
        ]
    )
```

### Step 5: Configure the Data Catalog

Open `conf/base/catalog.yml` and add the following configuration:

```yaml
raw_data_filepath:
  type: pandas.CSVDataSet
  filepath: data/raw/sample_data.csv

processed_data:
  type: pandas.CSVDataSet
  filepath: data/processed/processed_data.csv

output_filepath:
  type: pandas.CSVDataSet
  filepath: data/output/final_output.csv
```

### Step 6: Add a Sample Dataset

Create a `data/raw` directory in your project root and add a sample CSV file named `sample_data.csv`:

```csv
id,name,value
1,Alice,100
2,Bob,200
3,Charlie,300
```

### Step 7: Install Dependencies

Ensure that all necessary dependencies are installed. Kedro should have been installed during the project setup, but ensure `pandas` is also installed:

```bash
pip install pandas
```

### Step 8: Run the Pipeline

Now, run the pipeline:

```bash
kedro run
```

This will execute the pipeline, processing the data and saving the output to the specified `data/output/final_output.csv` file.

### Step 9: Verify the Output

Check the `data/output/final_output.csv` file to see the processed data:

```csv
id,name,value,processed
1,Alice,100,True
2,Bob,200,True
3,Charlie,300,True
```

### Step 10: Deactivate the Virtual Environment (Optional)

When you're done working on the project, you can deactivate the virtual environment:

```bash
deactivate
```

### Summary

- **Virtual Environment**: Isolated environment to manage dependencies.
- **Kedro Project Setup**: Created with `kedro new`.
- **Pipeline and Nodes**: Defined the data processing steps in `nodes.py` and linked them in `pipeline.py`.
- **Data Catalog**: Managed input and output data paths with `catalog.yml`.
- **Execution**: Ran the pipeline using `kedro run` within the virtual environment.

This setup ensures that your Kedro project is isolated and reproducible, which is crucial for maintaining a clean and manageable project environment.
