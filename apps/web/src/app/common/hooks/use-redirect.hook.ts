import { Path } from "../../constants";
import { useQueryParam } from "./use-query-param.hook";

const paths = Object.values(Path)

export const useRedirect = (fallback = Path.Root) => {
  const redirect = useQueryParam('redirect');

  if (redirect && paths.some((path) => path.startsWith(redirect))) {
    return redirect;
  }

  return fallback;
}
