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

  const value = item[col.key] as Option | undefined;

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
