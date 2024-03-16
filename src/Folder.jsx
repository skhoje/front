import { useEffect, useState } from "react";
import File from "./File";

function Folder({ folder, addFile, deleteFolder, renameFolder, openMenuIndex, setOpenMenuIndex, deleteFile, renameFile }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMenu && !event.target.closest('.menu')) {
                setShowMenu(false);
                // setOpenMenuIndex(null);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);
// }, [showMenu, setOpenMenuIndex]);

    const toggleFolder = () => {
        setIsOpen(!isOpen);
    };

    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent parent click event
        setShowMenu(!showMenu);
        // setOpenMenuIndex(showMenu ? null : folder.id);
    };

    const handleAddFile = () => {
        const fileName = prompt('Enter the name for the new file:');
        if (fileName) {
            addFile(folder, fileName);
        }
        setShowMenu(false);
    };

    const handleDeleteFolder = () => {
        deleteFolder(folder);
        setShowMenu(false);
    };

    const handleRenameFolder = () => {
        const newName = prompt('Enter the new name for the folder:', folder.name);
        if (newName) {
            renameFolder(folder, newName);
        }
        setShowMenu(false);
    };

    return (
        <div>
            <div className="folder" onClick={toggleFolder}>
                <span>{folder.name}</span>
                <span onClick={toggleMenu}>...</span>
            </div>
            {showMenu && (
                <div className="menu">
                    <div onClick={handleAddFile}>Add File</div>
                    <div onClick={handleDeleteFolder}>Delete Folder</div>
                    <div onClick={handleRenameFolder}>Rename Folder</div>
                </div>
            )}
            {isOpen && folder.children && (
                <div className="subfolders">
                    {folder.children.map((child, index) => (
                        'children' in child ? (
                            <Folder
                                key={index}
                                folder={child}
                                addFile={addFile}
                                deleteFolder={deleteFolder}
                                renameFolder={renameFolder}
                                // openMenuIndex={openMenuIndex}
                                // setOpenMenuIndex={setOpenMenuIndex}
                                deleteFile={deleteFile}
                                renameFile={renameFile}
                            />
                        ) : (
                            <File
                                key={index}
                                file={child}
                                renameFile={renameFile}
                                deleteFile={() => deleteFile(child, folder)}
                            />
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

export default Folder