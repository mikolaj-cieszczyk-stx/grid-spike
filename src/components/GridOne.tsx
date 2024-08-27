import { useState } from 'react';
import type {
  Column,
  ItemValue,
  Item,
  Option,
  InitialSort,
  InitialSearch,
} from '../types/gridTypes';
import { Grid } from './Atoms/Grid';
import { v4 as uuidv4 } from 'uuid';

export const availableOptions: Option[] = [
  { id: 'cat1', label: 'Category 1' },
  { id: 'cat2', label: 'Category 2' },
  { id: 'cat3', label: 'Category 3' },
];

const columns: Column<ItemValue>[] = [
  {
    id: 'id',
    label: 'Id',
    key: 'id',
    type: 'text',
    sortable: true,
    searchable: true,
  },
  {
    id: 'label',
    label: 'Label',
    key: 'label',
    type: 'text',
    sortable: true,
    searchable: true,
  },
  {
    id: 'type',
    label: 'Type',
    key: 'type',
    type: 'text',
    sortable: true,
    searchable: true,
  },
  {
    id: 'defaultWeight',
    label: 'Default Weight',
    key: 'defaultWeight',
    type: 'number',
    sortable: true,
    searchable: true,
  },
  {
    id: 'count',
    label: 'Count',
    key: 'count',
    type: 'number',
    sortable: true,
    searchable: true,
  },
  {
    id: 'customTextInput',
    label: 'Custom Text Input',
    key: 'customTextInput',
    type: 'text-input',
    sortable: false,
    searchable: false,
    onChange: async (
      itemId: string,
      key: keyof ItemValue,
      value: ItemValue[keyof ItemValue],
    ) => {
      if (typeof value === 'string') {
        console.log(
          `Item ID: ${itemId}, Key: ${String(key)}, New Value: ${value}`,
        );
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    },
  },
  {
    id: 'dictionaryNecessity',
    label: 'Dictionary Necessity',
    key: 'dictionaryNecessity',
    type: 'text',
    sortable: true,
    searchable: true,
  },
  {
    id: 'category',
    label: 'Category',
    key: 'category',
    type: 'select',
    sortable: false,
    searchable: false,
  },
  {
    id: 'active',
    label: 'Active',
    key: 'active',
    type: 'checkbox',
    sortable: false,
    searchable: false,
  },
];

const words = [
  'Lionel Messi',
  'Cristiano Ronaldo',
  'Michael Jordan',
  'Michael Phelps',
  'Roger Federer',
  'Serena Williams',
  'Usain Bolt',
  'Rafael Nadal',
  'LeBron James',
  'Muhammad Ali',
  'Tiger Woods',
  'Diego Maradona',
  'Kobe Bryant',
  'Lewis Hamilton',
  'Wayne Gretzky',
  'Alexander Ovechkin',
  'Novak Djokovic',
  'Ben Hogan',
  'Andre Agassi',
  "Shaquille O'Neal",
];

function makeWord(wordMax: number) {
  let text = '';
  const possible = 'bcdfghjklmnpqrstvwxyz';
  const possibleVowels = 'aeiou';

  for (let i = 0; i < wordMax; i = i + 3) {
    text += possible[Math.floor(Math.random() * possible.length)];
    text += possibleVowels[Math.floor(Math.random() * possibleVowels.length)];
    text += possible[Math.floor(Math.random() * possible.length)];
  }
  return text;
}

const generateItem = (id: string): Item => ({
  id,
  label: words[Math.floor(Math.random() * words.length)],
  type: `Type ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
  defaultWeight: Math.floor(Math.random() * 100) + 1,
  count: Math.floor(Math.random() * 1000) + 1,
  dictionaryNecessity: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
  category:
    availableOptions[Math.floor(Math.random() * availableOptions.length)],
  active: Math.random() > 0.5,
  customTextInput: makeWord(8),
});

const items: Item[] = Array.from({ length: 100 }, (_, index) =>
  generateItem(uuidv4()),
);

export function GridOne() {
  return (
    <Grid
      columns={columns}
      items={items}
      initialSort={{
        key: 'label',
        order: 'asc',
      }}
      initialSearch={{ label: 'Michael', count: '5' }}
    />
  );
}
