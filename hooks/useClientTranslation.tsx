import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const useClientTranslation = () => {
  const { t, ready } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    t: (key: string, options?: Record<string, unknown>) => 
      isMounted && ready ? t(key, options) : "",
  };
};