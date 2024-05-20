# Phishing URL Detection

This project is a MERN stack application that detects phishing URLs using a machine learning model (XGBoost). The backend runs a Python script to classify URLs as "Phishing" or "Legitimate" based on various features.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- Python 3.x
- pip (Python package installer)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/yourusername/phishing-url-detection.git
    cd phishing-url-detection
    ```

2. **Backend Setup:**

    Navigate to the backend directory and install dependencies:

    ```sh
    cd Backend
    npm install
    ```

3. **Frontend Setup:**

    Navigate to the frontend directory and install dependencies:

    ```sh
    cd ../frontend
    npm install
    ```

4. **Python Environment Setup:**

    Install the required Python packages:

    ```sh
    pip install pandas xgboost
    ```

5. **Model Setup:**

    Ensure you have the `XGBoostClassifier.pickle.dat` file in your backend directory. If not, train your model and save it as `XGBoostClassifier.pickle.dat`.

## Running the Application

1. **Start MongoDB:**

    Make sure your MongoDB server is running. You can start it with:

    ```sh
    mongod
    ```

2. **Start the Backend Server:**

    Navigate to the backend directory and start the server:

    ```sh
    cd Backend
    npm start
    ```

3. **Start the Frontend Server:**

    Navigate to the frontend directory and start the development server:

    ```sh
    cd ../frontend
    npm start
    ```

The backend server should run on `http://localhost:8081` and the frontend on `http://localhost:3000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter a URL in the input field and click "Check the URL".
3. The application will classify the URL as "Phishing" or "Legitimate" and display the result.

## Folder Structure

