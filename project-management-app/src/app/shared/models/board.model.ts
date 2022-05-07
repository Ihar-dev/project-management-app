import { IColumn } from './column.model';

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}
