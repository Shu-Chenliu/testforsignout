import { INDIGO, LIGHT_BLUE } from '@/lib/constants';

export interface ButtonProps {
    text?: string;
    href?: string;
    dark?: boolean;
    width?: string;
    height?: string;
    size?: number;
    onClick?: () => void;
    element?: JSX.Element; // Add this line to include the icon prop
}

export function BasicButton({ text, href, dark, width, height, size, onClick, element }: ButtonProps) {
  return (
    <a
      className="flex items-center justify-center cursor-pointer text-center rounded-full font-semibold text-sm hover:opacity-80 py-1 px-2"
      style={{
        backgroundColor: dark ? INDIGO : LIGHT_BLUE,
        color: dark ? "white" : INDIGO, 
        width: width ? width : "fit",
        height: height ? height : "fit",
        fontSize: size ? size : 14
      }}
      {...(onClick && { onClick })}
      {...(href && { href })}
    >
      {element && <span className="mr-2">{element}</span>} {/* Render the icon if provided */}
      {text}
    </a>
  );
}