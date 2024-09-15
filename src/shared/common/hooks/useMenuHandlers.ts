import { useState } from 'react';
import { MenuConfiguration } from '../models/UITypes';

interface UseMenuHandlersReturn {
    menuStates: Record<string, string>;
    setMenuState: (menuId: string, newValue: string) => void;
}

export const useMenuHandlers = (menus: MenuConfiguration[]): UseMenuHandlersReturn => {
    const initialStates = menus.reduce((acc, menu) => ({
        ...acc,
        [menu.menuId]: menu.defaultItemValue || ""
    }), {});

    const [menuStates, setMenuStates] = useState<Record<string, string>>(initialStates);

    const setMenuState = (menuId: string, newValue: string) => {
        setMenuStates(prevStates => ({
            ...prevStates,
            [menuId]: newValue
        }));
    };

    return { menuStates, setMenuState };
}
