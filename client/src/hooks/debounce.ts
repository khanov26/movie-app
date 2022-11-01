import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timerId);
  }, [delay, value]);

  return debounced;
}
