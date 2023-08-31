import {TodoItem, TodoList} from "../todo";

function convertJsonToTodoTxt(jsonData: TodoItem): string {
  let todoTxt: string = "";

  if (jsonData.completed) {
    todoTxt += "[X] " + jsonData.title;
  } else {
    todoTxt += "[ ] " + jsonData.title;
  }

  if (jsonData.dueDateTime) {
    todoTxt += " due: " + jsonData.dueDateTime;
  }

  if (jsonData.priority) {
    todoTxt += " priority: " + jsonData.priority;
  }

  if (jsonData.content) {
    todoTxt += " " + jsonData.content;
  }

  return todoTxt;
}

// function convertTodoTxtToJson(todoTxt: string): TodoItem {
//
// }

export {
  convertJsonToTodoTxt,
}
