import React, { InputHTMLAttributes, useState } from "react";
import { getAppTheme } from "../../AppTheme";
import { AdditionalHtmlAttributes } from "../../Enums";
import Icon from "../Icon";

interface PasswordInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  className,
  labelType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const appTheme = getAppTheme();

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={`${props.errorClassName} ${className ?? appTheme?.Inputs?.password} ${labelType && labelType === "floating" ? "placeholder-transparent" : ""}`}
        {...props}
      />
      <div
        className="absolute top-0 right-2 h-full flex items-center px-2"
        onClick={() => setShowPassword(!showPassword)}
      >
        <Icon
          name={showPassword ? "azVisible" : "azNotVisible"}
          color="#5b6782"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PasswordInput;
