import { DndContext, closestCenter, useSensor, useSensors, DragOverlay, TouchSensor, MouseSensor } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SortableItem from './SortableItem';

interface SortableProps<ID> {
  items: ID[];
  onSort: (items: ID[]) => void;
  children: (item: ID, index: number, overlay: boolean) => JSX.Element;
}

const sortModifiers = [restrictToVerticalAxis];

export default function Sortable({ items, onSort, children: renderItem }: SortableProps<string>) {
  const [localItems, setLocalItems] = useState(items);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 400,
        tolerance: 3,
      },
    }),
    useSensor(MouseSensor),
  );

  useEffect(() => setLocalItems(items), [items]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        const { active } = event;
        setActiveId(active.id);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;
        if (over != null && active.id !== over.id) {
          const oldIndex = localItems.indexOf(active.id);
          const newIndex = localItems.indexOf(over.id);
          const sortedItems = arrayMove(localItems, oldIndex, newIndex);
          setLocalItems(sortedItems);
          onSort(sortedItems);
        }
        setActiveId(null);
      }}
      modifiers={sortModifiers}
    >
      <SortableContext items={localItems} strategy={verticalListSortingStrategy}>
        {localItems.map((id, index) => (
          <SortableItem key={id} id={id}>
            {renderItem(id, index, false)}
          </SortableItem>
        ))}
      </SortableContext>
      {createPortal(
        <DragOverlay>{activeId ? renderItem(activeId, localItems.indexOf(activeId), true) : null}</DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
}
