export interface Book {
  id: number;
  externalApiId?: string;
  title: string;
  author: string;
  synopsis?: string;
  coverUrl?: string;
  pageCount?: number;
  publishedYear?: number;
}

export type CreateBookDTO = Omit<Book, 'id'>;