import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  User,
  Mail,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Crown,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { PlatformAdmin, UserProfile, GradeLevel } from '../types';
import { PLATFORM_ADMINS } from '../data/mockData';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
  canClose?: boolean;
  onClose?: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  initialProfile,
  canClose = false,
  onClose
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [email, setEmail] = useState(initialProfile?.email || 'aripovmuxammadali202@gmail.com');
  const [age, setAge] = useState<number>(initialProfile?.age || 14);
  const [grade, setGrade] = useState<GradeLevel>(initialProfile?.grade || 8);
  const [role, setRole] = useState<'reader' | 'admin'>(initialProfile?.role || 'admin');
  const [selectedAdminId, setSelectedAdminId] = useState<string>(
    initialProfile?.selectedAdminId || PLATFORM_ADMINS[0].id
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialProfile?.interests || ['Mathematics', 'Computer Science & IT']
  );
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Sync grade recommendation based on age
  const handleAgeChange = (newAge: number) => {
    setAge(newAge);
    if (newAge <= 11) setGrade(5);
    else if (newAge === 12) setGrade(6);
    else if (newAge === 13) setGrade(7);
    else if (newAge === 14) setGrade(8);
    else if (newAge === 15) setGrade(9);
    else if (newAge === 16) setGrade(10);
    else setGrade(11);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Iltimos, ismingizni kiriting.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Iltimos, haqiqiy elektron pochta manzilini kiriting.');
      return;
    }
    if (!age || age < 8 || age > 99) {
      setErrorMessage('Iltimos, haqiqiy yoshingizni kiriting (10 - 18 yosh).');
      return;
    }

    const profile: UserProfile = {
      name: name.trim(),
      email: email.trim(),
      age: Number(age),
      grade: Number(grade) as GradeLevel,
      role,
      selectedAdminId,
      interests: selectedInterests,
      registeredAt: initialProfile?.registeredAt || new Date().toISOString()
    };

    onComplete(profile);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white border border-stone-200/90 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Marquee */}
          <div className="relative bg-stone-900 text-stone-100 p-6 sm:p-8 overflow-hidden">
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <BookOpen className="w-60 h-60 text-amber-200" />
            </div>

            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ENGLISH MATHEMATICS & IT ACADEMY (GRADES 5-11)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Xush kelibsiz! Profilingizni sozlang
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-xl">
                5-sinfdan 11-sinfgacha bo‘lgan ingliz tilidagi matematika va kompyuter fanlari (IT) kutubxonasiga kirish uchun ma’lumotlaringizni to‘ldiring va o‘zingizga 1 ta shaxsiy admin-ustoz tanlang.
              </p>
            </div>

            {canClose && onClose && (
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-stone-400 hover:text-white text-xs font-medium cursor-pointer"
              >
                Yopish ✕
              </button>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {errorMessage && (
              <div className="p-3 text-xs text-red-800 bg-red-50 border border-red-200 rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* Inputs: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5 font-sans">
                  Ismingiz va Familiyangiz *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Masalan: Muhammadali Aripov"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5 font-sans">
                  Elektron Pochta (Email) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="example@mail.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Crucial requirement: Age (Yoshingiz) and Grade level (5-11 sinf) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-amber-950 font-sans flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-800" />
                    <span>Yoshingiz (Yosh) *</span>
                  </label>
                  <span className="text-xs font-bold text-amber-900 tabular-nums">
                    {age} yosh
                  </span>
                </div>
                <input
                  type="number"
                  min={9}
                  max={25}
                  required
                  value={age}
                  onChange={(e) => handleAgeChange(Number(e.target.value))}
                  placeholder="Yoshingizni kiriting"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-amber-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <p className="text-[10px] text-amber-800/80 mt-1">
                  Yoshingizga qarab mos sinf kitoblari tavsiya etiladi
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-950 mb-1.5 font-sans flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-800" />
                  <span>Sinf Darajasi (Grade 5 - 11) *</span>
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-amber-300 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
                >
                  <option value={5}>5-sinf (Grade 5) · Fractions & Logic</option>
                  <option value={6}>6-sinf (Grade 6) · Pre-Algebra & Python Basics</option>
                  <option value={7}>7-sinf (Grade 7) · Linear Equations & Web CS</option>
                  <option value={8}>8-sinf (Grade 8) · Euclidean Geometry & Data Structures</option>
                  <option value={9}>9-sinf (Grade 9) · Quadratics & Graph Algorithms</option>
                  <option value={10}>10-sinf (Grade 10) · Trigonometry & Databases</option>
                  <option value={11}>11-sinf (Grade 11) · AP Calculus & Machine Learning</option>
                </select>
                <p className="text-[10px] text-amber-800/80 mt-1">
                  Tanlangan sinf kitoblari asosiy sahifada birinchi ko‘rinadi
                </p>
              </div>
            </div>

            {/* Crucial requirement: Select 1 Personal Admin */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 font-sans">
                  O‘zingizga 1 ta Shaxsiy Admin / Mentor Tanlang *
                </label>
                <span className="text-[11px] text-amber-800 font-medium">
                  (Shaxsiy xabarlarda doimiy maslahatchi)
                </span>
              </div>

              <div className="space-y-2.5">
                {PLATFORM_ADMINS.map((admin) => {
                  const isSelected = selectedAdminId === admin.id;

                  return (
                    <div
                      key={admin.id}
                      onClick={() => setSelectedAdminId(admin.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-amber-800 bg-amber-50/70 shadow-xs ring-1 ring-amber-700/50'
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-200 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-amber-800/30">
                        {admin.avatar}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-stone-900 truncate">
                            {admin.name}
                          </h4>
                          <span className="text-[10px] font-mono font-medium text-stone-500">
                            {admin.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-900 font-medium">
                          {admin.title}
                        </p>
                        <p className="text-[10px] text-stone-500 font-mono">
                          {admin.specialty}
                        </p>
                        <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                          {admin.bio}
                        </p>
                      </div>

                      <div className="shrink-0 pt-1">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                            isSelected
                              ? 'border-amber-800 bg-amber-800 text-white'
                              : 'border-stone-300'
                          }`}
                        >
                          {isSelected && '✓'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Platform Role Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2 font-sans">
                Platformadagi Maqomingiz
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    role === 'admin'
                      ? 'border-amber-700 bg-amber-50/50 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold text-stone-900">
                      Boshqaruvchi / Admin
                    </span>
                    {role === 'admin' && (
                      <span className="ml-auto w-4 h-4 rounded-full bg-amber-700 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug">
                    Yangi matematika va IT kitoblari qo‘shish, umumiy xabarnomalar yuborish.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('reader')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    role === 'reader'
                      ? 'border-stone-900 bg-stone-50 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-stone-700" />
                    <span className="text-xs font-bold text-stone-900">
                      O‘quvchi / Talaba
                    </span>
                    {role === 'reader' && (
                      <span className="ml-auto w-4 h-4 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug">
                    5-11 sinf matematika va IT kitoblarini o‘qish va masalalar tahlilida qatnashish.
                  </p>
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-sans">
                {grade}-sinf darsliklariga moslashtiriladi
              </span>
              <button
                type="submit"
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <span>Akademiyaga Kirish & Mutolaani Boshlash</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
