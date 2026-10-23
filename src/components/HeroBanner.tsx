import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, MessageSquare, Compass, ShieldCheck, GraduationCap, Calculator, Code } from 'lucide-react';
import { GradeLevel } from '../types';

interface HeroBannerProps {
  onExploreClick: () => void;
  onDiscussionsClick: () => void;
  totalBooks: number;
  totalDiscussions: number;
  userGrade?: GradeLevel;
  userName?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onDiscussionsClick,
  totalBooks,
  totalDiscussions,
  userGrade,
  userName
}) => {
  return (
    <section className="relative pt-6 pb-12 border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split grid for editorial prominence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Curatorial Headline & Intent */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between py-2"
          >
            <div>
              {/* Quiet unboxed metadata kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 mb-3 tracking-wide">
                <span>CAMBRIDGE & MIT CURRICULUM</span>
                <span aria-hidden="true">·</span>
                <span>GRADES 5 – 11</span>
                <span aria-hidden="true">·</span>
                <span>MATHEMATICS & COMPUTER SCIENCE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-stone-900 leading-[1.12] mb-6 text-balance">
                English Mathematics & Computer Science Academy
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-sans max-w-2xl mb-8">
                Faqat 5-sinfdan 11-sinfgacha bo‘lgan ingliz tilidagi matematika (Pre-Algebra, Geometry, Calculus) va axborot texnologiyalari (Python, Algoritmlar, Tizimlar). Har bir teorema va masala uchun alohida ilmiy munozara xonalari, interaktiv qiroatxona hamda shaxsiy admin-ustozlar ko‘magi.
              </p>

              {userGrade && (
                <div className="inline-flex items-center gap-2 p-2.5 px-4 bg-amber-100/70 border border-amber-300 rounded-xl text-xs text-amber-950 font-medium mb-6">
                  <GraduationCap className="w-4 h-4 text-amber-800" />
                  <span>
                    Salom, <strong>{userName || 'O‘quvchi'}</strong>! Sizning yoshingiz bo‘yicha <strong>{userGrade}-sinf</strong> darsliklari saralandi.
                  </span>
                </div>
              )}
            </div>

            {/* Functional action triggers & unboxed features */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  <span>5-11 Sinf Darsliklarini Ko‘rish</span>
                </button>
                <button
                  onClick={onDiscussionsClick}
                  className="px-6 py-3 text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200/90 rounded-lg border border-stone-200 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-stone-600" />
                  <span>Masalalar & Teoremalar Bahsi</span>
                </button>
              </div>

              {/* Quiet editorial trust tags (no pills) */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-500 pt-2 border-t border-stone-200/60">
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-blue-700" />
                  Ingliz tilidagi sof matematika
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-emerald-700" />
                  IT va Python algoritmlari
                </span>
                <span aria-hidden="true">·</span>
                <span>Ovozli mutolaa (Audio Reading)</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Curatorial Focal Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md border border-stone-200 min-h-[340px] lg:h-full bg-stone-100"
          >
            <img
              src="/src/assets/images/book_english_math_1792685051986.jpg"
              alt="Cambridge English Mathematics Grades 5-11"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent flex flex-col justify-end p-6 text-stone-100">
              <span className="text-[11px] font-mono tracking-wider uppercase text-amber-200/90 mb-1">
                MATHEMATICAL PRINCIPLE
              </span>
              <p className="text-sm sm:text-base font-serif italic text-stone-100 leading-snug">
                “Pure mathematics is, in its way, the poetry of logical ideas.”
              </p>
              <span className="text-xs text-stone-300 mt-2">
                — Albert Einstein · The World As I See It
              </span>
            </div>
          </motion.div>
        </div>

        {/* 4-column metric strip placed in full-width row below hero split */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-sans">
              Sinflar Qamrovi
            </p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
              5 – 11 Sinf
            </p>
            <p className="text-xs text-stone-500">To‘liq bosqichli dastur</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-sans">
              Asosiy Yo‘nalishlar
            </p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Math & IT
            </p>
            <p className="text-xs text-stone-500">100% Ingliz tilida</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-sans">
              Teoremalar & Masalalar
            </p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
              {totalDiscussions}+ yechim
            </p>
            <p className="text-xs text-stone-500">Olimpiada va dars tahlili</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-sans">
              Shaxsiy Mentor
            </p>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Cambridge & MIT
            </p>
            <p className="text-xs text-stone-500">Shaxsiy xabarlarda doimiy maslahat</p>
          </div>
        </div>
      </div>
    </section>
  );
};
