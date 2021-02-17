import * as React from 'react';

function useLocalStorage(
  key,
  defaultValue = '',
  { serializer = JSON.stringify, deserializer = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    const initialValue = window.localStorage.getItem(key) || defaultValue;
    if (initialValue) {
      try {
        return deserializer(initialValue);
      } catch {
        window.localStorage.removeItem(key);
      }

      return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    }
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(key);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serializer(state));
  }, [key, serializer, state]);

  return [state, setState];
}

export default useLocalStorage;
