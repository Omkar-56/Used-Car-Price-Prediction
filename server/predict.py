import sys
import pickle
import json
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings("ignore")

with open("./artifacts/used_car_prices_model.pickle", "rb") as f:
    model1 = pickle.load(f)

with open("./artifacts/columns.json", "r") as f:
    data_columns = json.load(f)["data_columns"]


def get_estimated_price(model, make_year, engine_capacity, km_driven, price, owners, fuel_type_encoded, transmission_encoded):    
    try:
        model_index = data_columns.index(model)
    except ValueError:
        model_index = -1

    x = np.zeros(len(data_columns))
    x[0] = make_year
    x[1] = engine_capacity
    x[2] = km_driven
    x[3] = price
    x[4] = owners
    x[5] = fuel_type_encoded
    x[6] = transmission_encoded
    
    if model_index >= 0:
        x[model_index] = 1

    return round(model1.predict([x])[0], 2)

if __name__ == "__main__":
    model,   make_year,engine_capacity, km_driven, price, owners, fuel_type_encoded, transmission_encoded = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), int(sys.argv[5]), int(sys.argv[6]), int(sys.argv[7]), int(sys.argv[8])
    print(get_estimated_price(model, make_year, engine_capacity, km_driven, price, owners, fuel_type_encoded, transmission_encoded))
