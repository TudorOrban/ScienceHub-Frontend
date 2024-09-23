import { MenuConfiguration, PageUIConfiguration, UIItem } from "@/shared/common/models/UITypes";
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
            { label: "Title", value: "title" },
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
            { label: "Title", value: "title" },
        ],
        createNewButtonData: { label: "New Issue", value: "", link: "/workspace/management/issues/create" },
        addListHeaderBottom: false,
        menus: [
            {
                menuId: "Issue Type",
                items: [
                    { label: "Project Issues", value: "ProjectIssue" },
                    { label: "Work Issues", value: "WorkIssue" },
                ],
                defaultItemValue: "ProjectIssue",
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
            { label: "Title", value: "title" },
        ],
        createNewButtonData: { label: "New Review", value: "", link: "/workspace/management/reviews/create" },
        addListHeaderBottom: false,
        menus: [
            {
                menuId: "Review Type",
                items: [
                    { label: "Project Reviews", value: "ProjectReview" },
                    { label: "Work Reviews", value: "WorkReview" },
                ],
                defaultItemValue: "ProjectReview",
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
    "discussions": {
        pageTitle: { label: "Discussions", value: "", icon: faInfoCircle },
        sortOptions: [
            { label: "Created At", value: "createdAt" },
            { label: "Updated At", value: "updatedAt" },
            { label: "Title", value: "title" },
        ],
        createNewButtonData: { label: "New Discussion", value: "", link: "/workspace/community/discussions/create" },
        addListHeaderBottom: false,
        menus: [],
        initialSearchParams: {
            searchTerm: "",
            sortBy: "createdAt",
            sortDescending: false,
            page: 1,
            itemsPerPage: 20,
        },
    },
}

export const getUserProfileMenuConfiguration = (username: string): MenuConfiguration => {
    const items: UIItem[] = [
        { label: "Overview", value: "overview", link: `/${username}/overview` },
        { label: "Research", value: "research", link: `/${username}/research` },
        { label: "Management", value: "management", link: `/${username}/management` },
        { label: "Community", value: "community", link: `/${username}/community` },
    ];

    return {
        menuId: "User Data",
        items: items,
        defaultItemValue: "overview",
        addBottom: false
    }
}

export const getUserProfileBaseMenuConfiguration = (): MenuConfiguration => {
    const items: UIItem[] = [
        { label: "Overview", value: "overview" },
        { label: "Research", value: "research" },
        { label: "Management", value: "management" },
        { label: "Community", value: "community" },
    ];

    return {
        menuId: "Base User Data",
        items: items,
        defaultItemValue: "overview",
        addBottom: false
    }
}