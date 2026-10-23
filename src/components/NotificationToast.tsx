import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BookOpen, X, ArrowRight } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationToastProps {
  notification: NotificationItem | null;
  onDismiss: () => void;
  onViewBook: (bookId: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onDismiss,
  onViewBook
}) => {
  if (!notification) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-stone-900 text-stone-100 rounded-xl p-4 shadow-2xl border border-stone-800 flex items-start gap-3"
      >
        <div className="p-2 rounded-lg bg-amber-900/40 text-amber-300 shrink-0 mt-0.5 border border-amber-800/40">
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-white truncate">
              {notification.title}
            </h4>
            <button
              onClick={onDismiss}
              className="text-stone-400 hover:text-stone-200 cursor-pointer ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-stone-300 mt-1 leading-relaxed line-clamp-2">
            {notification.message}
          </p>

          {notification.bookId && (
            <button
              onClick={() => {
                onViewBook(notification.bookId!);
                onDismiss();
              }}
              className="mt-2 text-[11px] font-medium text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
            >
              <span>Kitobni ko‘rish</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
