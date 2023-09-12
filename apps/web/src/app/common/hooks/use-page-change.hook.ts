import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageChange = (cb: () => void) => {
  const location = useLocation();

  useEffect(() => {
    return () => {
      cb();
    }
  }, [ location.pathname ])
}
