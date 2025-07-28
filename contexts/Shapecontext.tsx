"use client";
import { createContext, useContext, useState } from "react";
export type Shape={
    type:'rect'
    x:number;
    y:number;
    width:number;
    height:number;
} | {
    type: 'circle'
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: 'line'
}
interface shapeContextType {
    selectedshape : "rect" | "circle";
    setselectedshape:(value: "rect" | "circle") => void;
    existingshapes?: Shape[];
    setexisitingshapes?: (shapes: Shape[]) => void;
}

export const ShapeContext = createContext<shapeContextType | undefined>(undefined);

export const ShapeProvider = ( { children }: { children: React.ReactNode }) => {
    const [selectedshape, setselectedshape] = useState<"rect" | "circle">("rect");
    const [existingshapes, setexisitingshapes] = useState<Shape[]>([]);

    return (
        <ShapeContext.Provider value={{ selectedshape, setselectedshape, existingshapes, setexisitingshapes }}>
            {children}
        </ShapeContext.Provider>
    );
};

export const useShapeContext = () => {
    const context = useContext(ShapeContext);
    if (!context) {
        throw new Error("useShapeContext must be used within a ShapeProvider");
    }
    return context;
}