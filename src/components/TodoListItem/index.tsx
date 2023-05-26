import React, {FC} from "react";
import {Card, Heading, Text} from "dracula-ui";
import {TodoItem} from "../../lib/todo";

interface TodoListItemProps {
  item: TodoItem;
}

export const TodoListItem: FC<TodoListItemProps> = ({item}) => {
  return (
    <Card borderColor="purple" p="sm">
      <Heading size="sm">{item.title}</Heading>
      {item.content && (
        <Text>{item.content}</Text>
      )}
    </Card>
  );
}
