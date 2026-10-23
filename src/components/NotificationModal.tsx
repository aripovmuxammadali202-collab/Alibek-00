import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Bell,
  Sparkles,
  BookOpen,
  MessageSquare,
  Send,
  Check,
  CheckCheck,
  Sliders,
  Settings
} from 'lucide-react';
import { NotificationItem, Book } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onSelectBook: (bookId: string) => void;
  onSimulateNewBookRelease: (genre: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onSelectBook,
  onSimulateNewBookRelease
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'new_book' | 'discussion' | 'direct_message'>('all');
  const [showSubscriptionSettings, setShowSubscriptionSettings] = useState(false);

  // Subscription preferences state
  const [subscriptions, setSubscriptions] = useState({
    itBooks: true,
    uzbekClassics: true,
    russianLiterature: true,
    englishBestsellers: true,
    discussionReplies: true,
    directMessages: true
  });

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getIconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'new_book':
        return <BookOpen className="w-4 h-4 text-amber-700" />;
      case 'discussion':
        return <MessageSquare className="w-4 h-4 text-stone-700" />;
      case 'direct_message':
        return <Send className="w-4 h-4 text-stone-800" />;
      default:
        return <Bell className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white border border-stone-200 rounded-2xl max-w-xl w-full shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-stone-100 text-stone-900">
                <Bell className="w-4 h-4 text-amber-800" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-stone-900">
                  Bildirishnomalar Markazi
                </h3>
                <p className="text-[11px] text-stone-500 font-sans">
                  Yangi kitoblar nashrlari, javoblar va xabarlar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSubscriptionSettings(!showSubscriptionSettings)}
                title="Xabarnoma sozlamalari"
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  showSubscriptionSettings ? 'bg-stone-200 text-stone-900' : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Simulation Ribbon (for testing instant book release notifications) */}
          <div className="px-5 py-3 bg-amber-50/70 border-b border-amber-200/80 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Yangi kitob xabarini test qilish:</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onSimulateNewBookRelease('Mathematics')}
                className="px-2.5 py-1 text-[11px] font-medium bg-white text-stone-800 hover:bg-amber-100/60 border border-amber-300 rounded-md transition-colors cursor-pointer shadow-2xs"
              >
                + Yangi Math Darsligi
              </button>
              <button
                onClick={() => onSimulateNewBookRelease('Computer Science & IT')}
                className="px-2.5 py-1 text-[11px] font-medium bg-white text-stone-800 hover:bg-amber-100/60 border border-amber-300 rounded-md transition-colors cursor-pointer shadow-2xs"
              >
                + Yangi IT Darsligi
              </button>
            </div>
          </div>

          {/* Subscription Settings Panel (Collapsible) */}
          <AnimatePresence>
            {showSubscriptionSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-5 py-4 bg-stone-50 border-b border-stone-200 text-xs space-y-3 overflow-hidden"
              >
                <div className="font-semibold text-stone-900">
                  Qaysi yo‘nalishlar bo‘yicha bildirishnoma olmoqchisiz?
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subscriptions.itBooks}
                      onChange={(e) =>
                        setSubscriptions((s) => ({ ...s, itBooks: e.target.checked }))
                      }
                      className="rounded accent-amber-700"
                    />
                    <span>Yangi Matematika darsliklari (5-11 sinf)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subscriptions.uzbekClassics}
                      onChange={(e) =>
                        setSubscriptions((s) => ({ ...s, uzbekClassics: e.target.checked }))
                      }
                      className="rounded accent-amber-700"
                    />
                    <span>Yangi IT & Dasturlash kitoblari</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subscriptions.russianLiterature}
                      onChange={(e) =>
                        setSubscriptions((s) => ({ ...s, russianLiterature: e.target.checked }))
                      }
                      className="rounded accent-amber-700"
                    />
                    <span>Olimpiada masalalari tahlili</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subscriptions.discussionReplies}
                      onChange={(e) =>
                        setSubscriptions((s) => ({ ...s, discussionReplies: e.target.checked }))
                      }
                      className="rounded accent-amber-700"
                    />
                    <span>Masalalar yechimidagi javoblar</span>
                  </label>
                </div>
                <p className="text-[10px] text-stone-500 italic">
                  * Yangi darslik chiqqanda darhol sahifada vizual xabarnoma va tovush signali beriladi.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Bar & Mark All */}
          <div className="px-5 py-2.5 border-b border-stone-100 flex items-center justify-between text-xs bg-stone-50/50">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:bg-stone-200/50'
                }`}
              >
                Barchasi ({notifications.length})
              </button>
              <button
                onClick={() => setActiveFilter('new_book')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  activeFilter === 'new_book'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:bg-stone-200/50'
                }`}
              >
                Yangi Kitoblar
              </button>
              <button
                onClick={() => setActiveFilter('discussion')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  activeFilter === 'discussion'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:bg-stone-200/50'
                }`}
              >
                Munozaralar
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-[11px] font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Barchasini o‘qilgan deb belgilash</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 p-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onMarkAsRead(item.id);
                    if (item.bookId) {
                      onSelectBook(item.bookId);
                      onClose();
                    }
                  }}
                  className={`p-3.5 rounded-xl transition-all cursor-pointer flex items-start gap-3 ${
                    !item.isRead
                      ? 'bg-amber-50/40 hover:bg-amber-50/70 border border-amber-200/60'
                      : 'hover:bg-stone-50 border border-transparent'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-stone-100 text-stone-800 shrink-0 mt-0.5">
                    {getIconForType(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4
                        className={`text-xs font-semibold truncate ${
                          !item.isRead ? 'text-stone-950' : 'text-stone-700'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-stone-400 font-mono shrink-0 ml-2">
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-2">
                      {item.message}
                    </p>

                    {item.bookId && (
                      <span className="inline-block mt-1.5 text-[10px] font-medium text-amber-900 underline underline-offset-2">
                        Kitob sahifasini ochish →
                      </span>
                    )}
                  </div>

                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-stone-500 space-y-2">
                <Bell className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-xs">Ushbu toifada xabarnomalar mavjud emas</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
            <span>Jami: {notifications.length} ta xabarnoma</span>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-md font-medium cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
