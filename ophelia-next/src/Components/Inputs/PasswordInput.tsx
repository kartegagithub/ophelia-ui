import React, { InputHTMLAttributes, useState } from "react";
import { AdditionalHtmlAttributes } from "ophelia-core";
import Icon from "../Icon";

export interface PasswordInputProps
  extends AdditionalHtmlAttributes,
    InputHTMLAttributes<HTMLInputElement> {
  labelType?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  errorClassName,
  className,
  labelType,
  style,
  defaultValue,
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div id={id} className="oph-passwordInput">
      <input
        type={showPassword ? "text" : "password"}
        className={`oph-passwordInput-input peer ${errorClassName ? "error" : ""} ${labelType && labelType === "floating" ? "floating" : ""}`}
        style={style}
        defaultValue={defaultValue}
        {...props}
      />
      <div
        className="oph-passwordInput-iconWrapper"
        onClick={() => setShowPassword(!showPassword)}
      >
        <Icon
          name={showPassword ? "azVisible" : "azNotVisible"}
          color="#9BA0A4"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PasswordInput;
