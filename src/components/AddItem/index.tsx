import React, {FC, FormEvent, useEffect, useState} from "react";
import {Box, Button, Heading, Input, Select, Text, Textarea} from "dracula-ui";

import styles from "./AddItem.module.css";
import {Container} from "react-bootstrap";
import {TodoFormData} from "../../lib/todo";
import {TodoForm} from "../TodoForm";

interface AddItemProps {
  processor: (formData: any) => void;
}

export const AddItem: FC<AddItemProps> = ({processor}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNewItem = () => {
    setIsOpen(!isOpen)
  }

  const addItemRef = React.useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addItemRef.current && event.target instanceof Element && !addItemRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [addItemRef]);

  return (
    <>
      {isOpen && (
        <TodoForm
          addProcessor={processor}
          openCallback={setIsOpen}
        />
      )}
      <Button onClick={handleNewItem} m={"xs"}>New Item</Button>
    </>
  );
}
