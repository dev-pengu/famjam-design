import { Children, cloneElement, isValidElement } from 'react';
import { ButtonGroupOrientation, ButtonGroupProps } from './button-group.types';
import { ButtonPropsType, ButtonSize } from '../button/button.types';
import { cx } from '../../utils/cx';
import styles from './button-group.web.module.css';

export const ButtonGroup = ({
  children,
  size = ButtonSize.Medium,
  variant,
  orientation = ButtonGroupOrientation.Horizontal,
  className,
}: Readonly<ButtonGroupProps>) => {
  const buttons = Children.map(children, (child) => {
    if (!isValidElement<ButtonPropsType>(child)) return child;

    return cloneElement(child, {
      size: size,
      variant: child.props.variant ?? variant,
    });
  });

  return (
    <div
      className={cx(styles.group, styles[orientation], className)}
      role='group'
    >
      {buttons}
    </div>
  );
};
