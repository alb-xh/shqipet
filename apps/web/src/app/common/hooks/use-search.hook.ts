import { useEffect } from "react";
import { isEqual } from 'lodash';

import { useAppContext } from "./use-app-context.hook";
import { usePageChange } from "./use-page-change.hook";
import { SearchValue } from "../../types";

export const useSearch = (categories: string[] = []) => {
  const { searchOptions, setSearchValue, setSearchOptions } = useAppContext();

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

  usePageChange(() => {
    setSearchOptions({ categories: [], show: false });
    setSearchValue({ value: '', category: '', isSearching: true });
  });

  const useSearchValue = (cb: (value: SearchValue) => Promise<void>) => {
    const { searchValue, setSearchValue } = useAppContext();

    useEffect(() => {
      if (!searchValue.isSearching) {
        return;
      }

      cb(searchValue).then(() => {
        setSearchValue({ ...searchValue, isSearching: false });
      });
    }, [ searchValue ]);
  };

  const useLoadMore = (cb: (value) => Promise<void>) => {
    const { searchValue, setSearchValue } = useAppContext();

    return async () => {
      setSearchValue({ ...searchValue, isSearching: true });
      await cb(searchValue);
    };
  }

  return { useSearchValue, useLoadMore };
};
