import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import type { Column, Item } from '../../types/gridTypes';
import { Row } from './Row';
export { v4 as uuidv4 } from 'uuid';

export type GridProps<T> = {
  columns: Column<T>[];
  items: Item<T>[];
};

export const Grid = <T extends {}>({ columns, items }: GridProps<T>) => {
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
  const [sortedItems, setSortedItems] = useState<Item<T>[]>(items);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setSearchTerms((prev) => ({
      ...prev,
      [key]: e.target.value.toLowerCase(),
    }));
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

  const handleSortAsc = (key: keyof T) => {
    const sorted = [...items].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }
      return 0;
    });

    setSortedItems(sorted);
  };

  const handleSortDesc = (key: keyof T) => {
    const sorted = [...items].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return bValue - aValue;
      }
      return 0;
    });

    setSortedItems(sorted);
  };

  const handleResetSort = () => {
    setSortedItems(items);
  };

  return (
    <div className="grid-container">
      <div className="grid-header">
        <div className="grid grid-cols-8">
          {columns.map((col) => (
            <div
              key={col.id}
              className="font-bold m-2 flex flex-col items-center"
            >
              <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                {col.label || ''}
              </span>
              <input
                type="text"
                placeholder={`Search ${col.label}`}
                value={searchTerms[col.key as string] || ''}
                onChange={(e) => handleSearchChange(e, col.key as string)}
                className="border p-1 w-full mb-2"
              />
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
