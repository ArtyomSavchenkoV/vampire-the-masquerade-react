import { RefObject, useEffect, useRef } from "react";

const THROTTLE_INTERVAL = 100;

interface ElementSize {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const useOnElementResize = <Element extends HTMLElement>({
  elementRef,
  onResize,
}: {
  elementRef: RefObject<Element | null>;
  onResize: (size: ElementSize) => void;
}): void => {
  const callbackRef = useRef<(size: ElementSize) => void>(onResize);
  callbackRef.current = onResize;

  const lastCallTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handler = () => {
      const now = Date.now();
      const size = element.getBoundingClientRect();

      if (
        lastCallTimeRef.current === null ||
        now - lastCallTimeRef.current >= THROTTLE_INTERVAL
      ) {
        callbackRef.current?.(size);
        lastCallTimeRef.current = now;
      }
    };

    const observer = new ResizeObserver(handler);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef]);
};
