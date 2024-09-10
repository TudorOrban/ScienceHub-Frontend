"use client";

import { MenuConfiguration } from "../models/UITypes";
import NavigationMenu from "./NavigationMenu";

export interface NavigationMenusProps {
    menus: MenuConfiguration[];
    menuSelectHandlers?: Record<string, (itemValue: string) => void>;
}

const NavigationMenus = ({
    menus,
    menuSelectHandlers,
}: NavigationMenusProps) => {
    return (
        <div className="flex items-center justify-between space-x-4 border-b border-gray-300">
            {menus.map(menu => (
                <NavigationMenu
                    key={menu.menuId}
                    items={menu?.items ?? []}
                    defaultItemValue={menu.defaultItemValue}
                    onItemChange={menuSelectHandlers?.[menu.menuId] ?? (() => {})}
                />
            ))}
        </div>
    )
}

export default NavigationMenus;