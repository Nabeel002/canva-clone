import React, { useRef, useState, useEffect } from 'react';
import DrawingArea from './DrawingArea';
import Toolbar from './Toolbar';
import { HexColorPicker } from 'react-colorful';

const CanvasEditor = () => {
    const canvasRef = useRef(null);
    const [shapes, setShapes] = useState([]);
    const [texts, setTexts] = useState([]);
    const [currentTextId, setCurrentTextId] = useState(null);
    const [tool, setTool] = useState('');
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedShapeIndex, setSelectedShapeIndex] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [color, setColor] = useState("#aabbcc");
    const [isEditingText, setIsEditingText] = useState(false);
    const getMousePosition = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes.forEach(shape => drawShape(ctx, shape));
        texts.forEach(text => drawText(ctx, text));
    }, [shapes, texts]);

    const drawShape = (ctx, shape) => {
        ctx.fillStyle = shape.color;
        if (shape.type === 'circle') {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            ctx.fill();
        } else if (shape.type === 'rect') {
            ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        }
    };

    const drawText = (ctx, text) => {
        ctx.font = '30px Arial';
        ctx.fillStyle = color; 
    
    };

  
    const handleMouseDown = (e) => {
        const { x, y } = getMousePosition(e);
        const shapeIndex = shapes.findIndex(shape => isPointInShape(shape, x, y));

        if (tool === 'draw') {
            const ctx = canvasRef.current.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x, y);
            setIsDrawing(true);
        }

        if (shapeIndex !== -1) {
            setSelectedShapeIndex(shapeIndex);
            const shape = shapes[shapeIndex];
            setDragOffset({ x: x - shape.x, y: y - shape.y });
            setIsDragging(true);
        } else {
            const clickedText = texts.find(text => {
                const textWidth = canvasRef.current.getContext('2d').measureText(text.content).width;
                return x >= text.x && x <= text.x + textWidth && y >= text.y - 30 && y <= text.y;
            });

            if (clickedText) {
                setIsDragging(true);
                setCurrentTextId(clickedText.id);
                setIsEditingText(true);
                document.getElementById(`text-input-${clickedText.id}`).focus();
            }
        }
    };

    const handleMouseMove = (e) => {
        if (isDrawing) {
            const ctx = canvasRef.current.getContext('2d');
            const { x, y } = getMousePosition(e);
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.stroke();
        } else if (isDragging && selectedShapeIndex !== null) {
            const { x, y } = getMousePosition(e);
            const newShapes = shapes.map((shape, index) =>
                index === selectedShapeIndex
                    ? { ...shape, x: x - dragOffset.x, y: y - dragOffset.y }
                    : shape
            );
            setShapes(newShapes);
        } else if (isDragging && currentTextId) {
            const { x, y } = getMousePosition(e);
            setTexts(texts.map(text =>
                text.id === currentTextId ? { ...text, x, y } : text
            ));
        }
    };

    const handleMouseUp = () => {
        const ctx = canvasRef.current.getContext('2d');
        if (isDrawing) {
            ctx.closePath();
            setIsDrawing(false);
        }
        setIsDragging(false);
        setSelectedShapeIndex(null);

        setIsEditingText(false);
    };

    const isPointInShape = (shape, x, y) => {
        if (shape.type === 'circle') {
            const dx = x - shape.x;
            const dy = y - shape.y;
            return dx * dx + dy * dy <= shape.radius * shape.radius;
        } else if (shape.type === 'rect') {
            return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
        }
        return false;
    };

    const handleAddShape = (type) => {
        setIsDrawing(false);
        setTool("");
        const ctx = canvasRef.current.getContext('2d');
        ctx.closePath();

        const newShape = {
            type,
            x: 100,
            y: 100,
            color: color
        };
        if (type === 'circle') {
            newShape.radius = 50;
        } else if (type === 'rect') {
            newShape.width = 100;
            newShape.height = 50;
        }
        setShapes([...shapes, newShape]);
    };

    const handleClearCanvas = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setShapes([]);
        setTexts([]);
    };

    const handleAddText = () => {
        if (!isEditingText) {
            setTexts([...texts, { id: Date.now(), content: 'New Text', x: 50, y: 50 }]);
        }
    };

    const handleTextChange = (id, newText) => {
        setTexts(texts.map(text =>
            text.id === id ? { ...text, content: newText } : text
        ));
    };

    return (
        <div>
            <div className='hex-picker'>
                <HexColorPicker color={color} onChange={setColor} />
                {texts.map(text => (
                    <input
                        key={text.id}
                        id={`text-input-${text.id}`}
                        type="text"
                        value={text.content}
                        style={{
                            position: 'absolute',
                            top: text.y+19.2,
                            left: text.x+357,
                            border: 'none',
                            background: 'transparent',
                            fontSize: '30px',
                            color: color,
                            cursor: 'text'
                        }}
                        onChange={(e) => handleTextChange(text.id, e.target.value)}
                        onBlur={() => setIsEditingText(false)}
                        onMouseDown={(e) => handleMouseDown(e)}
                        onMouseMove={(e) => handleMouseMove(e)}
                        onMouseUp={() => handleMouseUp()}
                    />
                ))}
            </div>

            <Toolbar
                canvasRef={canvasRef}
                setTool={setTool}
                handleAddShape={handleAddShape}
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp}
                handleClearCanvas={handleClearCanvas}
                handleAddText={handleAddText}
            />

            <DrawingArea
                canvasRef={canvasRef}
                handleMouseDown={handleMouseDown}
                handleMouseMove={handleMouseMove}
                handleMouseUp={handleMouseUp}
            />

    
        </div>
    );
};

export default CanvasEditor;
