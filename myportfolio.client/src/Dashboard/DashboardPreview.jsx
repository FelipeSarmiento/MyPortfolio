import {NavBarPreview} from "@/Dashboard/componentsPreview/NavBarPreview.jsx";
import {IndexPage} from "@/Dashboard/componentsPreview/Index/IndexPage.jsx";
import {useEffect, useState} from "react";

export const DashboardPreview = ({components}) => {
    return (
        <>
            {
                components.sections.map((component, index) => {

                    switch (component.type) {
                        case "nav-bar":
                            return <NavBarPreview key={index * component.id} items={ component }/>
                        case "main-content":
                            return <IndexPage key={index * component.id}/>
                        default:
                            return <div key={index}>Component not found</div>
                    }

                })
            }
        </>
    )
}