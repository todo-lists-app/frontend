import React, {FC, FormEvent, useState} from "react";
import {Box, Button, Heading, Text, Input, Select, Textarea} from "dracula-ui";
import {Container} from "react-bootstrap";

import styles from "./TodoForm.module.css";
import {TodoFormData, TodoItem} from "../../lib/todo";

interface TodoFormProps {
  editProcessor?: (formData: any, todoItem: TodoItem) => void;
  addProcessor?: (formData: any) => void;
  openCallback: (isOpen: boolean) => void;

  todoItem?: TodoItem;
}

export const TodoForm: FC<TodoFormProps> = ({
                                              addProcessor,
                                              editProcessor,
                                              openCallback,
  todoItem,
                                              }) => {
  const [formError, setFormError] = useState<string | null>(null);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormError(null)

    if (!titleRef.current?.value) {
      setFormError("Title is required");
      return;
    }

    const formData = {
      title: titleRef.current?.value,
      content: contentRef.current?.value,
      dueDate: dueDateRef.current?.value,
      priority: priorityRef.current?.value,
    } as TodoFormData;
    openCallback(false);
    if (addProcessor) {
      addProcessor(formData);
      return;
    }
    if (editProcessor && todoItem) {
      editProcessor(formData, todoItem);
      return;
    }
  }
  const handleCancel = () => {
    openCallback(false);
  }

  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const contentRef = React.useRef<HTMLTextAreaElement | null>(null);
  const dueDateRef = React.useRef<HTMLInputElement | null>(null);
  const priorityRef = React.useRef<HTMLSelectElement | null>(null);

  let priorityValue = "low";
  let titleValue = "";
  let contentValue = "";
  let dueDateValue = "";
  if (todoItem) {
    if (todoItem.priority) {
      priorityValue = todoItem.priority;
    }
    if (todoItem.title) {
      titleValue = todoItem.title;
    }
    if (todoItem.content) {
      contentValue = todoItem.content;
    }
    if (todoItem.dueDate) {
      dueDateValue = todoItem.dueDate;
    }
  }

  return (
    <Container>
      <Box className={styles.formBox} p="sm" color="purpleCyan" rounded="lg">
        <Heading>Add Item</Heading>
        {formError && (
          <Box color="red" borderColor="red" rounded="sm" p="sm" m="sm">
            <Text>{formError}</Text>
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <Container>
            <Input placeholder={"Title"} name={"title"} m={"xs"} ref={titleRef} defaultValue={titleValue} />
            <Textarea placeholder={"Content"} name={"content"} m={"xs"} ref={contentRef} defaultValue={contentValue} />
            <Input type={"datetime-local"} name={"dueDate"} m={"xs"} title={"Due Date"} ref={dueDateRef} defaultValue={dueDateValue} />
            <Select defaultValue={priorityValue} name={"priority"} m={"xs"} title={"Priority"} ref={priorityRef}>
              <option value={"low"} disabled={true}>Optional Priority</option>
              <option value={"low"}>Low</option>
              <option value={"medium"}>Medium</option>
              <option value={"high"}>High</option>
              <option value={"urgent"}>Urgent</option>
            </Select>
            <Box className={styles.formButtons}>
              <Button type="submit" m={"sm"} color={"purple"}>Submit</Button>
              <Button onClick={handleCancel} m={"sm"} color={"red"}>Cancel</Button>
            </Box>
          </Container>
        </form>
      </Box>
    </Container>
  )
}
