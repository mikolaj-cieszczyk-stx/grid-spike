import { useState } from 'react';

export type Option = {
  id: string;
  label: string;
};

export type Column<T> = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'select';
  key: keyof T;
  getOptionsFn?: (itemId: string, key: keyof T) => Promise<Option[]>;
  onChange?: (itemId: string, key: keyof T, value: T[keyof T]) => Promise<void>;
};

export type GridProps<T> = {
  columns: Column<T>[];
  items: Item<T>[];
};

type ItemValue = string | number | boolean | Option;

export type Item<T = Record<string, ItemValue>> = {
  id: string;
  value: T;
};

export const Grid = <T extends {}>({ columns, items }: GridProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredItems = items.filter((item: Item) =>
    Object.values(item.value).some((value: ItemValue) => {
      const valueAsString = String(value);
      return valueAsString.toLowerCase().includes(searchTerm.toLowerCase());
    }),
  );

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 w-full"
      />
      <div className="grid grid-cols-1">
        {/* Render headers */}
        <div className="grid grid-cols-8">
          {columns.map((col, index) => (
            <div key={col.id} className={`font-bold m-2 self-end`}>
              {col.label || ''}
            </div>
          ))}
        </div>

        {/* Render items */}
        {filteredItems.map((item) => (
          <div key={item.id} className="grid grid-cols-8 items-center">
            {columns.map((col) => (
              <div
                key={col.id}
                className={`p-2 border border-x-0 border-gray-200 bg-white`}
              >
                <FieldRenderer col={col} item={item} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const FieldRenderer = <T,>({
  col,
  item,
}: {
  col: Column<T>;
  item: Item<T>;
}) => {
  const value = item.value[col.key];

  switch (col.type) {
    case 'text':
      return <span>{String(value)}</span>;

    case 'number':
      return (
        <input
          type="number"
          value={typeof value === 'number' ? value : ''}
          onChange={(e) =>
            col.onChange &&
            col.onChange(item.id, col.key, Number(e.target.value) as T[keyof T])
          }
          className="border w-full h-full"
        />
      );

    case 'checkbox':
      return (
        <input
          type="checkbox"
          checked={typeof value === 'boolean' ? value : false}
          onChange={(e) =>
            col.onChange &&
            col.onChange(item.id, col.key, e.target.checked as T[keyof T])
          }
          className="border p-1"
        />
      );

    case 'select':
      return <SelectField col={col} item={item} onChange={col.onChange} />;

    default:
      return null;
  }
};

const SelectField = <T,>({
  col,
  item,
  onChange,
}: {
  col: Column<T>;
  item: Item<T>;
  onChange?: Column<T>['onChange'];
}) => {
  const options: Option[] = [
    { id: 'cat1', label: 'Category 1' },
    { id: 'cat2', label: 'Category 2' },
    { id: 'cat3', label: 'Category 3' },
  ];

  const value = item.value[col.key] as Option | undefined;

  return (
    <select
      value={value?.id || ''}
      onChange={(e) => {
        const selectedOption = options.find((opt) => opt.id === e.target.value);
        if (onChange && selectedOption) {
          onChange(item.id, col.key, selectedOption as T[keyof T]);
        }
      }}
      className="border w-full h-full"
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
