export type User = {
  username: string;
  email: string;
  mobile: string;
//   experience: {
//     startTime: string,
//     endTime: string,
//     school: string,
//     position: string,
//     subject: string,
//     role: string,
//     feature: string,
// };
  imageURL: string|null;
  authority:string;
  displayId:string;
  hashedPassword:string;
};