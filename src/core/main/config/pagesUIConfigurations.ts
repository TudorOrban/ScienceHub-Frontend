import { PageUIConfiguration } from "@/shared/common/models/UITypes";
import { faBoxArchive, faFile, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


export const pagesUIConfigurations: Record<string, PageUIConfiguration> = {
    "projects": {
        pageTitle: { label: "Projects", value: "", icon: faBoxArchive },
        sortOptions: [
            { label: "Created At", value: "createdAt" },
            { label: "Updated At", value: "updatedAt" },
            { label: "Name", value: "name" },
        ],
        createNewButtonData: { label: "New Project", value: "", link: "/workspace/research/projects/create" },
        addListHeaderBottom: false,
        menus: [
            {
                menuId: "Expand/Collapse",
                items: [
                    { label: "Expanded", value: "expanded" },
                    { label: "Collapsed", value: "collapsed" },
                ],
                defaultItemValue: "expanded",
                addBottom: false
            },
            {
                menuId: "Main Author/Contributor",
                items: [
                    { label: "Main Author", value: "mainAuthor" },
                    { label: "Contributor", value: "contributor" },
                ],
                defaultItemValue: "mainAuthor",
                addBottom: false
            }
        ],
        initialSearchParams: {
            searchTerm: "",
            sortBy: "createdAt",
            sortDescending: false,
            page: 1,
            itemsPerPage: 20,
        },
    },
    "works": {
        pageTitle: { label: "Works", value: "", icon: faFile },
        sortOptions: [
            { label: "Created At", value: "createdAt" },
            { label: "Updated At", value: "updatedAt" },
            { label: "Title", value: "Title" },
        ],
        createNewButtonData: { label: "New Work", value: "", link: "/workspace/research/works/create" },
        addListHeaderBottom: false,
        menus: [
            {
                menuId: "Work Type",
                items: [
                    { label: "Papers", value: "Paper" },
                    { label: "Experiments", value: "Experiment" },
                    { label: "Datasets", value: "Dataset" },
                    { label: "Data Analyses", value: "DataAnalysis" },
                    { label: "AI Models", value: "AIModel" },
                    { label: "Code Blocks", value: "CodeBlock" },
                ],
                defaultItemValue: "Paper",
                addBottom: false
            },
            {
                menuId: "Main Author/Contributor",
                items: [
                    { label: "Main Author", value: "mainAuthor" },
                    { label: "Contributor", value: "contributor" },
                ],
                defaultItemValue: "mainAuthor",
                addBottom: false
            }
        ],
        initialSearchParams: {
            searchTerm: "",
            sortBy: "createdAt",
            sortDescending: false,
            page: 1,
            itemsPerPage: 20,
        },
    },
    "issues": {
        pageTitle: { label: "Issues", value: "", icon: faInfoCircle },
        sortOptions: [
            { label: "Created At", value: "createdAt" },
            { label: "Updated At", value: "updatedAt" },
            { label: "Title", value: "Title" },
        ],
        createNewButtonData: { label: "New Issue", value: "", link: "/workspace/research/issues/create" },
        addListHeaderBottom: false,
        menus: [
            {
                menuId: "Issue Type",
                items: [
                    { label: "ProjectIssue", value: "ProjectIssue" },
                    { label: "WorkIssue", value: "WorkIssue" },
                ],
                defaultItemValue: "WorkIssue",
                addBottom: false
            },
            {
                menuId: "Main Author/Contributor",
                items: [
                    { label: "Main Author", value: "mainAuthor" },
                    { label: "Contributor", value: "contributor" },
                ],
                defaultItemValue: "mainAuthor",
                addBottom: false
            }
        ],
        initialSearchParams: {
            searchTerm: "",
            sortBy: "createdAt",
            sortDescending: false,
            page: 1,
            itemsPerPage: 20,
        },
    },
    
    "reviews": {
        pageTitle: { label: "Reviews", value: "", icon: faInfoCircle },
        sortOptions: [
            { label: "Created At", value: "createdAt" },
            { label: "Updated At", value: "updatedAt" },
            { label: "Title", value: "Title" },
        ],
        createNewButtonData: { label: "New Review", value: "", link: "/workspace/research/reviews/create" },
        addListHeaderBottom: false,
        menus: [
            {
                menuId: "Review Type",
                items: [
                    { label: "ProjectReview", value: "ProjectReview" },
                    { label: "WorkReview", value: "WorkReview" },
                ],
                defaultItemValue: "WorkReview",
                addBottom: false
            },
            {
                menuId: "Main Author/Contributor",
                items: [
                    { label: "Main Author", value: "mainAuthor" },
                    { label: "Contributor", value: "contributor" },
                ],
                defaultItemValue: "mainAuthor",
                addBottom: false
            }
        ],
        initialSearchParams: {
            searchTerm: "",
            sortBy: "createdAt",
            sortDescending: false,
            page: 1,
            itemsPerPage: 20,
        },
    }
}