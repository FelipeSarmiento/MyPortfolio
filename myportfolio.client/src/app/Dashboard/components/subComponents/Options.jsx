import {Disclosure} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import {PopUpMain} from "./components/PopUpMain.jsx";
import {Slider, TextInput} from "keep-react";

export const Options = ({options, modifyItemsDashboard}) => {
    const colors = ['transparent', 'white', 'black', 'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
    const sizes = ['xs', 'base', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
    const radius = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];

    const onChangeInput = ({target}) => {
        let option = optionItem;
        switch (target.id) {
            case 'TextColor':
                setColorOptions({
                    ...colorOptions,
                    textColor: {
                        ...colorOptions.textColor,
                        [target.name]: target.value
                    }
                });
                option = {
                    ...optionItem,
                    settings: {
                        ...optionItem.settings,
                        textColor: {
                            ...optionItem.settings.textColor,
                            [target.name]: target.value
                        }
                    }
                }
                setOptionItem(option)
                modifyItemsDashboard(option.idUniqueIdentifier, option)
                break
            case 'BackgroundColor':
                setColorOptions({
                    ...colorOptions,
                    backgroundColor: {
                        ...colorOptions.backgroundColor,
                        [target.name]: target.value
                    }
                });
                option = {
                    ...optionItem,
                    settings: {
                        ...optionItem.settings,
                        backgroundColor: {
                            ...optionItem.settings.backgroundColor,
                            [target.name]: target.value
                        }
                    }
                }
                setOptionItem(option)
                modifyItemsDashboard(option.idUniqueIdentifier, option)
                break
            case 'BorderColor':
                setColorOptions({
                    ...colorOptions,
                    borderColor: {
                        ...colorOptions.borderColor,
                        [target.name]: target.value
                    }
                });
                option = {
                    ...optionItem,
                    settings: {
                        ...optionItem.settings,
                        borderColor: {
                            ...optionItem.settings.borderColor,
                            [target.name]: target.value
                        }
                    }
                }
                setOptionItem(option)
                modifyItemsDashboard(option.idUniqueIdentifier, option)
                break
            case 'valueInput':
                setValueInput(target.value)
                option = {
                    ...optionItem,
                    value: target.value
                }
                setOptionItem(option)
                modifyItemsDashboard(option.idUniqueIdentifier, option)
                break
            default:
                option = {
                    ...optionItem,
                    settings: {
                        ...optionItem.settings,
                        [target.name]: target.value
                    }
                }
                setOptionItem(option)
                modifyItemsDashboard(option.idUniqueIdentifier, option)
                break
        }
    }

    useEffect(() => {
        setOptionItem(options);
        if (options !== undefined) {
            if (options.hasOwnProperty("settings")) {
                setColorOptions({
                    "textColor": {
                        type: options.settings.textColor.type,
                        color: options.settings.textColor.color,
                        intensity: options.settings.textColor.intensity
                    },
                    "backgroundColor": {
                        type: options.settings.backgroundColor.type,
                        color: options.settings.backgroundColor.color,
                        intensity: options.settings.backgroundColor.intensity
                    },
                    "borderColor": {
                        type: options.settings.borderColor.type,
                        color: options.settings.borderColor.color,
                        intensity: options.settings.borderColor.intensity
                    },
                    "decorationColor": {
                        type: options.settings.decorationColor.type,
                        color: options.settings.decorationColor.color,
                        intensity: options.settings.decorationColor.intensity
                    },
                })
            }
            if (options.hasOwnProperty("value")) {
                setValueInput(options.value)
            }

            setBorderWidth({
                borderRight: options.settings.borderRight,
                borderLeft: options.settings.borderLeft,
                borderTop: options.settings.borderTop,
                borderBottom: options.settings.borderBottom
            })

        }
    }, [options]);

    const [optionItem, setOptionItem] = useState(options);
    const [colorOptions, setColorOptions] = useState(
        {
            "textColor": {
                type: "text",
                color: "",
                intensity: ""
            },
            "backgroundColor": {
                type: "bg",
                color: "",
                intensity: ""
            },
            "borderColor": {
                type: "border",
                color: "",
                intensity: ""
            },
            "decorationColor": {
                type: "decoration",
                color: "",
                intensity: ""
            },
        }
    )
    const [valueInput, setValueInput] = useState()
    const [borderWidth, setBorderWidth] = useState({
        borderRight: "",
        borderLeft: "",
        borderTop: "",
        borderBottom: ""
    })


    return optionItem !== undefined ? (
            <div className="py-2 pr-2">
                {optionItem.hasOwnProperty("settings") ? (
                    <>
                        {optionItem.hasOwnProperty("value") ? (
                            <Disclosure as="div" className="border-gray-200 pt-2">
                                {({open}) => (
                                    <>
                                        <h3 className="flow-root">
                                            <div
                                                className={"focus:border-gray-500 focus:bg-gray-800 border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500 px-2 " + (open ? "bg-gray-900 border-gray-500" : "border-gray-800 bg-gray-900")}>
                                                <span className="font-medium text-white">Text</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp} />
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown} />
                                                              )}
                                                            </span>
                                                    </Disclosure.Button>
                                                </div>
                                            </div>
                                        </h3>
                                        <Disclosure.Panel className="pl-2 w-full py-1">
                                            <div className="relative flex items-center w-full">
                                                <div className="py-1 border-l-2 w-full pl-1">
                                                    <label className="text-white" htmlFor="valueInput">Value</label>
                                                    <input onChange={onChangeInput} onKeyUp={onChangeInput} type="text"
                                                           name="value"
                                                           id="valueInput"
                                                           value={optionItem.value}
                                                           className="bg-transparent border-2 text-white outline-none w-full rounded-md min-h-10 px-1 appearance-none"/>
                                                    <label className="text-white" htmlFor="TextSize">Font Size</label>
                                                    <select onChange={onChangeInput} value={optionItem.settings.textSize}
                                                            id="TextSize" name="textSize"
                                                            className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-gray-800 text-white px-1 w-full focus:outline-none">
                                                        {
                                                            sizes.map((size, index) => {
                                                                return (<option key={index * Math.random()}
                                                                                className="focus:bg-red-500 focus:outline-none border-0 appearance-none border-transparent"
                                                                                value={"text-" + size}>text-{size}</option>)
                                                            })
                                                        }
                                                    </select>
                                                    <label className="text-white" htmlFor="TextColor">Font Color</label>
                                                    <div className="relative mb-2">
                                                        <select onChange={onChangeInput} id="TextColor" name="color"
                                                                value={colorOptions.textColor.color}
                                                                className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-gray-800 text-white px-1 w-full focus:outline-none">
                                                            {
                                                                colors.map((color, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    className="focus:bg-red-500 focus:outline-none border-0 appearance-none border-transparent"
                                                                                    value={color}>{color.charAt(0).toLocaleUpperCase() + color.slice(1)}</option>)
                                                                })
                                                            }
                                                        </select>
                                                        <div
                                                            className={`bg-${colorOptions.textColor.color + ((colorOptions.textColor.color === 'white' || colorOptions.textColor.color === 'black' || colorOptions.textColor.color === 'transparent') ? "" : "-" + colorOptions.textColor.intensity)} absolute top-0 right-0 font-bold border-2 border-gray-500 h-full w-7 rounded-md `}>
                                                        </div>
                                                    </div>

                                                    {
                                                        (colorOptions.textColor.color !== "white" && colorOptions.textColor.color !== "black" && colorOptions.textColor.color !== "transparent") ? (
                                                            <>
                                                                <Slider
                                                                    defaultValue={colorOptions.textColor.intensity}
                                                                    max={900}
                                                                    min={100}
                                                                    onChange={(value) => {
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "TextColor",
                                                                                name: "intensity",
                                                                                value
                                                                            }
                                                                        })
                                                                    }}
                                                                    step={100}
                                                                />
                                                            </>
                                                        ) : <p className="text-xs text-white font-bold mt-2">Intensity is
                                                            not available for this color</p>
                                                    }
                                                    <label className="text-white" htmlFor="FontWeight">Font Weight</label>
                                                    <select onChange={onChangeInput} value={optionItem.settings.textWeight}
                                                            id="FontWeight" name="textWeight"
                                                            className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-gray-800 text-white px-1 w-full focus:outline-none">
                                                        <option value="font-light">Light</option>
                                                        <option value="font-normal">Normal</option>
                                                        <option value="font-medium">Medium</option>
                                                        <option value="font-semibold">Semibold</option>
                                                        <option value="font-bold">Bold</option>
                                                        <option value="font-extrabold">Extrabold</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ) : null}
                        {optionItem.settings.hasOwnProperty("backgroundColor") ? (
                            <Disclosure as="div" className="border-gray-200 pt-2">
                                {({open}) => (
                                    <>
                                        <h3 className="flow-root">
                                            <div
                                                className={"focus:border-gray-500 focus:bg-gray-800 border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500 px-2 " + (open ? "bg-gray-900 border-gray-500" : "border-gray-800 bg-gray-900")}>
                                                <span className="font-medium text-white">Background Color</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp} />
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown} />
                                                              )}
                                                            </span>
                                                    </Disclosure.Button>
                                                </div>
                                            </div>
                                        </h3>
                                        <Disclosure.Panel className="pl-2 w-full py-1">
                                            <div className="relative flex items-center w-full">
                                                <div className="py-2 border-l-2 w-full pl-1">
                                                    <div className="relative mb-2">
                                                        <select onChange={onChangeInput} id="BackgroundColor" name="color"
                                                                value={colorOptions.backgroundColor.color}
                                                                className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-gray-800 text-white px-1 w-full focus:outline-none">
                                                            {
                                                                colors.map((color, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    className="focus:bg-red-500 focus:outline-none border-0 border-transparent"
                                                                                    value={color}>{color.charAt(0).toLocaleUpperCase() + color.slice(1)}</option>)
                                                                })
                                                            }
                                                        </select>
                                                        <div
                                                            className={`bg-${colorOptions.backgroundColor.color + ((colorOptions.backgroundColor.color === 'white' || colorOptions.backgroundColor.color === 'black' || colorOptions.backgroundColor.color === 'transparent') ? "" : "-" + colorOptions.backgroundColor.intensity)} absolute top-0 right-0 font-bold border-2 border-gray-500 h-full w-7 rounded-md `}>
                                                        </div>
                                                    </div>
                                                    {
                                                        (colorOptions.backgroundColor.color !== "white" && colorOptions.backgroundColor.color !== "black" && colorOptions.backgroundColor.color !== "transparent") ? (
                                                            <>
                                                                <Slider
                                                                    defaultValue={colorOptions.backgroundColor.intensity}
                                                                    max={900}
                                                                    min={100}
                                                                    onChange={(value) => {
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "BackgroundColor",
                                                                                name: "intensity",
                                                                                value
                                                                            }
                                                                        })
                                                                    }}
                                                                    step={100}
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="text-xs text-white font-bold my-2">Intensity
                                                                    is not available for this color</p>
                                                            </>
                                                        )

                                                    }


                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ) : null}
                        {optionItem.settings.hasOwnProperty("borderColor") ? (
                            <Disclosure as="div" className="border-gray-200 pt-2">
                                {({open}) => (
                                    <>
                                        <h3 className="flow-root">
                                            <div
                                                className={"focus:border-gray-500 focus:bg-gray-800 border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500 px-2 " + (open ? "bg-gray-900 border-gray-500" : "border-gray-800 bg-gray-900")}>
                                                <span className="font-medium text-white">Border</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp} />
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown} />
                                                              )}
                                                            </span>
                                                    </Disclosure.Button>
                                                </div>
                                            </div>
                                        </h3>
                                        <Disclosure.Panel className="pl-2 w-full py-1">
                                            <div className="relative flex items-center w-full">
                                                <div className="border-l-2 w-full pl-1 pt-2">
                                                    {/*



                                                    */}
                                                    <p className="text-white text-center mb-4">Borders width</p>
                                                    <div className="relative h-10 mt-2 mb-5 mx-auto w-2/4 border-2 border-gray-500 rounded-md">

                                                        <input onChange={({target}) => {
                                                            setBorderWidth({
                                                                ...borderWidth,
                                                                borderLeft: "border-l-[" + target.value + "px]"
                                                            })
                                                            onChangeInput({
                                                                target: {
                                                                    id: "BorderWidth",
                                                                    name: "borderLeft",
                                                                    value: "border-l-[" + target.value + "px]"
                                                                }
                                                            })
                                                        }}
                                                               value={borderWidth.borderLeft.split("-")[2].replace("[", "").replace("]", "").replace("px", "")}
                                                               type="text"
                                                               className="absolute appearance-none bg-gray-800 border-2 border-gray-500 rounded-md -translate-y-2/4 left-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>

                                                        <input onChange={({target}) => {
                                                            setBorderWidth({
                                                                ...borderWidth,
                                                                borderRight: "border-r-[" + target.value + "px]"
                                                            })
                                                            onChangeInput({
                                                                target: {
                                                                    id: "BorderWidth",
                                                                    name: "borderRight",
                                                                    value: "border-r-[" + target.value + "px]"
                                                                }
                                                            })
                                                        }} type="text"
                                                               value={borderWidth.borderRight.split("-")[2].replace("[", "").replace("]", "").replace("px", "")}
                                                               className="absolute appearance-none bottom-0 bg-gray-800 border-2 border-gray-500 rounded-md translate-y-2/4 left-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>

                                                        <p className="absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 text-xs text-white">PX</p>

                                                        <input onChange={({target}) => {
                                                            setBorderWidth({
                                                                ...borderWidth,
                                                                borderTop: "border-t-[" + target.value + "px]"
                                                            })
                                                            onChangeInput({
                                                                target: {
                                                                    id: "BorderWidth",
                                                                    name: "borderTop",
                                                                    value: "border-t-[" + target.value + "px]"
                                                                }
                                                            })
                                                        }}
                                                               value={borderWidth.borderTop.split("-")[2].replace("[", "").replace("]", "").replace("px", "")}
                                                               type="text"
                                                               className="absolute appearance-none top-2/4 bg-gray-800 border-2 border-gray-500 rounded-md -translate-y-2/4 -translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>
                                                        <input onChange={({target}) => {
                                                            setBorderWidth({
                                                                ...borderWidth,
                                                                borderBottom: "border-b-[" + target.value + "px]"
                                                            })
                                                            onChangeInput({
                                                                target: {
                                                                    id: "BorderWidth",
                                                                    name: "borderBottom",
                                                                    value: "border-b-[" + target.value + "px]"
                                                                }
                                                            })
                                                        }}
                                                               value={borderWidth.borderBottom.split("-")[2].replace("[", "").replace("]", "").replace("px", "")}
                                                               type="text"
                                                               className="absolute appearance-none top-2/4 bg-gray-800 border-2 border-gray-500 rounded-md -translate-y-2/4 right-0 translate-x-2/4 w-8 h-5 text-white text-xs text-center outline-none"/>
                                                    </div>

                                                    <label className="text-white" htmlFor="BorderRadius">Border
                                                        Radius</label>
                                                    <select onChange={onChangeInput}
                                                            value={optionItem.settings.borderRadius} id="BorderRadius"
                                                            name="borderRadius"
                                                            className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-gray-800 text-white px-1 w-full focus:outline-none mb-3">
                                                        {
                                                            radius.map((size, index) => {
                                                                return (<option key={index * Math.random()}
                                                                                className="focus:bg-red-500 focus:outline-none border-0 appearance-none border-transparent"
                                                                                value={"rounded-" + size}>rounded-{size}</option>)
                                                            })
                                                        }
                                                    </select>
                                                    <label className="text-white">Border Color</label>
                                                    <div className="relative mb-2">
                                                        <select onChange={onChangeInput} id="BorderColor" name="color"
                                                                value={colorOptions.borderColor.color}
                                                                className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-gray-800 text-white px-1 w-full focus:outline-none">
                                                            {
                                                                colors.map((color, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    className="focus:bg-red-500 focus:outline-none border-0 appearance-none border-transparent"
                                                                                    value={color}>{color.charAt(0).toLocaleUpperCase() + color.slice(1)}</option>)
                                                                })
                                                            }
                                                        </select>
                                                        <div
                                                            className={`bg-${colorOptions.borderColor.color + ((colorOptions.borderColor.color === 'white' || colorOptions.borderColor.color === 'black' || colorOptions.borderColor.color === 'transparent') ? "" : "-" + colorOptions.borderColor.intensity)} absolute top-0 right-0 font-bold border-2 border-gray-500 h-full w-7 rounded-md `}>
                                                        </div>
                                                    </div>
                                                    {
                                                        (colorOptions.borderColor.color !== "white" && colorOptions.borderColor.color !== "black" && colorOptions.borderColor.color !== "transparent") ? (
                                                            <>
                                                                <Slider
                                                                    defaultValue={colorOptions.borderColor.intensity}
                                                                    max={900}
                                                                    min={100}
                                                                    onChange={(value) => {
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "BorderColor",
                                                                                name: "intensity",
                                                                                value
                                                                            }
                                                                        })
                                                                    }}
                                                                    step={100}
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="text-xs text-white font-bold my-2">Intensity
                                                                    is not available for this color</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ) : null}
                        {(optionItem.settings.hasOwnProperty("borderColor") || true) ? (
                            <Disclosure as="div" className="border-gray-200 pt-2">
                                {({open}) => (
                                    <>
                                        <h3 className="flow-root">
                                            <div
                                                className={"focus:border-gray-500 focus:bg-gray-800 border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500 px-2 " + (open ? "bg-gray-900 border-gray-500" : "border-gray-800 bg-gray-900")}>
                                                <span className="font-medium text-white">Sizes</span>
                                                <div className="relative">
                                                    <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp} />
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown} />
                                                              )}
                                                            </span>
                                                    </Disclosure.Button>
                                                </div>
                                            </div>
                                        </h3>
                                        <Disclosure.Panel className="pl-2 w-full py-1">
                                            <div className="relative flex items-center w-full">
                                                <div className="border-l-2 w-full pl-1 pt-2">

                                                    <section>
                                                        <TextInput
                                                            id="#id-9"
                                                            placeholder="example@gmail.com"
                                                            color="gray"
                                                            sizing="md"
                                                            addonPosition="left"
                                                        />
                                                    </section>

                                                    <label className="text-white" htmlFor="BorderRadius">Border
                                                        Radius</label>
                                                    <select onChange={onChangeInput}
                                                            value={optionItem.settings.borderRadius} id="BorderRadius"
                                                            name="borderRadius"
                                                            className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-gray-800 text-white px-1 w-full focus:outline-none mb-3">
                                                        {
                                                            radius.map((size, index) => {
                                                                return (<option key={index * Math.random()}
                                                                                className="focus:bg-red-500 focus:outline-none border-0 appearance-none border-transparent"
                                                                                value={"rounded-" + size}>rounded-{size}</option>)
                                                            })
                                                        }
                                                    </select>
                                                    <label className="text-white">Border Color</label>
                                                    <div className="relative mb-2">
                                                        <select onChange={onChangeInput} id="BorderColor" name="color"
                                                                value={colorOptions.borderColor.color}
                                                                className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-gray-800 text-white px-1 w-full focus:outline-none">
                                                            {
                                                                colors.map((color, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    className="focus:bg-red-500 focus:outline-none border-0 appearance-none border-transparent"
                                                                                    value={color}>{color.charAt(0).toLocaleUpperCase() + color.slice(1)}</option>)
                                                                })
                                                            }
                                                        </select>
                                                        <div
                                                            className={`bg-${colorOptions.borderColor.color + ((colorOptions.borderColor.color === 'white' || colorOptions.borderColor.color === 'black' || colorOptions.borderColor.color === 'transparent') ? "" : "-" + colorOptions.borderColor.intensity)} absolute top-0 right-0 font-bold border-2 border-gray-500 h-full w-7 rounded-md `}>
                                                        </div>
                                                    </div>
                                                    {
                                                        (colorOptions.borderColor.color !== "white" && colorOptions.borderColor.color !== "black" && colorOptions.borderColor.color !== "transparent") ? (
                                                            <>
                                                                <Slider
                                                                    defaultValue={colorOptions.borderColor.intensity}
                                                                    max={900}
                                                                    min={100}
                                                                    onChange={(value) => {
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "BorderColor",
                                                                                name: "intensity",
                                                                                value
                                                                            }
                                                                        })
                                                                    }}
                                                                    step={100}
                                                                />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="text-xs text-white font-bold my-2">Intensity
                                                                    is not available for this color</p>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ) : null}
                        {optionItem.settings.hasOwnProperty("backgroundColorSecondary") ? (
                            <>
                                <p>Background Color Secondary</p>
                            </>
                        ) : null}
                        {optionItem.settings.hasOwnProperty("backgroundColorThird") ? (
                            <>
                                <p>Background Color Third</p>
                            </>
                        ) : null}
                    </>
                ) : (
                    <Disclosure as="div" className="border-gray-200 py-5">
                        <p className="text-white">
                            Select an item from tree view to see the options
                        </p>
                    </Disclosure>
                )
                }
            </div>
        ) :
        (
            <Disclosure as="div" className="border-gray-200 py-5">
                <p className="text-white">
                    Select an item from tree view to see the options
                </p>
            </Disclosure>
        );
};
