import { Action, createReducer, on } from '@ngrx/store';
import { IBoard } from 'src/app/shared/models/board.model';
import { IColumn } from 'src/app/shared/models/column.model';
import { ITask } from 'src/app/shared/models/task.model';
import { BoardActions } from '../actions/board.action';
import { ColumnActions } from '../actions/column.action';
import { TaskActions } from '../actions/task.action';

export interface State {
  boards: IBoard[];
}

const initialState: State = {
  boards: [],
};

function copyThat<T>(array: T[]): T[] {
  return array.slice();
}

function findIndexByID<T extends { id: string }>(array: T[], id: string): number {
  return array.findIndex((element) => element.id === id);
}

function filterOutID<T extends { id: string }>(array: T[], id: string): T[] {
  return array.filter((element) => element.id !== id);
}

function replaceElementInIndex<T>(array: T[], newElement: T, index: number): T[] {
  return [...array.slice(0, index), newElement, ...array.slice(index + 1)];
}

const boardReducer = createReducer(
  initialState,
  on(
    BoardActions.addBoardSuccess,
    (state, { board }): State => ({
      ...state,
      boards: state.boards.concat(board),
    }),
  ),
  on(
    BoardActions.getBoardsSuccess,
    (state, { boards }): State => ({
      ...state,
      boards,
    }),
  ),
  on(
    BoardActions.deleteBoardSuccess,
    (state, { id }): State => ({
      ...state,
      boards: filterOutID(state.boards, id),
    }),
  ),

  on(BoardActions.getBoardsByIdSuccess, (state, { board }): State => {
    const newBoards = copyThat(state.boards);
    const idx = findIndexByID(newBoards, board.id);
    if (idx !== -1) {
      newBoards.splice(idx, 1, board);
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),

  on(BoardActions.putBoardSuccess, (state, { board }): State => {
    const newBoards = copyThat(state.boards);
    const idx = findIndexByID(newBoards, board.id);
    if (idx !== -1) {
      newBoards[idx] = {
        ...newBoards[idx],
        title: board.title,
      };
    }

    return { ...state, boards: newBoards };
  }),

  on(ColumnActions.addColumnSuccess, (state, { boardID, column }): State => {
    const newBoards = copyThat(state.boards);
    const idx = findIndexByID(newBoards, boardID);
    if (idx !== -1) {
      const newColumn: IColumn = { ...column, tasks: [] };
      newBoards[idx] = {
        ...newBoards[idx],
        columns: newBoards[idx].columns.concat(newColumn),
      };
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),

  on(ColumnActions.deleteColumnSuccess, (state, { boardID, columnID }): State => {
    const newBoards = copyThat(state.boards);
    const idx = findIndexByID(newBoards, boardID);
    if (idx !== -1) {
      newBoards[idx] = {
        ...newBoards[idx],
        columns: filterOutID(newBoards[idx].columns, columnID),
      };
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),

  on(ColumnActions.putColumnSuccess, (state, { boardID, column }): State => {
    const newBoards = copyThat(state.boards);
    const boardIndex = findIndexByID(newBoards, boardID);
    if (boardIndex !== -1) {
      const { columns } = newBoards[boardIndex];
      const columnIndex = findIndexByID(columns, column.id);
      const currColumn: IColumn = {
        ...columns[columnIndex],
        title: column.title,
        order: column.order,
      };
      const newColumns = replaceElementInIndex(columns, currColumn, columnIndex);
      const currentBoard = {
        ...newBoards[boardIndex],
        columns: newColumns,
      };
      newBoards.splice(boardIndex, 1, currentBoard);
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),

  on(TaskActions.AddTaskSuccess, (state, { boardID, columnID, task }): State => {
    const newBoards = copyThat(state.boards);
    const boardIndex = findIndexByID(newBoards, boardID);
    if (boardIndex !== -1) {
      const { columns } = newBoards[boardIndex];
      const columnIndex = findIndexByID(columns, columnID);
      const currColumn: IColumn = {
        ...columns[columnIndex],
        tasks: columns[columnIndex].tasks.concat(task),
      };
      const newColumns = replaceElementInIndex(columns, currColumn, columnIndex);
      const currentBoard = {
        ...newBoards[boardIndex],
        columns: newColumns,
      };
      newBoards.splice(boardIndex, 1, currentBoard);
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),

  on(TaskActions.DeleteTaskSuccess, (state, { boardID, columnID, taskID }): State => {
    const newBoards = copyThat(state.boards);
    const boardIndex = findIndexByID(newBoards, boardID);
    if (boardIndex !== -1) {
      const { columns } = newBoards[boardIndex];
      const columnIndex = findIndexByID(columns, columnID);
      const currColumn: IColumn = {
        ...columns[columnIndex],
        tasks: filterOutID(columns[columnIndex].tasks, taskID),
      };
      const newColumns = replaceElementInIndex(columns, currColumn, columnIndex);
      const currentBoard = {
        ...newBoards[boardIndex],
        columns: newColumns,
      };
      newBoards.splice(boardIndex, 1, currentBoard);
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),

  on(TaskActions.PutTaskSuccess, (state, { boardID, columnID, task }): State => {
    const newBoards = copyThat(state.boards);
    const boardIndex = findIndexByID(newBoards, boardID);
    if (boardIndex !== -1) {
      const { columns } = newBoards[boardIndex];
      const columnIndex = findIndexByID(columns, columnID);
      const { tasks } = columns[columnIndex];
      const taskIndex = findIndexByID(tasks, task.id);
      const currTask: ITask = {
        ...tasks[taskIndex],
        title: task.title,
        order: task.order,
        userId: task.userId,
        description: task.description,
      };
      if (columnID === task.columnId) {
        const currColumn: IColumn = {
          ...columns[columnIndex],
          tasks: replaceElementInIndex(tasks, currTask, taskIndex),
        };
        const newColumns = replaceElementInIndex(columns, currColumn, columnIndex);
        const currentBoard = {
          ...newBoards[boardIndex],
          columns: newColumns,
        };
        newBoards.splice(boardIndex, 1, currentBoard);
      } else {
        const currColumn: IColumn = {
          ...columns[columnIndex],
          tasks: filterOutID(columns[columnIndex].tasks, task.id),
        };
        const columnMovedToIndex = findIndexByID(columns, task.columnId);
        const columnMovedTo = {
          ...columns[columnMovedToIndex],
          tasks: columns[columnMovedToIndex].tasks.concat(currTask),
        };
        const tempColumns = replaceElementInIndex(columns, currColumn, columnIndex);
        const newColumns = replaceElementInIndex(tempColumns, columnMovedTo, columnMovedToIndex);
        const currentBoard = {
          ...newBoards[boardIndex],
          columns: newColumns,
        };
        newBoards.splice(boardIndex, 1, currentBoard);
      }
    }
    return {
      ...state,
      boards: newBoards,
    };
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return boardReducer(state, action);
}
