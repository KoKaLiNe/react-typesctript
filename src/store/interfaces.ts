export interface ITaskData {
  id?: string;
  userId?: string;
  assignedId?: string;
  username?: string;
  title?: string;
  description?: string;
  type?: string;
  dateOfCreation?: Date;
  dateOfUpdate?: Date;
  timeInMinutes?: number | string;
  status?: IStatus;
  rank?: IRank;
  length?: number;
}

export interface IUserData {
  id?: string;
  userId?: string;
  login?: string;
  password?: string;
  username?: string;
  about?: string;
  photoUrl?: string;
  length?: number;
}

export interface ITasksFilter extends ITaskData {
  query?: string;
}

export interface IProps {
  tasks: ITaskData[];
  users: IUserData[];
}
export interface ParamsTypes {
  id: string;
  userid: string;
  pathname: string;
}

export type IRank = "low" | "medium" | "high";

export type IStatus = "opened" | "inProgress" | "testing" | "complete";

export interface IWorkTime {
  timeInMinutes: number;
  comment: string;
  currentUser: string;
}

export interface IComment extends ITaskData {
  taskId: string;
  text: string;
}
