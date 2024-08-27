### [Live](https://grid-spike.vercel.app/)

# DataGrid Component

The `DataGrid` component is a versatile React grid component designed for displaying and managing tabular data. It incorporates TypeScript for type safety and supports generics to handle various data structures flexibly. This component is optimized for performance with virtualized rendering and includes features like searching, sorting, and support for multiple field types.

![image](https://github.com/user-attachments/assets/3d3ac04e-e2c6-4088-bd53-1682f9d93ffa)

## Features

- **Generics and Type Safety**: Utilize TypeScript's generics to create and manage flexible and type-safe data structures, ensuring compile-time type safety across the application.
- **Virtualized Rendering**: Optimize performance for large datasets using `react-window` and `react-virtualized-auto-sizer`, allowing smooth scrolling and rendering only the visible rows.
- **Search**: Implement dynamic filtering of rows based on user input across multiple columns, supporting precise data exploration.
- **Sorting**: Enable column sorting with ascending, descending, and default order options, with support for initial sorting configurations from API or external sources.
- **Initial Search and Sort Configuration**: Integrate initial search and sort configurations directly from API responses, providing a more dynamic and personalized user experience.
- **Field Types**: Support a variety of field types, including text, number, checkbox, select, and custom text input, enhancing data interaction and visualization.
- **Customizable Columns**: Define columns with customizable settings, such as sortable, searchable, and dynamic `onChange` handlers for specific field types.

## Types and Generics

### `Column<T>`

Defines the configuration for a column. This type uses generics to adapt to different data structures.

```typescript
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
```

### `ItemValue`

Represents the value of an item. It is a record where keys are strings, and values can be strings, numbers, booleans, or Option.

```typescript
export type ItemValue = Record<string, string | number | boolean | Option>;
```

### `Item<T>`

Represents an item in the grid. Uses generics to handle various item structures.

```typescript
export type Item<T = ItemValue> = T & { id: string };
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

### `InitialSort`

Defines the initial sorting order.

```typescript
export type InitialSort = {
  key: keyof ItemValue;
  order: 'asc' | 'desc';
};
```

### `InitialSearch<T>`

Defines the initial search phrase.

```typescript
export type InitialSearch<T> = {
  [key in keyof T]?: string;
};
```

### `GridProps<T>`

- columns: An array of column definitions, where each column uses Column<T>.
- items: An array of items to display in the grid, using Item<T>.

## Usage

To use the `Grid` component in your application, you need to provide it with the necessary props, such as `columns`, `items`, and optionally `initialSort` and `initialSearch` for initial sorting and filtering functionality.

Here's a basic example of how to set up and use the `Grid` component:

```jsx
import { Grid } from './Atoms/Grid'; // Adjust the import path as needed
import { columns, items } from './yourDataFile'; // Import your columns and items definitions

function App() {
  return (
    <div>
      <Grid
        columns={columns}
        items={items}
        initialSort={{
          key: 'label',  // Specify the column key to sort by
          order: 'asc',  // Specify the sorting order ('asc' or 'desc')
        }}
        initialSearch={{
          label: 'Michael',  // Pre-filter items where the 'label' includes 'Michael'
          count: '5'         // Pre-filter items where the 'count' includes '5'
        }}
      />
    </div>
  );
}

export default App;
```

