import {priorities, TodoItem, TodoList, UpdateList} from "../todo";

function importTodoTxt(accessToken: string, subject: string, salt: string) {
  const fileInput = document.getElementById('fileImport') as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const content = event.target?.result as string;
      const todoList = parseTodoTxt(content);

      UpdateList(accessToken, subject, salt, todoList);
    };

    reader.readAsText(file);
  }
}

function parseTodoTxt(txt: string): TodoList {
  const lines = txt.split('\n');
  const items: TodoItem[] = [];
  let currentParent: TodoItem | null = null;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    const completed = line.startsWith('[X]');
    const isSubtask = line.startsWith('-');

    const titleMatch = line.match(/\[.\] (.+?)( priority: (low|medium|urgent))?(- \[.\] .+)?( due: .+)?$/);
    if (!titleMatch) continue;

    const title = titleMatch[1];
    const priority = titleMatch[3] as keyof typeof priorities || 'low';
    const dueDateTimeMatch = line.match(/due: (.+?)( priority: (low|medium|urgent))?$/);
    const dueDateTime = dueDateTimeMatch ? dueDateTimeMatch[1] : undefined;

    const todo: TodoItem = {
      id: Math.random().toString(36).substring(2, 15),
      title,
      completed,
      priority,
      createdAt: new Date().toISOString(),
      dueDateTime,
    };

    if (isSubtask && currentParent) {
      todo.parentId = currentParent.id;
      currentParent.subTasks = currentParent.subTasks || [];
      currentParent.subTasks.push(todo);
    } else {
      items.push(todo);
      currentParent = todo;
    }
  }

  return { items };
}

export {
  importTodoTxt,
}
