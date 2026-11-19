import type { Book, CreateBookDTO } from '../types/book';

type DisplayBook = Book | CreateBookDTO;

interface BookCardProps {
  book: DisplayBook;
  onSelect?: (book: DisplayBook) => void;
}

export function BookCard({ book, onSelect }: BookCardProps) {
  return (
    <div
      onClick={() => onSelect?.(book)}
      className="group cursor-pointer flex flex-col gap-1.5 w-full"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-zinc-800 border-2 border-zinc-800/80 group-hover:border-emerald-500 transition-all duration-200 shadow-lg">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-3 text-center bg-zinc-900">
            <span className="text-xs font-semibold text-zinc-300 line-clamp-3">
              {book.title}
            </span>
            <span className="mt-1 text-[10px] text-zinc-500 line-clamp-1">
              {book.author}
            </span>
          </div>
        )}
      </div>
      <h3 className="truncate text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white">
        {book.title}
      </h3>
      <p className="truncate text-[11px] text-zinc-400">{book.author}</p>
    </div>
  );
}