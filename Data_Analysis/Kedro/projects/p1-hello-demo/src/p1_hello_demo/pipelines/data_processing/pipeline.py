"""
This is a boilerplate pipeline 'data_processing'
generated using Kedro 0.19.7
"""

from kedro.pipeline import Pipeline, node
from .nodes import load_data, process_data, save_data

"""
we bound a function to a node, and define input, output, assign a name to each node

node <-> function: one-to-one mapping
"""
def create_pipeline(**kwargs) -> Pipeline:
    return Pipeline(
        [
            node(
                func=load_data,
                inputs="raw_data_filepath",  # input to the function
                outputs="raw_data", # output of the function, which will be fed as input in next node
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
