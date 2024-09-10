import { PageUIConfiguration } from "@/shared/common/models/UITypes";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";


export const pagesUIConfigurations: Record<string, PageUIConfiguration> = {
    "projects": {
        pageTitle: { label: "Projects", value: "", icon: faBoxArchive },
        sortOptions: [
            { label: "Created At", value: "createdAt" },
            { label: "Updated At", value: "updatedAt" },
            { label: "Name", value: "Name" },
        ],
        createNewButtonData: { label: "New Project", value: "", link: "/workspace/research/projects/create" },
        addListHeaderBottom: false,
        menus: [
            {
                menuLabel: "Expand/Collapse",
                items: [
                    { label: "Expanded", value: "expanded" },
                    { label: "Collapsed", value: "collapsed" },
                ],
                addBottom: false
            },
            {
                menuLabel: "Main Author/Contributor",
                items: [
                    { label: "Main Author", value: "mainAuthor" },
                    { label: "Contributor", value: "contributor" },
                ],
                addBottom: false
            }
        ],
    }
}