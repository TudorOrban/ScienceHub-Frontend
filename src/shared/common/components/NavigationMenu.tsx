"use client";

import { useState } from "react";
import { UIItem } from "../models/UITypes";
import Link from "next/link";

export interface NavigationMenuProps {
    items: UIItem[];
    defaultItemValue?: string;
    useLinks?: boolean;
    onItemChange?: (itemValue: string) => void;
}

const NavigationMenu = ({
    items,
    defaultItemValue,
    useLinks = false,
    onItemChange,
}: NavigationMenuProps) => {
    const [currentItemValue, setCurrentItemValue] = useState<string | null>(defaultItemValue ?? null);

    const handleItemChange = (itemValue: string) => {
        setCurrentItemValue(itemValue);
        onItemChange?.(itemValue);
    };

    return (
        <div className="flex items-center border-b border-gray-200">
            {items.map(item => (
                <div 
                    key={item.value} 
                >
                    {!useLinks ? (
                        <button 
                            className={`px-6 py-4 text-lg font-semibold whitespace-nowrap ${currentItemValue === item.value ? "selected-border" : ""} selected-border-hover`} 
                            onClick={() => handleItemChange(item.value)}
                        >
                            {item.label}
                        </button>
                    ) : (
                        <div className={`px-6 py-4 text-lg font-semibold whitespace-nowrap ${currentItemValue === item.value ? "selected-border" : ""} selected-border-hover`}>
                            <Link href={item.link ?? "not-found"}>
                                {item.label}
                            </Link>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NavigationMenu;