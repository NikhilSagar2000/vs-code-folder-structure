export type FolderType = {
  id: string;
  name: string;
  isFolder: true;
  children: Array<FolderType | FileType>;
};

export type FileType = {
  id: string;
  name: string;
  isFolder: false;
};
