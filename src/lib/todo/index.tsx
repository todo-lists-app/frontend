import React, {useState} from "react";

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  archived?: boolean;
  dueDate?: string;
  priority?: keyof typeof priorities;
  content?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TodoList {
  items: TodoItem[];
}

export type TodoFormData = {
  title: string;
  content?: string;
  dueDate?: string;
  priority?: keyof typeof priorities;
}

export declare const priorities: {
  urgent: string;
  high: string;
  medium: string;
  low: string;
}
