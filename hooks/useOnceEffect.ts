import { useEffect, useRef } from "react";

const useOnceEffect = (effect: () => void) => {
  const initialRef = useRef(true);
  useEffect(() => {
    if (!initialRef.current) {
      return;
    }
    initialRef.current = false;
    effect();
  }, [effect]);
};

export default useOnceEffect;
