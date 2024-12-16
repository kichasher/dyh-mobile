export type UserType = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  education: object;
  skills: [];
  experience: [];
};

export type TokenType = {
  access_token: string;
  refresh_token: string;
};
export type authSliceType = {
  user: (UserType & TokenType) | null;
};
