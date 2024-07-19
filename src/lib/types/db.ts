export type User = {
  username: string;
  email: string;
  mobile: string;
  imageURL: string|null;
  authority:string;
  displayId:string;
  hashedPassword:string;
};