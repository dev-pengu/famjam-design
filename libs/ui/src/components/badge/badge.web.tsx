import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { BadgeProps, BadgeVariant, BadgeDisplay, BadgeHorizontalAlign, BadgeVerticalAlign } from './badge.types';
import styles from './badge.web.module.css';

export { BadgeVariant, BadgeDisplay, BadgeHorizontalAlign, BadgeVerticalAlign };

const resolveContent = (content: number | string | undefined, max: number | undefined): string | null => {
    if (content === undefined) return null;
    if (typeof content === 'string') return content;
    if (max !== undefined && content > max) return `${max}+`;
    return String(content);
};

const shouldHide = (content: number | string | undefined, showZero: boolean, visible: boolean): boolean => {
    if (!visible) return true;
    if (content === 0 && !showZero) return true;
    return false;
};

export const Badge = ({
    children,
    content,
    variant = BadgeVariant.Error,
    display = BadgeDisplay.Standard,
    visible = true,
    showZero = false,
    max,
    horizontalAlign = BadgeHorizontalAlign.Right,
    verticalAlign = BadgeVerticalAlign.Top,
    className
}: Readonly<BadgeProps>) => {
    useTheme();

    const isDot = display === BadgeDisplay.Dot;
    const hidden = shouldHide(content, showZero, visible);
    const displayContent = isDot ? null : resolveContent(content, max);
    
    const [pulse, setPulse] = useState(false);
    const prevContent = useRef(content);

    useEffect(() => {
        if (content !== prevContent.current && !hidden) {
            setPulse(false);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => setPulse(true));
            });
        }
        prevContent.current = content;
    }, [content, hidden]);

    return (
        <div className={cx(styles.root, className)}>
            {children}
            {!hidden && (
                <span
                    role={isDot ? 'presentation' : 'status'}
                    aria-label={
                        isDot || displayContent === null
                        ? undefined
                        : `${displayContent} notifications`
                    }
                    aria-hidden={isDot}
                    className={cx(
                        styles.badge,
                        styles[variant],
                        styles[horizontalAlign],
                        styles[verticalAlign],
                        isDot && styles.dot,
                        pulse && styles.pulse,
                    )}
                    onAnimationEnd={() => setPulse(false)}
                    >
                        {displayContent}
                    </span>
            )}
        </div>
    )
}
