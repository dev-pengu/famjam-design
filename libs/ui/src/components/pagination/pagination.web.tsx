import { useTheme } from '../theme-provider/theme-context';
import { usePagination } from '../../hooks/use-pagination/use-pagination.web';
import { cx } from '../../utils/cx';
import {
  PaginationButton,
  PaginationColor,
  PaginationItemProps,
  PaginationProps,
  PaginationShape,
  PaginationSize,
  PaginationVariant,
} from './pagination.types';
import styles from './pagination.web.module.css';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon';
import { Typography, TypographyTextSize } from '../typography';

const iconByButtonType: Record<PaginationButton, IconName | null> = {
  [PaginationButton.First]: IconName.DoubleChevronLeft,
  [PaginationButton.Previous]: IconName.ChevronLeft,
  [PaginationButton.Next]: IconName.ChevronRight,
  [PaginationButton.Last]: IconName.DoubleChevronRight,
  [PaginationButton.EndEllipsis]: null,
  [PaginationButton.StartEllipsis]: null,
};

const fontSizeByItemSize: Record<PaginationSize, TypographyTextSize> = {
  [PaginationSize.Small]: TypographyTextSize.Small,
  [PaginationSize.Medium]: TypographyTextSize.Medium,
  [PaginationSize.Large]: TypographyTextSize.Large,
};

export const iconSizeByPaginationSize: Record<PaginationSize, number> = {
  [PaginationSize.Small]: 16,
  [PaginationSize.Medium]: 24,
  [PaginationSize.Large]: 32,
};

export const PaginationItem = ({
  onClick,
  type,
  page,
  selected,
  disabled = false,
  color = PaginationColor.Default,
  shape = PaginationShape.Circular,
  variant = PaginationVariant.Text,
  size = PaginationSize.Medium,
  className,
  ...props
}: Readonly<PaginationItemProps>) => {
  const Comp = type === PaginationButton.EndEllipsis || type === PaginationButton.StartEllipsis ? 'div' : 'button';

  let content: React.ReactNode;
  if (type === 'page') {
    content = (
      <Typography.Body
        as='span'
        className={styles.itemContent}
        bold
        size={fontSizeByItemSize[size]}
      >
        {page}
      </Typography.Body>
    );
  } else if (type === PaginationButton.EndEllipsis || type === PaginationButton.StartEllipsis) {
    content = (
      <Typography.Body
        as='span'
        className={styles.itemContent}
        bold
      >
        ...
      </Typography.Body>
    );
  } else {
    content = (
      <Icon
        name={iconByButtonType[type]!}
        size={iconSizeByPaginationSize[size]}
        decorative
        className={styles.itemContent}
      />
    );
  }
  return (
    <Comp
      className={cx(
        styles.paginationItem,
        styles[`item-${color}`],
        styles[`item-${shape}`],
        styles[`item-${variant}`],
        styles[`item-${size}`],
        styles[`item-${type}`],
        selected && styles.selectedItem,
        disabled && styles.disabledItem,
        className,
      )}
      {...props}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </Comp>
  );
};

const defaultAriaLabelProvider = (type: PaginationButton | 'page', page: number | null, selected: boolean) => {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }
  return `Go to ${type} page`;
};

export const Pagination = ({
  boundaryCount = 1,
  count = 1,
  defaultPage = 1,
  disabled = false,
  hideNextButton = false,
  hidePrevButton = false,
  onChange,
  page,
  showFirstButton = false,
  showLastButton = false,
  siblingCount = 1,
  color = PaginationColor.Default,
  shape = PaginationShape.Circular,
  size = PaginationSize.Medium,
  variant = PaginationVariant.Text,
  itemRenderer = (params) => <PaginationItem {...params} />,
  ariaLabelProvider = defaultAriaLabelProvider,
  className,
}: Readonly<PaginationProps>) => {
  useTheme();
  const { paginationItems } = usePagination({
    boundaryCount,
    count,
    defaultPage,
    disabled,
    hideNextButton,
    hidePrevButton,
    onChange,
    page,
    showFirstButton,
    showLastButton,
    siblingCount,
  });

  return (
    <div
      className={cx(styles.paginationWrapper, styles[color], styles[shape], styles[size], styles[variant], className)}
    >
      <ul className={styles.paginationList}>
        {paginationItems.map((item, index) => (
          <li key={index}>
            {itemRenderer({
              ...item,
              color,
              shape,
              size,
              variant,
              'aria-label': ariaLabelProvider(item.type, item.page, item.selected),
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};
