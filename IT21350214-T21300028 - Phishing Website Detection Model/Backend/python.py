#!/usr/bin/env python
# coding: utf-8

import sys
import pandas as pd
import pickle
from xgboost import XGBClassifier

# Load the saved XGBoost model
loaded_model = pickle.load(open("XGBoostClassifier.pickle.dat", "rb"))

# Define a function to extract features from the URL
def extract_features(url):
    features = {
        'Have_IP': 0,  # Example: Check if URL contains an IP address
        'Have_At': 0,  # Example: Check if URL contains '@' symbol
        'URL_Length': len(url),
        'URL_Depth': url.count('/'),
        'Redirection': url.count('//'),
        'https_Domain': 1 if 'https' in url else 0,
        'TinyURL': 1 if 'tinyurl' in url else 0,
        'Prefix/Suffix': 1 if '-' in url else 0,
        'DNS_Record': 1,  # Placeholder for actual DNS record check
        'Web_Traffic': 1,  # Placeholder for actual web traffic data
        'Domain_Age': 1,  # Placeholder for actual domain age check
        'Domain_End': 1,  # Placeholder for actual domain expiration check
        'iFrame': 0,  # Placeholder for actual iframe detection
        'Mouse_Over': 0,  # Placeholder for actual mouse over detection
        'Right_Click': 0,  # Placeholder for actual right-click detection
        'Web_Forwards': 0  # Placeholder for actual web forward count
    }
    return pd.DataFrame([features])

# Define a function to predict phishing
def predict_phishing(url):
    features = extract_features(url)
    prediction = loaded_model.predict(features)
    return "Phishing" if prediction == 0 else "Legitimate"

# Read the input URL from stdin
input_url = sys.stdin.read().strip()

# Predict and print the result
if input_url:
    result = predict_phishing(input_url)
    print(result)
else:
    print("No URL provided")
