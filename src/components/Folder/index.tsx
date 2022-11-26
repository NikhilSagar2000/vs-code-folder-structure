import * as React from "react";
import { FileType, FolderType } from "../../types/folderStructure.types";

interface Props {
  folder: FolderType | FileType;
  addNewFolderOrFile: (
    folderId: string,
    isFolder: boolean,
    name: string,
    isEditing: boolean
  ) => void;
  removeAFolderOrFile: (id: string) => void;
}

export default function Folder({
  folder,
  addNewFolderOrFile,
  removeAFolderOrFile,
}: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [fieldState, setFieldState] = React.useState({
    name: "",
    isVisible: false,
    isFolder: false,
    isEditing: false,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (fieldState.isEditing) {
      addNewFolderOrFile(folder.id, fieldState.isFolder, fieldState.name, true);
    } else {
      addNewFolderOrFile(
        folder.id,
        fieldState.isFolder,
        fieldState.name,
        false
      );
    }
    setFieldState({
      name: "",
      isVisible: false,
      isFolder: false,
      isEditing: false,
    });
  };

  return (
    <div
      style={{
        marginLeft: "24px",
        userSelect: "none",
      }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="folder__wraper"
      >
        {folder.isFolder ? "📁 " : "📄 "}
        {folder.name}
        <div className="actions__wrapper">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setFieldState({
                isVisible: true,
                isFolder: folder.isFolder,
                isEditing: true,
                name: folder.name,
              });
            }}
          >
            ✏️
          </span>

          {folder.isFolder ? (
            <>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setFieldState({
                    ...fieldState,
                    isVisible: true,
                    isFolder: true,
                  });
                }}
              >
                + 📁
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();

                  setFieldState({
                    ...fieldState,
                    isVisible: true,
                    isFolder: false,
                  });
                }}
              >
                + 📄
              </span>
            </>
          ) : (
            <></>
          )}
          <span
            onClick={(e) => {
              e.stopPropagation();
              removeAFolderOrFile(folder.id);
            }}
          >
            ❌
          </span>
        </div>
      </div>
      {fieldState.isVisible ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fileOrFolder"
            required
            style={{
              width: "400px",
              height: "28px",
              marginLeft: "24px",
            }}
            autoFocus
            value={fieldState.name}
            onChange={(e) =>
              setFieldState({ ...fieldState, name: e.target.value })
            }
            onBlur={() => {
              setFieldState({
                name: "",
                isFolder: false,
                isVisible: false,
                isEditing: false,
              });
            }}
          />
        </form>
      ) : (
        <></>
      )}
      {isExpanded &&
        folder.isFolder &&
        folder.children.map((fld) => (
          <Folder
            key={fld.id}
            removeAFolderOrFile={removeAFolderOrFile}
            addNewFolderOrFile={addNewFolderOrFile}
            folder={fld}
          />
        ))}
    </div>
  );
}
