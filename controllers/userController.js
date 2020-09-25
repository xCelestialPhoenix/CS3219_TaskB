const db = require("../database/mySqlDb");
const User = require("../models/user");

exports.index = function (request, res) {
    db.query(User.getAllUsers(), (error, result) => {
         console.log("Select all result: ");
         console.log(result);
        if (error) {
           res.status(400).json({
              "status": "error",
              "message": error,
           })
        } else {
            res.status(200).json({
                "status": "success",
                "data": result,
             })
        }
     });

};

// Handle create contact actions
exports.addUser = function (request, res) {

   const user = new User(request.body);

   // Save the user
   db.query(user.addUser(), (error, result) => {
      // Check for error
      if (error) {
         res.status(400).json({
            "status": "error",
            "message": error,
         })
      } else {
          res.status(200).json({
              "status": "success",
              "data": result,
           })
      }
   });
};

exports.viewUser = function (request, res) {
   const username = '"' + request.params.username + '"';
   db.query(User.getUserByUsername(username), (error, result) => {

      console.log("Select result: ");
      console.log(result);
      if(error) {
         res.status(404).json({
            'error': error.message,
         });
      } else if(result.length === 0) {
         res.status(404).json({
            'error': "User not found."
         });
      } else {
         res.status(200).json({
            'data': result,
         });
      }
   })
}

exports.updateUser = function (request, res) {
   
   const user = new User(request.body);
   const username = '"' + request.params.username + '"';
   db.query(user.updateUser(username), (error, result) => {
      if(error) {
         res.status(400).json({
            'error': error.message,
         });
      } else {
         db.query(User.getUserByUsername(username), (error, userData) => {
            if (error) {
               res.status(400).json({
                  'error': error.message,
               });
            }

            res.status(200).json({
               'message': 'User updated successfully.',
               'data': userData,
            });
         });
      }
   });
}

exports.deleteUser = function (request, res) {
   const username = '"' + request.params.username + '"';
   db.query(User.deleteUserByUsername(username), (error, userData) => {
      if (error) {
         res.status(404).json({
            'error': error.message,
         });
      }

      res.status(200).json({
         'message': 'User deleted successfully.',
         'data': userData,
      });
   })
}