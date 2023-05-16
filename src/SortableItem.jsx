import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'

function SortableItem({ id }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return <div ref={setNodeRef} className='sortable-item' style={style} {...attributes} {...listeners}>
        Item {id}
    </div>
}

export default SortableItem