const db = require("../database/mySqlDb");
const User = require("../models/user");

// Handles getting all users in the database 
exports.viewAllUser = function (request, response) {
    db.query(User.getAllUsers(), (error, result) => {
        if (error) {
            response.status(400)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    "status": "error",
                    "message": error,
                })
        } else if(result.length === 0) {
            response.status(404)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    'error': "User not found",
                });
        } else {
            response.status(200)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    "status": "success",
                    "data": result,
                })
        }
    });
};

// Handles getting one user in the database
exports.viewUser = function (request, response) {
    const username = '"' + request.params.username + '"';
    db.query(User.getUserByUsername(username), (error, result) => {
        if(error) {
            response.status(400)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    'error': error.message,
                });
        } else if(result.length === 0) {
            response.status(404)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    'error': "User not found",
                });
        } else {
            response.status(200)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    'data': result,
                });
        }
    })
};

// Handles create user
exports.addUser = function (request, response) {

    const user = new User(request.body);

    // Save the user
    db.query(user.addUser(), (error, result) => {
        // Check for error
        if (error) {
            console.log(error);
            response.status(400)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'POST, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    "status": "error",
                    "message": error,
                })
        } else {
            response.status(200)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'POST, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    "status": "success",
                    "data": result,
                })
        }
    });
};

// Handles updating user
exports.updateUser = function (request, response) {
   
    const user = new User(request.body);
    const username = '"' + request.params.username + '"';
    db.query(User.getUserByUsername(username), (error, userData) => {
        if (error) {
            response.status(400)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'PUT, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    'error': error.message,
                });
        } else if(userData.length === 0) {
            response.status(404)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    'error': "User not found."
                });
        } else {
            db.query(user.updateUser(username), (error, result) => {
                if(error) {
                    response.status(400)
                        .header("Access-Control-Allow-Origin", "http://localhost:8080")
                        .header('Access-Control-Allow-Methods', 'PUT, OPTIONS')
                        .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                        .json({
                            'error': error.message,
                        });
                } else {
                    response.status(200)
                    .header("Access-Control-Allow-Origin", "http://localhost:8080")
                    .header('Access-Control-Allow-Methods', 'PUT, OPTIONS')
                    .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                    .json({
                        'message': 'User updated successfully.',
                        'data': result,
                    });
                }
            })
        }
    });
};

// Handles deleting user
exports.deleteUser = function (request, response) {
    const username = '"' + request.params.username + '"';
    db.query(User.getUserByUsername(username), (error, userData) => {
        if (error) {
            response.status(400)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    'error': error.message,
                });

        } else if (userData.length === 0){
            response.status(404)
                .header("Access-Control-Allow-Origin", "http://localhost:8080")
                .header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                .json({
                    'error': "User not found",
                });
        } else {
            db.query(User.deleteUserByUsername(username), (error, result) => {
                if (error) {
                    response.status(400)
                        .header("Access-Control-Allow-Origin", "http://localhost:8080")
                        .header('Access-Control-Allow-Methods', 'DELETE, OPTIONS')
                        .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                        .json({
                            'error': error.message,
                        });
                } else {
                    response.status(200)
                        .header("Access-Control-Allow-Origin", "http://localhost:8080")
                        .header('Access-Control-Allow-Methods', 'DELETE, OPTIONS')
                        .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
                        .json({
                            'message': 'User deleted successfully.',
                            'data': result,
                        });
                }
            })
        }
    });
};