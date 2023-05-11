import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './SortableItem.module.css';

interface SortableItemProps {
  id: UniqueIdentifier;
  children: ReactNode;
}

export default function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={classNames(styles.sortableItem, isDragging ? styles.dragging : styles.idle)}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
