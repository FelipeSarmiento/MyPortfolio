import {NavBarPreview} from "@/Dashboard/componentsPreview/NavBarPreview.jsx";
import {IndexPage} from "@/Dashboard/componentsPreview/Index/IndexPage.jsx";
import {useEffect, useState} from "react";

export const DashboardPreview = ({components}) => {
    return (
        <>
            {
                components.sections.map((component, index) => {
                    if (component !== undefined ) {
                        switch (component.type) {
                            case "nav-bar":
                                return <NavBarPreview key={component.idUniqueIdentifier} items={ component }/>
                            case "content":
                                return <IndexPage key={component.idUniqueIdentifier}/>
                            default:
                                return <div key={component.idUniqueIdentifier}>Component not found</div>
                        }
                    }

                })
            }
        </>
    )
}