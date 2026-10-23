import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Trash2, Bookmark } from 'lucide-react';
import { Book } from '../types';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: string[];
  books: Book[];
  onReadBook: (book: Book) => void;
  onRemoveBookmark: (bookId: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  books,
  onReadBook,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  const bookmarkedBooks = books.filter((b) => bookmarks.includes(b.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white border border-stone-200 rounded-2xl max-w-lg w-full shadow-2xl flex flex-col max-h-[80vh] overflow-hidden"
        >
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-700" fill="currentColor" />
              <h3 className="text-base font-serif font-bold text-stone-900">
                Saqlangan Kitoblar ({bookmarkedBooks.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 cursor-pointer p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {bookmarkedBooks.length > 0 ? (
              bookmarkedBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-16 object-cover rounded shadow-2xs"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-stone-900 truncate">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">
                        {book.author} · {book.grade}-sinf · {book.subject}
                      </p>
                      <span className="text-[10px] text-stone-400">
                        {book.chapters.length} bob mavjud
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onReadBook(book);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-stone-900 text-white hover:bg-stone-800 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                      <span>O‘qish</span>
                    </button>
                    <button
                      onClick={() => onRemoveBookmark(book.id)}
                      title="Xatcho‘pdan o‘chirish"
                      className="p-1.5 text-stone-400 hover:text-red-700 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-stone-500 space-y-2">
                <Bookmark className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-xs">Hozircha hech qanday kitob saqlanmagan</p>
                <p className="text-[11px] text-stone-400">
                  Kutubxonadagi kitob kartasidagi xatcho‘p tugmasini bosib saqlab qo‘yishingiz mumkin.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
