from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)
model = joblib.load('gbr_model.joblib')
scaler = joblib.load('scaler.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    feature_names = ['grade', 'sqft_living15', 'lat', 'sqft_above', 'bathrooms',
                    'bedrooms', 'floors', 'sqft_basement', 'sqft_lot15','condition', 
                    'long', 'yr_built', 'waterfront', 'view', 'renovated']
    features = pd.DataFrame([data], columns=feature_names)
    features_scaled = scaler.transform(features)
    features_scaled_df = pd.DataFrame(features_scaled, columns=features.columns)
    prediction = model.predict(features_scaled_df)
    return jsonify({'predicted_price': float(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)