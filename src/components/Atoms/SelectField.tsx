import React from 'react';
import type { Column, Item, Option } from '../../types/gridTypes';

export const SelectField = <T,>({
  col,
  item,
  onChange,
  options,
}: {
  col: Column<T>;
  item: Item<T>;
  onChange?: Column<T>['onChange'];
  options: Option[];
}) => {
  const value = item[col.key];
  const selectedOption =
    typeof value === 'string'
      ? options.find((opt) => opt.id === value)
      : (value as Option | undefined);

  return (
    <select
      value={selectedOption?.id || ''}
      onChange={(e) => {
        const newValue = e.target.value;
        const newOption = options.find((opt) => opt.id === newValue);
        if (onChange && newOption) {
          onChange(item.id, col.key, newOption as T[keyof T]);
        }
      }}
      className="border w-full h-full"
    >
      <option value="">Wybierz...</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
