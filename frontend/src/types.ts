// Definition of the types used in the application with interfaces

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

export interface RecipeSummary {
  id: number;
  title: string;
  summary: string;
}