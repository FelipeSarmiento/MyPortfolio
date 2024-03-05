import {NavBarPreview} from "./componentsPreview/NavBarPreview.jsx";
import {IndexPage} from "./componentsPreview/Index/IndexPage.jsx";
import {DndContext} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';

export const DashboardPreview = ({components, onSelectItem}) => {

    const Draggable = (props) => {
        const {attributes, listeners, setNodeRef, transform} = useDraggable({
            id: 'draggable',
        })

        const style = transform ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        } : undefined

        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <button>Drag me</button>
            </div>
        )
    }

    return (
        <>
            {
                components.sections.map((component, index) => {
                    if (component !== undefined) {
                        switch (component.type) {
                            case "nav-bar":
                                return <NavBarPreview key={component.idUniqueIdentifier} onSelectItem={onSelectItem}
                                                      items={component}/>
                            case "content":
                                return <IndexPage key={component.idUniqueIdentifier}/>
                            default:
                                return <div key={component.idUniqueIdentifier}>Component not found</div>
                        }
                    }

                })
            }
        {/*

        */}

            <DndContext>
                <Draggable />
                <Draggable />
                <Draggable />
                <Draggable />
            </DndContext>

        </>
    )
}