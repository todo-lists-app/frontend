export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  content?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface TodoList {
  items: TodoItem[];
}
