import { useState } from "react";


const Toolbar = ({ setTool, handleAddShape, handleClearCanvas, handleAddText }) => {
    const [shapeContainer, showShapeContainer] = useState(false)
    const containerStyle = {
        visibility:"visible",
        opacity:1
    }
    return (
        <div className="sidebar">
            <div className="sidebar-section" id="elements">
                <div className="sidebar-icon" onClick={() => setTool('draw')}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.625 13.5H8.25a.75.75 0 0 0 0-1.5H5.625a2.625 2.625 0 1 0 0 5.25h10.5a1.125 1.125 0 0 1 0 2.25H11.25a.75.75 0 1 0 0 1.5h4.875a2.625 2.625 0 1 0 0-5.25h-10.5a1.125 1.125 0 0 1 0-2.25Z" fill="currentColor"></path><path d="M17.25 3a.75.75 0 0 0-.529.221l-4.683 4.68a5.226 5.226 0 0 0-1.538 3.724v1.125a.75.75 0 0 0 .75.75h1.125a5.22 5.22 0 0 0 3.713-1.537l4.69-4.684A.75.75 0 0 0 21 6.75 3.75 3.75 0 0 0 17.25 3Zm-2.212 7.901A3.724 3.724 0 0 1 12.375 12H12v-.375A3.722 3.722 0 0 1 13.1 8.974l4.444-4.455A2.25 2.25 0 0 1 19.5 6.457l-4.462 4.444Z" fill="currentColor"></path></svg><p className="title">Draw</p></div>
            </div>
            <div className="sidebar-section" id="uploads">
                <div className="sidebar-icon" id="shapes" onClick={() => { showShapeContainer(!shapeContainer); }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="m6.5 4.25.75-.75a2.121 2.121 0 0 1 3 3L6.5 10.25 2.75 6.5a2.121 2.121 0 0 1 3-3l.75.75zm7 6 4-7.5 4 7.5h-8zm-10.75 3.5h7.5v7.5h-7.5v-7.5zm14.75-.25a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path></svg><p className="title">Shapes</p></div>
                <div className="shapes-btn-container" style={shapeContainer?containerStyle:{}}>
                    <div onClick={() => handleAddShape('circle')}><svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="20" stroke-width="3" fill="#c6c6c6"></circle></svg></div>
                    <div onClick={() => handleAddShape('rect')}><svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="0" width="35" height="35" stroke="black" stroke-width="0" fill="#c6c6c6"></rect></svg>
</div>
                </div>
            </div>
            <div className="sidebar-section" id="text">
                <div className="sidebar-icon" onClick={handleClearCanvas}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
<p className="title">Clear</p></div>
            </div>

            <div className="sidebar-section" id="text">
                <div className="sidebar-icon" onClick={handleAddText}>

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.99 5.5A1.5 1.5 0 0 1 6.49 4h11a1.5 1.5 0 0 1 1.5 1.5v1.85a.75.75 0 0 1-1.5 0V6a.5.5 0 0 0-.502-.5l-4.24.008.01 11.992a1 1 0 0 0 1 1h1.407a.75.75 0 0 1 0 1.5H8.852a.75.75 0 0 1 0-1.5h1.406a1 1 0 0 0 1-1l-.01-11.992-4.258-.007a.5.5 0 0 0-.5.5v1.377a.75.75 0 1 1-1.5 0V5.5Z" fill="currentColor"></path></svg>
                    <p className="title">Text</p></div>
            </div>




        </div>
    );
};

export default Toolbar;
