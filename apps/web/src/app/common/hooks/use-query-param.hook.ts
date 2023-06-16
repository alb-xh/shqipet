import { useSearchParams } from "react-router-dom";

export const useQueryParam = (key: string) => {
  const [searchParams] = useSearchParams();
  return searchParams.get(key);
}
