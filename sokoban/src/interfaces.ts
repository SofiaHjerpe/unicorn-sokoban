export interface IRoute {
  id: number;
  name: string;
  path: string;
}

export interface ILeveldata {
  name: ILevel[];
}

export interface ILevel {
  id: number;
  level: number;
  
}
export interface IBoxes {
  id: number;
  levelVal: number;
  stars: string;
}
