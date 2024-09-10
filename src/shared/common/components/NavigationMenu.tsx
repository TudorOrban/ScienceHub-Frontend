"use client";

import { useState } from "react";
import { UIItem } from "../models/UITypes";

export interface NavigationMenuProps {
    items: UIItem[];
    defaultItemValue?: string;
    onItemChange?: (itemValue: string) => void;
}

const NavigationMenu = ({
    items,
    defaultItemValue,
    onItemChange,
}: NavigationMenuProps) => {
    const [currentItemValue, setCurrentItemValue] = useState<string | null>(defaultItemValue ?? null);

    const handleItemChange = (itemValue: string) => {
        setCurrentItemValue(itemValue);
        onItemChange?.(itemValue);
    };

    return (
        <div className="flex items-center">
            {items.map(item => (
                <button 
                    key={item.value} 
                    className={`px-6 py-4 text-lg font-semibold ${currentItemValue === item.value ? "border-b-2 border-gray-600" : ""}`} 
                    onClick={() => handleItemChange(item.value)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default NavigationMenu;