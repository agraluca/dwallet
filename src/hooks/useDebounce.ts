import { useCallback, useState } from "react";

export const useDebounceTextField = () => {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  const debounce = useCallback(
    (fn, time) => {
      timer && clearTimeout(timer);
      setTimer(setTimeout(fn, time));
    },
    [timer]
  );

  return {
    debounce,
  };
};
