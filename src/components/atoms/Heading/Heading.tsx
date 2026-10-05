import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactNode } from 'react';
import CmsText from '@/components/atoms/CmsText/CmsText';

function formatText(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string') return <CmsText text={child} />;
    if (isValidElement<{ children?: ReactNode }>(child) && typeof child.type === 'string') {
      return cloneElement(child, {}, formatText(child.props.children));
    }
    return child;
  });
}

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
      {formatText(children)}
    </Tag>
  );
}
