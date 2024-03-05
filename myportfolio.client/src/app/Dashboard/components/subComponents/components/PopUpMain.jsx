import Popup from 'reactjs-popup';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faImage, faAlignJustify, faList, faChevronRight, faChevronLeft  } from '@fortawesome/free-solid-svg-icons'

import {useRef, useState} from "react";
import {Carousel} from "flowbite-react";
import { Tabs } from "keep-react";

export const PopUpMain = ({title, components, addSection}) => {

    const items = [
        {section: "nav-bar", type: "header", items: ["title", "link", "link", "link"]},
        {section: "content", type: "content", items: ["image", "text", "text"]},
        {section: "image", type: "content", items: ["image", "text"]},
        {section: "text", type: "content", items: ["text", "text"]},
        {section: "list", type: "content", items: ["text", "image", "text"]},
        {section: "divider", type: "content", items: ["text", "list"]},
        {section: "button", type: "content", items: ["carousel", "text"]}
    ]
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
            label: section.includes('-') ? section.split('-').join(' ').toUpperCase()[0] + section.split('-').join(' ').slice(1) : section.toUpperCase()[0] + section.slice(1),
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
            <Popup className="animate__animated animate__pulse" ref={ref} trigger={<button><FontAwesomeIcon icon={faPlus} /></button>} arrow={false}
                   position="center center" title={title}>
                <div
                    className="fixed flex left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 h-screen bg-gray-800/70 w-screen  z-50 justify-center items-center">
                    <div
                        className="relative flex bg-gray-900 border-2 rounded-md border-indigo-800 w-[90vw] h-[80vh] overflow-y-auto">
                        <button className="absolute right-6 top-3 text-white text-2xl" onClick={() => {
                            ref.current.close()
                        }} title={title} >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <header className="w-full text-center justify-center py-4">
                            <h1 className="text-3xl font-bold tracking-tight text-white my-2">{ title }</h1>
                            <Tabs className="justify-center gap-x-3 text-gray-500 font-bold" aria-label="Tabs" style="pills">
                                <Tabs.Item active={true} title="Sections">
                                    <section className="grid grid-cols-5 gap-4 place-items-center text-white w-full p-4">
                                        {items.map((item, index) => {
                                            return (
                                                <div
                                                    onClick={() => {
                                                        buildSection(item.section, item.items)
                                                        ref.current.close()
                                                    }}
                                                    key={index}
                                                    className="rounded-md hover:border-indigo-700 flex items-center justify-center relative border-2 border-gray-500 h-[200px] w-[300px]">
                                                    <div className="h-3/4 w-3/4 border-2 border-gray-500 rounded-md overflow-hidden">
                                                        <div className={(item.type === "header" ? "bg-gray-500" : " ") + " flex items-center justify-center h-[20%]" }>

                                                        </div>
                                                        <div className={(item.type === "content" ? "bg-gray-500" : " ") + " flex items-center justify-evenly text-4xl text-gray-800 h-[80%]"}>
                                                            {
                                                                item.type === "content" ? (
                                                                    item.items.map((item, index) => {
                                                                        switch (item) {
                                                                            case 'image':
                                                                                return <FontAwesomeIcon key={index + item} icon={faImage} />
                                                                            case 'text':
                                                                                return <FontAwesomeIcon key={index + item} icon={faAlignJustify} />
                                                                            case 'list':
                                                                                return <FontAwesomeIcon key={index + item} icon={faList} />
                                                                            case 'carousel':
                                                                                return (
                                                                                    <Carousel  key={index + item} className="text-xl w-1/4 text-transparent" leftControl={<FontAwesomeIcon icon={faChevronLeft} />} rightControl={<FontAwesomeIcon icon={faChevronRight} />} indicators={false}  slideInterval={3000}>
                                                                                        <p className="text-4xl leading-8 text-gray-800">
                                                                                            <FontAwesomeIcon icon={faImage} />
                                                                                        </p>
                                                                                        <p className="text-4xl leading-8 text-gray-800">
                                                                                            <FontAwesomeIcon icon={faImage} />
                                                                                        </p>
                                                                                    </Carousel>
                                                                                )
                                                                            default:
                                                                                return <FontAwesomeIcon key={index + item} icon={faImage} />;
                                                                        }
                                                                    })
                                                                ) : ("")
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </section>
                                </Tabs.Item>
                                <Tabs.Item title="Items">Dashboard content</Tabs.Item>
                                <Tabs.Item title="Settings">Settings content</Tabs.Item>
                                <Tabs.Item title="Contacts">Contacts content</Tabs.Item>
                                <Tabs.Item disabled={true} title="Disabled">
                                    Disabled content
                                </Tabs.Item>
                            </Tabs>
                        </header>
                    </div>
                </div>
            </Popup>
        </>
    )
};