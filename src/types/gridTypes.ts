export type Option = {
  id: string;
  label: string;
};

export type SortOrder = 'asc' | 'desc';

export type ItemValue = Record<string, string | number | boolean | Option>;

export type Column<T> = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'select';
  key: keyof T;
  getOptionsFn?: (itemId: string, key: keyof T) => Promise<Option[]>;
  onChange?: (itemId: string, key: keyof T, value: T[keyof T]) => Promise<void>;
  sortable?: boolean;
};

export type Item<T = ItemValue> = {
  id: string;
  value: T;
};
