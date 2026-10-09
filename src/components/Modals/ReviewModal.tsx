import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StageSubmission, StageId } from '../../types';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  FileText,
  Send,
  HelpCircle,
  ThumbsUp,
  RotateCcw
} from 'lucide-react';

interface ReviewModalProps {
  submission: StageSubmission | null;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ submission, onClose }) => {
  const { reviewSubmission, groups, stages } = useApp();

  if (!submission) return null;

  const group = groups.find(g => g.id === submission.groupId);
  const stage = stages.find(s => s.id === submission.stageId);
  const minPassScore = stage?.minScoreToPass || 75;

  // Rubric state initialized with existing values if already reviewed or default 80
  const [kreativitas, setKreativitas] = useState<number>(
    submission.feedback?.rubric.kreativitas || 85
  );
  const [relevansiBudaya, setRelevansiBudaya] = useState<number>(
    submission.feedback?.rubric.relevansiBudaya || 85
  );
  const [kualitasTeknis, setKualitasTeknis] = useState<number>(
    submission.feedback?.rubric.kualitasTeknis || 80
  );
  const [kesesuaianBrief, setKesesuaianBrief] = useState<number>(
    submission.feedback?.rubric.kesesuaianBrief || 85
  );

  const calculatedTotal = Math.round(
    (kreativitas + relevansiBudaya + kualitasTeknis + kesesuaianBrief) / 4
  );

  const [isEligible, setIsEligible] = useState<boolean>(
    submission.feedback?.isEligibleForNextStage ?? calculatedTotal >= minPassScore
  );

  const [generalComment, setGeneralComment] = useState<string>(
    submission.feedback?.generalComment ||
      'Karya memiliki keunikan visual yang baik dan mampu mengkomunikasikan karakter daerah Jawa Timur secara memikat.'
  );

  const [revisionNotes, setRevisionNotes] = useState<string>(
    submission.feedback?.revisionNotes || ''
  );

  const handleApplyTemplate = (comment: string, eligible: boolean, revNote = '') => {
    setGeneralComment(comment);
    setIsEligible(eligible);
    if (revNote) setRevisionNotes(revNote);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reviewSubmission(
      submission.id,
      {
        kreativitas,
        relevansiBudaya,
        kualitasTeknis,
        kesesuaianBrief
      },
      isEligible,
      generalComment,
      revisionNotes
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Kurasi Kelayakan & Umpan Balik Tugas
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {group?.agencyName} • Tahap {stage?.code}: {stage?.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Submission Preview Overview */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Kiriman Tugas Siswa
              </span>
              <span className="text-xs text-slate-400">
                Waktu: {new Date(submission.submittedAt || '').toLocaleString('id-ID')}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              "{submission.title}"
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {submission.description}
            </p>

            {/* Attachments */}
            <div className="pt-2 flex flex-wrap gap-2">
              {submission.attachments.map(att => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{att.name}</span>
                  <span className="text-[10px] text-slate-400">({att.fileSize})</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Rubric Criteria Sliders */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Rubrik Penilaian Kompetensi DKV (Skala 0 - 100)
              </h4>
              <div className="text-xs text-slate-500">
                Nilai Minimum Kelulusan (KKM): <span className="font-bold text-amber-600">{minPassScore}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Criterion 1 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    1. Kreativitas & Orisinalitas
                  </span>
                  <span className="font-black text-amber-600 dark:text-amber-400 text-sm">
                    {kreativitas}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={kreativitas}
                  onChange={e => setKreativitas(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Cukup (50)</span>
                  <span>Sempurna (100)</span>
                </div>
              </div>

              {/* Criterion 2 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    2. Relevansi Budaya Jatim
                  </span>
                  <span className="font-black text-rose-600 dark:text-rose-400 text-sm">
                    {relevansiBudaya}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={relevansiBudaya}
                  onChange={e => setRelevansiBudaya(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Kurang Khas (50)</span>
                  <span>Sangat Khas (100)</span>
                </div>
              </div>

              {/* Criterion 3 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    3. Kualitas Teknis (Vector/Print)
                  </span>
                  <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm">
                    {kualitasTeknis}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={kualitasTeknis}
                  onChange={e => setKualitasTeknis(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Perlu Rapi (50)</span>
                  <span>Presisi Siap Cetak (100)</span>
                </div>
              </div>

              {/* Criterion 4 */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    4. Kesesuaian Brief & Kelengkapan
                  </span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {kesesuaianBrief}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={kesesuaianBrief}
                  onChange={e => setKesesuaianBrief(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Belum Lengkap (50)</span>
                  <span>Lengkap 100%</span>
                </div>
              </div>
            </div>

            {/* Total Calculated Score Highlight */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase font-semibold">Skor Total Rata-Rata:</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {calculatedTotal} <span className="text-xs font-normal text-slate-400">/ 100</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 uppercase font-semibold">Status Ambang KKM:</span>
                <div>
                  {calculatedTotal >= minPassScore ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Memenuhi Batas KKM ({minPassScore})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                      <AlertTriangle className="w-4 h-4" /> Di Bawah Batas KKM ({minPassScore})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Gating Decision: Layak Beralih vs Perlu Revisi */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Keputusan Kelayakan Beralih ke Tugas Selanjutnya:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsEligible(true)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  isEligible
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-emerald-900 dark:text-emerald-200">
                    LAYAK Beralih ke Tugas Selanjutnya
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-300/80 mt-0.5">
                    Membuka akses ke Tahap {submission.stageId < 8 ? submission.stageId + 1 : 8} bagi kelompok ini.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsEligible(false)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  !isEligible
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/20'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-rose-900 dark:text-rose-200">
                    PERLU REVISI (Belum Layak Lanjut)
                  </div>
                  <p className="text-[11px] text-rose-700 dark:text-rose-300/80 mt-0.5">
                    Siswa harus memperbaiki tugas sesuai catatan sebelum gerbang tahap berikutnya dibuka.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Comment Templates */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Template Umpan Balik Cepat:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() =>
                  handleApplyTemplate(
                    'Eksplorasi visual sangat matang, representasi budaya lokal kuat, dan siap lanjut ke tahap implementasi!',
                    true
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-medium"
              >
                👍 Sangat Baik & Siap Lanjut
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyTemplate(
                    'Konsep sudah bagus, namun harap perhatikan ketebalan outline minimal 1pt agar tidak putus saat dicetak sablon.',
                    false,
                    'Perbaiki outline garis vektor dan pastikan resolusi raster 300 DPI.'
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-medium"
              >
                ⚠️ Revisi Outline Sablon
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyTemplate(
                    'Identitas khas daerah Jawa Timur belum terlalu menonjol. Silakan perkuat elemen ornamen lokal pada key visual.',
                    false,
                    'Tambahkan elemen motif budaya daerah (tarian/batik/arsitektur khas).'
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-medium"
              >
                ⚠️ Perkuat Kearifan Lokal
              </button>
            </div>
          </div>

          {/* Teacher Feedback Text Area */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Umpan Balik & Catatan Apresiasi Guru:
            </label>
            <textarea
              required
              rows={3}
              value={generalComment}
              onChange={e => setGeneralComment(e.target.value)}
              placeholder="Tuliskan ulasan mendalam mengenai aspek desain, estetika, dan kesiapan produksi..."
              className="w-full text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Specific Revision Notes (If not eligible) */}
          {!isEligible && (
            <div className="space-y-1.5 animate-in fade-in">
              <label className="block text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                Instruksi Revisi yang Harus Diperbaiki Siswa:
              </label>
              <textarea
                rows={2}
                value={revisionNotes}
                onChange={e => setRevisionNotes(e.target.value)}
                placeholder="Jelaskan secara spesifik apa saja yang harus diubah sebelum tugas disubmit ulang..."
                className="w-full text-xs p-3 rounded-2xl border border-rose-300 dark:border-rose-800 bg-rose-50/30 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2 shadow-md shadow-amber-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              Simpan Penilaian & Kirim Notifikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
