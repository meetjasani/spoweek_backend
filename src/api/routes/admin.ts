import express from "express";
import { userRole } from "../../utils/middlewares";
import { upload } from "../../utils/multer";

const router = express();

// /**
//  * @swagger
//  * /admin/auth/login:
//  *  post:
//  *    tags: [Admin]
//  *    description: Admin Login
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      type: string
//  *      required: true
//  *    - in: body
//  *      name: body
//  *      required: true
//  *      schema:
//  *        type: object
//  *        properties:
//  *          email:
//  *            type: string
//  *          password:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *
//  */
// router.post("/auth/login", login.validator, login.controller);

// /**
//  * @swagger
//  * /admin/addUser:
//  *  post:
//  *    tags: [Admin]
//  *    description: Add user by admin
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *      type: string
//  *    - in: body
//  *      name: body
//  *      required: true
//  *      schema:
//  *        type: object
//  *        properties:
//  *          name:
//  *            type: string
//  *          email:
//  *            type: string
//  *          mobile:
//  *            type: string
//  *          password:
//  *            type: string
//  *          user_type:
//  *            type: string
//  *    security:
//  *    - Token: []
//  *    responses:
//  *      200:
//  *        description: Success
//  *
//  */
// router.post(
//   "/addUser",
//   upload.any(),
//   userRole,
//   addUser.validator,
//   addUser.controller
// );

// /**
//  * @swagger
//  * /admin/auth/reset:
//  *  post:
//  *    tags: [Admin]
//  *    description: Reset Admin
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      type: string
//  *      required: true
//  *    - in: body
//  *      name: body
//  *      required: true
//  *      schema:
//  *        type: object
//  *        properties:
//  *          new_password:
//  *            type: string
//  *          old_password:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *
//  */
// router.post("/auth/reset", resetPassword.validator, resetPassword.controller);

// /**
//  * @swagger
//  * /admin/auth/deleteUser:
//  *  put:
//  *    tags: [Admin]
//  *    description: Delete User
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *      type: string
//  *    - in: body
//  *      name: id
//  *      type: string
//  *      required: true
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.put(
//   "/auth/deleteUser",
//   userRole,
//   deleteUserByAdmin.validator,
//   deleteUserByAdmin.controller
// );

// /**
//  * @swagger
//  * /admin/validate:
//  *  post:
//  *    tags: [Admin]
//  *    description: Admin Validate
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *      type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *
//  */
// router.get("/validate", validateAdmin.validator, userRole, validateAdmin.controller);

// /**
//  * @swagger
//  * /admin/editUser:
//  *  patch:
//  *    tags: [Admin]
//  *    description: Edit User
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: query
//  *      name: id
//  *      type: string
//  *      required: true
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *      type: string
//  *    - in: body
//  *      name: body
//  *      required: true
//  *      schema:
//  *        type: object
//  *        properties:
//  *          name:
//  *            type: string
//  *          email:
//  *            type: string
//  *          mobile:
//  *            type: string
//  *          password:
//  *            type: string
//  *          user_type:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.patch(
//   "/editUser",
//   upload.any(),
//   userRole,
//   editUser.validator,
//   editUser.controller
// );

// /**
//  * @swagger
//  * /admin/users:
//  *  get:
//  *    tags: [Admin]
//  *    description: Get Users
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *      type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *
//  */
// router.get("/users", userRole, getUsers.controller);

// /**
//  * @swagger
//  * /admin/getFilteredUser:
//  *  get:
//  *    tags: [Admin]
//  *    description: Get Filtered User`
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: query
//  *      name: date_option
//  *      enum: [ "sign_up", "deletion" ]
//  *      required: false
//  *      type: string
//  *    - in: query
//  *      name: start_date
//  *      required: false
//  *      type: string
//  *    - in: query
//  *      name: end_date
//  *      required: false
//  *      type: string
//  *    - in: query
//  *      name: user_information
//  *      enum: [ "email", "name", "dob", "mobile"]
//  *      required: false
//  *      type: string
//  *    - in: query
//  *      name: search_term
//  *      required: false
//  *      type: string
//  *    - in: query
//  *      name: user_type
//  *      enum: [ "Non", "Standard", "Basic", "Premium"]
//  *      required: false
//  *      type: string
//  *    - in: query
//  *      name: per_page
//  *      type: number
//  *      required: true
//  *    - in: query
//  *      name: page_number
//  *      type: number
//  *      required: true
//  *    - in: query
//  *      name: lang
//  *      type: string
//  *      enum: ['ko', 'en']
//  *      required: true
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */

// router.get(
//   "/getFilteredUser",
//   userRole,
//   getFilteredUsers.validator,
//   getFilteredUsers.controller
// );


// /**
//  * @swagger
//  * /admin/auth/terminateUser:
//  *  put:
//  *    tags: [Admin]
//  *    description: Terminate User
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *      type: string
//  *    - in: body
//  *      name: id
//  *      type: string
//  *      required: true
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.put(
//   "/auth/terminateUser",
//   userRole,
//   terminateUserByAdmin.validator,
//   terminateUserByAdmin.controller
// );

// /**
//  * @swagger
//  * /admin/getTerminatedUsers:
//  *  get:
//  *    tags: [Admin]
//  *    description: Get Terminated Users`
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: query
//  *      name: start_date
//  *      required: false
//  *      type: string
//  *    - in: query
//  *      name: end_date
//  *      required: false
//  *      type: string
//  *    - in: query
//  *      name: search_term
//  *      required: false
//  *      type: string
//  *    - in: query
//  *      name: per_page
//  *      type: number
//  *      required: true
//  *    - in: query
//  *      name: page_number
//  *      type: number
//  *      required: true
//  *    - in: query
//  *      name: lang
//  *      type: string
//  *      enum: ['ko', 'en']
//  *      required: true
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */

// router.get(
//   "/getTerminatedUsers",
//   userRole,
//   getTerminatedUsers.validator,
//   getTerminatedUsers.controller
// );



export default router;
