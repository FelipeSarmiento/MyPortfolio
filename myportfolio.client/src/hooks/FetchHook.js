﻿export const FetchHook = async (url) => {

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

const juanes = () => {
  console.log('juanes')
}