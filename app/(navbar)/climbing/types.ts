export enum ClimbType {
  Bouldering = "Bouldering",
  TopRoping = "TopRoping",
}

export interface Climb {
  num: number;
  date: string;
  type: ClimbType;
  rating: string;
  location: string;
  comments: string;
};


