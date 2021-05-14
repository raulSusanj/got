/**
 * Button component is written as a fully re-usable component with enums and JS style, just to showcase skills
 * for different approaches to creating components. This Button component can be
 * scaled. Also we could use some css preprocessor or styling library to make things
 * more simple.
 */

import React, { CSSProperties, FC } from "react";
import { ButtonSize, ButtonVariant } from "../../enums";
import { getButtonSizeSpec, getButtonVariantSpec } from "../../utils";

interface IButton {
  label: string;
  onClick: (event?: any) => void;
  disabled?: boolean;
  variant?: string;
  size?: string;
  style?: CSSProperties;
  value?: string;
}

export const Button: FC<IButton> = ({
  label,
  onClick,
  disabled,
  variant = ButtonVariant.primary,
  size = ButtonSize.md,
  style,
  value
}) => {
  const buttonSize = getButtonSizeSpec(size);
  const buttonVariant = getButtonVariantSpec(variant);
  return (
    <button
      disabled={disabled}
      value={value}
      style={{ ...buttonSize, ...buttonVariant, ...style }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
