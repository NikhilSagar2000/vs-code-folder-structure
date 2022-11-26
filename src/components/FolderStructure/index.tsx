import Folder from "../Folder";
import useFolderStructure from "./hooks/useFolderStructure";

const FolderStructure = () => {
  const { folderDirectory, removeAFolderOrFile, addNewFolderOrFile } =
    useFolderStructure();

  if (!folderDirectory) {
    return <h5 style={{ marginLeft: "24px" }}>No Folder!!!!!!</h5>;
  }

  return (
    <Folder
      removeAFolderOrFile={removeAFolderOrFile}
      addNewFolderOrFile={addNewFolderOrFile}
      folder={folderDirectory}
    />
  );
};

export default FolderStructure;
