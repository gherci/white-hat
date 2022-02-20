export interface GameModel {
  categories: string[];
  id: string;
  image: string;
  name: string;
}

export interface JackpotModel {
  game: string;
  amount: number;
}
