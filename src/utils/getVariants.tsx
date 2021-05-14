import { ButtonVariant, Color } from "../enums";

interface ButtonVariantSpec {
  backgroundColor?: Color | string;
  color?: Color | string;
  borderWidth?: string;
  borderColor?: Color;
  borderRadius?: string;
  border?: string;
}

export function getButtonVariantSpec(buttonVariant: string): ButtonVariantSpec {
  switch (buttonVariant) {
    case ButtonVariant.primary:
      return {
        backgroundColor: Color.secondary,
        color: "#ffffff",
        borderRadius: "7px",
        border: "none",
      };

    case ButtonVariant.secondary:
      return {
        backgroundColor: "#ffffff",
        color: Color.primary,
        borderWidth: "1.2px",
        borderColor: Color.primary,
        borderRadius: "7px",
      };
    default:
      return {
        backgroundColor: Color.secondary,
        color: "#ffffff",
        borderWidth: "1.2px",
        borderColor: Color.secondary,
        borderRadius: "7px",
      };
  }
}
