"use client";

import { MenuConfiguration } from "../models/UITypes";
import NavigationMenu from "./NavigationMenu";

export interface NavigationMenusProps {
    menus: MenuConfiguration[];
}

const NavigationMenus = ({
    menus
}: NavigationMenusProps) => {
    return (
        <div className="flex items-center justify-between page-standard-horizontal-padding py-4 space-x-4 border-b border-gray-300">
            {menus.map((menu, index) => (
                <NavigationMenu
                    key={menu?.menuLabel ?? index}
                    items={menu?.items ?? []}
                    currentItemValue={"expanded"}
                    setCurrentItem={() => {}}
                />
            ))}
        </div>
    )
}

export default NavigationMenus;