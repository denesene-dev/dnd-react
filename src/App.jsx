import {useMemo, useState} from 'react'
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';

function App() {
  const [items, setItems] = useState([1,2,3])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  useMemo(() => {
    const latestOrder = JSON.parse(localStorage.getItem('order')) ?? [1,2,3]
    setItems(latestOrder)
  }, [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <h3 className='title'>Sortable Items</h3>
        <div className='container'>
        {items.map(id => <SortableItem key={id} id={id} />)}
        </div>
        <span className='desc'>List order is automatically saved</span>
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event) {
    const {active, over} = event

    if (active.id !== over.id) {
      setItems(items => {
        let oldIndex = items.indexOf(active.id)
        let newIndex = items.indexOf(over.id)

        const latestSerial = arrayMove(items, oldIndex, newIndex)
        localStorage.setItem('order', JSON.stringify(latestSerial))

        return latestSerial
      })
    }
  }
}

export default App