import { createConnection } from "typeorm";
import { getRepository } from "typeorm";
import { User } from "../api/entity";
import { development, production } from "../database/config";

let environment;

switch (process.env.NODE_ENV) {
  case "development":
    environment = development;
    break;
  case "production":
    environment = production;
  default:
    break;
}

createConnection(environment).then(async () => {
  const user = await getRepository("user").findOne();

  if (user) {
    console.log("admin already available");
    return;
  }
  getRepository("user")
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        name: "admin",
        email: "admin@gmail.com",
        phone_number: "11111111",
        password: "11111111",
        avatar:
          "https://cdn.analyticsvidhya.com/wp-content/uploads/2020/04/featured_image-1.jpg",
        is_admin: true
      },
    ])
    .execute()
    .then(() => console.log("1 admin added successfully"))
    .catch((err) => console.log(err));
});
