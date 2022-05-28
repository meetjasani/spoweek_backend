import express from "express";
import {
  userRole,
  validateUser,
  validateUserByToken,
} from "../../utils/middlewares";
import { upload } from "../../utils/multer";

const router = express.Router();

// /**
//  * @swagger
//  * /user/auth/signup:
//  *  post:
//  *    tags: [User]
//  *    description: Sign Up
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
//  *          login_with:
//  *            type: string
//  *          is_verified:
//  *            type: boolean
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.post("/auth/signup", register.validator, register.controller);

// /**
//  * @swagger
//  * /user/auth/login:
//  *  post:
//  *    tags: [User]
//  *    description: Login
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
//  *          email:
//  *            type: string
//  *          password:
//  *            type: string
//  *          login_with:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *
//  */
// router.post("/auth/login", login.validator, login.controller);


// /**
//  * @swagger
//  * /user/auth/edit:
//  *  patch:
//  *    tags: [User]
//  *    description: Edit User
//  *    security:
//  *    - Token: []
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
//  *          dob:
//  *            type: string
//  *          password:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.patch(
//   "/auth/edit",
//   upload.any(),
//   edit.validator,
//   validateUserByToken,
//   edit.controller
// );

// /**
//  * @swagger
//  * /user/auth/delete:
//  *  patch:
//  *    tags: [User]
//  *    description: Delete User Self
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *      type: string
//  *    security:
//  *    - Token: []
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.patch("/auth/delete", validateUserByToken, deleteUserSelf.controller);

// /**
//  * @swagger
//  * /user/otp-send:
//  *  post:
//  *    tags: [User]
//  *    description: Otp Send
//  *    parameters:
//  *    - in: body
//  *      name: body
//  *      required: true
//  *      schema:
//  *        type: object
//  *        properties:
//  *          mobile:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.post("/otp-send", sendOtp.validator, sendOtp.controller);

// /**
//  * @swagger
//  * /user/otp-verify:
//  *  post:
//  *    tags: [User]
//  *    description: Otp Verify
//  *    parameters:
//  *    - in: body
//  *      name: body
//  *      required: true
//  *      schema:
//  *        type: object
//  *        properties:
//  *          mobile:
//  *            type: string
//  *          code:
//  *            type: number
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.post("/otp-verify", verifyOtp.validator, verifyOtp.controller);

// /**
//  * @swagger
//  * /user/getUser:
//  *  get:
//  *    tags: [User]
//  *    description: get user
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *      type: string
//  *    security:
//  *    - Token: []
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.get("/getUser", getUser.controller);

// /**
//  * @swagger
//  * /user/validate:
//  *  get:
//  *    tags: [User]
//  *    description: User validate
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *      type: string
//  *    security:
//  *    - Token: []
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.get("/validate", verifyUser.controller);

// /**
//  * @swagger
//  * /user/getEmail:
//  *  post:
//  *    tags: [User]
//  *    description: Get Email
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
//  *          mobile:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.post("/getEmail", getEmail.validator, getEmail.controller);

// /**
//  * @swagger
//  * /user/checkPassword:
//  *  post:
//  *    tags: [User]
//  *    description: Get Check Password
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
//  *          email:
//  *            type: string
//  *          mobile:
//  *            type: string
//  *          password:
//  *            type: string 
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.post("/checkPassword", checkPassword.validator, checkPassword.controller);

// /**
//  * @swagger
//  * /user/sendForgotlink:
//  *  post:
//  *    tags: [User]
//  *    description: Senfd Forgot Link
//  *    security:
//  *    - Token: []
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
//  *          email:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.post(
//   "/sendForgotlink",
//   sendEmail.validator,
//   validateUser,
//   sendEmail.controller
// );

// /**
//  * @swagger
//  * /user/auth/forgot:
//  *  post:
//  *    tags: [User]
//  *    description: Forgot
//  *    security:
//  *    - Token: []
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
//  *          password:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.post("/forgot", forgotPassword.validator, forgotPassword.controller);

// /**
//  * @swagger
//  * user/{id}:
//  *  get:
//  *    tags: [User]
//  *    description: get User By Id
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: path
//  *      name: id
//  *      type: string
//  *      required: true
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.get("/:id", userById.validator, userRole, userById.controller);


// /**
//  * @swagger
//  * /user/changeUserSubscription:
//  *  patch:
//  *    tags: [User]
//  *    description: Change User Subscription
//  *    security:
//  *    - Token: []
//  *    parameters:
//  *    - in: query
//  *      name: lang
//  *      required: true
//  *    - in: query
//  *      type: string 
//  *      name: user_type
//  *      enum: [ "Non", "Standard", "Basic", "Premium"]
//  *      required: false
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.patch(
//   "/changeUserSubscription",
//   changeUserSubscription.validator,
//   validateUserByToken,
//   changeUserSubscription.controller
// );

// /**
//  * @swagger
//  * /user/sendInviteFamilyMemeberEmail:
//  *  post:
//  *    tags: [User]
//  *    description: check email before send
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
//  *          email:
//  *            type: string
//  *    responses:
//  *      200:
//  *        description: Success
//  *        content: {}
//  *
//  */
// router.post(
//   "/sendInviteFamilyMemeberEmail",
//   sendInviteFamilyMemeberEmail.validator,
//   sendInviteFamilyMemeberEmail.controller
// );

export default router;
