import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DropMenu} from "@/Dashboard/components/DropMenu.jsx";
import {DashboardPreview} from "@/Dashboard/DashboardPreview.jsx";

export function Dashboard() {
    const [itemsDashboard, setItemsDashboard] = useState();
    const [optionItem, setOptionItem] = useState();
    const [unSaved, setUnSaved] = useState(false)

    useEffect(() => {
        getItemsDashboard();
    }, []);

    async function saveItemsDashboard(bodySet) {
        bodySet = JSON.stringify(bodySet).replaceAll('"', "'");
        const resp = await fetch("itemsDashboard", {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                'accept': 'text/plain',
            },
            body: '"' + bodySet + '"'
        });
        const data = await resp.text();
        setUnSaved(false)
    }

    const onSelectItem = (value) => {
        setOptionItem(value);
    };
    const modifyItemsDashboard = (valorBuscado, nuevoValor) => {
        const modify = (obj) => {
            const newObj = structuredClone(obj)
            for (let key in newObj) {
                if (typeof newObj[key] === 'object') {
                    newObj[key] = modify(newObj[key]);
                } else if (newObj[key] === valorBuscado) {
                    if (newObj.hasOwnProperty('settings')) {
                        let className = classNames(nuevoValor.settings);
                        newObj.settings = nuevoValor.settings;
                        newObj.settings.className = className;
                    }
                    ``
                    if (newObj.hasOwnProperty('value')) {
                        newObj.value = nuevoValor.value;
                    }
                }
            }
            return newObj;
        };
        setItemsDashboard(modify(itemsDashboard));
        setUnSaved(true)
    };
    const deleteItemDashboard = (valorBuscado) => {
        const modify = (obj) => {
            const newObj = structuredClone(obj);
            for (let key in newObj) {
                if (typeof newObj[key] === 'object') {
                    if (newObj[key].idUniqueIdentifier === valorBuscado) {
                        delete newObj[key];
                    }
                    else{
                        newObj[key] = modify(newObj[key])
                    }
                }
            }
            return newObj;
        };

        setItemsDashboard(modify(itemsDashboard));
        setOptionItem("null")
    };


    const addSection = (section) => {
        setItemsDashboard({
            ...itemsDashboard,
            sections: [
                ...itemsDashboard.sections,
                section
            ]
        });
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


    if (itemsDashboard === undefined) {
        return (
            <div className="flex items-center justify-center text-white pt-36">
                <p>Loading dashboard... please wait</p>
            </div>
        );
    }

    return (
        <div className="min-h-full">
            <header className=" shadow">
                <div className="mx-auto flex justify-between max-w-7xl px-4 py-6 sm:px-6 lg:px-4">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                    <button onClick={() => saveItemsDashboard(itemsDashboard)}
                            className="text-white bg-gradient-to-r text-transparent from-indigo-700 to-purple-950 px-4 rounded-md bg-gray-800">
                        Save &nbsp;<span className={unSaved ? 'text-red-500' : 'text-white'}><FontAwesomeIcon
                        icon="fa-solid fa-floppy-disk"/></span>
                    </button>
                </div>
            </header>
            <main>
                <div className="mx-auto w-full min-h-[calc(80vh_-_64px)]">
                    <div className="h-full">
                        <div className="h-full">
                            <main className="mx-auto max-w-11/12 px-8 sm:px-6 lg:px-8 pt-6">
                                <div className="flex items-center justify-center pb-1">
                                    {/*  SECTIONS  */}
                                </div>
                                <section aria-labelledby="products-heading" className="h-[56vh] pt-6">
                                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 h-full">
                                        <DropMenu items={itemsDashboard} title="Tree View" type="tree-view"
                                                  functions={onSelectItem} addSection={addSection}
                                                  deleteItemDashboard={deleteItemDashboard}/>
                                        <div
                                            className="lg:col-span-3 border-dotted border-2 rounded-md border-indigo-700 bg-gray-900 h-[60vh] overflow-visible shrink-0 overflow-x-hidden">
                                            <DashboardPreview components={itemsDashboard}/>
                                        </div>
                                        <DropMenu items={optionItem} modifyItemsDashboard={modifyItemsDashboard}
                                                  title={optionItem !== undefined ? "Options for " + optionItem.label : "Options"}
                                                  type="options"/>
                                    </div>
                                </section>
                            </main>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

    async function getItemsDashboard() {
        try {
            const resp = await fetch('itemsDashboard');
            const data = await resp.json();
            setItemsDashboard(data);
        } catch (error) {
            console.error('Error fetching itemsDashboard:', error);
        }
    }
}