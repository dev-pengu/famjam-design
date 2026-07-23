import { CSSProperties, isValidElement } from 'react';
import { IconName } from '@famjam/icons';
import { AlertProps, AlertSeverity, AlertVariant } from './alert.types';
import { cx } from '../../utils/cx';
import styles from './alert.web.module.css';
import { Typography, TypographyTextSize } from '../typography';
import { Icon } from '../icon';
import { Button } from '../button/button.web';
import { ButtonSize, ButtonVariant } from '../button/button.types';

const iconBySeverity: Record<AlertSeverity, IconName> = {
  [AlertSeverity.Success]: IconName.Check,
  [AlertSeverity.Info]: IconName.Info,
  [AlertSeverity.Warning]: IconName.Warning,
  [AlertSeverity.Error]: IconName.Error,
};

export const Alert = ({
  icon,
  severity,
  children,
  title,
  variant = AlertVariant.Default,
  color,
  bgColor,
  onClose,
  action,
  className,
  ...props
}: Readonly<AlertProps>) => {
  if (!children) {
    return null;
  }
  const content = isValidElement(children) ? children : <Typography.Body>{children}</Typography.Body>;
  let iconFragment: React.ReactNode | undefined = (
    <Icon
      name={iconBySeverity[severity]}
      size={24}
    />
  );
  if (icon === false) {
    iconFragment = undefined;
  } else if (icon) {
    iconFragment = isValidElement(icon) ? icon : undefined;
  }
  let actionFragment: React.ReactNode | undefined = undefined;
  if (onClose) {
    actionFragment = (
      <Button
        size={ButtonSize.Small}
        onClick={onClose}
        className={styles.dismissButton}
        variant={ButtonVariant.Text}
      >
        <Icon
          name={IconName.Close}
          size={22}
          accessibilityLabel='Close alert'
        />
      </Button>
    );
  } else if (action) {
    actionFragment = isValidElement(action) ? action : <span>{action}</span>;
  }
  const colorOverride: CSSProperties = {};
  if (color) {
    colorOverride['color'] = color;
  }
  if (bgColor) {
    colorOverride['backgroundColor'] = bgColor;
  }

  return (
    <div
      className={cx(styles.alert, styles[variant], styles[severity], className)}
      style={colorOverride}
      {...props}
    >
      <span className={styles.iconWrapper}>{iconFragment}</span>
      <span className={styles.contentWrapper}>
        {title && (
          <Typography.Title
            size={TypographyTextSize.Small}
            className={styles.alertTitle}
          >
            {title}
          </Typography.Title>
        )}
        {content}
      </span>
      <span className={styles.actionWrapper}>{actionFragment}</span>
    </div>
  );
};
