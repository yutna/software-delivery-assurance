export type SourceFile = {
  readonly path: string;
  readonly text: string;
};

export type DtoObject = Readonly<Record<string, unknown>>;

export type RequirementFileDto = readonly DtoObject[];
export type ModuleFileDto = DtoObject;
export type OverlayFileDto = DtoObject;
export type ProfileFileDto = DtoObject;
export type CrosswalkFileDto = DtoObject;
export type RegisterFileDto = DtoObject;
export type StandardManifestDto = DtoObject;
