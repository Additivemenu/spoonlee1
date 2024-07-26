import re
import pandas as pd

def regex_sub():
    # Define the regex pattern as a variable
    pattern = r'^.*'

    # Define the text to search and replace in
    text = 'USA'

    # Define the replacement string
    replacement = 'America'

    # Use re.sub to replace matches of the pattern with the replacement string
    result = re.sub(pattern, replacement, text)

    # Print the result
    print(result)  # Output: ?

# ! 2. regex number trimmer
def trim_number(number):
    # Convert the number to a string
    number_str = str(number)

    # Use a regular expression to match the number with two decimal places
    match = re.match(r"(\d+\.\d{3})", number_str)
    print(match)
    
    if match:
        trimmed_number = match.group(1)
        trimmed_number = float(trimmed_number)
        return trimmed_number
    else:
        trimmed_number = float(number_str)
        return trimmed_number

number = 35.04022222
print(trim_number(number) )

# ! 3. normalizing data
def normalize_number(data):
    # Sample data
    
    df = pd.DataFrame(data)

    # ! try to convert column to numeric first    
        
    # ! then, need to check if it is a numerical column 

    # Function to normalize a column using Min-Max normalization
    def min_max_normalize(column):
        return (column - column.min()) / (column.max() - column.min())

    # Apply Min-Max normalization to column 'B'
    df['B'] = min_max_normalize(df['B'])

    # Display the dataframe
    return df

data = {
    'A': [1, 2, 3, 4, 5],
    'B': [10, 20, 30, 40, 50],
    'C': [100, 200, 300, 400, 500]
}
df = normalize_number(data)
print(df)


# ! 4. imputting missing values for numerical column
def fill_missing_values(data, column_name, fill_value):
    df = pd.DataFrame(data)
    df[column_name] = df[column_name].fillna(fill_value)
    return df

# Sample data with missing values
data = {
    'A': [1, 2, None, 4, 5],
    'B': [10, 20, 30, None, 50],
    'C': [None, 200, 300, 400, None]
}

df = fill_missing_values(data, 'B', 0)
# Display the dataframe
print(df)



# ! 5.
# Sample data with mixed numerical and textual numerical values
def convert_mixed_column_to_numeric(df):
    df['mixed_column_converted'] = pd.to_numeric(df['mixed_column'], errors='coerce')
    return df

data = {
    'mixed_column': ['1', '2', 'three', '4.5', 'five', '6', '7.8']
}
df = pd.DataFrame(data)
df = convert_mixed_column_to_numeric(df)
print(df)


# ! 5. check column type
def check_column_type(df, column_name):
    if pd.api.types.is_numeric_dtype(df[column_name]):
        return 'Numerical'
    elif pd.api.types.is_string_dtype(df[column_name]):
        return 'Textual'
    else:
        return 'Other'

# Sample data
data = {
    'A': ['1', '2', '3', '4', 5],
    'B': [10.5, 20.5, 30.5, 40.5, 50.5],
    'C': ['one', 'two', 'three', 'four', 'five']
}
df = pd.DataFrame(data)
print(check_column_type(df, 'A'))  # Output: Numerical