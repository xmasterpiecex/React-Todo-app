export type DeleteTaskFunction = (task: ITask, board: IBoard) => void;
export type UpdateTaskFunction = (board: IBoard, id: number, title: string, descr: string, priority: string) => void;

export interface ITask {
  id: number;
  title: string;
  descr: string;
  priority: string;
}

export interface IBoard {
  id: number;
  titleBoard: string;
  tasks: ITask[];
}
