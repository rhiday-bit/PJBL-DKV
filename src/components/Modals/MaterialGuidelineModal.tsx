import React from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  MapPin,
  Layers,
  Palette,
  FileCheck2,
  Calendar
} from 'lucide-react';
import { DESTINATION_OPTIONS, SPECIFIC_PROJECT_TYPES } from '../../data/initialData';

interface MaterialGuidelineModalProps {
  onClose: () => void;
}

export const MaterialGuidelineModal: React.FC<MaterialGuidelineModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Materi & Panduan Praktik PjBL DKV
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SMK Negeri 1 Surabaya • Perancangan Lini Produk Merchandise Pariwisata Budaya Jawa Timur
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 text-xs text-slate-700 dark:text-slate-300">
          {/* Section 1: Pertanyaan Pemantik */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-300/50 dark:border-amber-700/50 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-900 dark:text-amber-200 uppercase tracking-wide">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Pertanyaan Pemantik Proyek
            </div>
            <p className="text-sm font-semibold italic text-slate-900 dark:text-white leading-relaxed">
              "Bagaimana identitas, budaya, dan daya tarik suatu daerah dapat diterjemahkan menjadi desain merchandise yang menarik, memiliki nilai jual, dan mampu memperkenalkan karakter daerah tersebut?"
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">
              Pertanyaan ini menjadi fondasi seluruh proyek — mendorong murid berpikir sebagai desainer sekaligus promotor budaya lokal Jawa Timur.
            </p>
          </div>

          {/* Section 2: Tujuan Proyek (4 Pilar) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Tujuan Proyek (4 Pilar Kompetensi)
            </h4>
            <p className="text-slate-500 text-[11px]">
              Murid mampu menggabungkan riset, desain, dan pemasaran menjadi satu produk nyata:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  1. Riset & Identifikasi
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Mengidentifikasi potensi, ikon, budaya, dan karakter khas daerah wisata Jawa Timur yang diangkat.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  2. Eksplorasi Visual
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Menerapkan prinsip ilustrasi, tipografi, warna, dan komposisi dalam desain merchandise.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  3. Produksi Merchandise
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Membuat prototype merchandise yang siap diproduksi massal dan dipasarkan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  4. Promosi & Presentasi
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Memamerkan dan memasarkan produk kepada target pengguna secara nyata di ajang pameran akhir.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: 4 Model Proyek Spesifik DKV */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              4 Model Proyek Spesifik DKV
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPECIFIC_PROJECT_TYPES.map((type, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60">
                  <div className="font-bold text-indigo-950 dark:text-indigo-200">{type.title}</div>
                  <p className="text-indigo-900/80 dark:text-indigo-300 text-[11px] mt-1">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Pilihan Daerah / Kota Jawa Timur */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              6 Pilihan Daerah / Kota Wisata Jawa Timur
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {DESTINATION_OPTIONS.map((dest, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="font-bold text-slate-900 dark:text-white">{idx + 1}. {dest.city}</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">{dest.category}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{dest.highlights}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Ketentuan Teknis Luaran Wajib Praktik (Slide 15) */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="font-bold text-sm text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <FileCheck2 className="w-4 h-4" />
              Instruksi Kerja & Wajib Luaran Desain (Tugas Praktik DKV SMKN 1 Surabaya)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>3 Desain Kaos</strong> full color ukuran A4</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>3 Desain Totebag</strong> full color ukuran A4</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>2 Desain Tumbler</strong> siap cetak sablon/sublim</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>2 Desain PIN & Gantungan Kunci</strong></span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>2 Desain Stiker</strong> die-cut vinyl</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Format Vektor Mentah:</strong> .ai / .cdr asli + PNG High-Res</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Cetak Fisik:</strong> Minimal 4 jenis prototype merchandise</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Konsep Display:</strong> Booth pameran "PjBL Merchandise Exhibition"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
