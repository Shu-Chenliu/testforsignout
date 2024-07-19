export type User = {
  id:string;
  username: string;
  email: string;
  mobile: string;
  imageURL: string|null;
  authority:string;
  displayId:string;
  hashedPassword:string;
};