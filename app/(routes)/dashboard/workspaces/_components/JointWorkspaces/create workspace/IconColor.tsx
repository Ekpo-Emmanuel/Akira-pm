'use client';
import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface IconColorProps {
    onColorChange: (color: string) => void;
}

export default function IconColor({ onColorChange }: IconColorProps) {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

    const defaultColor = '#6366F1'; // Default color if no other color is selected
    const colors = ['#1E3A8A', '#6366F1', '#EC4899', '#F43F5E', '#F59E0B', '#10B981', '#0D9488', '#047857', '#374151', '#1F2937', '#3B82F6', '#8B5CF6', '#EC6B0D', '#DC2626'];
    const icons = ['🚀', '📈', '💼', '🏡', '🎨', '🎯', '📦', '🛠️', '🎓', '📚'];

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        onColorChange(color); 
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div
                        className="h-[33px] w-[33px] text-md text-white rounded-lg flex items-center justify-center cursor-pointer"
                        style={{
                            backgroundColor: selectedColor || defaultColor,
                        }}
                    >
                        T
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[250px] p-3 bg-white dark:bg-[#2A2E35]  dark:border-[#656f7d6d]">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Select a color:</p>
                            <div className="flex gap-3 flex-wrap">
                                {colors.map((color, index) => (
                                    <button 
                                        key={index} 
                                        type="button"  
                                        className={`w-5 h-5 rounded-full border-2 ${selectedColor === color ? 'border-white' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorSelect(color)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
