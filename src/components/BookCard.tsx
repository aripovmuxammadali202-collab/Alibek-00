import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, MessageSquare, Star, Bookmark, GraduationCap, Code } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
  onDiscuss: (book: Book) => void;
  isBookmarked: boolean;
  onToggleBookmark: (bookId: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onRead,
  onDiscuss,
  isBookmarked,
  onToggleBookmark
}) => {
  const isMath = book.subject === 'Mathematics';

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300"
    >
      {/* Book Cover Container with 3:4 aspect ratio */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden border-b border-stone-100">
        <img
          src={book.coverImage}
          alt={book.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Grade Badge in top corner */}
        <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-amber-200 text-[10px] font-mono tracking-wider px-2.5 py-1 rounded font-bold uppercase flex items-center gap-1 shadow-xs">
          <GraduationCap className="w-3 h-3 text-amber-300" />
          <span>{book.grade}-sinf</span>
        </div>

        {/* Bookmark action in top corner */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(book.id);
          }}
          aria-label={isBookmarked ? "Xatcho'pdan o'chirish" : "Xatcho'pga saqlash"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isBookmarked
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-stone-900/60 text-white hover:bg-stone-900/80'
          }`}
        >
          <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>

        {/* Curriculum overlay banner at bottom of cover */}
        <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-stone-950/75 backdrop-blur-xs text-[10px] text-stone-200 font-mono truncate">
          {book.curriculum}
        </div>
      </div>

      {/* Book Info & Editorial Details */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2 font-sans flex-wrap">
            <span className={`font-semibold ${isMath ? 'text-blue-900' : 'text-emerald-900'}`}>
              {book.subject}
            </span>
            <span aria-hidden="true">·</span>
            <span>{book.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span>{book.pages} pages</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{book.year}</span>
          </div>

          {/* Title */}
          <h2 className="text-base font-serif font-bold text-stone-900 leading-snug mb-1 line-clamp-2 group-hover:text-amber-900 transition-colors">
            {book.title}
          </h2>

          {/* Author */}
          <p className="text-xs text-stone-600 font-medium mb-2.5">
            {book.author}
          </p>

          {/* Description snippet */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {book.description}
          </p>

          {/* Key Theorems / Concepts */}
          <div className="flex flex-wrap gap-1 mb-2">
            {book.keyTheoremsAndConcepts.slice(0, 2).map((concept) => (
              <span
                key={concept}
                className="text-[10px] text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded font-mono truncate max-w-[140px]"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom stats & Action Handlers */}
        <div className="pt-3 border-t border-stone-100 space-y-3">
          {/* Rating and Discussion Metrics */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1 text-stone-800 font-medium">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span className="tabular-nums">{book.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal">({book.reviews.length} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
              <span className="tabular-nums">{book.discussionCount} solutions</span>
            </div>
          </div>

          {/* Functional Button Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onRead(book)}
              className="w-full py-2 px-3 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200/90 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Read (O‘qish)</span>
            </button>
            <button
              onClick={() => onDiscuss(book)}
              className="w-full py-2 px-3 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 text-stone-300" />
              <span>Discuss (Bahs)</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
