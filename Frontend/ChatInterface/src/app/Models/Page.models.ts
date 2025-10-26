export interface Page<T> {
  content: T[];
  number: number;
  size: number;
  totalElments: number;
  totalPages: number;
  first: Boolean;
  last: Boolean;
}
