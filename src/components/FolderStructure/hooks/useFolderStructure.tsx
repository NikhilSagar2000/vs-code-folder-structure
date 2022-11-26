import React from "react";
import { FileType, FolderType } from "../../../types/folderStructure.types";

export default function useFolderStructure() {
  const [folderDirectory, setFolderDirectory] = React.useState(DIRECTORY);

  const insertNewNode = (
    tree: FolderType,
    folderId: string,
    isFolder: boolean,
    name: string,
    isEditing: boolean
  ): FolderType => {
    // found the node
    if (folderId === tree.id) {
      // checking whether we have same name file/folder
      const sameNameIndex = tree.children.findIndex(
        (child) =>
          child.name.toLowerCase() === name.toLowerCase() &&
          child.isFolder === isFolder
      );

      // if no
      if (sameNameIndex < 0) {
        // and we are editing
        if (isEditing) {
          // then overwrite name
          tree.name = name;
        } else {
          // else create a new node to insert
          const newNode = {
            id: Date.now().toString(),
            name,
            isFolder,
            ...(isFolder
              ? { children: [] as Array<FolderType | FileType> }
              : {}),
          };
          // push the node.
          tree.children.push(newNode as FolderType | FileType);
        }
        // for sorting the files/folders (need to optimize)
        const folders: FolderType[] = [];
        const files: FileType[] = [];

        // check for folders and files and push in respective arrays
        tree.children.forEach((child) =>
          child.isFolder ? folders.push(child) : files.push(child)
        );

        // sort folders
        folders.sort((a, b) => a.name.localeCompare(b.name));
        // sort files
        files.sort((a, b) => a.name.localeCompare(b.name));

        // add folders in front then files
        tree.children = [...folders, ...files];
      }
      // id's didnt match
    } else {
      // loop over the childrens
      tree.children.forEach((child) => {
        // if is folder then do recursive call
        if (child.isFolder) {
          insertNewNode(child, folderId, isFolder, name, isEditing);
          // if it is a file try to match id's
        } else if (child.id === folderId) {
          // if mathes update the name
          child.name = name;
        }
      });
    }

    return tree;
  };

  const deleteNode = (tree: FolderType | FileType, id: string) => {
    if (id === tree.id) {
      tree = undefined as unknown as FolderType;
    } else if (tree.isFolder) {
      tree.children = tree.children.filter((child) => deleteNode(child, id));
    }

    return tree;
  };

  const removeAFolderOrFile = (id: string) => {
    const tree = deleteNode(JSON.parse(JSON.stringify(folderDirectory)), id);

    setFolderDirectory(tree);
  };

  const addNewFolderOrFile = (
    folderId: string,
    isFolder: boolean,
    name: string,
    isEditing: boolean
  ) => {
    const response = insertNewNode(
      folderDirectory as FolderType,
      folderId,
      isFolder,
      name,
      isEditing
    );

    setFolderDirectory(response);
  };

  return {
    folderDirectory,
    removeAFolderOrFile,
    addNewFolderOrFile,
  };
}

const DIRECTORY: FolderType | FileType = {
  id: "1001",
  name: "root",
  isFolder: true,
  children: [
    {
      id: "1004",
      name: "public",
      isFolder: true,
      children: [
        {
          id: "1005",
          name: "index.html",
          isFolder: false,
        },
      ],
    },
    {
      id: "1002",
      name: "src",
      isFolder: true,
      children: [
        {
          id: "1003",
          name: "index.js",
          isFolder: false,
        },
      ],
    },
    {
      id: "1006",
      name: "package.json",
      isFolder: false,
    },
  ],
};
