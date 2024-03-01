import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef, useState} from "react";
import {Carousel} from "flowbite-react";

export const PopUpMain = ({title, components, addSection}) => {


    const buildSection = (section, items) => {

        let settings = {
            "id": "",
            "idUniqueIdentifier": "",
            "className": "",
            "textColor": {
                "id": "",
                "idUniqueIdentifier": "",
                "type": "text",
                "color": "white",
                "intensity": "500"
            },
            "textSize": "text-md",
            "textWeight": "font-bold",
            "textAlign": "text-center",
            "textSpacing": "spacing-3",
            "textDecoration": "text-underline",
            "decorationColor": {
                "id": "",
                "idUniqueIdentifier": "",
                "type": "decoration",
                "color": "red",
                "intensity": "300"
            },
            "backgroundColor": {
                "id": "",
                "idUniqueIdentifier": "",
                "type": "bg",
                "color": "transparent",
                "intensity": "700"
            },
            "borderWidth": "null",
            "borderRadius": "rounded-md",
            "borderColor": {
                "id": "",
                "idUniqueIdentifier": "",
                "type": "border",
                "color": "blue",
                "intensity": "600"
            },
            "justifyContent": "justify-center",
            "itemsAlign": "items-center",
            "display": "flex",
            "paddingRight": "pr-2",
            "paddingLeft": "pl-2",
            "paddingTop": "pt-2",
            "paddingBottom": "pb-2",
            "marginRight": "",
            "marginLeft": "",
            "marginTop": "",
            "marginBottom": "",
            "height": "h-[60px]",
            "width": "w-[100%]",
            "borderRight": "border-r-2",
            "borderLeft": "border-l-2",
            "borderTop": "border-t-2",
            "borderBottom": "border-b-2",
            "opacity": "opacity-2"
        }
        let newItems = [];

        
        for (let i = 0; i < items.length; i++) {
            newItems.push({
                id: Math.random().toString(36).substring(7),
                idUniqueIdentifier: Math.random().toString(36).substring(7) + items[i],
                type: items[i],
                label: items[i].split('-').join(' ').toUpperCase()[0] + items[i].split('-').join(' ').slice(1),
                value: items[i],
                settings: {
                    ...settings,
                    className: classNames(settings)
                }
            })
        }

        let newSection = {
            id: Math.random().toString(36).substring(7),
            idUniqueIdentifier: Math.random().toString(36).substring(7) + section,
            type: section,
            label: section.split('-')[0].charAt(0).toUpperCase() + section.split('-')[0].slice(1) + ' ' + section.split('-')[1].charAt(0).toUpperCase() + section.split('-')[1].slice(1),
            items: newItems,
            settings: {
                ...settings,
                className: classNames(settings)
            }
        }
        addSection(newSection);
    }

    function classNames(classes) {
        classes.className = ""
        const elements = Object.entries(classes).map(([key, value]) => {
            if (typeof value === 'object') {
                let type = value.type;
                let color = value.color;
                let intensity = value.intensity;
                if (color === 'black' || color === 'white' || color === 'transparent') {
                    intensity = '';
                }
                value = `${type}-${color}${intensity ? '-' + intensity : ''}`;
            }
            return value;
        });
        return elements.join(' ');
    }

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
                            <section className="grid grid-cols-4 gap-4 place-items-center text-white w-full p-4">
                                <div
                                    onClick={() => {
                                        buildSection("nav-bar", ['title', 'link', 'link', 'link'])
                                        ref.current.close()
                                    }}
                                    className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md overflow-hidden">
                                        <div className="flex items-center justify-center h-[20%]  bg-gray-500 ">

                                        </div>
                                        <div className="flex items-center justify-between h-[80%]]">

                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-around h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                            <FontAwesomeIcon icon="fa-solid fa-align-justify" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-around h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <FontAwesomeIcon icon="fa-solid fa-align-justify" />
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-around h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <FontAwesomeIcon icon="fa-solid fa-align-justify" />
                                            <FontAwesomeIcon icon="fa-solid fa-align-justify" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-around h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <FontAwesomeIcon icon="fa-solid fa-align-justify" />
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                            <FontAwesomeIcon icon="fa-solid fa-align-justify" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-around h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                            <FontAwesomeIcon icon="fa-solid fa-align-justify" />
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-around h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-around h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                            <FontAwesomeIcon icon="fa-solid fa-image" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-around h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <Carousel className="text-xl" leftControl={<FontAwesomeIcon icon="fa-solid fa-chevron-left" />} rightControl={<FontAwesomeIcon icon="fa-solid fa-chevron-right" />} indicators={false}  slideInterval={3000}>
                                                <p className="text-4xl leading-8">
                                                    <FontAwesomeIcon icon="fa-solid fa-image" />
                                                </p>
                                                <p className="text-4xl leading-8">
                                                    <FontAwesomeIcon icon="fa-solid fa-image" />
                                                </p>
                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-center h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <Carousel className="text-xl w-2/4 text-transparent" leftControl={<FontAwesomeIcon icon="fa-solid fa-chevron-left" />} rightControl={<FontAwesomeIcon icon="fa-solid fa-chevron-right" />} indicators={false}  slideInterval={3000}>
                                                <p className="text-4xl leading-8 text-gray-800">
                                                    <FontAwesomeIcon icon="fa-solid fa-image" />
                                                </p>
                                                <p className="text-4xl leading-8 text-gray-800">
                                                    <FontAwesomeIcon icon="fa-solid fa-image" />
                                                </p>
                                            </Carousel>
                                            <FontAwesomeIcon className="w-2/4" icon="fa-solid fa-align-justify" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-center h-[20%]">

                                        </div>
                                        <div className="flex items-center justify-evenly h-[80%] text-4xl text-gray-800 bg-gray-500">
                                            <FontAwesomeIcon icon="fa-solid fa-list" />
                                            <FontAwesomeIcon icon="fa-solid fa-list" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[300px] w-[300px]">
                                    <div className="h-2/4 w-3/4 border-2 border-gray-500 rounded-md ">
                                        <div className="flex items-center justify-evenly h-[80%] text-4xl text-gray-800">
                                        </div>
                                        <div className="flex items-center justify-center h-[20%] bg-gray-500">

                                        </div>
                                    </div>
                                </div>
                            </section>
                        </header>
                    </div>
                </div>
            </Popup>
        </>
    )
};