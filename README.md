# Used Car Price Prediction

This project predicts the price of pre-owned cars using **Machine Learning** techniques.  
It includes **data preprocessing**, **exploratory data analysis (EDA)**, **model training**, and **evaluation** to deliver accurate price estimates.

## Project Structure
- `Untitled.ipynb` — Jupyter Notebook with full workflow from data loading to prediction.
- `pre-owned cars.csv` — Dataset containing car details (engine capacity, mileage, fuel type, etc.).
- `requirements.txt` — Python dependencies.

## Features
- Data cleaning and handling of missing values.
- Exploratory Data Analysis with visualizations.
- Feature engineering for model input.
- Regression models for price prediction.
- GridSearchCV for hyper-parameter tuning
- Model evaluation using MAE, RMSE, and R² score.

## Tech Stack
- **Python**: Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn
- **Jupyter Notebook** for experimentation

## How It Works
1. User sends a POST request to /predict_car_price with car details.
2. The Node.js backend runs predict.py using the child_process.spawn method.
3. predict.py loads the trained model and feature columns.
4. The script constructs the feature vector, runs the model prediction, and returns the estimated price.
5. The backend sends the result back to the client.

## How to Run
1. Clone this repository:
    git clone https://github.com/Omkar-56/Used-Car-Price-Prediction

2. Python setup
    pip install -r requirements.txt

3. Node.js setup
    cd server
    npm install

4. Start the server
    node server.js