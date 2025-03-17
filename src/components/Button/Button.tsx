type Variant = "primary" | "secondary" | "tertiary";

type ButtonProps = {
  text: string;
  icon?: boolean; // later we can add icon to the button
  variant?: Variant;
};

function Button(props: ButtonProps) {
  return <button>{props.text}</button>;
}

export default Button;
