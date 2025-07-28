import { ShapeProvider } from "@/contexts/Shapecontext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ShapeProvider>
            {children}
        </ShapeProvider>
    );
};

