import { useEffect, useState } from 'react';
import type { CreateBookDTO } from '../types/book';
import { bookService } from './books/bookService';
import { Navbar } from '../components/Navbar';
import { BookCard } from '../components/BookCard';


export function HomePage() {
  const [popularBooks, setPopularBooks] = useState<CreateBookDTO[]>([]);
  const [horrorBooks, setHorrorBooks] = useState<CreateBookDTO[]>([]);
  const [searchResults, setSearchResults] = useState<CreateBookDTO[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeShelves = async () => {
      setLoading(true);
      try {
        const [popular, horror] = await Promise.all([
          bookService.searchExternalBooks('subject:fiction bestseller'),
          bookService.searchExternalBooks('stephen king'),
        ]);
        // Pega os 6 primeiros de cada categoria (padrão 6 capas por fileira)
        setPopularBooks(popular.slice(0, 6));
        setHorrorBooks(horror.slice(0, 6));
      } catch (error) {
        console.error('Erro ao carregar livros da Home:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeShelves();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    setLoading(true);
    try {
      const results = await bookService.searchExternalBooks(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14181c] text-zinc-100 flex flex-col">
      <Navbar
        onSearch={handleSearch}
        onOpenLogin={() => alert('Modal/Tela de Login em breve!')}
        onOpenRegister={() => alert('Modal/Tela de Cadastro em breve!')}
      />

      <main className="flex-1">
        {/* Hero Section (esconde quando o usuário está fazendo uma busca) */}
        {!searchResults && (
          <section className="relative overflow-hidden border-b border-zinc-800/60 bg-gradient-to-b from-[#1f262e] via-[#14181c] to-[#14181c] py-16 sm:py-24 px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Acompanhe os livros que você leu.
                <br />
                Salve os que quer ler.
                <br />
                Conte aos amigos o que é bom.
              </h1>

              <div>
                <button
                  onClick={() => alert('Modal/Tela de Cadastro em breve!')}
                  className="rounded-md bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-colors cursor-pointer"
                >
                  Comece agora — é grátis!
                </button>
              </div>

              <p className="text-sm text-zinc-400">
                A rede social e o diário literário para quem ama ler.
              </p>
            </div>
          </section>
        )}

        {/* Conteúdo Principal / Prateleiras */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[2/3] w-full rounded-md bg-zinc-800/70 animate-pulse"
                />
              ))}
            </div>
          ) : searchResults ? (
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Resultados para "{searchQuery}"
                </h2>
                <button
                  onClick={() => handleSearch('')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  Limpar busca
                </button>
              </div>
              {searchResults.length === 0 ? (
                <p className="text-sm text-zinc-500">Nenhum livro encontrado.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                  {searchResults.map((book, index) => (
                    <BookCard key={book.externalApiId ?? index} book={book} />
                  ))}
                </div>
              )}
            </section>
          ) : (
            <>
              {/* Prateleira 1: Populares */}
              <section id="populares" className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Populares no ChestBook
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                  {popularBooks.map((book, index) => (
                    <BookCard key={book.externalApiId ?? index} book={book} />
                  ))}
                </div>
              </section>

              {/* Prateleira 2: Terror & Suspense */}
              <section id="terror" className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Clássicos de Terror & Suspense
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                  {horrorBooks.map((book, index) => (
                    <BookCard key={book.externalApiId ?? index} book={book} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}