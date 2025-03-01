export interface Todo {
    id: string;
    title: string;
    completed: boolean;
  }
  
  export const FILTERS = {
    ALL: "ALL",
    ACTIVE: "ACTIVE",
    COMPLETED: "COMPLETED",
  } as const;
  
  export type FilterType = keyof typeof FILTERS;
  