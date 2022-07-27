const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const TaskController = require("../controllers/TaskController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");

// User
router.post("/UserRegistration", UserController.UserRegistration);
router.post("/UserLogin", UserController.UserLogin);
router.post(
  "/ProfileUpdate",
  AuthVerifyMiddleware,
  UserController.ProfileUpdate
);
router.get(
  "/ProfileDetails",
  AuthVerifyMiddleware,
  UserController.ProfileDetails
);

// Task
router.post("/CreateTask", AuthVerifyMiddleware, TaskController.CreateTask);
router.get("/DeleteTask/:id/", AuthVerifyMiddleware, TaskController.DeleteTask);
router.get(
  "/UpdateTaskStatus/:id/:Status/",
  AuthVerifyMiddleware,
  TaskController.UpdateTaskStatus
);
router.get(
  "/ListTaskByStatus/:Status/",
  AuthVerifyMiddleware,
  TaskController.ListTaskByStatus
);
router.get(
  "/TaskStatusCount",
  AuthVerifyMiddleware,
  TaskController.TaskStatusCount
);

module.exports = router;
