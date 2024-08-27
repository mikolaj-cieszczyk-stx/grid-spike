import type { Column, Item, Option } from '../types/gridTypes';

export const SelectField = <T,>({
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

  const value = item[col.key];

  // Znajdź obiekt Option na podstawie id, jeśli value jest id
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
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt.id} value={opt.id}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
