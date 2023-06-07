import React, {FC} from "react";
import {Box, Card, Heading, Text} from "dracula-ui";

import {TodoItem} from "../../lib/todo";
import styles from "./TodoListItem.module.css";

interface TodoListItemProps {
  item: TodoItem;
}

export const TodoListItem: FC<TodoListItemProps> = ({item}) => {
  return (
    <Box>
      {item.completed ? (
        <Box p="sm" color={"black"} rounded={"lg"} key={item.id} className={styles.itemBox}>
          <Heading size="sm" className={styles.completed}>{item.title}</Heading>
          {item.content && (
            <Text className={styles.completed}>{item.content}</Text>
          )}
        </Box>
      ) : (
        <Box p="sm" color={"black"} borderColor={"purple"} rounded={"lg"} key={item.id} className={styles.itemBox}>
          <Heading size="sm">{item.title}</Heading>
          {item.content && (
            <Text>{item.content}</Text>
          )}
        </Box>
      )}
      <br />
    </Box>
  );
}
