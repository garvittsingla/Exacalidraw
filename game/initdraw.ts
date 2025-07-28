import { Shape } from "@/contexts/Shapecontext";
let mouseDownHandler: ((e: MouseEvent) => void) | null = null;
let mouseUpHandler: ((e: MouseEvent) => void) | null = null;
let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;



export default function Initdraw(canvasref:HTMLCanvasElement,selectedshape:string,existingshapes:Shape[],setexisitingshapes:(shapes:Shape[])=>void){

    let canvas = canvasref;
            let ctx = canvas.getContext("2d");
            let startx = 0;
            let starty = 0;
            let width = 0;
            let height  =0;
            if(!ctx) return;
            let clicked = false;


            let rect = canvas.getBoundingClientRect();


            if(mouseDownHandler) canvas.removeEventListener("mousedown", mouseDownHandler);
            if(mouseUpHandler) canvas.removeEventListener("mouseup", mouseUpHandler);
            if(mouseMoveHandler) canvas.removeEventListener("mousemove", mouseMoveHandler);

            mouseDownHandler = (e)=>{
                clicked = true
                 e.preventDefault()
                startx=e.clientX - rect.left
                starty = e.clientY - rect.top
            }

            mouseUpHandler = (e)=>{
                e.preventDefault()
                clicked = false
                if(selectedshape === "rect"){
                   setexisitingshapes([...existingshapes,{
                        type: "rect",
                        x: startx,
                        y: starty,
                        width: width,
                        height: height
                    }]);

                } else if(selectedshape === "circle"){
                    const radius = Math.sqrt(width * width + height * height) / 2;
                    setexisitingshapes([...existingshapes,{
                        type: "circle",
                        centerX: startx + width / 2,
                        centerY: starty + height / 2,
                        radius: radius
                    }]);
        }


            }
            mouseMoveHandler = (e)=>{
                 e.preventDefault()
                    if(clicked){
                     width =(e.clientX - rect.left) - startx;
                     height =( e.clientY - rect.top)-starty;
                    clearcanvas(canvas,existingshapes);
                     ctx.strokeStyle='white'
                    if(selectedshape === "rect"){
                        ctx.strokeRect(startx,starty,width,height)
                    }else if(selectedshape === "circle"){
                        ctx.beginPath();
                        ctx.arc(startx + width / 2, starty + height / 2, Math.sqrt(width * width + height * height) / 2, 0, Math.PI * 2);
                        ctx.stroke();
                    }
        
                }
                const localstorageshapes = JSON.stringify(existingshapes);
                localStorage.setItem("shapes", localstorageshapes);
            }

        canvas.addEventListener("mousedown", mouseDownHandler);
        canvas.addEventListener("mouseup", mouseUpHandler);
        canvas.addEventListener("mousemove", mouseMoveHandler);

        clearcanvas(canvas, existingshapes);
}
function clearcanvas(canvas:HTMLCanvasElement,existingShapes:Shape[] = []){
    let ctx = canvas.getContext("2d")
    if(!ctx){
        return
    }
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle='black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.strokeStyle='white'
    existingShapes.forEach((shape)=>{
            if(shape.type=="rect"){
                ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
            }else if(shape.type == "circle"){
                ctx.beginPath();
                ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                ctx.stroke();
            }
        
    })
}