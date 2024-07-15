import { rgbToHex } from "@/lib/utils";

// kist standard color
export const INDIGO = rgbToHex(1,62,110);
export const INDIGO_1 = "#1B517D";
export const DARK_BLUE = "#3D85C6";
export const LIGHT_BLUE = "#cdd9e2";  // rgbToHex(230,236,240)
export const PINK = rgbToHex(219,83,101);
export const ORANGE = rgbToHex(234,140,46);
export const GREEN = rgbToHex(183,184,51);
export const TIFFANY = rgbToHex(46,182,170);
export const LIGHT_GREY = "#f8f8f8";

// authority
export const ADMIN = "A";
export const PRINCIPAL = "B";
export const DIRECTOR_EDITABLE = "C";
export const DIRECTOR = "D";
export const TEACHER = "E";
export const LEADERS = [ADMIN,PRINCIPAL,DIRECTOR_EDITABLE];

// account
export const USERS = [{ username: "誠致", email: "chengzhi@chengzhiedu.org", mobile: "", password: "kist", organization: "誠致1", authority: "A" },
                      { username: "阿依", email: "one@gmail.com", mobile: "0912345678", password: "1234", organization: "三民國小", authority: "E" },
                    //   { username: "阿參", email: "three@gmail.com", mobile: "0933333333", password: "0933333333", organization: "三民國小", authority: "B" },              
                     ];

// info
export const INFO = [{ email: "one@gmail.com", info: ["三民國小","六年級導師","社會","國小社會領召"] },
                    //  { email: "three@gmail.com", info: ["三民國小","校長","自然",""] },
                    ];