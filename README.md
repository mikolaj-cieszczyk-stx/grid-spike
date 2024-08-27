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

### `GridProps<T>`

- columns: An array of column definitions, where each column uses Column<T>.
- items: An array of items to display in the grid, using Item<T>.

## Example datasets accepted by the component

### 1. Simple text data:

```typescript
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  isActive: boolean;
};

const people: Item<Person>[] = [
  {
    id: '1',
    value: { firstName: 'John', lastName: 'Doe', age: 30, isActive: true },
  },
  {
    id: '2',
    value: { firstName: 'Jane', lastName: 'Smith', age: 25, isActive: false },
  },
  {
    id: '3',
    value: { firstName: 'Alice', lastName: 'Johnson', age: 40, isActive: true },
  },
];

const columns: Column<Person>[] = [
  {
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    key: 'firstName',
    sortable: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    type: 'text',
    key: 'lastName',
    sortable: true,
  },
  { id: 'age', label: 'Age', type: 'number', key: 'age', sortable: true },
  { id: 'isActive', label: 'Active', type: 'checkbox', key: 'isActive' },
];
```

### 2. Data containing Select options:

```typescript
type Product = {
  name: string;
  price: number;
  category: Option;
  inStock: boolean;
};

const products: Item<Product>[] = [
  {
    id: '1',
    value: {
      name: 'Laptop',
      price: 999.99,
      category: { id: 'electronics', label: 'Electronics' },
      inStock: true,
    },
  },
  {
    id: '2',
    value: {
      name: 'Chair',
      price: 49.99,
      category: { id: 'furniture', label: 'Furniture' },
      inStock: false,
    },
  },
  {
    id: '3',
    value: {
      name: 'Pen',
      price: 1.99,
      category: { id: 'stationery', label: 'Stationery' },
      inStock: true,
    },
  },
];

const columns: Column<Product>[] = [
  {
    id: 'name',
    label: 'Product Name',
    type: 'text',
    key: 'name',
    sortable: true,
  },
  { id: 'price', label: 'Price', type: 'number', key: 'price', sortable: true },
  {
    id: 'category',
    label: 'Category',
    type: 'select',
    key: 'category',
    sortable: true,
  },
  { id: 'inStock', label: 'In Stock', type: 'checkbox', key: 'inStock' },
];
```

### 3. More complex data (multi-level structures):

```typescript
type Order = {
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: Option;
  details: {
    productId: string;
    quantity: number;
  }[];
};

const orders: Item<Order>[] = [
  {
    id: '1',
    value: {
      orderId: 'ORD001',
      customerName: 'John Doe',
      totalAmount: 150.0,
      status: { id: 'shipped', label: 'Shipped' },
      details: [
        { productId: 'P001', quantity: 2 },
        { productId: 'P002', quantity: 1 },
      ],
    },
  },
  {
    id: '2',
    value: {
      orderId: 'ORD002',
      customerName: 'Jane Smith',
      totalAmount: 200.5,
      status: { id: 'pending', label: 'Pending' },
      details: [{ productId: 'P003', quantity: 3 }],
    },
  },
];

const columns: Column<Order>[] = [
  {
    id: 'orderId',
    label: 'Order ID',
    type: 'text',
    key: 'orderId',
    sortable: true,
  },
  {
    id: 'customerName',
    label: 'Customer Name',
    type: 'text',
    key: 'customerName',
    sortable: true,
  },
  {
    id: 'totalAmount',
    label: 'Total Amount',
    type: 'number',
    key: 'totalAmount',
    sortable: true,
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    key: 'status',
    sortable: true,
  },
];
```
