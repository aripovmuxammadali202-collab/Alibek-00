import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  BookOpen,
  CheckCheck,
  Search,
  Share2,
  User,
  MessageSquare
} from 'lucide-react';
import { UserContact, DirectMessage, Book } from '../types';

interface DirectMessagingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: UserContact[];
  activeContactId: string | null;
  onSelectContact: (id: string) => void;
  onSendMessage: (contactId: string, text: string, bookAttachment?: DirectMessage['bookAttachment']) => void;
  books: Book[];
}

export const DirectMessagingDrawer: React.FC<DirectMessagingDrawerProps> = ({
  isOpen,
  onClose,
  contacts,
  activeContactId,
  onSelectContact,
  onSendMessage,
  books
}) => {
  const [inputText, setInputText] = useState('');
  const [searchContact, setSearchContact] = useState('');
  const [showBookPicker, setShowBookPicker] = useState(false);
  const [selectedBookForShare, setSelectedBookForShare] = useState<Book | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, activeContact?.messages.length]);

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !selectedBookForShare) return;
    if (!activeContact) return;

    let attachment: DirectMessage['bookAttachment'] = undefined;
    if (selectedBookForShare) {
      attachment = {
        id: selectedBookForShare.id,
        title: selectedBookForShare.title,
        author: selectedBookForShare.author,
        coverImage: selectedBookForShare.coverImage
      };
    }

    onSendMessage(
      activeContact.id,
      inputText.trim() || `Sizga ushbu asarni tavsiya qilaman: "${selectedBookForShare?.title}"`,
      attachment
    );

    setInputText('');
    setSelectedBookForShare(null);
    setShowBookPicker(false);
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchContact.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
        {/* Backdrop click to close */}
        <div className="flex-1" onClick={onClose} />

        {/* Drawer container */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col md:flex-row border-l border-stone-200"
        >
          {/* LEFT COLUMN: CONTACTS LIST */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col bg-stone-50/60">
            {/* Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-serif font-bold text-stone-900">
                  Shaxsiy Xabarlar
                </h3>
                <p className="text-[11px] text-stone-500">Kitobxonlar bilan muloqot</p>
              </div>
              <button
                onClick={onClose}
                className="md:hidden p-1.5 text-stone-500 hover:text-stone-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search contact */}
            <div className="p-3 border-b border-stone-200">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                  placeholder="Suhbatdoshni qidirish..."
                  className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-stone-200 rounded-md text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
              </div>
            </div>

            {/* Contacts items */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
              {filteredContacts.map((contact) => {
                const isSelected = activeContact?.id === contact.id;
                const lastMsg = contact.messages[contact.messages.length - 1];

                return (
                  <button
                    key={contact.id}
                    onClick={() => onSelectContact(contact.id)}
                    className={`w-full p-3.5 text-left transition-colors cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-white border-l-2 border-stone-900 shadow-xs'
                        : 'hover:bg-stone-100/70'
                    }`}
                  >
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-stone-200 text-stone-800 font-mono text-xs font-semibold flex items-center justify-center shrink-0">
                        {contact.avatar}
                      </div>
                      {contact.status === 'online' && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      )}
                      {contact.status === 'reading' && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-900 truncate">
                          {contact.name}
                        </span>
                        {lastMsg && (
                          <span className="text-[10px] text-stone-400 font-mono">
                            {lastMsg.timestamp}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {lastMsg ? lastMsg.text : contact.role}
                      </p>

                      {contact.currentReading && (
                        <p className="text-[10px] text-amber-800 italic truncate mt-0.5">
                          📖 O‘qimoqda: {contact.currentReading}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIVE CHAT WINDOW */}
          <div className="flex-1 flex flex-col bg-white h-full min-w-0">
            {activeContact ? (
              <>
                {/* Chat Header */}
                <div className="px-6 py-3.5 border-b border-stone-200 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-900 text-white font-mono text-xs font-medium flex items-center justify-center">
                      {activeContact.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-900">
                        {activeContact.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {activeContact.role} ·{' '}
                        {activeContact.status === 'online'
                          ? 'Tarmoqda'
                          : activeContact.status === 'reading'
                          ? 'Mutolaa bilan mashg‘ul'
                          : 'Oxirgi marta yaqinda'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages stream */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF8F5]/50">
                  {activeContact.messages.map((msg) => {
                    const isMe = msg.senderId === 'me';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                            isMe
                              ? 'bg-stone-900 text-white rounded-br-xs'
                              : 'bg-white text-stone-900 border border-stone-200 rounded-bl-xs'
                          }`}
                        >
                          <p>{msg.text}</p>

                          {/* Attached book card */}
                          {msg.bookAttachment && (
                            <div className="mt-2.5 pt-2 border-t border-white/20 dark:border-stone-200 flex items-center gap-3 bg-white/10 dark:bg-stone-50 p-2 rounded-lg">
                              <img
                                src={msg.bookAttachment.coverImage}
                                alt={msg.bookAttachment.title}
                                referrerPolicy="no-referrer"
                                className="w-10 h-14 object-cover rounded shadow-xs"
                              />
                              <div className="min-w-0">
                                <p className="text-[11px] font-semibold truncate text-inherit">
                                  {msg.bookAttachment.title}
                                </p>
                                <p className="text-[10px] opacity-80 truncate text-inherit">
                                  {msg.bookAttachment.author}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 mt-1 text-[10px] text-stone-400 font-mono">
                          <span>{msg.timestamp}</span>
                          {isMe && <CheckCheck className="w-3 h-3 text-stone-500" />}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Selected book preview before sending */}
                {selectedBookForShare && (
                  <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900">
                    <span className="truncate">
                      Kitob tavsiyasi: <strong>{selectedBookForShare.title}</strong>
                    </span>
                    <button
                      onClick={() => setSelectedBookForShare(null)}
                      className="text-stone-500 hover:text-stone-700 ml-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Book picker dropdown */}
                {showBookPicker && (
                  <div className="p-3 border-t border-stone-200 bg-stone-50 max-h-48 overflow-y-auto space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-600 font-semibold mb-1">
                      <span>Qaysi kitobni suhbatdoshga tavsiya qilasiz?</span>
                      <button
                        onClick={() => setShowBookPicker(false)}
                        className="text-stone-400 hover:text-stone-600"
                      >
                        Yopish
                      </button>
                    </div>
                    {books.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          setSelectedBookForShare(b);
                          setShowBookPicker(false);
                        }}
                        className="w-full text-left p-2 rounded-lg bg-white border border-stone-200 hover:border-amber-600 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate font-medium">{b.title}</span>
                        <span className="text-[11px] text-stone-500 shrink-0 ml-2">
                          {b.author}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Message input bar */}
                <form
                  onSubmit={handleSend}
                  className="p-3 sm:p-4 border-t border-stone-200 flex items-center gap-2 bg-white shrink-0"
                >
                  {/* Share book button */}
                  <button
                    type="button"
                    onClick={() => setShowBookPicker(!showBookPicker)}
                    title="Kitob tavsiyasi ulashish"
                    className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <BookOpen className="w-4 h-4 text-amber-800" />
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Fikr yoki xabaringizni yozing..."
                    className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white text-stone-900"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() && !selectedBookForShare}
                    className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <span className="hidden sm:inline">Yuborish</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-500">
                <MessageSquare className="w-10 h-10 text-stone-300 mb-2" />
                <p className="text-sm font-serif font-medium">Muloqotni tanlang</p>
                <p className="text-xs">Chap paneldagi suhbatdoshlardan birini bosing.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
