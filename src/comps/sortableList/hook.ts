import { Item } from "@/types/sortableList";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
const initialItems: Item[] = [
  { id: "1", content: "AD495997899", isEditing: false },
  { id: "2", content: "AD123456789", isEditing: false },
  { id: "3", content: "AD987654321", isEditing: false },
  { id: "4", content: "AD111213141", isEditing: false },
  { id: "5", content: "AD151617181", isEditing: false },
];

export default function useSortableList() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [originalContent, setOriginalContent] = useState<string>("");

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  const handleEditToggle = (id: string, content: string) => {
    setOriginalContent(content);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const handleTextChange = (id: string, newContent: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, content: newContent } : item
      )
    );
  };

  const handleSave = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  const handleDiscard = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, content: originalContent, isEditing: false }
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.key === "Enter") {
      handleSave(id);
    }
  };
  return {
    items,
    handleKeyDown,
    handleTextChange,
    handleDelete,
    handleEditToggle,
    handleSave,
    handleDiscard,
    handleOnDragEnd,
  };
}
