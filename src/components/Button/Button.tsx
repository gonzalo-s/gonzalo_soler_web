import Link from "next/link";
import { getButtonClasses } from "./buttonUtils";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  icon?: boolean; // later we can add icon to the button
  variant?: ButtonVariant;
  href?: string;
};

function Button(props: ButtonProps) {
  if (props.href) {
    return (
      <Link href={props.href} className={getButtonClasses(props)}>
        {props.text}
      </Link>
    );
  }
  return (
    <button disabled={props.disabled} className={getButtonClasses(props)}>
      {props.text}
    </button>
  );
}

export default Button;
