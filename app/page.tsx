"use client";
import { useShapeContext } from "@/contexts/Shapecontext";
import Initdraw from "@/game/initdraw";
import { RectangleHorizontal,Circle,LineSquiggle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
   const canvasref = useRef<HTMLCanvasElement>(null)
    const {selectedshape, setselectedshape,existingshapes, setexisitingshapes} = useShapeContext()
     const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
    
    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        })
        
       
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(()=>{
        if(canvasref.current){
            Initdraw(canvasref.current,selectedshape,existingshapes!,setexisitingshapes!);
        }

    },[canvasref,selectedshape,existingshapes,setexisitingshapes])

     useEffect(() => {
        const localstorageshapes = localStorage.getItem("shapes");
        if(localstorageshapes){
            try {
                const shapes = JSON.parse(localstorageshapes);
                setexisitingshapes!(shapes);
            } catch (error) {
                console.error("Error parsing shapes from localStorage:", error);
            }
        }
    }, [setexisitingshapes]) 

    return <div className="relative h-screen w-screen">
        <div className="top-7 left-[45%] absolute h-10 w-50  border-[1px] bg-neutral-900 z-100 rounded-md flex items-center justify-start px-2 gap-2">
            <button onClick={() => setselectedshape("circle")}>
                <Circle className={`h-6 w-6 cursor-pointer ${selectedshape === "circle" ? "bg-white/20 rounded-md" : "text-white"}`} />
            </button>
            <button onClick={() => setselectedshape("rect")}>
                <RectangleHorizontal className={`${selectedshape === "rect" ? "bg-white/20 rounded-md" : "text-white"} h-6 w-6 cursor-pointer`} />
            </button>
            <button onClick={() => setselectedshape("line")}>
                <LineSquiggle className={`${selectedshape === "line" ? "bg-white/20 rounded-md" : "text-white"} h-6 w-6 cursor-pointer`} />
            </button>
            <button className={`cursor-pointer`} onClick={() => setexisitingshapes!([])}>Clear</button>
        </div>
        <canvas className="absolute top-0 left-0" height={dimensions.height} width={dimensions.width} ref={canvasref}></canvas>   
    </div>
}
