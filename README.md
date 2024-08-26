### [Live](https://grid-spike.vercel.app/)

# DataGrid Component

The `DataGrid` component is a versatile React grid component designed for displaying and managing tabular data. It incorporates TypeScript for type safety and supports generics to handle various data structures flexibly. This component is optimized for performance with virtualized rendering and includes features like searching, sorting, and support for multiple field types.

## Features

- **Generics and Type Safety**: Leverage TypeScript's generics to define and use flexible data structures.
- **Virtualized Rendering**: Efficiently handle large datasets with `react-window` and `react-virtualized-auto-sizer`.
- **Search**: Filter rows based on user input.
- **Sorting**: Sort columns in ascending or descending order.
- **Field Types**: Render different field types, including text, number, checkbox, and select.
- **Customizable Columns**: Define columns with custom settings and behaviors.

## Types and Generics

### `Column<T>`
Defines the configuration for a column. This type uses generics to adapt to different data structures.

```typescript
export type Column<T> = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'select';
  key: keyof T;
  getOptionsFn?: (itemId: string, key: keyof T) => Promise<Option[]>;
  onChange?: (itemId: string, key: keyof T, value: T[keyof T]) => Promise<void>;
  sortable?: boolean;
};
```

### `Item<T>`
Represents an item in the grid. Uses generics to handle various item structures.

```typescript
export type Item<T = ItemValue> = {
  id: string;
  value: T;
};
```

### `ItemValue`
Represents the value of an item. It is a record where keys are strings, and values can be strings, numbers, booleans, or Option.

```typescript
export type ItemValue = Record<string, string | number | boolean | Option>;
```

### `Option`

Represents an option for select fields.

```typescript
export type Option = {
  id: string;
  label: string;
};
```

### `SortOrder`
Defines the sorting order.

```typescript
export type SortOrder = 'asc' | 'desc';
```

### `GridProps<T>`
- columns: An array of column definitions, where each column uses Column<T>.
- items: An array of items to display in the grid, using Item<T>.
