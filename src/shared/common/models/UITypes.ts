import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface PageUIConfiguration {
    pageTitle: UIItem;
    sortOptions?: UIItem[];
    createNewButtonData?: UIItem;
    addListHeaderBottom?: boolean;
    menus?: MenuConfiguration[];
    itemsPerPage?: number;
}

export interface MenuConfiguration {
    menuId: string;
    defaultItemValue?: string;
    items?: UIItem[];
    addBottom?: boolean;
}

export interface UIItem {
    label: string;
    value: string;
    icon?: IconDefinition;
    link?: string;
}
