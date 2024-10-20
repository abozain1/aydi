import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Barcode from "react-barcode"; 
import Actions from "./actions";
import TextHandler from "./textHandler";
import useSortableList from "./hook";
import styles from "./style.module.scss"; 

const SortableList: React.FC = () => {
  const {
    handleDelete,
    handleDiscard,
    handleEditToggle,
    handleKeyDown,
    handleSave,
    handleTextChange,
    handleOnDragEnd,
    items,
  } = useSortableList();

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <ul
            className={styles.list}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.listItem}
                    style={provided.draggableProps.style}
                  >
                    <Barcode
                      value={item.content}
                      height={50}
                      width={1}
                      displayValue={false}
                      background="#0A0A0A"
                      lineColor="#ffffff"
                    />
                    <div className={styles.section}>
                      {item.isEditing ? (
                        <TextHandler
                          content={item.content}
                          handleKeyDown={(e) => handleKeyDown(e, item.id)}
                          handleTextChange={(newContent) =>
                            handleTextChange(item.id, newContent)
                          }
                        />
                      ) : (
                        item.content
                      )}
                      <div className={styles.actions}>
                        <Actions
                          isEditing={item.isEditing}
                          handleDelete={() => handleDelete(item.id)}
                          handleEditToggle={() =>
                            handleEditToggle(item.id, item.content)
                          }
                          handleSave={() => handleSave(item.id)}
                          handleDiscard={() => handleDiscard(item.id)}
                        />
                      </div>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SortableList;
