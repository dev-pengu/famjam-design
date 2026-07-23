import { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";

export const useCollapseAnimation = ({
    isExpanded,
    slideDuration = 300,
}: {
    isExpanded: boolean;
    slideDuration?: number;
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | 'auto'>(isExpanded ? 'auto' : 0);
    const [visible, setVisible] = useState(isExpanded);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useLayoutEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        if (isExpanded) {
            setVisible(true);
            const h = contentRef.current?.scrollHeight ?? 0;
            setHeight(h);
            timerRef.current = setTimeout(() => setHeight('auto'), slideDuration);
        } else {
            const h = contentRef.current?.scrollHeight ?? 0;
            setHeight(h);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setHeight(0));
            });
            timerRef.current = setTimeout(() => setVisible(false), slideDuration);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }, [isExpanded, slideDuration]);

    return { contentRef, height, visible };
}