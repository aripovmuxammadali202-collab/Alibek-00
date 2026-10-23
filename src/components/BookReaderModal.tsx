import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Type,
  Volume2,
  VolumeX,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Settings2,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  BookOpen
} from 'lucide-react';
import { Book, BookChapter, ReaderSettings } from '../types';

interface BookReaderModalProps {
  book: Book | null;
  onClose: () => void;
  onOpenDiscussionWithQuote?: (book: Book, quoteText: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (bookId: string) => void;
}

export const BookReaderModal: React.FC<BookReaderModalProps> = ({
  book,
  onClose,
  onOpenDiscussionWithQuote,
  isBookmarked,
  onToggleBookmark
}) => {
  if (!book) return null;

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [settings, setSettings] = useState<ReaderSettings>({
    theme: 'paper',
    fontSize: 18,
    fontFamily: 'serif',
    lineHeight: 1.8
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const currentChapter = book.chapters[currentChapterIndex] || book.chapters[0];

  // Speech synthesis
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Kechirasiz, brauzeringiz ovozli o'qishni qo'llab-quvvatlamaydi.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentChapter.content);
      
      // English voice for Mathematics & IT reading
      utterance.lang = 'en-US';

      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Text selection listener for quote to discussion
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 10) {
      setSelectedText(selection.toString().trim());
    } else {
      setSelectedText('');
    }
  };

  // Theme styling helpers
  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'white':
        return 'bg-white text-stone-900 border-stone-200';
      case 'midnight':
        return 'bg-[#18181B] text-stone-200 border-stone-800';
      case 'sepia':
        return 'bg-[#F4EEDD] text-[#3D3225] border-[#E3D9C4]';
      case 'paper':
      default:
        return 'bg-[#FAF8F5] text-stone-900 border-stone-200';
    }
  };

  const getFontFamilyClass = () => {
    switch (settings.fontFamily) {
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      case 'serif':
      default:
        return 'font-serif';
    }
  };

  const nextChapter = () => {
    if (currentChapterIndex < book.chapters.length - 1) {
      if (isSpeaking) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentChapterIndex((prev) => prev + 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  const prevChapter = () => {
    if (currentChapterIndex > 0) {
      if (isSpeaking) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentChapterIndex((prev) => prev - 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-stone-950/70 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full h-full md:max-w-4xl md:h-[90vh] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${getThemeClasses()}`}
        >
          {/* Reader Header / Utility Ribbon */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-inherit shrink-0">
            {/* Book Info */}
            <div className="flex items-center gap-3 min-w-0">
              <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
              <div className="truncate">
                <p className="text-xs uppercase tracking-wider text-stone-500 font-sans truncate">
                  {book.author}
                </p>
                <h3 className="text-sm font-serif font-semibold text-stone-900 dark:text-stone-100 truncate">
                  {book.title}
                </h3>
              </div>
            </div>

            {/* Utility Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Text-to-Speech Button */}
              <button
                onClick={toggleSpeech}
                title={isSpeaking ? "Ovozli mutolaani to'xtatish" : "Matnni ovozli tinglash"}
                className={`p-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
                  isSpeaking
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-600 hover:bg-stone-200/50'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">
                  {isSpeaking ? "To'xtatish" : 'Ovozli Mutolaa'}
                </span>
              </button>

              {/* Bookmark Toggle */}
              <button
                onClick={() => onToggleBookmark(book.id)}
                title={isBookmarked ? "Xatcho'pdan chiqarish" : "Xatcho'pga saqlash"}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40'
                    : 'text-stone-600 hover:bg-stone-200/50'
                }`}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              {/* Settings Toggle */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Qiroatxona sozlamalari (shrift, mavzu)"
                className="p-2 rounded-lg text-stone-600 hover:bg-stone-200/50 transition-colors cursor-pointer"
              >
                <Settings2 className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  if (isSpeaking) window.speechSynthesis.cancel();
                  onClose();
                }}
                title="Qiroatxonani yopish"
                className="p-2 rounded-lg text-stone-600 hover:bg-stone-200/50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reader Settings Drawer (if toggled) */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 py-4 border-b border-inherit bg-stone-100/50 dark:bg-stone-900/40 text-xs space-y-4 overflow-hidden shrink-0"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Theme Selector */}
                  <div>
                    <label className="text-stone-500 font-medium block mb-1.5">
                      Qiroat Mavzusi
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSettings((s) => ({ ...s, theme: 'paper' }))}
                        className={`px-2.5 py-1 rounded border text-[11px] cursor-pointer ${
                          settings.theme === 'paper'
                            ? 'border-amber-700 bg-[#FAF8F5] text-stone-900 font-semibold'
                            : 'border-stone-300 bg-[#FAF8F5] text-stone-700'
                        }`}
                      >
                        Qog‘oz (Paper)
                      </button>
                      <button
                        onClick={() => setSettings((s) => ({ ...s, theme: 'white' }))}
                        className={`px-2.5 py-1 rounded border text-[11px] cursor-pointer ${
                          settings.theme === 'white'
                            ? 'border-amber-700 bg-white text-stone-900 font-semibold'
                            : 'border-stone-300 bg-white text-stone-700'
                        }`}
                      >
                        Oq (White)
                      </button>
                      <button
                        onClick={() => setSettings((s) => ({ ...s, theme: 'sepia' }))}
                        className={`px-2.5 py-1 rounded border text-[11px] cursor-pointer ${
                          settings.theme === 'sepia'
                            ? 'border-amber-700 bg-[#F4EEDD] text-[#3D3225] font-semibold'
                            : 'border-stone-300 bg-[#F4EEDD] text-[#3D3225]'
                        }`}
                      >
                        Sepiya
                      </button>
                      <button
                        onClick={() => setSettings((s) => ({ ...s, theme: 'midnight' }))}
                        className={`px-2.5 py-1 rounded border text-[11px] cursor-pointer ${
                          settings.theme === 'midnight'
                            ? 'border-amber-500 bg-[#18181B] text-stone-100 font-semibold'
                            : 'border-stone-700 bg-[#18181B] text-stone-300'
                        }`}
                      >
                        Tungi (Dark)
                      </button>
                    </div>
                  </div>

                  {/* Font Family */}
                  <div>
                    <label className="text-stone-500 font-medium block mb-1.5">
                      Shrift Garniturasi
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSettings((s) => ({ ...s, fontFamily: 'serif' }))}
                        className={`px-3 py-1 rounded font-serif text-sm border cursor-pointer ${
                          settings.fontFamily === 'serif'
                            ? 'border-amber-700 bg-white dark:bg-stone-800 font-semibold'
                            : 'border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        Cormorant Serif
                      </button>
                      <button
                        onClick={() => setSettings((s) => ({ ...s, fontFamily: 'sans' }))}
                        className={`px-3 py-1 rounded font-sans text-xs border cursor-pointer ${
                          settings.fontFamily === 'sans'
                            ? 'border-amber-700 bg-white dark:bg-stone-800 font-semibold'
                            : 'border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        Modern Sans
                      </button>
                      <button
                        onClick={() => setSettings((s) => ({ ...s, fontFamily: 'mono' }))}
                        className={`px-3 py-1 rounded font-mono text-xs border cursor-pointer ${
                          settings.fontFamily === 'mono'
                            ? 'border-amber-700 bg-white dark:bg-stone-800 font-semibold'
                            : 'border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        Code Mono
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-stone-500 font-medium">Shrift O‘lchami</label>
                      <span className="font-mono text-stone-700 dark:text-stone-300 tabular-nums">
                        {settings.fontSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min={14}
                      max={26}
                      step={1}
                      value={settings.fontSize}
                      onChange={(e) =>
                        setSettings((s) => ({ ...s, fontSize: Number(e.target.value) }))
                      }
                      className="w-full accent-amber-700 cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chapter Selector Ribbon */}
          <div className="px-6 py-2 border-b border-inherit flex items-center justify-between text-xs text-stone-500 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-stone-700 dark:text-stone-300">
                Boblar ({book.chapters.length} ta):
              </span>
              <select
                value={currentChapterIndex}
                onChange={(e) => {
                  if (isSpeaking) window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setCurrentChapterIndex(Number(e.target.value));
                }}
                className="bg-transparent text-stone-800 dark:text-stone-200 font-medium focus:outline-none cursor-pointer max-w-[200px] sm:max-w-xs truncate"
              >
                {book.chapters.map((ch, idx) => (
                  <option key={ch.id} value={idx} className="text-stone-900 bg-white">
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 tabular-nums">
              <span>Mutolaa vaqti: ~{currentChapter.estimatedReadTimeMin} daqiqa</span>
            </div>
          </div>

          {/* Reading Canvas (Main scrollable area) */}
          <div
            ref={contentRef}
            onMouseUp={handleMouseUp}
            className="flex-1 overflow-y-auto px-6 py-10 sm:px-12 md:px-16"
          >
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Chapter Header */}
              <div className="border-b border-inherit pb-6">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-sans block mb-2">
                  {book.title} · BOB {currentChapter.chapterNumber}
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight">
                  {currentChapter.title}
                </h1>
              </div>

              {/* Chapter Body Prose */}
              <div
                className={`prose max-w-none ${getFontFamilyClass()} whitespace-pre-line`}
                style={{
                  fontSize: `${settings.fontSize}px`,
                  lineHeight: settings.lineHeight
                }}
              >
                {currentChapter.content}
              </div>

              {/* Selected quote prompt to discussion */}
              <AnimatePresence>
                {selectedText && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-amber-50 dark:bg-stone-800/80 border border-amber-200/80 dark:border-stone-700 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-medium text-amber-900 dark:text-amber-200">
                      <span>Ajratilgan iqtibos:</span>
                      <button
                        onClick={() => setSelectedText('')}
                        className="text-stone-400 hover:text-stone-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs italic font-serif text-stone-700 dark:text-stone-300 line-clamp-2">
                      “{selectedText}”
                    </p>
                    <button
                      onClick={() => {
                        if (onOpenDiscussionWithQuote) {
                          onOpenDiscussionWithQuote(book, selectedText);
                          onClose();
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                      <span>Ushbu iqtibos bilan munozara ochish</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* End of Chapter Note */}
              <div className="pt-8 border-t border-inherit text-center text-xs text-stone-400">
                — {currentChapter.title} yakuni —
              </div>
            </div>
          </div>

          {/* Reader Footer Navigation */}
          <div className="px-6 py-3 border-t border-inherit flex items-center justify-between shrink-0 bg-stone-50/50 dark:bg-stone-900/50">
            <button
              onClick={prevChapter}
              disabled={currentChapterIndex === 0}
              className="px-4 py-2 text-xs font-medium rounded-md border border-inherit transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Oldingi bob</span>
            </button>

            <span className="text-xs text-stone-500 tabular-nums font-mono">
              Bob {currentChapterIndex + 1} / {book.chapters.length}
            </span>

            <button
              onClick={nextChapter}
              disabled={currentChapterIndex === book.chapters.length - 1}
              className="px-4 py-2 text-xs font-medium rounded-md border border-inherit transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <span>Keyingi bob</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
