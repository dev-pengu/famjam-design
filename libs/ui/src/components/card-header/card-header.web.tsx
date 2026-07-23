import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { Typography } from '../typography/typography.web';
import { TypographySize } from '../typography/typography.types';
import { CardHeaderProps } from './card-header.types';
import styles from './card-header.web.module.css';

export const CardHeader = ({ title, subheader, avatar, action, className }: Readonly<CardHeaderProps>) => {
  useTheme();
  return (
    <div className={cx(styles.header, className)}>
      {avatar && <div className={styles.headerAvatar}>{avatar}</div>}
      <div className={styles.headerContent}>
        <div className={styles.headerTitle}>
          {typeof title === 'string' ? <Typography.Title as='h6'>{title}</Typography.Title> : title}
        </div>
        {subheader && (
          <div className={styles.headerSubheader}>
            {typeof subheader === 'string' ? (
              <Typography.Body
                size={TypographySize.Small}
                muted
              >
                {subheader}
              </Typography.Body>
            ) : (
              subheader
            )}
          </div>
        )}
      </div>
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  );
};
