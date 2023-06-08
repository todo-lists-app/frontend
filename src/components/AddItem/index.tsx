import React, {FC, FormEvent, useEffect, useState} from "react";
import {Box, Button, Heading, Input, Select, Text, Textarea} from "dracula-ui";
import {Form} from "react-final-form";

import styles from "./AddItem.module.css";
import {Container} from "react-bootstrap";
import {TodoFormData} from "../../lib/todo";
import {appConfig, isFeatureImplemented} from "../../app.config";

interface AddItemProps {
  processor: (formData: any, userSubject: string, userSalt: string) => void;
  userSubject: string;
  userSalt: string;
  itemsExist: boolean
}

export const AddItem: FC<AddItemProps> = ({processor, userSubject, userSalt, itemsExist}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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

  const handleCancel = () => {
    setIsOpen(false);
  }

  const titleRef = React.useRef<HTMLInputElement | null>(null);
  const contentRef = React.useRef<HTMLTextAreaElement | null>(null);
  const dueDateRef = React.useRef<HTMLInputElement | null>(null);
  const priorityRef = React.useRef<HTMLSelectElement | null>(null);

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
    setIsOpen(false);
    processor(formData, userSubject, userSalt);
  }

  return (
    <>
      {isOpen && (
        <Container>
          <Box className={styles.addItemBox} p="sm" color="purpleCyan" rounded="lg">
            <Heading>Add Item</Heading>
            {formError && (
              <Box color="red" borderColor="red" rounded="sm" p="sm" m="sm">
                <Text>{formError}</Text>
              </Box>
            )}
            <form onSubmit={handleSubmit}>
                <Container>
                  <Input placeholder={"Title"} name={"title"} m={"xs"} ref={titleRef} />
                  <Textarea placeholder={"Content"} name={"content"} m={"xs"} ref={contentRef} />
                  <Input type={"datetime-local"} name={"dueDate"} m={"xs"} title={"Due Date"} ref={dueDateRef} />
                  <Select defaultValue={"low"} name={"priority"} m={"xs"} title={"Priority"} ref={priorityRef}>
                    <option value={"low"} disabled={true}>Optional Priority</option>
                    <option value={"low"}>Low</option>
                    <option value={"medium"}>Medium</option>
                    <option value={"high"}>High</option>
                    <option value={"urgent"}>Urgent</option>
                  </Select>
                  <Box className={styles.addItemButtons}>
                    <Button type="submit" m={"sm"} color={"purple"}>Submit</Button>
                    <Button onClick={handleCancel} m={"sm"} color={"red"}>Cancel</Button>
                  </Box>
                </Container>
            </form>
          </Box>
        </Container>
      )}
      <Box color="greyLight" borderColor="purple" className={styles.sideBar} rounded={"sm"} p={"sm"}>
        <Button onClick={handleNewItem}>New Item</Button>
        {itemsExist && (
          <Select name={"sort"} id={"sort"} defaultValue={"sortBy"} color={"purple"} variant={"outline"}>
            <option value={"sortBy"} disabled={true}>Sort By</option>
            {isFeatureImplemented({featureSet: "todo", featureName: "sortByCompletedDate"}) && (
              <option value={"completedDate"}>Completed Date</option>
            )}
            {isFeatureImplemented({featureSet: "todo", featureName: "sortByDueDate"}) && (
              <option value={"dueDate"}>Due Date</option>
            )}
            {isFeatureImplemented({featureSet: "todo", featureName: "sortByPriority"}) && (
              <option value={"priority"}>Priority</option>
            )}
          </Select>
        )}
      </Box>
    </>
  );
}
