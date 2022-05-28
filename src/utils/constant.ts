export type Role = "USER" | "ADMIN";

enum Gender {
  male = "MALE",
  female = "FEMALE",
  other = "OTHER",
}

enum Languages {
  en = "en",
  ko = "ko",
}
enum RoleType {
  user = "USER",
  admin = "ADMIN",
}

enum LoginWith {
  manual = "Manual",
  kakaotalk = "Kakaotalk",
}

enum UserType {
  general = "General",
  business = "Business",
  admin = "Admin",
}

export {
  Gender,
  Languages,
  RoleType,
  LoginWith,
  UserType
};
