import { useEffect, useState } from 'react';
import type { Book } from '../../types/book';
import { bookService } from './bookService';
import { BookCard } from '../../components/BookCard';

export function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (searchQuery?: string) => {
    setLoading(true);
    try {
      const data = await bookService.searchBooks(searchQuery);
      setBooks(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(query);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Cabeçalho e Busca */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Bookboxd
            </h1>
            <p className="text-sm text-zinc-400">
              Seu diário de leituras e listas literárias
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-md bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Grid de Capas */}
        {loading ? (
          <p className="text-zinc-400 text-sm">Carregando catálogo...</p>
        ) : books.length === 0 ? (
          <p className="text-zinc-500 text-sm">
            Nenhum livro encontrado. Cadastre o primeiro pelo Postman!
          </p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}