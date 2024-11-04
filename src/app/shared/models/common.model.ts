export type CommonDto = {
  id: string,
  name: string,
}

export type Village = CommonDto & {
  villageId: string,
}

export type District = CommonDto;

export type Tehsil = District & {
  tehsilId: string,
}

export type Blocks = Tehsil & {
  blockId: string,
}

export type deputationLevel = CommonDto & {
  officeTypeId: string,
}