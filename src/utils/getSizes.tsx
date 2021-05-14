import { ButtonSize } from "../enums";

interface ButtonSizeSpec {
  width: string;
  height: string;
}
export function getButtonSizeSpec(buttonSize: string): ButtonSizeSpec {
  switch (buttonSize) {
    case ButtonSize.sx:
      return { width: "50px", height: "30px" };
    case ButtonSize.md:
      return { width: "150px", height: "50px" };
    case ButtonSize.lg:
      return { width: "200px", height: "75px" };
    default:
      return { width: "50px", height: "25px" };
  }
}
