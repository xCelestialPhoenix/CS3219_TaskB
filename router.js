const router = require("express").Router();
const userController = require("./controllers/userController");

router.get("/", function (request, result, next) {
    result.json({
        status: "API is Working.",
    });
});

// GET users listing.
router.route("/user")
    .get(userController.index)
    .post(userController.addUser);

router.route('/user/:username')
    .get(userController.viewUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

// Export API routes
module.exports = router;