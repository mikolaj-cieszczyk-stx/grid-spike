export type Option = {
  id: string;
  label: string;
};

export type SortOrder = 'asc' | 'desc';

export type ItemValue = Record<string, string | number | boolean | Option>;

export type Column<T> = {
  id: string;
  label: string;
  type: 'text' | 'text-input' | 'number' | 'checkbox' | 'select';
  key: keyof T;
  getOptionsFn?: (itemId: string, key: keyof T) => Promise<Option[]>;
  onChange?: (itemId: string, key: keyof T, value: T[keyof T]) => Promise<void>;
  sortable?: boolean;
  searchable?: boolean;
};

export type Item<T = ItemValue> = T & { id: string };

export type InitialSort = {
  key: keyof ItemValue;
  order: 'asc' | 'desc';
};

export type InitialSearch<T> = {
  [key in keyof T]?: string;
};
