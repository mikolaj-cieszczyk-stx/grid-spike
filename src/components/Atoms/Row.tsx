import type { Item, Column } from '../types/gridTypes';
import { FieldRenderer } from './FieldRenderer';

export const Row = <T,>({
  index,
  style,
  items,
  columns,
}: {
  index: number;
  style: React.CSSProperties;
  items: Item<T>[];
  columns: Column<T>[];
}) => {
  console.log(`Rendering row ${index}`);

  const item = items[index];

  return (
    <div style={style} className="grid grid-cols-8 items-center">
      {columns.map((col) => (
        <div
          key={col.id}
          className="p-2 border border-x-0 border-gray-200 bg-white overflow-hidden truncate"
        >
          <FieldRenderer col={col} item={item} />
        </div>
      ))}
    </div>
  );
};
