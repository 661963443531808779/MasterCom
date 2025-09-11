import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  totalItems: number;
  itemsPerPage: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  paginationInfo: {
    startIndex: number;
    endIndex: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const usePagination = <T>(
  data: T[],
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> => {
  const { itemsPerPage: initialItemsPerPage = 10, initialPage = 1 } = options;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSetItemsPerPage = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const paginationInfo = {
    startIndex: startIndex + 1, // 1-based index for display
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    totalItems: data.length,
    itemsPerPage,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage: handleSetItemsPerPage,
    paginationInfo
  };
};
