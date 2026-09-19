import { createContext, useContext } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used inside SearchContext.Provider");
  }

  return context;
}