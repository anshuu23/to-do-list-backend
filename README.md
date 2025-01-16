<h1>to-do-list</h1> <br>

This backend provides RESTful APIs for managing tasks stored in a MongoDB database. It handles CRUD operations and search functionality.

API Endpoints
1.1 POST /createAccount
Description: Creates an account.
Request: You need to send name, email, and password in the body.
Example: { "name": "Anshu", "email": "anshr", "password": "1234" }
Response: Returns a token. The token needs to be sent as an authorization header.
Example: Authorization: Bearer <token>
1.2 POST /login
Description: Logs in the user.
Request: You need to send email and password in the body.
Example: { "name": "Anshu", "email": "anshr", "password": "1234" }
Response: Returns a token. The token needs to be sent as an authorization header.
Example: Authorization: Bearer <token>
All routes below require the token to be sent in the Authorization header.

2.1 GET /tasks
Description: Retrieves all tasks.
Response: An array of tasks, each containing:
id: Unique identifier
taskName: String
isCompleted: Boolean
2.2 POST /tasks
Description: Adds a new task.
Request Body: { "taskName": "string", "isCompleted": false }
Response: The created task object.
2.3 PUT /tasks/:id
Description: Updates a task’s details by its ID.
Request Body: { "taskName": "string", "isCompleted": boolean }
Response: The updated task object.
2.4 DELETE /tasks/:id
Description: Removes a task by its ID.
Response: Confirmation message.
2.5 GET /tasks/search?query=
Description: Searches for tasks by name.
Query Parameter:
query: The search term.
Response: An array of matching tasks.
