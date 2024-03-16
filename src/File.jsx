import { useEffect, useState } from "react";

function File({ file, renameFile, deleteFile }) {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMenu && !event.target.closest('.menu')) {
                setShowMenu(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent parent click event
        setShowMenu(!showMenu);
    };

    const handleRenameFile = () => {
        const newName = prompt('Enter the new name for the file:', file.name);
        if (newName) {
            renameFile(file, newName);
        }
        setShowMenu(false);
    };

    const handleDeleteFile = () => {
        deleteFile(file);
        setShowMenu(false);
    };

    return (
        <div>
            <div className="file" onClick={toggleMenu}>
                <span>{file.name}</span>
                <span onClick={toggleMenu}>...</span>
            </div>
            {showMenu && (
                <div className="menu">
                    <div onClick={handleRenameFile}>Rename File</div>
                    <div onClick={handleDeleteFile}>Delete File</div>
                </div>
            )}
        </div>
    );
}

export default File