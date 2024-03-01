import {Disclosure} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DropDownMenu from "@/Dashboard/components/subComponents/components/DropDownMenu.jsx";
import {PopUpMain} from "@/Dashboard/components/subComponents/components/PopUpMain.jsx";

export const Menu = ({items, functions}) => {
    const selectItem = (value) => {
        functions(value)
    }

    return (
        <>
            {items.map((section, sectionIndex) => (
                <Disclosure as="div" key={section.id * sectionIndex} className="border-gray-200 pt-2" >
                    {({open}) => (
                        <>
                            <h3 onFocus={() => {
                                open ? selectItem() : selectItem(section)
                            }} className="flow-root">
                                <div onClick={() => selectItem(section)}
                                     className={"focus:border-gray-500 focus:bg-gray-800 border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500 px-2 " + (open ? "bg-gray-900 border-gray-500" : "border-gray-800 bg-gray-900")}>
                                    <span className="font-medium text-white">{section.label}</span>
                                    <div className="relative">
                                        <PopUpMain title="Add Item"/>
                                        <Disclosure.Button className="p-2 ml-1">
                                        <span className="flex items-center">
                                          {open ? (
                                              <FontAwesomeIcon icon="fa-solid fa-chevron-up"/>
                                          ) : (
                                              <FontAwesomeIcon icon="fa-solid fa-chevron-down"/>
                                          )}
                                        </span>
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </h3>
                            <Disclosure.Panel className="">
                                <div className="pl-2">
                                    {section.items.map((option, optionIndex) => (
                                        <div key={option.id} onClick={() => {
                                            selectItem(option)
                                        }} className="flex items-center">
                                            <Disclosure as="div" key={option.id} className="w-full flex items-center relative py-1">
                                                <div className="absolute left-0 -top-2/4 h-full border-2 border-gray-500 -z-10"></div>
                                                <div className="w-3 border-2 rounded-md border-gray-500 -z-10"></div>
                                                <h3 className="flow-root w-full">
                                                    <Disclosure.Button
                                                        className="flex w-full bg-gray-900 focus:bg-gray-800 rounded-md rounded-l-none border-l-2  border-gray-500 px-2 py-1 items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-500">
                                                                {option.label} - ({option.value})
                                                            </span>
                                                    </Disclosure.Button>
                                                </h3>
                                            </Disclosure>
                                        </div>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            ))}
        </>
    )
}