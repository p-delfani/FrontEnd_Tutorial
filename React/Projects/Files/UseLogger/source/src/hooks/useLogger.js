import { useEffect } from "react";

const useLogger = (name, value) => {
  useEffect(() => {
    console.log(`[useLogger] ${name} changed = ${value}`);
  }, [value]);
};

export default useLogger;
