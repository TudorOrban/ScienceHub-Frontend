"use client";

import { UIItem } from "../models/UITypes";

export interface NavigationMenuProps {
    items: UIItem[];
    currentItemValue?: string;
    setCurrentItem?: (label: string) => void;
}

const NavigationMenu = ({
    items,
    currentItemValue,
    setCurrentItem,
}: NavigationMenuProps) => {

    return (
        <div>
            Navigation Menu
        </div>
    );
};

export default NavigationMenu;