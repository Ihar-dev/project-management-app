export interface Task {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files: File[];
}

type File = {
  filename: string;
  fileSize: number;
};
