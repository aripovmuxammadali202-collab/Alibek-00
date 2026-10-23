import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  MessageSquare,
  ThumbsUp,
  Send,
  Plus,
  Star,
  User,
  AlertCircle,
  Share2,
  Check,
  Tag
} from 'lucide-react';
import { Book, DiscussionThread, DiscussionReply, BookReview } from '../types';

interface BookDiscussionViewProps {
  book: Book;
  onBack: () => void;
  onReadBook: (book: Book) => void;
  discussions: DiscussionThread[];
  onAddDiscussion: (newThread: Omit<DiscussionThread, 'id' | 'createdAt' | 'upvotes' | 'replies'>) => void;
  onAddReply: (threadId: string, content: string) => void;
  onUpvoteThread: (threadId: string) => void;
  onAddReview: (bookId: string, rating: number, content: string) => void;
  onStartDirectMessage: (userName: string, userRole: string, defaultMessage?: string) => void;
  initialQuote?: string;
}

export const BookDiscussionView: React.FC<BookDiscussionViewProps> = ({
  book,
  onBack,
  onReadBook,
  discussions,
  onAddDiscussion,
  onAddReply,
  onUpvoteThread,
  onAddReview,
  onStartDirectMessage,
  initialQuote = ''
}) => {
  const [activeTab, setActiveTab] = useState<'threads' | 'reviews' | 'about'>('threads');
  const [showNewThreadModal, setShowNewThreadModal] = useState(Boolean(initialQuote));
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New thread form state
  const [newTitle, setNewTitle] = useState('');
  const [newTag, setNewTag] = useState('Intellektual Tahlil');
  const [newContent, setNewContent] = useState(
    initialQuote ? `Iqtibos:\n“${initialQuote}”\n\nFikrim:` : ''
  );
  const [isSpoiler, setIsSpoiler] = useState(false);

  // Reply state mapped by threadId
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState('');

  // Filter discussions for this specific book
  const bookDiscussions = discussions.filter((d) => d.bookId === book.id);

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddDiscussion({
      bookId: book.id,
      title: newTitle.trim(),
      tag: newTag,
      content: newContent.trim(),
      isSpoiler,
      authorId: 'me',
      authorName: 'Azizbek Rahimov',
      authorAvatar: 'AR',
      authorRole: 'Kitobxon'
    });

    setNewTitle('');
    setNewContent('');
    setIsSpoiler(false);
    setShowNewThreadModal(false);
  };

  const handleReplySubmit = (threadId: string) => {
    const text = replyTextMap[threadId];
    if (!text || !text.trim()) return;

    onAddReply(threadId, text.trim());
    setReplyTextMap((prev) => ({ ...prev, [threadId]: '' }));
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent.trim()) return;

    onAddReview(book.id, reviewRating, reviewContent.trim());
    setReviewContent('');
    setShowReviewModal(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kutubxona katalogiga qaytish</span>
        </button>
      </div>

      {/* Book Spotlight Header */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Book Cover */}
          <div className="md:col-span-3 aspect-[3/4] max-w-[220px] mx-auto md:mx-0 rounded-xl overflow-hidden shadow-sm border border-stone-200">
            <img
              src={book.coverImage}
              alt={book.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Book Metadata & Description */}
          <div className="md:col-span-9 flex flex-col justify-between h-full space-y-4">
            <div>
              {/* Unboxed metadata tags */}
              <div className="flex items-center gap-2 text-xs text-stone-500 font-sans mb-2 flex-wrap">
                <span className="font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
                  {book.grade}-sinf
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-stone-800">{book.subject}</span>
                <span aria-hidden="true">·</span>
                <span>{book.curriculum}</span>
                <span aria-hidden="true">·</span>
                <span>{book.pages} pages</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-700 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
                  {book.rating.toFixed(1)} / 5.0
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug mb-2">
                {book.title}
              </h1>

              <p className="text-sm font-medium text-stone-700 mb-3">
                Author: <span className="font-semibold text-stone-900">{book.author}</span>
                {book.authorBio && (
                  <span className="text-xs text-stone-500 block mt-0.5 font-normal">
                    {book.authorBio}
                  </span>
                )}
              </p>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans mb-4">
                {book.description}
              </p>

              {/* Key theorems and concepts (unboxed inline list) */}
              <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
                <span className="font-medium text-stone-700">Theorems & Concepts:</span>
                {book.keyTheoremsAndConcepts.map((concept, i) => (
                  <React.Fragment key={concept}>
                    <span className="text-stone-700 font-mono text-[11px] bg-stone-100 px-1.5 py-0.5 rounded">
                      {concept}
                    </span>
                    {i < book.keyTheoremsAndConcepts.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Quick Action Ribbon */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onReadBook(book)}
                  className="px-5 py-2.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>Qiroatxonada O‘qish</span>
                </button>
                <button
                  onClick={() => setShowNewThreadModal(true)}
                  className="px-4 py-2.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-stone-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yangi Munozara Mavzusi</span>
                </button>
              </div>

              <div className="text-xs text-stone-500 font-mono tabular-nums">
                {bookDiscussions.length} faol munozara · {book.reviews.length} taqriz
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discussion & Review Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-px">
        <button
          onClick={() => setActiveTab('threads')}
          className={`px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'threads'
              ? 'border-stone-900 text-stone-900 font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Munozara Mavzulari ({bookDiscussions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'reviews'
              ? 'border-stone-900 text-stone-900 font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Kitobxonlar Taqrizlari ({book.reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'about'
              ? 'border-stone-900 text-stone-900 font-semibold'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Iqtiboslar & Tavsif</span>
        </button>
      </div>

      {/* TAB 1: DISCUSSION THREADS */}
      {activeTab === 'threads' && (
        <div className="space-y-6">
          {/* Header row for threads */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-stone-500 font-sans">
              Ushbu asar yuzasidan ochiq bahslar, savollar va tahliliy fikrlar.
            </p>
            <button
              onClick={() => setShowNewThreadModal(true)}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-900 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-800" />
              <span>Mavzu qo‘shish</span>
            </button>
          </div>

          {/* Threads list */}
          {bookDiscussions.length > 0 ? (
            <div className="space-y-4">
              {bookDiscussions.map((thread) => (
                <motion.article
                  key={thread.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-stone-200/90 rounded-xl p-6 shadow-xs space-y-4"
                >
                  {/* Thread Header: Author & Tag */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium flex items-center justify-center font-mono shrink-0">
                        {thread.authorAvatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-stone-900">
                            {thread.authorName}
                          </span>
                          <span className="text-[11px] text-stone-500">
                            {thread.authorRole}
                          </span>
                          <span aria-hidden="true" className="text-stone-300">
                            ·
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {thread.createdAt}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                          Teg: #{thread.tag}
                        </div>
                      </div>
                    </div>

                    {/* Direct message shortcut to this author */}
                    {thread.authorId !== 'me' && (
                      <button
                        onClick={() =>
                          onStartDirectMessage(
                            thread.authorName,
                            thread.authorRole,
                            `Salom ${thread.authorName}! "${book.title}" kitobidagi "${thread.title}" mavzusidagi fikringiz bo‘yicha yozayotgan edim.`
                          )
                        }
                        title={`${thread.authorName}ga shaxsiy xabar yuborish`}
                        className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-md transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0"
                      >
                        <Send className="w-3 h-3 text-stone-500" />
                        <span>Xabar yozish</span>
                      </button>
                    )}
                  </div>

                  {/* Thread Title & Content */}
                  <div>
                    {thread.isSpoiler && (
                      <div className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded mb-2">
                        <AlertCircle className="w-3 h-3" />
                        <span>Spoiler ogohlantirishi: Asar syujeti keltirilgan</span>
                      </div>
                    )}
                    <h2 className="text-base font-serif font-bold text-stone-900 leading-snug mb-2">
                      {thread.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans whitespace-pre-line">
                      {thread.content}
                    </p>
                  </div>

                  {/* Upvote & Actions */}
                  <div className="flex items-center gap-4 pt-3 border-t border-stone-100 text-xs text-stone-500">
                    <button
                      onClick={() => onUpvoteThread(thread.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-stone-100 transition-colors cursor-pointer font-medium text-stone-700"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-stone-500" />
                      <span>Foydali ({thread.upvotes})</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                      <span>{thread.replies.length} ta javob</span>
                    </span>
                  </div>

                  {/* Nested replies */}
                  {thread.replies.length > 0 && (
                    <div className="pl-4 sm:pl-8 border-l-2 border-stone-100 space-y-3 pt-2">
                      {thread.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="bg-stone-50/70 rounded-lg p-3.5 border border-stone-100 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-stone-900">
                                {reply.authorName}
                              </span>
                              <span className="text-[11px] text-stone-500">
                                {reply.authorRole}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-stone-400">
                              <span>{reply.createdAt}</span>
                              {reply.authorId !== 'me' && (
                                <button
                                  onClick={() =>
                                    onStartDirectMessage(
                                      reply.authorName,
                                      reply.authorRole,
                                      `Salom ${reply.authorName}! "${book.title}" munozarasidagi javobingiz juda qiziqarli bo‘ldi.`
                                    )
                                  }
                                  className="text-stone-500 hover:text-stone-900 cursor-pointer flex items-center gap-1"
                                >
                                  <Send className="w-2.5 h-2.5" />
                                  <span>Xabar</span>
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-stone-700 leading-relaxed font-sans">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add reply input box */}
                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      value={replyTextMap[thread.id] || ''}
                      onChange={(e) =>
                        setReplyTextMap((prev) => ({
                          ...prev,
                          [thread.id]: e.target.value
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleReplySubmit(thread.id);
                      }}
                      placeholder="Ushbu fikrga munosabat bildiring..."
                      className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white text-stone-900"
                    />
                    <button
                      onClick={() => handleReplySubmit(thread.id)}
                      className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Yuborish</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-xl p-12 text-center max-w-md mx-auto space-y-3">
              <MessageSquare className="w-8 h-8 text-stone-400 mx-auto" />
              <h2 className="text-base font-serif font-semibold text-stone-800">
                Hozircha munozaralar yo‘q
              </h2>
              <p className="text-xs text-stone-500">
                Ushbu asar bo‘yicha birinchi bo‘lib munozara oching va o‘z fikrlaringizni boshqa kitobxonlar bilan bo‘lishing.
              </p>
              <button
                onClick={() => setShowNewThreadModal(true)}
                className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                Ilk munozarani boshlash
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-xs text-stone-500 font-sans">
              Kitobxonlarning mustaqil baholari va batafsil taqrizlari.
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-900 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>Taqriz Qoldirish</span>
            </button>
          </div>

          <div className="space-y-4">
            {book.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-stone-200/90 rounded-xl p-6 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-stone-900">
                        {rev.authorName}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {rev.authorRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex text-amber-600">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono">
                        · {rev.date}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      onStartDirectMessage(
                        rev.authorName,
                        rev.authorRole,
                        `Salom ${rev.authorName}! "${book.title}" kitobiga yozgan taqrizingizni o‘qidim va fikringizga qo‘shilaman.`
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3 text-stone-500" />
                    <span>Xabar</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  {rev.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ABOUT & QUOTES */}
      {activeTab === 'about' && (
        <div className="bg-white border border-stone-200/90 rounded-xl p-8 shadow-xs space-y-8">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900 mb-3">
              Asardan Tanlangan Iqtiboslar
            </h2>
            <div className="space-y-4">
              {book.quotes.map((q, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-stone-50 border border-stone-200/70 rounded-xl font-serif text-stone-800 text-sm sm:text-base italic leading-relaxed"
                >
                  {q}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100">
            <h2 className="text-lg font-serif font-bold text-stone-900 mb-2">
              Asar Tuzilishi & Boblar
            </h2>
            <div className="divide-y divide-stone-100">
              {book.chapters.map((ch) => (
                <div
                  key={ch.id}
                  className="py-3 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-stone-800">
                    Bob {ch.chapterNumber}: {ch.title}
                  </span>
                  <span className="text-stone-500 font-mono">
                    ~{ch.estimatedReadTimeMin} min mutolaa
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW THREAD MODAL */}
      <AnimatePresence>
        {showNewThreadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Yangi Munozara Mavzusi Ochish
                </h3>
                <button
                  onClick={() => setShowNewThreadModal(false)}
                  className="text-stone-400 hover:text-stone-600 text-xs"
                >
                  Yopish
                </button>
              </div>

              <form onSubmit={handleCreateThread} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Mavzu sarlavhasi
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Masalan: 2-bobdagi konsensus algoritmlari tahlili"
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Yo‘nalish / Teg
                    </label>
                    <select
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none"
                    >
                      <option value="Theorem & Proof Bahsi">Theorem & Proof Bahsi</option>
                      <option value="Problem Solution (Yechim)">Problem Solution (Yechim)</option>
                      <option value="Algorithm & Code Optimization">Algorithm & Code Optimization</option>
                      <option value="Homework & Exam Prep">Homework & Exam Prep</option>
                      <option value="Olympiad Challenge">Olympiad Challenge</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                      <input
                        type="checkbox"
                        checked={isSpoiler}
                        onChange={(e) => setIsSpoiler(e.target.checked)}
                        className="rounded accent-amber-700"
                      />
                      <span>Spoiler mavjud</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Fikr va dalillar bayoni
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Kitobxonlar bilan qaysi jihatni muhokama qilmoqchisiz? O‘z fikringiz va savollaringizni yozing..."
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewThreadModal(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Mavzuni e’lon qilish
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE REVIEW MODAL */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Kitobga Taqriz Qoldirish
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-stone-400 hover:text-stone-600 text-xs"
                >
                  Yopish
                </button>
              </div>

              <form onSubmit={handleCreateReview} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Bahoingiz (1 dan 5 gacha)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewRating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-mono text-stone-700 ml-2">
                      {reviewRating} yulduz
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Taqriz matni
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Ushbu asar sizda qanday taassurot qoldirdi? Asosiy yutuq va kamchiliklari..."
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                  >
                    Taqrizni saqlash
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
