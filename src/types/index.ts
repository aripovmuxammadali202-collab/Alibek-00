export type GradeLevel = 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type SubjectType = 'All' | 'Mathematics' | 'Computer Science & IT';

export interface BookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  estimatedReadTimeMin: number;
  content: string;
  practiceProblem?: {
    question: string;
    hint: string;
    solution: string;
  };
}

export interface BookReview {
  id: string;
  authorName: string;
  authorRole: string;
  gradeLevel?: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
}

export interface Book {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  authorBio?: string;
  subject: 'Mathematics' | 'Computer Science & IT';
  grade: GradeLevel;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Olympiad';
  curriculum: string; // e.g. "Cambridge IGCSE", "Art of Problem Solving", "AP Calculus / MIT"
  pages: number;
  year: number;
  rating: number;
  coverImage: string;
  description: string;
  keyTheoremsAndConcepts: string[];
  quotes: string[];
  chapters: BookChapter[];
  reviews: BookReview[];
  discussionCount: number;
  isNewRelease?: boolean;
}

export interface DiscussionReply {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  createdAt: string;
  upvotes: number;
}

export interface DiscussionThread {
  id: string;
  bookId: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  createdAt: string;
  upvotes: number;
  isSpoiler: boolean;
  tag: string; // e.g., 'Theorem Proof', 'Algorithm Debugging', 'Homework Solution', 'Olympiad Challenge'
  replies: DiscussionReply[];
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  bookAttachment?: {
    id: string;
    title: string;
    author: string;
    coverImage: string;
  };
}

export interface UserContact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'offline' | 'reading';
  currentReading?: string;
  unreadCount: number;
  messages: DirectMessage[];
}

export interface NotificationItem {
  id: string;
  type: 'new_book' | 'discussion' | 'direct_message' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  bookId?: string;
  threadId?: string;
}

export interface ReaderSettings {
  theme: 'paper' | 'white' | 'midnight' | 'sepia';
  fontSize: number; // 14 to 24
  fontFamily: 'serif' | 'sans' | 'mono';
  lineHeight: number; // 1.6 to 2.2
}

export interface PlatformAdmin {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;
  bio: string;
  badge: string;
  welcomeMessage: string;
}

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  grade: GradeLevel;
  role: 'reader' | 'admin';
  selectedAdminId: string;
  interests: string[];
  registeredAt: string;
}
