# **Inventory Management Application**

This repository contains an Inventory Management Application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) with Docker containerization. The application provides full CRUD operations for managing inventory items, including image uploads, and is securely deployed on AWS EC2 using Docker and a reverse proxy.

## **Features**

1. **Inventory Management**:
   - Create, update, and delete inventory items.
   - Each item includes an image, name, and quantity.
   - Form-based input with validation for adding and editing items.
   - Fetch and display items dynamically from MongoDB in a responsive UI.

2. **User Authentication**:
   - Signup and Login functionalities with secure authentication.
   - Users can view their information after logging in.
   - Passwords are securely hashed and stored in the database.

3. **Error Handling**:
   - User-friendly error messages for form validation and failed operations.
   - Alerts when the inventory is empty.

4. **Containerization**:
   - Fully containerized application using Docker with a multi-service architecture.
   - Docker Compose file to define services for MongoDB, the app, and a reverse proxy (Caddy) for HTTP communication.
   - Local development on port 3000 and deployment over port 80 on the EC2 instance.

## **Technologies Used**

- **Frontend**: React.js, Bootstrap CSS framework.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (containerized in Docker).
- **Containerization**: Docker, Docker Compose.
- **Deployment**: AWS EC2, Caddy for reverse proxy.

## **How to Run the Project Locally**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
2. Build the Docker images:
   ```bash
   docker-compose up

3. Access the app locally:
   - Inventory Management: http://localhost:3000
   - MongoDB runs as a service in the Docker container.
  
## **Deployment**
The application is deployed on AWS EC2 using Docker.



## **API Endpoints**

- `GET /api/inventory` - Fetch all inventory items.
- `POST /api/inventory` - Create a new inventory item.
- `PUT /api/inventory/:id` - Update an inventory item.
- `DELETE /api/inventory/:id` - Delete an inventory item.


## **Instructions**

To contribute or make changes, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   ```
5. Open a pull request.

   
