import clsx from "clsx";
import styles from "./button.module.scss";
import { ButtonVariant } from "./Button";

export interface ButtonOptions {
  variant?: ButtonVariant;
  disabled?: boolean;
}

// Function to get button class based on props
export const getButtonClasses = ({
  variant = "primary",
  disabled = false,
}: ButtonOptions) => {
  console.log(
    clsx(styles.button, styles[variant], { [styles.disabled]: disabled }),
    "---",
    styles[variant]
  );
  return clsx(styles.button, styles[variant], { [styles.disabled]: disabled });
};
