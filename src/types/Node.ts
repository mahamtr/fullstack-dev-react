export interface Node {
  online: boolean;
  name: string;
  url: string;
  loading: boolean;
  blocks: Block[];
}

export interface Block {
  id: number;
  content: string;
}

export interface BlockDto {
  id: number;
  type: string;
  attributes: Attribute;
}

export interface Attribute {
  index: number;
  timestamp: number;
  data: string;
}
