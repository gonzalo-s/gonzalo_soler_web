import type { HTMLAttributes, ReactNode } from 'react';

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3';
  icon?: ReactNode;
  iconClassName?: string;
};

export default function Heading({ as: Tag = 'h2', icon, iconClassName, children, ...props }: HeadingProps) {
  return (
    <Tag {...props}>
      {icon && (
        <span className={iconClassName} aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </Tag>
  );
}
