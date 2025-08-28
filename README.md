# schooldistance
API Documentation & Postman Collection
📌 Overview

This repository contains API endpoints for managing resources (e.g., Students and Teachers) along with a Postman collection for testing and demonstration purposes.
The collection includes example requests, responses, and documentation for each API.

📂 APIs Included
1. Get All Students

Method: GET
Endpoint: /students
Description: Fetch a list of all students.

Example Response (200):

[
  {
    "id": 1,
    "name": "John Doe",
    "grade": "10"
  }
]

2. Create a New Student

Method: POST
Endpoint: /students
Description: Add a new student to the database.

Request Body:

{
  "name": "Jane Smith",
  "grade": "9"
}


Example Response (201):

{
  "message": "Student created successfully",
  "id": 2
}

🛠 How to Use the Postman Collection

Download & Install Postman
Download Postman
 if you haven’t already.

Import the Collection

Go to Postman → Import

Select the postman_collection.json file from this repository.

Set the Environment Variables (if applicable)

BASE_URL = Your API base URL (e.g., http://localhost:3000 or deployed server URL).

Run Requests

Select a request from the collection.

Click Send.

Check the response body, status code, and headers.

📦 Files in This Repository

postman_collection.json → The Postman collection with saved requests and examples.

README.md → Documentation for using the collection.

📌 Notes

Make sure the backend server is running before testing APIs.

Update environment variables in Postman to match your setup.

If you are using Railway or another cloud provider, replace localhost with your hosted API URL.

📧 Contact

If you have any questions or issues, feel free to reach out or open an issue in this repository at balkrishna6206@gmail.com.
