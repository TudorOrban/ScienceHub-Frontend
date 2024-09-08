import {
    faUser,
    faUsers,
    faEdit,
    faFile,
    faPeopleGroup,
    faGlobe,
    faCircleExclamation,
    faDatabase,
    faChartSimple,
    faMicrochip,
    faCalendar,
    faGear,
    faCodeFork,
    faBriefcase,
    faBook,
    faPaste,
    faBoxArchive,
    faBox,
    faUserGroup,
    faEye,
    faInfo,
    faRuler,
    faCommentDots,
    faHandHoldingDollar,
    faQuestion,
    faAtom,
    faMessage,
    faSignsPost,
    faSearch,
    faFlask, 
    faClipboard, 
    faCode
} from "@fortawesome/free-solid-svg-icons";

import { NavigationItem, PageDirectory } from "../models/UIElements";

export const getNavigationItems = (pageDirectory: PageDirectory, identifier?: string, isCurrentUser?: boolean, projectName?: string): NavigationItem[] => {
    if (pageDirectory === PageDirectory.UserProfile) {
        if (!identifier) {
            return [];
        }
        return getUserProfileNavItems(identifier, isCurrentUser);
    }

    if (pageDirectory === PageDirectory.Project) {
        if (!identifier || !projectName) {
            return [];
        }
        return getProjectNavItems(identifier, projectName);
    }

    return sidebarNavigationItems[pageDirectory];
}

export const sidebarNavigationItems: Record<PageDirectory, NavigationItem[]> = {
    [PageDirectory.Home]: [
        { label: "Home", icon: faGlobe, link: "/" },
        {
            label: "Workspace",
            icon: faBriefcase,
            link: "/workspace",
        },
        {
            label: "Browse",
            icon: faSearch,
            link: "/browse",
        },
        {
            label: "Resources",
            icon: faBox,
            link: "/resources",
        },
    ],
    [PageDirectory.Workspace]: [
        { label: "Overview", icon: faGlobe, link: "/workspace" },
        {
            label: "Research",
            icon: faAtom,
            link: "/workspace/research",
            subItems: [
                {
                    label: "Projects",
                    icon: faBoxArchive,
                    link: "/workspace/research/projects",
                },
                { label: "Works", icon: faFile, link: "/workspace/research/works" },
            ],
        },
    
        {
            label: "Management",
            icon: faCodeFork,
            link: "/workspace/management",
            subItems: [
                {
                    label: "Submissions",
                    icon: faPaste,
                    link: "/workspace/management/submissions",
                },
                {
                    label: "Issues",
                    icon: faCircleExclamation,
                    link: "/workspace/management/issues",
                },
                {
                    label: "Reviews",
                    icon: faEdit,
                    link: "/workspace/management/reviews",
                },
            ],
        },
        {
            label: "Community",
            icon: faPeopleGroup,
            link: "/workspace/community",
            subItems: [
                {
                    label: "Discussions",
                    icon: faUsers,
                    link: "/workspace/community/discussions",
                },
                {
                    label: "Chats",
                    icon: faMessage,
                    link: "/workspace/community/chats",
                },
                {
                    label: "Collaborations",
                    icon: faUserGroup,
                    link: "/workspace/community/collaborations",
                },
                // { label: 'Collaborations', icon: faUsers, link: '/workspace/collaborations' },
            ],
        },
        // {
        //     label: "Tools",
        //     icon: faToolbox,
        //     link: "/workspace/tools",
        //     subItems: [
        //         {
        //             label: "Editor",
        //             icon: faFileWord,
        //             link: "/workspace/tools/editor",
        //         },
        //         {
        //             label: "Data management",
        //             icon: faDatabase,
        //             link: "/workspace/tools/data-management",
        //         },
        //         {
        //             label: "AWS Connection",
        //             icon: faCloud,
        //             link: "/workspace/tools/data-analysis",
        //         },
        //         {
        //             label: "AI Models",
        //             icon: faMicrochip,
        //             link: "/workspace/tools/ai-models",
        //         },
        //     ],
        // },
        { label: "Plans", icon: faCalendar, link: "/workspace/plans" },
        { label: "Settings", icon: faGear, link: "/workspace/settings" },
    ],
    [PageDirectory.Browse]: [
        { label: "Overview", icon: faGlobe, link: "/browse" },
        {
            label: "Projects",
            icon: faBoxArchive,
            link: "/browse/projects",
        },
        {
            label: "Works",
            icon: faFile,
            link: "/browse/works",
        },
        {
            label: "Submissions",
            icon: faPaste,
            link: "/browse/submissions",
        },
        {
            label: "Issues",
            icon: faCircleExclamation,
            link: "/browse/issues",
        },
        {
            label: "Reviews",
            icon: faEdit,
            link: "/browse/reviews",
        },
    
        {
            label: "Discussions",
            icon: faPeopleGroup,
            link: "/browse/discussions",
        },
        { label: "People", icon: faUser, link: "/browse/people" },
    ],
    [PageDirectory.Resources]: [
        { label: "Overview", icon: faGlobe, link: "/resources" },
        { label: "Site mission", icon: faEye, link: "/resources/site-mission" },
        { label: "Site Roadmap", icon: faSignsPost, link: "/resources/site-roadmap" },
        {
            label: "Information",
            icon: faInfo,
            link: "/resources/information",
            subItems: [
                {
                    label: "Research",
                    icon: faBook,
                    link: "/resources/information/research",
                },
                {
                    label: "Management",
                    icon: faCodeFork,
                    link: "/resources/information/management",
                },
                {
                    label: "Community",
                    icon: faUsers,
                    link: "/resources/information/community",
                },
                // {
                //     label: "Tools",
                //     icon: faToolbox,
                //     link: "/resources/information/tools",
                // },
                {
                    label: "Metrics",
                    icon: faRuler,
                    link: "/resources/information/metrics",
                },
            ],
        },
        { label: "Feedback", icon: faCommentDots, link: "/resources/feedback" },
        {
            label: "Donations",
            icon: faHandHoldingDollar,
            link: "/resources/donations",
        },
        {
            label: "Help & Support",
            icon: faQuestion,
            link: "/resources/help-support",
        },
    ],
    [PageDirectory.UserProfile]: [],
    [PageDirectory.Project]: [],
}


export const getUserProfileNavItems = (username: string, isCurrentUser?: boolean): NavigationItem[] => {
    const profileNavItems: NavigationItem[] = [
        {
            label: "Overview",
            icon: faGlobe,
            link: `/${username}`,
        },
        {
            label: "Research",
            icon: faBook,
            link: `/${username}/research`,
            subItems: [
                {
                    label: "Projects",
                    icon: faBoxArchive,
                    link: `/${username}/research/projects`,
                },
                {
                    label: "Papers",
                    icon: faClipboard,
                    link: `/${username}/research/papers`,
                },
                {
                    label: "Experiments",
                    icon: faFlask,
                    link: `/${username}/research/experiments`,
                },
                {
                    label: "Datasets",
                    icon: faDatabase,
                    link: `/${username}/research/datasets`,
                },
                {
                    label: "Data Analyses",
                    icon: faChartSimple,
                    link: `/${username}/research/data-analyses`,
                },
                {
                    label: "AI Models",
                    icon: faMicrochip,
                    link: `/${username}/research/ai-models`,
                },
                {
                    label: "Code Blocks",
                    icon: faCode,
                    link: `/${username}/research/code-blocks`,
                },
            ],
        },
        {
            label: "Management",
            icon: faCodeFork,
            link: `/${username}/management`,
            subItems: [
                {
                    label: "Submissions",
                    icon: faPaste,
                    link: `/${username}/management/submissions`,
                },
                {
                    label: "Issues",
                    icon: faCircleExclamation,
                    link: `/${username}/management/issues`,
                },
                {
                    label: "Reviews",
                    icon: faEdit,
                    link: `/${username}/management/reviews`,
                },
            ],
        },
        {
            label: "Community",
            icon: faPeopleGroup,
            link: `/${username}/community`,
            subItems: [
                {
                    label: "Discussions",
                    icon: faUsers,
                    link: `/${username}/community/discussions`,
                },
                {
                    label: "Collaborations",
                    icon: faUserGroup,
                    link: `/${username}/community/collaborations`,
                },
            ],
        },
    ];

    if (isCurrentUser) {
        profileNavItems.push({
            label: "Settings",
            icon: faGear,
            link: `/${username}/settings`,
        });
    }

    return profileNavItems;
};

export const getProjectNavItems = (identifier: string, projectName: string): NavigationItem[] => {
    const navItems: NavigationItem[] = [
        {
            label: "Overview",
            icon: faGlobe,
            link: `/${identifier}/projects/${projectName}`,
        },
        {
            label: "Research",
            icon: faBook,
            link: `/${identifier}/projects/${projectName}/research`,
            subItems: [
                // {
                //     label: "Directory",
                //     icon: faFolder,
                //     link: `/${identifier}/projects/${projectName}/research/directory`,
                // },
                {
                    label: "Papers",
                    icon: faClipboard,
                    link: `/${identifier}/projects/${projectName}/research/papers`,
                },
                {
                    label: "Experiments",
                    icon: faFlask,
                    link: `/${identifier}/projects/${projectName}/research/experiments`,
                },
                {
                    label: "Datasets",
                    icon: faDatabase,
                    link: `/${identifier}/projects/${projectName}/research/datasets`,
                },
                {
                    label: "Data Analyses",
                    icon: faChartSimple,
                    link: `/${identifier}/projects/${projectName}/research/data-analyses`,
                },
                {
                    label: "AI Models",
                    icon: faMicrochip,
                    link: `/${identifier}/projects/${projectName}/research/ai-models`,
                },
                {
                    label: "Code Blocks",
                    icon: faCode,
                    link: `/${identifier}/projects/${projectName}/research/code-blocks`,
                },
            ],
        },

        {
            label: "Management",
            icon: faCodeFork,
            link: `/${identifier}/projects/${projectName}/management`,
            subItems: [
                {
                    label: "Submissions",
                    icon: faCodeFork,
                    link: `/${identifier}/projects/${projectName}/management/submissions`,
                },
                {
                    label: "Issues",
                    icon: faCircleExclamation,
                    link: `/${identifier}/projects/${projectName}/management/issues`,
                },
                {
                    label: "Reviews",
                    icon: faEdit,
                    link: `/${identifier}/projects/${projectName}/management/reviews`,
                },
            ],
        },
        // {
        //     label: "Tools",
        //     icon: faToolbox,
        //     link: `/${identifier}/projects/${projectName}/tools`,
        //     subItems: [
        //         {
        //             label: "Editor",
        //             icon: faFileWord,
        //             link: `/${identifier}/projects/${projectName}/tools/editor`,
        //         },
        //         {
        //             label: "AWS connection",
        //             icon: faCloud,
        //             link: `/${identifier}/${projectName}/tools/aws-connection`,
        //         },
        //         {
        //             label: "AI Models",
        //             icon: faMicrochip,
        //             link: `/${identifier}/${projectName}/tools/ai-models`,
        //         },
        //         //     {
        //         //     label: "Lab inventory",
        //         //     icon: faFlask,
        //         //     link: `/${identifier}/${projectId}/tools/lab-inventory`,
        //         // },
        //         //     {
        //         //         label: "Data management",
        //         //         icon: faDatabase,
        //         //         link: `/${identifier}/${projectId}/tools/data-management`,
        //         //     },
        //     ],
        // },
        {
            label: "Plans",
            icon: faCalendar,
            link: `/${identifier}/projects/${projectName}/plans`,
        },
        {
            label: "Settings",
            icon: faGear,
            link: `/${identifier}/projects/${projectName}/settings`,
        },
    ];

    return navItems;
};