import { http } from '../../api/http';
import type { Book, CreateBookDTO } from '../../types/book';

export const bookService = {
  searchBooks: async (query?: string): Promise<Book[]> => {
    const response = await http.get<Book[]>('/books', {
      params: query ? { q: query } : undefined,
    });
    return response.data;
  },

  searchExternalBooks: async (query: string): Promise<CreateBookDTO[]> => {
    const response = await http.get<CreateBookDTO[]>('/books/external', {
      params: { q: query },
    });
    return response.data;
  },

  createBook: async (data: CreateBookDTO): Promise<Book> => {
    const response = await http.post<Book>('/books', data);
    return response.data;
  },
};