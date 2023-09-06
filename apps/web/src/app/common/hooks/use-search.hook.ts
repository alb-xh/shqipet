import { useEffect } from "react";
import { isEqual } from 'lodash';

import { useAppContext } from "./use-app-context.hook";
import { SearchValue } from "../../types";

export const useSearch = (categories: string[] = []) => {
  const { searchOptions, setSearchOptions } = useAppContext();

  useEffect(() => {
    const newSearchOptions = {
      ...searchOptions,
      show: true,
      categories,
    };

    if (!isEqual(searchOptions, newSearchOptions)) {
      setSearchOptions(newSearchOptions);
    }
  });

  const useSearchValue = (cb: (value: SearchValue) => Promise<void>) => {
    const { searchValue, setSearchValue, setSearchOptions } = useAppContext();

    useEffect(() => {
      if (!searchValue.isSearching) {
        return;
      }

      cb(searchValue).then(() => {
        setSearchValue({ ...searchValue, isSearching: false });
      });

      return () => {
        setSearchOptions({ show: false, categories: [] });
      };
    }, [ searchValue ]);
  };

  return { useSearchValue };
};
