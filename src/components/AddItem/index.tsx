import React, {FC, useEffect, useState} from "react";
import {Button} from "dracula-ui";

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
