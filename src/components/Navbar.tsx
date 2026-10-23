import React from 'react';
import {
  BookOpen,
  MessageSquare,
  Bell,
  Send,
  Sparkles,
  BookMarked,
  ShieldCheck,
  Crown,
  UserCheck
} from 'lucide-react';
import { NotificationItem, UserContact, UserProfile, PlatformAdmin } from '../types';

interface NavbarProps {
  activeTab: 'catalog' | 'discussions' | 'contacts';
  setActiveTab: (tab: 'catalog' | 'discussions' | 'contacts') => void;
  onOpenNotifications: () => void;
  onOpenMessages: (contactId?: string) => void;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  onQuickSimulateNewBook: () => void;
  savedBookmarksCount: number;
  onOpenBookmarks: () => void;
  userProfile: UserProfile | null;
  selectedAdmin: PlatformAdmin | null;
  onOpenAdminPanel: () => void;
  onOpenProfileSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenNotifications,
  onOpenMessages,
  unreadNotificationsCount,
  unreadMessagesCount,
  onQuickSimulateNewBook,
  savedBookmarksCount,
  onOpenBookmarks,
  userProfile,
  selectedAdmin,
  onOpenAdminPanel,
  onOpenProfileSettings
}) => {
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Single text element in editorial serif) */}
        <button
          onClick={() => setActiveTab('catalog')}
          className="text-2xl font-serif font-bold tracking-tight text-stone-900 hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 cursor-pointer text-left"
        >
          <BookOpen className="w-5 h-5 text-amber-800" strokeWidth={1.8} />
          <span>MUTOLAA</span>
        </button>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 cursor-pointer ${
              activeTab === 'catalog'
                ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-amber-800 decoration-2'
                : ''
            }`}
          >
            Kutubxona
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 cursor-pointer ${
              activeTab === 'discussions'
                ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-amber-800 decoration-2'
                : ''
            }`}
          >
            Muhokamalar
          </button>
          <button
            onClick={() => onOpenMessages()}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 cursor-pointer flex items-center gap-1.5"
          >
            <span>Shaxsiy Xabarlar</span>
            {unreadMessagesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
            )}
          </button>
          <button
            onClick={onOpenBookmarks}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-stone-900 cursor-pointer flex items-center gap-1.5"
          >
            <BookMarked className="w-4 h-4 text-stone-500" />
            <span>Xatcho‘plar ({savedBookmarksCount})</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Utility Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Admin Panel Button (if Admin) */}
          {isAdmin && (
            <button
              onClick={onOpenAdminPanel}
              title="Admin boshqaruv paneli: Yangi kitob qo‘shish va xabarnomalar tarqatish"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200/90 border border-amber-300 rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
            >
              <Crown className="w-3.5 h-3.5 text-amber-800" />
              <span>Admin Paneli</span>
            </button>
          )}

          {/* Quick simulate new book trigger */}
          <button
            onClick={onQuickSimulateNewBook}
            title="Yangi kitob chiqarilishi xabarnomasini test qilish"
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer border border-stone-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Yangi Kitob Xabari</span>
          </button>

          {/* Direct Messages Icon Button */}
          <button
            onClick={() => onOpenMessages()}
            aria-label="Shaxsiy xabarlar"
            className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <Send className="w-4.5 h-4.5" strokeWidth={1.8} />
            {unreadMessagesCount > 0 && (
              <span className="absolute top-1 right-1 px-1.5 py-0.2 text-[10px] font-mono font-bold bg-amber-700 text-white rounded-full leading-tight">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* Notifications Bell Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Bildirishnomalar"
            className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5" strokeWidth={1.8} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 px-1.5 py-0.2 text-[10px] font-mono font-bold bg-amber-700 text-white rounded-full leading-tight">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User profile avatar indicator & Admin badge */}
          <button
            onClick={onOpenProfileSettings}
            title="Profil ma’lumotlarini ko‘rish va sozlash"
            className="flex items-center gap-2 pl-2 border-l border-stone-200 hover:opacity-85 transition-opacity cursor-pointer text-left"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-stone-100 text-xs font-medium flex items-center justify-center font-mono">
                {getInitials(userProfile?.name)}
              </div>
              {isAdmin && (
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold ring-1 ring-white">
                  ★
                </span>
              )}
            </div>

            <div className="hidden sm:block text-left leading-tight max-w-[120px]">
              <p className="text-xs font-medium text-stone-900 truncate">
                {userProfile?.name || 'Foydalanuvchi'}
              </p>
              <p className="text-[10px] text-stone-500 truncate">
                {isAdmin ? 'Platforma Admini' : 'Kitobxon'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
