import React, { useState, useEffect } from 'react';
import {
  INITIAL_BOOKS,
  INITIAL_DISCUSSIONS,
  INITIAL_CONTACTS,
  INITIAL_NOTIFICATIONS,
  PLATFORM_ADMINS
} from './data/mockData';
import {
  Book,
  GradeLevel,
  SubjectType,
  DiscussionThread,
  UserContact,
  NotificationItem,
  DirectMessage,
  UserProfile,
  PlatformAdmin
} from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { BookCatalog } from './components/BookCatalog';
import { BookReaderModal } from './components/BookReaderModal';
import { BookDiscussionView } from './components/BookDiscussionView';
import { DiscussionsHub } from './components/DiscussionsHub';
import { DirectMessagingDrawer } from './components/DirectMessagingDrawer';
import { NotificationModal } from './components/NotificationModal';
import { BookmarksModal } from './components/BookmarksModal';
import { NotificationToast } from './components/NotificationToast';
import { OnboardingModal } from './components/OnboardingModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { BookOpen, ShieldCheck, Crown, Sparkles, Calculator, Code } from 'lucide-react';

export default function App() {
  // User Profile with first-entry check
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('math_it_user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('math_it_user_profile');
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // State with LocalStorage persistence
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('math_it_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [discussions, setDiscussions] = useState<DiscussionThread[]>(() => {
    const saved = localStorage.getItem('math_it_discussions');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [contacts, setContacts] = useState<UserContact[]>(() => {
    const saved = localStorage.getItem('math_it_contacts');
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('math_it_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('math_it_bookmarks');
    return saved ? JSON.parse(saved) : ['math-grade5-foundations', 'math-grade8-euclidean-geometry'];
  });

  // UI Navigation states
  const [activeNavTab, setActiveNavTab] = useState<'catalog' | 'discussions' | 'contacts'>('catalog');
  const [selectedGrade, setSelectedGrade] = useState<'all' | GradeLevel>(() => {
    return userProfile?.grade || 'all';
  });
  const [activeBookForDiscussion, setActiveBookForDiscussion] = useState<Book | null>(null);
  const [activeBookForReader, setActiveBookForReader] = useState<Book | null>(null);
  const [quoteForDiscussion, setQuoteForDiscussion] = useState<string>('');

  // Modals & Drawers
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('math_it_user_profile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('math_it_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('math_it_discussions', JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem('math_it_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('math_it_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('math_it_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Handle first-time onboarding registration completion
  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsOnboardingOpen(false);
    setSelectedGrade(profile.grade);

    // Find the chosen platform admin
    const chosenAdmin =
      PLATFORM_ADMINS.find((a) => a.id === profile.selectedAdminId) || PLATFORM_ADMINS[0];

    // Ensure the chosen admin is in the contacts list with a personalized greeting!
    setContacts((prev) => {
      const existing = prev.find((c) => c.name === chosenAdmin.name);
      if (existing) return prev;

      const adminContact: UserContact = {
        id: `contact-${chosenAdmin.id}`,
        name: chosenAdmin.name,
        avatar: chosenAdmin.avatar,
        role: `${chosenAdmin.title} (Sizning Shaxsiy Ustozingiz)`,
        status: 'online',
        unreadCount: 1,
        messages: [
          {
            id: `msg-admin-welcome-${Date.now()}`,
            senderId: `contact-${chosenAdmin.id}`,
            senderName: chosenAdmin.name,
            text: `Hello ${profile.name}! You are registered in Grade ${profile.grade} (age ${profile.age}). ${chosenAdmin.welcomeMessage}`,
            timestamp: 'Hozirgina',
            isRead: false
          }
        ]
      };
      return [adminContact, ...prev];
    });

    // Send welcome notification
    const welcomeNotif: NotificationItem = {
      id: `notif-welcome-${Date.now()}`,
      type: 'system',
      title: 'Math & IT Academy: Xush kelibsiz!',
      message: `${profile.name} (${profile.age} yosh, ${profile.grade}-sinf). Siz tanlagan shaxsiy mentor: ${chosenAdmin.name}.`,
      timestamp: 'Hozirgina',
      isRead: false
    };

    setNotifications((prev) => [welcomeNotif, ...prev]);
    setActiveToast(welcomeNotif);
  };

  // Read book handler
  const handleReadBook = (book: Book) => {
    setActiveBookForReader(book);
  };

  // Dedicated discussion view handler
  const handleDiscussBook = (book: Book, quote?: string) => {
    setActiveBookForDiscussion(book);
    if (quote) setQuoteForDiscussion(quote);
    setActiveNavTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add new discussion thread
  const handleAddDiscussion = (
    newThreadData: Omit<DiscussionThread, 'id' | 'createdAt' | 'upvotes' | 'replies'>
  ) => {
    const authorName = userProfile?.name || 'Student';
    const authorRole =
      userProfile?.role === 'admin'
        ? 'Admin / Mentor'
        : `Grade ${userProfile?.grade || 8} Student`;
    const authorInitials = authorName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newThread: DiscussionThread = {
      ...newThreadData,
      authorName,
      authorRole,
      authorAvatar: authorInitials,
      id: `thread-${Date.now()}`,
      createdAt: 'Hozirgina',
      upvotes: 1,
      replies: []
    };

    setDiscussions((prev) => [newThread, ...prev]);

    // Update book discussion count
    setBooks((prev) =>
      prev.map((b) =>
        b.id === newThreadData.bookId
          ? { ...b, discussionCount: b.discussionCount + 1 }
          : b
      )
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'discussion',
      title: 'New Math/IT Discussion Created',
      message: `"${newThread.title}" was published in the forum.`,
      timestamp: 'Hozirgina',
      isRead: false,
      bookId: newThreadData.bookId,
      threadId: newThread.id
    };
    setNotifications((prev) => [notif, ...prev]);
    setActiveToast(notif);
  };

  // Add reply to thread
  const handleAddReply = (threadId: string, content: string) => {
    const authorName = userProfile?.name || 'Student';
    const authorRole =
      userProfile?.role === 'admin'
        ? 'Admin / Mentor'
        : `Grade ${userProfile?.grade || 8} Student`;
    const authorInitials = authorName
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newReply = {
      id: `rep-${Date.now()}`,
      threadId,
      authorId: 'me',
      authorName,
      authorAvatar: authorInitials,
      authorRole,
      content,
      createdAt: 'Hozirgina',
      upvotes: 0
    };

    setDiscussions((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, replies: [...t.replies, newReply] } : t
      )
    );
  };

  // Upvote thread
  const handleUpvoteThread = (threadId: string) => {
    setDiscussions((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, upvotes: t.upvotes + 1 } : t
      )
    );
  };

  // Add review to book
  const handleAddReview = (bookId: string, rating: number, content: string) => {
    const authorName = userProfile?.name || 'Student';
    const authorRole = `Grade ${userProfile?.grade || 8} Student`;

    const newReview = {
      id: `rev-${Date.now()}`,
      authorName,
      authorRole,
      gradeLevel: `${userProfile?.grade || 8}-sinf`,
      rating,
      date: new Date().toISOString().split('T')[0],
      content,
      likes: 1
    };

    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== bookId) return b;
        const updatedReviews = [newReview, ...b.reviews];
        const avg =
          updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
          updatedReviews.length;
        return {
          ...b,
          reviews: updatedReviews,
          rating: Number(avg.toFixed(2))
        };
      })
    );

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'system',
      title: 'Review submitted',
      message: `Your rating was counted in the textbook score.`,
      timestamp: 'Hozirgina',
      isRead: false,
      bookId
    };
    setNotifications((prev) => [notif, ...prev]);
    setActiveToast(notif);
  };

  // Direct messaging: start chat with any user
  const handleStartDirectMessage = (
    userName: string,
    userRole: string,
    defaultMessage?: string
  ) => {
    let existingContact = contacts.find((c) => c.name === userName);
    if (!existingContact) {
      const initials = userName
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      existingContact = {
        id: `contact-${Date.now()}`,
        name: userName,
        avatar: initials,
        role: userRole,
        status: 'online',
        unreadCount: 0,
        messages: defaultMessage
          ? [
              {
                id: `msg-${Date.now()}`,
                senderId: 'me',
                senderName: userProfile?.name || 'Siz',
                text: defaultMessage,
                timestamp: 'Hozirgina',
                isRead: true
              }
            ]
          : []
      };
      setContacts((prev) => [existingContact!, ...prev]);
    } else if (defaultMessage) {
      existingContact.messages.push({
        id: `msg-${Date.now()}`,
        senderId: 'me',
        senderName: userProfile?.name || 'Siz',
        text: defaultMessage,
        timestamp: 'Hozirgina',
        isRead: true
      });
      setContacts([...contacts]);
    }

    setActiveContactId(existingContact.id);
    setIsMessagingOpen(true);
  };

  // Send message in Direct Messaging
  const handleSendMessage = (
    contactId: string,
    text: string,
    bookAttachment?: DirectMessage['bookAttachment']
  ) => {
    const newMessage: DirectMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      senderName: userProfile?.name || 'Siz',
      text,
      timestamp: 'Hozirgina',
      isRead: true,
      bookAttachment
    };

    setContacts((prev) =>
      prev.map((c) => {
        if (c.id === contactId) {
          return {
            ...c,
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );

    // Companion reply simulation
    setTimeout(() => {
      const companionResponses = [
        'Great question! Reviewing the theorem proof in Chapter 1 will give you the step-by-step intuition.',
        'Excellent algorithmic problem solving! You can test this logic in Python directly.',
        'I have analyzed this problem set before — check the coordinate geometry equations on page 42!'
      ];
      const randomResponse =
        companionResponses[Math.floor(Math.random() * companionResponses.length)];

      setContacts((prev) =>
        prev.map((c) => {
          if (c.id === contactId) {
            return {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: `reply-${Date.now()}`,
                  senderId: c.id,
                  senderName: c.name,
                  text: randomResponse,
                  timestamp: 'Hozirgina',
                  isRead: false
                }
              ]
            };
          }
          return c;
        })
      );

      const dmNotif: NotificationItem = {
        id: `notif-dm-${Date.now()}`,
        type: 'direct_message',
        title: 'New message received',
        message: `${contacts.find((c) => c.id === contactId)?.name}: "${randomResponse.slice(0, 45)}..."`,
        timestamp: 'Hozirgina',
        isRead: false
      };
      setNotifications((prev) => [dmNotif, ...prev]);
      setActiveToast(dmNotif);
    }, 1800);
  };

  // Admin: Add New Book handler
  const handleAdminAddNewBook = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);

    const notif: NotificationItem = {
      id: `notif-broadcast-${Date.now()}`,
      type: 'new_book',
      title: `New Grade ${newBook.grade} Textbook Published!`,
      message: `"${newBook.title}" (${newBook.subject}) was added to the curriculum. Start reading now!`,
      timestamp: 'Hozirgina',
      isRead: false,
      bookId: newBook.id
    };

    setNotifications((prev) => [notif, ...prev]);
    setActiveToast(notif);
  };

  // Admin: Broadcast custom notification
  const handleAdminBroadcast = (
    title: string,
    message: string,
    type: NotificationItem['type']
  ) => {
    const notif: NotificationItem = {
      id: `notif-broadcast-${Date.now()}`,
      type,
      title: `[Admin Alert] ${title}`,
      message,
      timestamp: 'Hozirgina',
      isRead: false
    };

    setNotifications((prev) => [notif, ...prev]);
    setActiveToast(notif);
  };

  // Admin: Delete/Moderate discussion
  const handleAdminDeleteDiscussion = (threadId: string) => {
    setDiscussions((prev) => prev.filter((d) => d.id !== threadId));
  };

  // Quick simulate book release
  const handleSimulateNewBookRelease = (subjectType: string) => {
    const isMath = subjectType.includes('Math');
    const newBookId = `book-new-${Date.now()}`;
    const newBookTitle = isMath
      ? 'Olympiad Number Theory & Modular Arithmetic (Grade 10)'
      : 'Competitive Programming in Python & C++ (Grade 9)';

    const newBook: Book = {
      id: newBookId,
      title: newBookTitle,
      author: 'Cambridge International & IMO Committee',
      subject: isMath ? 'Mathematics' : 'Computer Science & IT',
      grade: isMath ? 10 : 9,
      difficulty: 'Olympiad',
      curriculum: 'Cambridge & IMO Olympiad',
      pages: 340,
      year: 2026,
      rating: 5.0,
      coverImage: isMath
        ? '/src/assets/images/book_english_math_1792685051986.jpg'
        : '/src/assets/images/book_clean_architecture_1792657116388.jpg',
      description: isMath
        ? 'Deep study into Fermat’s Little Theorem, Euler’s Totient Function, and Diophantine equations for secondary math Olympiads.'
        : 'Graph theory algorithms, dynamic programming, and binary lifting techniques for secondary school informatics competitions.',
      keyTheoremsAndConcepts: isMath
        ? ['Modular Arithmetic', 'Fermat’s Little Theorem', 'Diophantine Equations']
        : ['Dynamic Programming', 'Segment Trees', 'Dijkstra Shortest Path'],
      quotes: ['“In mathematics, rigor is not a constraint; it is the wings of thought.”'],
      discussionCount: 0,
      isNewRelease: true,
      chapters: [
        {
          id: `ch-new-1`,
          chapterNumber: 1,
          title: 'Chapter 1: The Beauty of Modular Inverses',
          estimatedReadTimeMin: 15,
          content: `Modular arithmetic is arithmetic for integers where numbers "wrap around" after reaching a fixed value — the modulus n.

Two integers a and b are congruent modulo n:
a ≡ b (mod n)
if their difference (a - b) is an integer multiple of n.

Theorem (Fermat's Little Theorem):
If p is a prime number and a is an integer not divisible by p:
a^(p - 1) ≡ 1 (mod p).

This simple yet profound theorem is the foundational backbone of modern public-key cryptography (RSA)!`
        }
      ],
      reviews: []
    };

    setBooks((prev) => [newBook, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'new_book',
      title: `New English ${newBook.subject} Book Added!`,
      message: `"${newBook.title}" (Grade ${newBook.grade}) is now live in the library.`,
      timestamp: 'Hozirgina',
      isRead: false,
      bookId: newBook.id
    };

    setNotifications((prev) => [notif, ...prev]);
    setActiveToast(notif);
  };

  // Bookmark toggle
  const handleToggleBookmark = (bookId: string) => {
    setBookmarks((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;
  const unreadMessagesCount = contacts.reduce(
    (acc, c) => acc + (c.messages.filter((m) => !m.isRead && m.senderId !== 'me').length),
    0
  );

  const selectedAdmin =
    PLATFORM_ADMINS.find((a) => a.id === userProfile?.selectedAdminId) || PLATFORM_ADMINS[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeNavTab}
        setActiveTab={(tab) => {
          setActiveNavTab(tab);
          setActiveBookForDiscussion(null);
        }}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenMessages={(contactId) => {
          if (contactId) setActiveContactId(contactId);
          setIsMessagingOpen(true);
        }}
        unreadNotificationsCount={unreadNotificationsCount}
        unreadMessagesCount={unreadMessagesCount}
        onQuickSimulateNewBook={() => handleSimulateNewBookRelease('Mathematics')}
        savedBookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        userProfile={userProfile}
        selectedAdmin={selectedAdmin}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        onOpenProfileSettings={() => setIsOnboardingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* If viewing a dedicated book discussion */}
        {activeBookForDiscussion ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <BookDiscussionView
              book={activeBookForDiscussion}
              onBack={() => setActiveBookForDiscussion(null)}
              onReadBook={handleReadBook}
              discussions={discussions}
              onAddDiscussion={handleAddDiscussion}
              onAddReply={handleAddReply}
              onUpvoteThread={handleUpvoteThread}
              onAddReview={handleAddReview}
              onStartDirectMessage={handleStartDirectMessage}
              initialQuote={quoteForDiscussion}
            />
          </div>
        ) : activeNavTab === 'discussions' ? (
          /* Global Discussions Hub */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <DiscussionsHub
              discussions={discussions}
              books={books}
              onSelectBook={handleDiscussBook}
              onUpvoteThread={handleUpvoteThread}
              onStartDirectMessage={handleStartDirectMessage}
              onOpenNewThreadForBook={(b) => handleDiscussBook(b)}
            />
          </div>
        ) : (
          /* Catalog & Hero View */
          <div>
            <HeroBanner
              onExploreClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onDiscussionsClick={() => setActiveNavTab('discussions')}
              totalBooks={books.length}
              totalDiscussions={discussions.length}
              userGrade={userProfile?.grade}
              userName={userProfile?.name}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
              <BookCatalog
                books={books}
                onReadBook={handleReadBook}
                onDiscussBook={handleDiscussBook}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                selectedGrade={selectedGrade}
                setSelectedGrade={setSelectedGrade}
                userGrade={userProfile?.grade}
              />
            </div>
          </div>
        )}
      </main>

      {/* FIRST-TIME REGISTRATION & AGE / ADMIN SELECTION MODAL */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleOnboardingComplete}
        initialProfile={userProfile}
        canClose={Boolean(userProfile)}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* ADMIN MANAGEMENT PANEL MODAL */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        books={books}
        discussions={discussions}
        onAddNewBook={handleAdminAddNewBook}
        onBroadcastNotification={handleAdminBroadcast}
        onDeleteDiscussion={handleAdminDeleteDiscussion}
        currentAdminName={userProfile?.name || 'Administrator'}
      />

      {/* Reader Modal */}
      <BookReaderModal
        book={activeBookForReader}
        onClose={() => setActiveBookForReader(null)}
        onOpenDiscussionWithQuote={(book, quote) => handleDiscussBook(book, quote)}
        isBookmarked={
          activeBookForReader ? bookmarks.includes(activeBookForReader.id) : false
        }
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Direct Messaging Drawer */}
      <DirectMessagingDrawer
        isOpen={isMessagingOpen}
        onClose={() => setIsMessagingOpen(false)}
        contacts={contacts}
        activeContactId={activeContactId}
        onSelectContact={(id) => setActiveContactId(id)}
        onSendMessage={handleSendMessage}
        books={books}
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) =>
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
          )
        }
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
        }
        onSelectBook={(bookId) => {
          const found = books.find((b) => b.id === bookId);
          if (found) handleDiscussBook(found);
        }}
        onSimulateNewBookRelease={handleSimulateNewBookRelease}
      />

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        books={books}
        onReadBook={handleReadBook}
        onRemoveBookmark={handleToggleBookmark}
      />

      {/* Real-time Notification Toast Alert */}
      <NotificationToast
        notification={activeToast}
        onDismiss={() => setActiveToast(null)}
        onViewBook={(bookId) => {
          const found = books.find((b) => b.id === bookId);
          if (found) handleDiscussBook(found);
        }}
      />

      {/* Editorial Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-12 text-xs text-stone-500 font-sans mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-800" />
            <span className="font-serif font-bold text-stone-900 tracking-tight text-sm">
              MATH & IT NEXUS
            </span>
            <span className="text-stone-400">·</span>
            <span>English Mathematics & Computer Science Academy (Grades 5–11)</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-blue-900 font-medium">
              <Calculator className="w-3.5 h-3.5" />
              Mathematics (English)
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-emerald-900 font-medium">
              <Code className="w-3.5 h-3.5" />
              Computer Science & IT
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-stone-600">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              Grades 5 – 11
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
