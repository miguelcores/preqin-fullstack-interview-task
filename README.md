# Preqin Fullstack Interview Task

This project is a demonstration of a fullstack application built using React with TypeScript for the frontend and FastAPI with SQLite for the backend. The application allows users to view a list of investors and their total commitments, as well as a breakdown of each investor's commitments with the ability to filter commitments by asset class.

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Install the required dependencies by running:
   ```
   pip install -r requirements.txt
   ```
3. Create the investors and commitments tables in the SQLite database and load the data from data.csv:
   ```
   python -m app.utils.data_loader
   ```
4. Run the FastAPI application:
   ```
   uvicorn app.main:app --reload
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Install the required dependencies by running:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the frontend application.
- You will see a list of investors. Click on an investor to view their commitments and filter by asset class.

## Conclusion

This project showcases the integration of a React frontend with a FastAPI backend, utilizing SQLite for data storage. It demonstrates the ability to fetch and display data, as well as provide a user-friendly interface for interacting with investor information.