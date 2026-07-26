import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cx } from '../../utils/cx';
import styles from './dropdown.web.module.css';
import { ComponentPropsWithoutRef, ComponentRef, forwardRef, isValidElement } from 'react';
import { Color, Icon, IconName } from '../icon';
import { Typography, TypographyTextSize } from '../typography';
import { useControlled } from '../../hooks';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.RadioGroup>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>
>(({ value: controlledValue, defaultValue, onValueChange, ...props }) => {
  const [value, setValue] = useControlled<string>({
    defaultValue: typeof defaultValue === 'string' ? defaultValue : String(defaultValue),
    controlledValue,
  });

  const handleChange = (value: string) => {
    setValue(value);
    onValueChange?.(value);
  };

  return (
    <DropdownMenuPrimitive.RadioGroup
      value={value}
      onValueChange={handleChange}
      {...props}
    />
  );
});

const DropdownMenuSubTrigger = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => {
  const child = isValidElement(children) ? children : <Typography.Body as='span'>{children}</Typography.Body>;

  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cx(styles.dropdownSubTrigger, inset && styles.inset, className)}
      {...props}
    >
      {child}
      <Icon
        name={IconName.ChevronRight}
        className={styles.chevron}
        size={18}
      />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, children, ...props }, ref) => {
  const child = isValidElement(children) ? children : <Typography.Body as='span'>{children}</Typography.Body>;

  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cx(styles.dropdownSubContent, className)}
      {...props}
    >
      {child}
    </DropdownMenuPrimitive.SubContent>
  );
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cx(styles.dropdownContent, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => {
  const child = isValidElement(children) ? children : <Typography.Body as='span'>{children}</Typography.Body>;

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cx(styles.dropdownItem, inset && styles.inset, className)}
      {...props}
    >
      {child}
    </DropdownMenuPrimitive.Item>
  );
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked: controlledChecked, onCheckedChange, defaultChecked, disabled, ...props }, ref) => {
  const child = isValidElement(children) ? children : <Typography.Body as='span'>{children}</Typography.Body>;

  const [checked, setChecked] = useControlled({
    controlledValue: controlledChecked,
    defaultValue: defaultChecked,
    disabled,
  });

  const handleChange = (value: boolean) => {
    setChecked(value);
    onCheckedChange?.(value);
  };

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cx(styles.dropdownCheckboxItem, className)}
      checked={checked}
      onCheckedChange={handleChange}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className={styles.checkboxIndicator}>
        <Icon
          name={IconName.Check}
          size={16}
        />
      </DropdownMenuPrimitive.ItemIndicator>
      {child}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
  const child = isValidElement(children) ? children : <Typography.Body as='span'>{children}</Typography.Body>;

  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cx(styles.dropdownRadioItem)}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className={styles.radioIndicator}>
        <Icon
          name={IconName.DotFilled}
          size={10}
        />
      </DropdownMenuPrimitive.ItemIndicator>
      {child}
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => {
  const child = isValidElement(children) ? (
    children
  ) : (
    <Typography.Body
      as='span'
      size={TypographyTextSize.Small}
      bold
    >
      {children}
    </Typography.Body>
  );

  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cx(styles.dropdownLabel, inset && styles.inset, className)}
      {...props}
    >
      {child}
    </DropdownMenuPrimitive.Label>
  );
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = forwardRef<
  ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cx(styles.dropdownSeparator, className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cx(styles.dropdownShortcut, className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
