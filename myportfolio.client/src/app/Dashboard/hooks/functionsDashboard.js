import {useState} from "react";

export async function saveItemsDashboard(bodySet) {
    console.log(bodySet)
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
const [optionItem, setOptionItem] = useState();

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
                }``
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
export function classNames(classes) {
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