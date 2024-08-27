import { availableOptions } from '../../pages/index.astro';
import type { Column, Item, Option } from '../../types/gridTypes';
import { SelectField } from '../Atoms/SelectField';

export const FieldRenderer = <T,>({
  col,
  item,
}: {
  col: Column<T>;
  item: Item<T>;
}) => {
  const value = item[col.key];

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
      return (
        <SelectField
          col={col}
          item={item}
          options={availableOptions}
          onChange={col.onChange}
        />
      );

    default:
      return null;
  }
};
