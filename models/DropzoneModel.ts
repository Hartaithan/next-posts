export enum ErrorCode {
  FileInvalidType = "file-invalid-type",
  FileTooLarge = "file-too-large",
  FileTooSmall = "file-too-small",
  TooManyFiles = "too-many-files",
}

export interface FileError {
  message: string;
  code: ErrorCode | string;
}

export interface IDropzoneFile extends Blob {
  readonly lastModified: number;
  readonly name: string;
  readonly webkitRelativePath: string;
}

export interface IDropzoneRejectedFile {
  file: IDropzoneFile;
  errors: FileError[];
}
