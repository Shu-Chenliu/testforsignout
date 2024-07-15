import React from "react";

// Run: npx shadcn-ui@latest add input label
import { Input } from "@/components/ui/input";
import { INDIGO } from "@/lib/constants";

type Props = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function AuthInput({ label, type, value, placeholder, setValue }: Props) {
  return (
    <div className="w-64">
      {label !== "" && <div className="py-0.5 text-center text-base font-semibold peer-disabled:cursor-not-allowed">{label}</div>}
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        className="rounded-3xl border"
        style={{borderColor: INDIGO}}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default AuthInput;
