import { useState } from 'react';
import { Book, Search } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export function Navbar({ onSearch, onOpenLogin, onOpenRegister }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#14181c]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo com 3 livrinhos */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setSearchTerm('');
            onSearch('');
          }}
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="flex items-center gap-0.5 text-emerald-500">
            <Book className="h-5 w-5 fill-emerald-500/20" />
            <Book className="h-5 w-5 fill-emerald-500/20" />
            <Book className="h-5 w-5 fill-emerald-500/20 -rotate-12" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            ChestBook
          </span>
        </a>

        {/* Navegação + Botões de Login/Cadastro + Busca */}
        <div className="flex items-center gap-5">
          <nav className="hidden md:flex items-center gap-5 text-xs font-bold tracking-wider text-zinc-300 uppercase">
            <button
              onClick={onOpenLogin}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Entrar
            </button>
            <button
              onClick={onOpenRegister}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Criar Conta
            </button>
            <a href="#populares" className="hover:text-white transition-colors">
              Livros
            </a>
            <a href="#terror" className="hover:text-white transition-colors">
              Listas
            </a>
          </nav>

          {/* Barra de Busca */}
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar livros..."
              className="w-36 sm:w-48 rounded-full bg-zinc-200/90 focus:bg-white text-zinc-900 placeholder-zinc-500 pl-3.5 pr-9 py-1.5 text-xs font-medium focus:outline-none transition-all"
            />
            <button
              type="submit"
              aria-label="Pesquisar"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-900 cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}