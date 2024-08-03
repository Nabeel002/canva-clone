import React, { useRef, useState, useEffect } from 'react';

const DrawingArea = ({ canvasRef, handleMouseDown, handleMouseMove, handleMouseUp }) => {

    return (
        <div className='container'>
            <canvas 
                ref={canvasRef}
                width={800}
                height={600}
                className='canvas'
                style={{ border: '1px solid #c6c6c6' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
};

export default DrawingArea;
