import { createContext } from "react";

export const DataTableContext = createContext();

export const initialDataSet = [
  { name: "Puffle", age: 13 },
  { name: "Puffles", age: 4 },
  { name: "Puffley", age: 3 },
  { name: "Luna", age: 10 },
  { name: "Georgy", age: 9 },
  { name: "Teddy", age: 5 },
  { name: "Teds", age: 5 },
  { name: "Baby Boy", age: 2 },
  { name: "Tuxey", age: 9 },
  { name: "Tux", age: 10 },
  { name: "Tuxie", age: 11 },
  { name: "Tuxedo", age: 12 },
];

export const initialState = {
  data: initialDataSet,
  searchTerm: "",
  sortColumn: null,
  sortDirection: "asc",
};
