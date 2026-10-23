import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  ThumbsUp,
  Send,
  BookOpen,
  Filter,
  Plus,
  AlertCircle
} from 'lucide-react';
import { Book, DiscussionThread } from '../types';

interface DiscussionsHubProps {
  discussions: DiscussionThread[];
  books: Book[];
  onSelectBook: (book: Book) => void;
  onUpvoteThread: (threadId: string) => void;
  onStartDirectMessage: (name: string, role: string, defaultText?: string) => void;
  onOpenNewThreadForBook: (book: Book) => void;
}

export const DiscussionsHub: React.FC<DiscussionsHubProps> = ({
  discussions,
  books,
  onSelectBook,
  onUpvoteThread,
  onStartDirectMessage,
  onOpenNewThreadForBook
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('Barchasi');

  const allTags = [
    'Barchasi',
    'Calculus Proofs',
    'Algorithm Complexity',
    'Geometry Proofs',
    'Problem Solution',
    'Olympiad Challenge'
  ];

  const filtered = discussions.filter((d) => {
    if (selectedTag === 'Barchasi') return true;
    return d.tag.toLowerCase().includes(selectedTag.toLowerCase());
  });

  const getBookForThread = (bookId: string) => {
    return books.find((b) => b.id === bookId);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Editorial Header */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-2">
              <span>INTELLEKTUAL MUNOZARA KLUBI</span>
              <span aria-hidden="true">·</span>
              <span>HAMJAMIYAT MUHOKAMALARI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
              Kitoblar bo‘yicha Ilmiy va Adabiy Munozaralar
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans max-w-2xl">
              Har bir asar ortidagi falsafa, taqsimlangan IT arxitekturasi yechimlari, adabiy qahramonlar fe’l-atvori va jamiyat muammolari yuzasidan ochiq bahslar.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => {
                if (books[0]) onOpenNewThreadForBook(books[0]);
              }}
              className="px-5 py-2.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-xs whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Yangi Munozara Boshlash</span>
            </button>
          </div>
        </div>

        {/* Filter tags */}
        <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-medium text-stone-500 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Mavzular:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedTag === tag
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions list */}
      <div className="space-y-4">
        {filtered.map((thread) => {
          const relatedBook = getBookForThread(thread.bookId);

          return (
            <motion.article
              key={thread.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-stone-200/90 rounded-xl p-6 shadow-xs space-y-4"
            >
              {/* Linked Book Reference Bar */}
              {relatedBook && (
                <div
                  onClick={() => onSelectBook(relatedBook)}
                  className="flex items-center justify-between p-2.5 bg-stone-50 hover:bg-amber-50/50 border border-stone-200/70 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={relatedBook.coverImage}
                      alt={relatedBook.title}
                      referrerPolicy="no-referrer"
                      className="w-7 h-10 object-cover rounded shadow-2xs"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                        {relatedBook.title}
                      </p>
                      <p className="text-[10px] text-stone-500 truncate">
                        {relatedBook.author} · {relatedBook.grade}-sinf · {relatedBook.subject}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-stone-600 group-hover:text-amber-800 font-medium shrink-0 flex items-center gap-1">
                    <span>Kitob muhokama sahifasi</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </span>
                </div>
              )}

              {/* Thread Author and Metadata */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-800 font-mono text-xs font-bold flex items-center justify-center border border-stone-200">
                    {thread.authorAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
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
                    <span className="text-[11px] text-stone-500 font-mono">
                      #{thread.tag}
                    </span>
                  </div>
                </div>

                {thread.authorId !== 'me' && (
                  <button
                    onClick={() =>
                      onStartDirectMessage(
                        thread.authorName,
                        thread.authorRole,
                        `Salom ${thread.authorName}! "${thread.title}" munozarasi bo‘yicha yozayotgan edim.`
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Send className="w-3 h-3 text-stone-500" />
                    <span>Xabar</span>
                  </button>
                )}
              </div>

              {/* Thread Content */}
              <div>
                {thread.isSpoiler && (
                  <div className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded mb-2">
                    <AlertCircle className="w-3 h-3" />
                    <span>Spoiler mavjud</span>
                  </div>
                )}
                <h2 className="text-base font-serif font-bold text-stone-900 mb-2">
                  {thread.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  {thread.content}
                </p>
              </div>

              {/* Footer upvote & reply stats */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onUpvoteThread(thread.id)}
                    className="flex items-center gap-1.5 font-medium text-stone-700 hover:text-stone-900 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{thread.upvotes} ta e’tirof</span>
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{thread.replies.length} ta javob</span>
                  </span>
                </div>

                {relatedBook && (
                  <button
                    onClick={() => onSelectBook(relatedBook)}
                    className="text-xs font-medium text-stone-900 hover:text-amber-900 cursor-pointer underline underline-offset-2"
                  >
                    Barcha javoblarni ko‘rish & javob yozish →
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
};
