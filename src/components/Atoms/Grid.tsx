import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import type { Column, InitialSearch, Item } from '../../types/gridTypes';
import { Row } from './Row';
export { v4 as uuidv4 } from 'uuid';

export type GridProps<T> = {
  columns: Column<T>[];
  items: Item<T>[];
  initialSort?: { key: keyof T; order: 'asc' | 'desc' };
  initialSearch?: InitialSearch<T>;
};

export const Grid = <T extends {}>({
  columns,
  items,
  initialSort,
  initialSearch = {},
}: GridProps<T>) => {
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>(
    initialSearch as { [key: string]: string },
  );
  const [sortedItems, setSortedItems] = useState<Item<T>[]>(items);

  const sortItems = (key: keyof T, order: 'asc' | 'desc') => {
    const sorted = [...items].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    setSortedItems(sorted);
  };

  useEffect(() => {
    if (initialSort) {
      sortItems(initialSort.key, initialSort.order);
    }
  }, [initialSort]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setSearchTerms((prev) => ({
      ...prev,
      [key]: e.target.value.toLowerCase(),
    }));
  };

  const handleClearSearch = () => {
    setSearchTerms({});
  };

  const handleSortAsc = (key: keyof T) => {
    sortItems(key, 'asc');
  };

  const handleSortDesc = (key: keyof T) => {
    sortItems(key, 'desc');
  };

  const handleResetSort = () => {
    setSortedItems(items);
  };

  const filteredItems = sortedItems.filter((item) =>
    columns.every((col) => {
      const searchTerm = searchTerms[col.key as string] || '';
      if (!searchTerm) return true;

      const value = item[col.key];
      const valueAsString = String(value);
      return valueAsString.toLowerCase().includes(searchTerm.toLowerCase());
    }),
  );

  return (
    <div className="grid-container">
      <div className="grid-header">
        <div className="grid grid-cols-9">
          {columns.map((col) => (
            <div key={col.id} className="font-bold flex flex-col items-center">
              <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                {col.label || ''}
              </span>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={
                    !col.searchable ? 'Not available' : `Search ${col.label}`
                  }
                  value={searchTerms[col.key as string] || ''}
                  onChange={(e) => handleSearchChange(e, col.key as string)}
                  className="border p-1 w-full mb-2"
                  disabled={!col.searchable}
                />
                {searchTerms[col.key as string] && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      handleSearchChange(
                        {
                          target: { value: '' },
                        } as React.ChangeEvent<HTMLInputElement>,
                        col.key as string,
                      )
                    }
                  >
                    ✕
                  </button>
                )}
              </div>
              {col.sortable && (
                <div className="flex mt-2 cursor-pointer items-end">
                  <button
                    onClick={() => handleSortAsc(col.key)}
                    className="p-1 text-2xl"
                    title="Sort Ascending"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleSortDesc(col.key)}
                    className="p-1 text-2xl"
                    title="Sort Descending"
                  >
                    ↓
                  </button>
                  <button
                    className="p-1 text-xl font-thin"
                    onClick={() => handleResetSort()}
                  >
                    ⟲
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid-content">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={filteredItems.length}
              itemSize={40}
            >
              {({ index, style }) => (
                <Row
                  index={index}
                  style={style}
                  items={filteredItems}
                  columns={columns}
                />
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
