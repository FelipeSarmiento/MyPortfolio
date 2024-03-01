import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef} from "react";

export const PopUpMain = ({title, components}) => {

    const items = [
        {
            id: "1Title",
            label: "Title",
            icon: "fa-solid fa-heading",
        },
        {
            id: "2Paragraph",
            label: "Paragraph",
            icon: "fa-solid fa-paragraph",
        },
        {
            id: "3Image",
            label: "Image",
            icon: "fa-solid fa-image",
        },
        {
            id: "4Link",
            label: "Link",
            icon: "fa-solid fa-link",
        },
        {
            id: "5Table",
            label: "Table",
            icon: "fa-solid fa-table",
        },
        {
            id: "6MainContent",
            label: "Main Content",
            icon: "fa-solid fa-tarp",
        }
    ]

    const ref = useRef();
    return (
        <>
            <Popup className="animate__animated animate__pulse" ref={ref} trigger={<button><FontAwesomeIcon icon="fa-solid fa-plus"/></button>} arrow={false}
                   position="center center" title={title}>
                <div
                    className="fixed flex left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 h-screen bg-gray-800/90 w-screen  z-50 justify-center items-center">
                    <div
                        className="relative flex bg-gray-800 border-2 rounded-md border-gray-700 w-[90vw] h-[80vh] overflow-y-auto">
                        <button className="absolute right-6 top-3 text-white text-2xl" onClick={() => {
                            ref.current.close()
                        }} title={title} >
                            <FontAwesomeIcon icon="fa-solid fa-xmark"/>
                        </button>
                        <header className="w-full text-center justify-center py-4">
                            <h1 className="text-3xl font-bold tracking-tight text-white my-2">{ title }</h1>
                            <hr/>
                            <section className="grid grid-cols-7 gap-4 place-items-center text-white w-full p-4">
                                {
                                    items.map((item, index) => (
                                        <div key={item.id}
                                             className="rounded-md flex items-center justify-center relative border-2 border-gray-500 h-[200px] w-[200px]">
                                            <h2 className="text-white absolute top-1 left-2/4 -translate-x-2/4 text-nowrap">{item.label}</h2>
                                            <span className="text-7xl">
                                            <FontAwesomeIcon icon={item.icon}/>
                                        </span>
                                        </div>
                                    ))
                                }
                            </section>
                        </header>
                    </div>
                </div>
            </Popup>
        </>
    )
};