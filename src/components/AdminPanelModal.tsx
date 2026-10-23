import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  Plus,
  Send,
  BookOpen,
  Trash2,
  Sparkles,
  BarChart3,
  Layers,
  MessageSquare,
  GraduationCap
} from 'lucide-react';
import { Book, DiscussionThread, NotificationItem, GradeLevel } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  discussions: DiscussionThread[];
  onAddNewBook: (book: Book) => void;
  onBroadcastNotification: (title: string, message: string, type: NotificationItem['type']) => void;
  onDeleteDiscussion: (threadId: string) => void;
  currentAdminName: string;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  books,
  discussions,
  onAddNewBook,
  onBroadcastNotification,
  onDeleteDiscussion,
  currentAdminName
}) => {
  const [activeTab, setActiveTab] = useState<'add_book' | 'broadcast' | 'moderate' | 'stats'>('add_book');

  // Add Book Form state (Grade 5 to 11 English Math & IT)
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookSubject, setBookSubject] = useState<'Mathematics' | 'Computer Science & IT'>('Mathematics');
  const [bookGrade, setBookGrade] = useState<GradeLevel>(9);
  const [bookDifficulty, setBookDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Olympiad'>('Advanced');
  const [bookCurriculum, setBookCurriculum] = useState('Cambridge IGCSE & AoPS');
  const [bookPages, setBookPages] = useState(360);
  const [bookYear, setBookYear] = useState(2026);
  const [bookDescription, setBookDescription] = useState('');
  const [keyTheorems, setKeyTheorems] = useState('Quadratic Formula, Factoring, Polynomials');
  const [chapterTitle, setChapterTitle] = useState('Chapter 1: Foundations & Core Mathematical Proofs');
  const [chapterContent, setChapterContent] = useState('');

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState<NotificationItem['type']>('new_book');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim() || !bookAuthor.trim() || !chapterContent.trim()) return;

    // Pick appropriate cover
    const cover =
      bookSubject === 'Mathematics'
        ? '/src/assets/images/book_english_math_1792685051986.jpg'
        : '/src/assets/images/book_clean_architecture_1792657116388.jpg';

    const newBook: Book = {
      id: `admin-book-${Date.now()}`,
      title: bookTitle.trim(),
      author: bookAuthor.trim(),
      subject: bookSubject,
      grade: Number(bookGrade) as GradeLevel,
      difficulty: bookDifficulty,
      curriculum: bookCurriculum.trim() || 'Cambridge Secondary Curriculum',
      pages: Number(bookPages) || 320,
      year: Number(bookYear) || 2026,
      rating: 5.0,
      coverImage: cover,
      description: bookDescription.trim() || `Grade ${bookGrade} English ${bookSubject} textbook.`,
      keyTheoremsAndConcepts: keyTheorems
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      quotes: ['“Pure mathematics and clean code reflect the ultimate elegance of human logic.”'],
      discussionCount: 0,
      isNewRelease: true,
      chapters: [
        {
          id: `ch-adm-${Date.now()}`,
          chapterNumber: 1,
          title: chapterTitle.trim(),
          estimatedReadTimeMin: 15,
          content: chapterContent.trim()
        }
      ],
      reviews: []
    };

    onAddNewBook(newBook);

    // Reset
    setBookTitle('');
    setBookAuthor('');
    setBookDescription('');
    setChapterContent('');
    setActiveTab('stats');
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;

    onBroadcastNotification(broadcastTitle.trim(), broadcastMessage.trim(), broadcastType);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white border border-stone-200 rounded-2xl max-w-3xl w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="p-6 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-900/60 text-amber-300 border border-amber-800/60">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-white">
                  Math & IT Academy — Admin Boshqaruv Paneli
                </h3>
                <p className="text-xs text-stone-400">
                  Faol administrator: <strong className="text-stone-200">{currentAdminName}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 py-2 border-b border-stone-200 flex items-center gap-2 bg-stone-50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('add_book')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'add_book'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yangi Math/IT Darslik Qo‘shish (5-11 Sinf)</span>
            </button>

            <button
              onClick={() => setActiveTab('broadcast')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'broadcast'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Umumiy Xabarnoma Tarqatish</span>
            </button>

            <button
              onClick={() => setActiveTab('moderate')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'moderate'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Masalalar & Teoremalar Moderatsiyasi ({discussions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'stats'
                  ? 'bg-stone-900 text-white font-semibold'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Akademiya Statistikasi</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 text-xs text-stone-700">
            {/* TAB 1: ADD BOOK (5-11 Grade English Math & IT) */}
            {activeTab === 'add_book' && (
              <form onSubmit={handleCreateBook} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Kitob Nomi (English Title) *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      placeholder="e.g. Euclidean Geometry & Mathematical Proofs"
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Muallif / Nashriyot *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookAuthor}
                      onChange={(e) => setBookAuthor(e.target.value)}
                      placeholder="e.g. Cambridge University Press & Dr. Rusczyk"
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Fan Yo‘nalishi *
                    </label>
                    <select
                      value={bookSubject}
                      onChange={(e) => setBookSubject(e.target.value as any)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
                    >
                      <option value="Mathematics">Mathematics (Ingliz tili)</option>
                      <option value="Computer Science & IT">Computer Science & IT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Sinf (Grade 5 - 11) *
                    </label>
                    <select
                      value={bookGrade}
                      onChange={(e) => setBookGrade(Number(e.target.value) as GradeLevel)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none font-bold text-amber-900"
                    >
                      <option value={5}>5-sinf (Grade 5)</option>
                      <option value={6}>6-sinf (Grade 6)</option>
                      <option value={7}>7-sinf (Grade 7)</option>
                      <option value={8}>8-sinf (Grade 8)</option>
                      <option value={9}>9-sinf (Grade 9)</option>
                      <option value={10}>10-sinf (Grade 10)</option>
                      <option value={11}>11-sinf (Grade 11)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Darajasi (Difficulty)
                    </label>
                    <select
                      value={bookDifficulty}
                      onChange={(e) => setBookDifficulty(e.target.value as any)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Olympiad">Olympiad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Dastur (Curriculum)
                    </label>
                    <input
                      type="text"
                      value={bookCurriculum}
                      onChange={(e) => setBookCurriculum(e.target.value)}
                      placeholder="Cambridge IGCSE / AP"
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Asosiy teoremalar va tushunchalar (vergul bilan ajrating)
                    </label>
                    <input
                      type="text"
                      value={keyTheorems}
                      onChange={(e) => setKeyTheorems(e.target.value)}
                      placeholder="Pythagorean Theorem, Congruence, SSS"
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Sahifalar soni & Yil
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={bookPages}
                        onChange={(e) => setBookPages(Number(e.target.value))}
                        className="w-1/2 px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
                        placeholder="Sahifalar"
                      />
                      <input
                        type="number"
                        value={bookYear}
                        onChange={(e) => setBookYear(Number(e.target.value))}
                        className="w-1/2 px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
                        placeholder="Yil"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Darslik Tavsifi (Description)
                  </label>
                  <textarea
                    rows={2}
                    value={bookDescription}
                    onChange={(e) => setBookDescription(e.target.value)}
                    placeholder="Darslikning asosiy o‘quv maqsadi..."
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div className="pt-2 border-t border-stone-100 space-y-3">
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    Qiroatxona uchun 1-bob matni (ingliz tilida):
                  </h4>
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Bob nomi (Chapter Title)
                    </label>
                    <input
                      type="text"
                      value={chapterTitle}
                      onChange={(e) => setChapterTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">
                      Bobning to‘liq matni va formulalari *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={chapterContent}
                      onChange={(e) => setChapterContent(e.target.value)}
                      placeholder="Enter the mathematical theorems, proofs, or code examples..."
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 font-sans"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <Plus className="w-4 h-4 text-amber-300" />
                    <span>Darslikni Kutubxonaga Joylash & Xabarnoma Yuborish</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: BROADCAST NOTIFICATION */}
            {activeTab === 'broadcast' && (
              <form onSubmit={handleBroadcastSubmit} className="space-y-4 max-w-lg mx-auto py-4">
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">
                    Barcha O‘quvchilarga Xabarnoma Yuborish
                  </h4>
                  <p className="text-stone-500 text-[11px]">
                    Ushbu bildirishnoma 5-11 sinf o‘quvchilarining ekranning pastki burchagiga suzib chiquvchi toast tarzida darhol yetkaziladi.
                  </p>
                </div>

                {broadcastSuccess && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs">
                    ✓ Xabarnoma barcha o‘quvchilarga muvaffaqiyatli yetkazildi!
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Xabarnoma Turi
                  </label>
                  <select
                    value={broadcastType}
                    onChange={(e) => setBroadcastType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
                  >
                    <option value="new_book">Yangi Matematika / IT Darsligi</option>
                    <option value="discussion">Olimpiada Masalasi Bahsi</option>
                    <option value="system">Akademiya E’loni</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Sarlavha *
                  </label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="Masalan: Bugun 8-sinf geometriyasi bo‘yicha jonli tahlil"
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Xabar Matni *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="O‘quvchilarga yetkazilishi kerak bo‘lgan ma’lumot..."
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Xabarnomani Barcha Sinflarga Tarqatish</span>
                </button>
              </form>
            )}

            {/* TAB 3: MODERATE DISCUSSIONS */}
            {activeTab === 'moderate' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-stone-800">
                    Masalalar va teoremalar tahlilini nazorat qilish ({discussions.length})
                  </span>
                </div>

                <div className="divide-y divide-stone-100">
                  {discussions.map((d) => (
                    <div
                      key={d.id}
                      className="py-3 flex items-start justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-stone-900 truncate">
                            {d.title}
                          </span>
                          <span className="text-[10px] text-stone-500 font-mono">
                            #{d.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 line-clamp-2">
                          {d.content}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-stone-400 mt-1">
                          <span>O‘quvchi/Muallif: {d.authorName}</span>
                          <span>Javoblar: {d.replies.length} ta</span>
                          <span>E’tiroflar: {d.upvotes} ta</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onDeleteDiscussion(d.id)}
                        title="Mavzuni o‘chirish"
                        className="p-1.5 text-stone-400 hover:text-red-700 rounded-md transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: STATS */}
            {activeTab === 'stats' && (
              <div className="space-y-6 py-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-stone-500 text-[11px]">5-11 Sinf Darsliklari</span>
                    <p className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                      {books.length} ta
                    </p>
                  </div>
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-stone-500 text-[11px]">Masala & Bahslar</span>
                    <p className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                      {discussions.length} ta
                    </p>
                  </div>
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-stone-500 text-[11px]">Sinflar Qamrovi</span>
                    <p className="text-2xl font-serif font-bold text-stone-900">
                      5 – 11 Sinf
                    </p>
                  </div>
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                    <span className="text-stone-500 text-[11px]">Tizim Tili</span>
                    <p className="text-2xl font-serif font-bold text-blue-900">
                      100% English
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl space-y-2">
                  <h4 className="font-serif font-bold text-amber-900 text-sm">
                    Cambridge & MIT Dastur Tamoyili
                  </h4>
                  <p className="text-stone-700 leading-relaxed text-xs">
                    Akademiyadagi barcha darsliklar qat’iy ravishda 5-sinfdan 11-sinfgacha bo‘lgan ingliz tilidagi matematika va kompyuter fanlariga (IT) asoslangan. Har bir kitobda o‘quvchilar formulalar va kodlarni o‘rganishlari, o‘z yechimlarini muhokama qilishlari mumkin.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
