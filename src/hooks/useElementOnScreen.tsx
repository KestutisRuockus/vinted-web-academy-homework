import { useEffect, useRef, useState } from "react";

type OptionsProps = {
  root: null;
  rootMargin?: string;
  threshold?: number;
};

export const useElementOnScreen = (options: OptionsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const laodMoreRef = useRef<HTMLDivElement | null>(null);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const loadMoreElement = laodMoreRef.current;
    const observer = new IntersectionObserver(callbackFunction, options);
    if (loadMoreElement) {
      observer.observe(loadMoreElement);

      return () => {
        if (loadMoreElement) {
          observer.disconnect();
        }
      };
    }
  }, [options]);

  return [laodMoreRef, isVisible] as const;
};
