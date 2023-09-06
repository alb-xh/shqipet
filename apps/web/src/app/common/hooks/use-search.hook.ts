import { useEffect } from "react";
import { isEqual } from 'lodash';

import { useAppContext } from "./use-app-context.hook";
import { SearchValue } from "../../types";

export const useSearch = (categories: string[] = []) => {
  const { searchOptions, setSearchOptions } = useAppContext();


  useEffect(() => {
    const newSearchOptions = {
      show: true,
      categories,
    };

    if (!isEqual(searchOptions, newSearchOptions)) {
      setSearchOptions(newSearchOptions);
    }
  });

  const useSearchValue = (cb: (value: SearchValue) => void) => {
    const { searchValue, setSearchOptions } = useAppContext();

    useEffect(() => {
      cb(searchValue);

      return () => {
        setSearchOptions({ show: false, categories: [] });
      };
    }, [ searchValue ]);
  };

  return { useSearchValue };
};
