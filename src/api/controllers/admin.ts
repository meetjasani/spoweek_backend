import { celebrate } from "celebrate";
import { Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import { getRepository } from "typeorm";
import APIResponse from "../../utils/APIResponse";
import { Languages, LoginWith, RoleType } from "../../utils/constant";
import { getJWTToken } from "../../utils/jwt.helper";
import { User } from "../entity";

const login = {
  validator: celebrate({
    query: Joi.object().keys({
      lang: Joi.string(),
    }),
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),

  controller: async (req: Request, res: Response): Promise<Response> => {
    try {
      const adminRepo = getRepository(User);

      // Email checking
      const admin = await adminRepo.findOne({
        where: { email: req.body.email, is_admin: true },
      });

      if (admin) {

        const passwordMatch = await adminRepo.findOne({
          where: { password: req.body.password },
        });

        if (passwordMatch) {

          const token = getJWTToken({
            id: admin.id,
            email: req.body.email,
            role: RoleType.admin,
          });

          const newUser = {
            id: admin.id,
            email: req.body.email,
            role: RoleType.admin,
            token,
          };

          return res
            .status(httpStatus.OK)
            .json(
              new APIResponse(
                newUser,
                "Login Successfully",
                200,
                httpStatus[200]
              )
            );
        }
        return res
          .status(httpStatus.BAD_REQUEST)
          .json(
            new APIResponse(
              null,
              "Wrong Password",
              httpStatus.BAD_REQUEST,
              "Wrong Password"
            )
          );
      }
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          new APIResponse(
            null,
            "Wrong Email",
            httpStatus.BAD_REQUEST,
            "Wrong Email"
          )
        );
      // throw new Error("There is no corresponding member information.");
    } catch (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          new APIResponse(
            null,
            "Incorrect Password",
            httpStatus.BAD_REQUEST,
            error
          )
        );
    }
  },
};



// // ###
// const resetPassword = {
//   validator: celebrate({
//     query: Joi.object().keys({
//       lang: Joi.string(),
//     }),
//     body: Joi.object().keys({
//       old_password: Joi.string().required(),
//       new_password: Joi.string().required(),
//     }),
//   }),

//   controller: async (req: any, res: Response): Promise<Response> => {
//     try {
//       const adminRepo = getRepository(User);
//       const user = await adminRepo.findOne({ where: { id: req.user.id, is_admin: true } });

//       if (!user) {
//         return res
//           .status(404)
//           .json(new APIResponse(null, "User not Exists", 404, httpStatus[404]));
//       }
//       const old_password = await hashPassword(req.body.old_password)

//       if (!(old_password == user.password)) {
//         return res
//           .status(400)
//           .json(new APIResponse(null, "Wrong Password", 400, httpStatus[400]));
//       }

//       const newPassword = await encrypt(req.body.new_password);

//       adminRepo.merge(user, { password: newPassword });
//       const results = await adminRepo.save(user);

//       if (results) {
//         return res
//           .status(httpStatus.OK)
//           .json(new APIResponse(null, "Password Changed", 200));
//       }
//       throw new Error("User not Exists");
//     } catch (error) {
//       return res
//         .status(404)
//         .json(new APIResponse(null, "User not Exists", 404, error));
//     }
//   },
// };

// const addUser = {
//   validator: celebrate({
//     query: Joi.object().keys({
//       lang: Joi.string(),
//     }),
//     body: Joi.object().keys({
//       name: Joi.string().required(),
//       email: Joi.string().required(),
//       mobile: Joi.string().required(),
//       password: Joi.string().required().min(8),
//       user_type: Joi.string().required(),
//     }),
//   }),

//   controller: async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const userRepo = getRepository(User);

//       const checkUser = await userRepo.findOne({
//         where: {
//           email: req.body.email,
//           login_with: req.body.login_with,
//           is_deleted: false,
//           is_admin: false
//         },
//       });
//       if (!checkUser) {
//         if (req.query.lang === Languages.en) {

//           const planRepo = getRepository(Plan);
//           const subcriptionRepo = getRepository(Subcription);

//           const planUser = await planRepo.findOne({
//             where: {
//               plan_type: req.body.user_type
//             },
//           });

//           if (planUser) {

//             // Password Encryption
//             const newPassword = await encrypt(req.body.password);
//             const newUser = {
//               avatar: null,
//               name: req.body.name,
//               email: req.body.email,
//               mobile: req.body.mobile,
//               password: newPassword,
//               login_with: LoginWith.Manual,
//               is_admin: false,
//               plan_type: planUser.plan_type
//             };

//             // Create and add the user into database
//             const user = userRepo.create(newUser);
//             let result = await userRepo.save(user);
//             result = JSON.parse(JSON.stringify(result));

//             if (result) {

//               const newUserSubcription = {
//                 plan_id: planUser.id,
//                 plan_status: true,
//                 plan_type: planUser.plan_type,
//                 MaxPictures: planUser.MaxPictures,
//                 MaxPicturesSize: planUser.MaxPicturesSize,
//                 MaxVideo: planUser.MaxVideo,
//                 MaxVideoSize: planUser.MaxVideoSize
//               }

//               newUserSubcription["user"] = result.id

//               const userSubcription = subcriptionRepo.create(newUserSubcription);
//               await subcriptionRepo.save(userSubcription);

//               return res
//                 .status(httpStatus.OK)
//                 .json(
//                   new APIResponse(
//                     null,
//                     "User added Succesfully",
//                     httpStatus.OK
//                   )
//                 );
//             }
//           }
//         } else {
//           const planRepo = getRepository(Plan);
//           const subcriptionRepo = getRepository(Subcription);

//           const planUser = await planRepo.findOne({
//             where: {
//               plan_type: req.body.user_type
//             },
//           });

//           if (planUser) {
//             // Password Encryption
//             const newPassword = await encrypt(req.body.password);

//             // Encrypted password add into user detail
//             const newUser = {
//               avatar: null,
//               name: req.body.name,
//               email: req.body.email,
//               mobile: req.body.mobile,
//               password: newPassword,
//               user_type: req.body.user_type,
//               login_with: LoginWith.Manual,
//               is_admin: false,
//               plan_type: planUser.plan_type
//             };



//             // Create and add the user into database
//             const user = userRepo.create(newUser);
//             let result = await userRepo.save(user);
//             result = JSON.parse(JSON.stringify(result));

//             if (result) {

//               const newUserSubcription = {
//                 plan_id: planUser.id,
//                 plan_status: true,
//                 plan_type: planUser.plan_type,
//                 MaxPictures: planUser.MaxPictures,
//                 MaxPicturesSize: planUser.MaxPicturesSize,
//                 MaxVideo: planUser.MaxVideo,
//                 MaxVideoSize: planUser.MaxVideoSize
//               }

//               newUserSubcription["user"] = result.id

//               const userSubcription = subcriptionRepo.create(newUserSubcription);
//               await subcriptionRepo.save(userSubcription);

//               return res
//                 .status(httpStatus.OK)
//                 .json(
//                   new APIResponse(
//                     null,
//                     "User added Succesfully",
//                     httpStatus.OK
//                   )
//                 );
//             }
//           }
//         }

//         throw new Error("User Not Added");
//       }
//       throw new Error("User already exists");
//     } catch (error) {
//       //fs.unlinkSync(req.files[0].path);
//       return res
//         .status(httpStatus.BAD_REQUEST)
//         .json(
//           new APIResponse(
//             null,
//             "User already exists",
//             httpStatus.BAD_REQUEST,
//             error
//           )
//         );
//     }
//   },
// };

// // ### To get all the user
// const getUsers = {
//   validator: ({
//     query: Joi.object().keys({
//       lang: Joi.string(),
//     }),
//   }),

//   controller: async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const userRepo = getRepository(User);

//       const users = await userRepo.find({ where: { is_deleted: false, is_admin: false } });

//       if (users) {
//         return res
//           .status(httpStatus.OK)
//           .json(
//             new APIResponse(users, "Users get successfully.", httpStatus.OK)
//           );
//       }

//       throw new Error("Users not found.");
//     } catch (error) {
//       return res
//         .status(404)
//         .json(
//           new APIResponse(
//             null,
//             "Cannot get Users.",
//             httpStatus.NOT_FOUND,
//             error
//           )
//         );
//     }
//   },
// };

// const deleteUserByAdmin = {
//   validator: celebrate({
//     body: Joi.object().keys({
//       id: Joi.string().required(),
//     }),
//     query: Joi.object().keys({
//       lang: Joi.string(),
//     }),
//   }),

//   controller: async (req: any, res: Response): Promise<Response> => {
//     try {
//       const userRepo = getRepository(User);

//       const results = await userRepo
//         .createQueryBuilder()
//         .delete()
//         .where("id IN(:...ids)", { ids: req.body.id.split(',').map((x) => x) })
//         .andWhere("is_admin =:is_admin", { is_admin: false })
//         .execute();

//       // const user = await userRepo.findOne({
//       //   where: { id: req.params.id, is_deleted: false },
//       // });

//       // if (!user) {
//       //   return res
//       //     .status(httpStatus.BAD_REQUEST)
//       //     .json(
//       //       new APIResponse(null, "User not Exists", httpStatus.BAD_REQUEST)
//       //     );
//       // }

//       // userRepo.merge(user, {
//       //   is_deleted: true,
//       //   deleted_at: new Date().toUTCString(),
//       //   deleted_by: RoleType.admin,
//       // });
//       // const results = await userRepo.save(user);

//       if (results) {
//         return res
//           .status(httpStatus.OK)
//           .json(new APIResponse(null, "User Deleted", httpStatus.OK));
//       }
//       throw new Error("User not Exists");
//     } catch (error) {
//       return res
//         .status(httpStatus.BAD_REQUEST)
//         .json(
//           new APIResponse(
//             null,
//             "User not Exists",
//             httpStatus.BAD_REQUEST,
//             error
//           )
//         );
//     }
//   },
// };

// const validateAdmin = {
//   validator: celebrate({
//     query: Joi.object().keys({
//       lang: Joi.string(),
//     }),
//   }),
//   controller: async (req: any, res: Response) => {
//     return res
//       .status(httpStatus.OK)
//       .json(new APIResponse(null, "Admin Verified", httpStatus.OK));
//   },
// };

// const editUser = {
//   validator: celebrate({
//     query: Joi.object().keys({
//       id: Joi.string().required(),
//       lang: Joi.string(),
//     }),
//     body: Joi.object().keys({
//       name: Joi.string().required(),
//       email: Joi.string().required(),
//       mobile: Joi.string().required(),
//       password: Joi.string().required().min(8),
//       user_type: Joi.string().required(),
//     }),
//   }),

//   controller: async (req: any, res: Response): Promise<Response> => {
//     try {
//       const userRepo = getRepository(User);

//       const checkUser = await userRepo.findOne({ where: { id: req.query.id, is_admin: false } });

//       if (!checkUser) {
//         return res
//           .status(httpStatus.BAD_REQUEST)
//           .json(
//             new APIResponse(
//               null,
//               "User not found",
//               httpStatus.BAD_REQUEST,
//               httpStatus.BAD_REQUEST
//             )
//           );
//       }

//       const planRepo = getRepository(Plan);
//       const subcriptionRepo = getRepository(Subcription);
//       const checkSubcription = await subcriptionRepo.findOne({ where: { user: req.query.id } })

//       const newUserSubcription = {
//         plan_status: false,
//         plan_expiry: new Date().toUTCString()
//       }

//       subcriptionRepo.merge(checkSubcription, newUserSubcription);
//       await subcriptionRepo.save(checkSubcription);;

//       const planUser = await planRepo.findOne({
//         where: {
//           plan_type: req.body.user_type
//         },
//       });


//       if (planUser) {

//         const newPassword = await encrypt(req.body.password);

//         let data = {
//           name: req.body.name,
//           email: req.body.email,
//           mobile: req.body.mobile,
//           password: newPassword,
//           plan_type: planUser.plan_type
//         };

//         userRepo.merge(checkUser, data);
//         const result = await userRepo.save(checkUser);

//         if (result) {

//           const newUserSubcription = {
//             plan_id: planUser.id,
//             plan_status: true,
//             plan_type: planUser.plan_type,
//             MaxPictures: planUser.MaxPictures,
//             MaxPicturesSize: planUser.MaxPicturesSize,
//             MaxVideo: planUser.MaxVideo,
//             MaxVideoSize: planUser.MaxVideoSize,

//           }
//           newUserSubcription["user"] = req.query.id

//           const userSubcription = subcriptionRepo.create(newUserSubcription);
//           await subcriptionRepo.save(userSubcription);

//           return res
//             .status(httpStatus.OK)
//             .json(new APIResponse(null, "User edit successfully", httpStatus.OK));
//         }
//       }
//       throw new Error("User not Exists");
//     } catch (error) {
//       return res
//         .status(httpStatus.BAD_REQUEST)
//         .json(
//           new APIResponse(
//             null,
//             "Error in user edit",
//             httpStatus.BAD_REQUEST,
//             error
//           )
//         );
//     }
//   },
// };


// const terminateUserByAdmin = {
//   validator: celebrate({
//     body: Joi.object().keys({
//       id: Joi.string().required(),
//     }),
//     query: Joi.object().keys({
//       lang: Joi.string(),
//     }),
//   }),

//   controller: async (req: any, res: Response): Promise<Response> => {
//     try {
//       const userRepo = getRepository(User);

//       const results = await userRepo
//         .createQueryBuilder()
//         .update(User)
//         .set({ is_deleted: true, deleted_at: new Date().toUTCString(), deleted_by: RoleType.admin })
//         .where("id IN(:...ids)", { ids: req.body.id.split(',').map((x) => x) })
//         .execute();

//       if (results) {
//         return res
//           .status(httpStatus.OK)
//           .json(new APIResponse(null, "User Terminated", httpStatus.OK));
//       }
//       throw new Error("User not Exists");
//     } catch (error) {
//       return res
//         .status(httpStatus.BAD_REQUEST)
//         .json(
//           new APIResponse(
//             null,
//             "User not Exists",
//             httpStatus.BAD_REQUEST,
//             error
//           )
//         );
//     }
//   },
// };

export {
  login,
  // resetPassword,
  // getUsers,
  // addUser,
  // deleteUserByAdmin,
  // validateAdmin,
  // editUser,
  // terminateUserByAdmin
};
