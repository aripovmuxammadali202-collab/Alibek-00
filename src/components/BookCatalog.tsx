import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, BookOpen, GraduationCap, Calculator, Code } from 'lucide-react';
import { Book, GradeLevel, SubjectType } from '../types';
import { BookCard } from './BookCard';

interface BookCatalogProps {
  books: Book[];
  onReadBook: (book: Book) => void;
  onDiscussBook: (book: Book) => void;
  bookmarks: string[];
  onToggleBookmark: (bookId: string) => void;
  selectedGrade: 'all' | GradeLevel;
  setSelectedGrade: (grade: 'all' | GradeLevel) => void;
  userGrade?: GradeLevel;
}

const GRADES: Array<'all' | GradeLevel> = ['all', 5, 6, 7, 8, 9, 10, 11];

export const BookCatalog: React.FC<BookCatalogProps> = ({
  books,
  onReadBook,
  onDiscussBook,
  bookmarks,
  onToggleBookmark,
  selectedGrade,
  setSelectedGrade,
  userGrade
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('All');
  const [sortBy, setSortBy] = useState<'grade_asc' | 'rating' | 'discussions'>('grade_asc');

  // Filtered and sorted books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Grade filter (5-sinfdan 11-sinfgacha)
        if (selectedGrade !== 'all' && book.grade !== selectedGrade) {
          return false;
        }
        // Subject filter (Mathematics vs Computer Science & IT)
        if (selectedSubject !== 'All' && book.subject !== selectedSubject) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = book.title.toLowerCase().includes(q);
          const matchesAuthor = book.author.toLowerCase().includes(q);
          const matchesDesc = book.description.toLowerCase().includes(q);
          const matchesTheorems = book.keyTheoremsAndConcepts.some((t) =>
            t.toLowerCase().includes(q)
          );
          const matchesCurriculum = book.curriculum.toLowerCase().includes(q);
          return matchesTitle || matchesAuthor || matchesDesc || matchesTheorems || matchesCurriculum;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'grade_asc') return a.grade - b.grade;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discussions') return b.discussionCount - a.discussionCount;
        return 0;
      });
  }, [books, selectedGrade, selectedSubject, searchQuery, sortBy]);

  return (
    <div id="catalog-section" className="space-y-8">
      {/* Top Filter Bar: Grade Level Segmented Controls & Subject Filter */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        {/* Row 1: 5-sinfdan 11-sinfgacha Filter Buttons */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-700" />
              <span>Sinf Darajasi Bo‘yicha Saralash (5 - 11 Sinf):</span>
            </span>
            {userGrade && (
              <button
                onClick={() => setSelectedGrade(userGrade)}
                className="text-[11px] text-amber-800 font-semibold hover:underline cursor-pointer"
              >
                Mening sinfim ({userGrade}-sinf) darsliklari
              </button>
            )}
          </div>

          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-100 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setSelectedGrade('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedGrade === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Barchasi (All 5-11)
            </button>
            {[5, 6, 7, 8, 9, 10, 11].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g as GradeLevel)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedGrade === g
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-200/70'
                }`}
              >
                {g}-sinf
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Subject Selector (Math vs IT) & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-stone-100">
          {/* Subject Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium mr-1">Fan:</span>
            <button
              onClick={() => setSelectedSubject('All')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedSubject === 'All'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Barcha Fanlar
            </button>
            <button
              onClick={() => setSelectedSubject('Mathematics')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedSubject === 'Mathematics'
                  ? 'bg-blue-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Mathematics (Ingliz tili)</span>
            </button>
            <button
              onClick={() => setSelectedSubject('Computer Science & IT')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedSubject === 'Computer Science & IT'
                  ? 'bg-emerald-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Computer Science & IT</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Teorema, formula yoki mavzu qidirish..."
              className="w-full pl-9 pr-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Row 3: Sort Options */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
          <div>
            Topilgan darsliklar: <strong className="text-stone-900">{filteredBooks.length} ta</strong>
            {selectedGrade !== 'all' && <span> · {selectedGrade}-sinf dasturi</span>}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Tartib:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="grade_asc">Sinf bo‘yicha (5 dan 11 gacha)</option>
              <option value="rating">Reyting bo‘yicha</option>
              <option value="discussions">Munozaralar soni</option>
            </select>
          </div>
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onRead={onReadBook}
              onDiscuss={onDiscussBook}
              isBookmarked={bookmarks.includes(book.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-xl p-12 text-center max-w-md mx-auto space-y-3">
          <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
          <h2 className="text-base font-serif font-semibold text-stone-800">
            Darslik topilmadi
          </h2>
          <p className="text-xs text-stone-500">
            Qidiruv so‘zini o‘zgartiring yoki boshqa sinf filtrini tanlang.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGrade('all');
              setSelectedSubject('All');
            }}
            className="px-4 py-2 text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
          >
            Barcha filtrlarni tozalash
          </button>
        </div>
      )}
    </div>
  );
};
