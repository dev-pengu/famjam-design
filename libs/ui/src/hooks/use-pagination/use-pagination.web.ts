import {
  PaginationButton,
  PaginationItemRenderProps,
  PaginationOptions,
} from '../../components/pagination/pagination.types';
import { useControlled } from '../use-controlled';

export const usePagination = ({
  boundaryCount = 1,
  count = 1,
  defaultPage = 1,
  disabled = false,
  hideNextButton = false,
  hidePrevButton = false,
  onChange,
  page: controlledPage,
  showFirstButton = false,
  showLastButton = false,
  siblingCount = 1,
}: PaginationOptions) => {
  const [page, setPage] = useControlled({
    controlledValue: controlledPage,
    defaultValue: defaultPage,
    onChange,
    disabled,
  });

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(page! - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(page! + siblingCount, boundaryCount + siblingCount * 2 + 2),
    count - boundaryCount - 1,
  );

  const baseItems: (PaginationButton | number)[] = [
    ...(showFirstButton ? [PaginationButton.First] : []),
    ...(hidePrevButton ? [] : [PaginationButton.Previous]),
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? [PaginationButton.StartEllipsis]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? [PaginationButton.EndEllipsis]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
    ...(hideNextButton ? [] : [PaginationButton.Next]),
    ...(showLastButton ? [PaginationButton.Last] : []),
  ];

  const buttonPage = (type: PaginationButton) => {
    switch (type) {
      case PaginationButton.First:
        return 1;
      case PaginationButton.Previous:
        return page! - 1;
      case PaginationButton.Next:
        return page! + 1;
      case PaginationButton.Last:
        return count;
      default:
        return null;
    }
  };

  const paginationItems: PaginationItemRenderProps[] = baseItems.map((item) => {
    return typeof item === 'number'
      ? {
          onClick: () => setPage(item),
          type: 'page',
          page: item,
          selected: item === page,
          disabled,
          'aria-current': item === page ? 'page' : undefined,
        }
      : {
          onClick: () => setPage(buttonPage(item) ?? undefined),
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (!item.includes('ellipsis') &&
              (item === PaginationButton.Next || item === PaginationButton.Last ? page! >= count : page! <= 1)),
        };
  });

  return { paginationItems };
};
