import {Disclosure} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Menu, Options} from "./subComponents"
import {useEffect, useState} from "react";
import {PopUpMain} from "@/Dashboard/components/subComponents/components/PopUpMain.jsx";

export const DropMenu = ({items, title, type, functions, modifyItemsDashboard}) => {
    useEffect(() => {
        setItemsPrimary(items)
    }, [items]);
    const [itemsPrimary, setItemsPrimary] = useState(items ?? undefined)
    return (
        <>
            <div className="hidden lg:block h-[60vh] overflow-y-auto">
                <h3 className="sr-only">{title}</h3>
                <ul role="list"
                    className="space-y-4 border-b border-gray-200 pb-3 text-sm font-medium text-white">
                    <li className="text-center relative text-white font-bold text-lg">
                        <a>{title} { title === 'Tree View' ? <span className="absolute top-2/4 -translate-y-2/4 right-2"><PopUpMain title="Add Section"/></span> : '' }</a>
                    </li>

                </ul>
                {
                    type === 'options' ? <Options options={itemsPrimary} modifyItemsDashboard={modifyItemsDashboard}/> : <Menu items={itemsPrimary.sections} functions={functions}/>
                }

            </div>
        </>
    )
}