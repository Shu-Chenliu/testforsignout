import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function componentToHex(c:number) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r:number, g:number, b:number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const generateCode = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  // Create an array of 32-bit unsigned integers
  const randomValues = new Uint32Array(length);
  
  // Generate random values
  window.crypto.getRandomValues(randomValues);
  randomValues.forEach((value) => {
    result += characters.charAt(value % charactersLength);
  });
  return result;
}