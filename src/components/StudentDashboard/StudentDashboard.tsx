import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectStage, StageSubmission, StageId } from '../../types';
import {
  Sparkles,
  CheckCircle2,
  Lock,
  Clock,
  AlertCircle,
  Upload,
  FileText,
  Paperclip,
  Check,
  ChevronRight,
  MapPin,
  Users,
  Award,
  Layers,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface StudentDashboardProps {
  onOpenSubmitModal: (stageId: StageId) => void;
  onOpenChat: () => void;
  onOpenGuidelines: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onOpenSubmitModal,
  onOpenChat,
  onOpenGuidelines
}) => {
  const { currentUser, groups, stages, submissions, selectedGroupId } = useApp();

  // Find the student's active group
  const group = groups.find(g => g.id === (currentUser.groupId || selectedGroupId)) || groups[0];

  const [expandedStageId, setExpandedStageId] = useState<number | null>(group.currentStageId);

  // Group submissions map
  const groupSubmissions = submissions.filter(s => s.groupId === group.id);

  const getSubmissionForStage = (stageId: StageId): StageSubmission | undefined => {
    return groupSubmissions.find(s => s.stageId === stageId);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Agency Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PjBL DKV SMKN 1 Surabaya
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Destinasi: {group.destinationCity} ({group.tourismCategory})
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {group.projectType}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-3xl sm:text-4xl">{group.avatarLogo}</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                  {group.agencyName}
                </h1>
                <p className="text-sm text-slate-300 mt-0.5">
                  Tema Visual: <span className="text-amber-400 font-medium italic">"{group.visualTheme}"</span>
                </p>
              </div>
            </div>

            {/* Team Members */}
            <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
              <Users className="w-4 h-4 text-slate-400" />
              <span>Anggota ({group.members.length} siswa):</span>
              <span className="text-slate-200 font-medium">
                {group.members.join(', ')}
              </span>
            </div>
          </div>

          {/* Quick Metrics & Gating Status */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-center px-3 py-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tahap Aktif</div>
              <div className="text-2xl font-black text-amber-400 mt-0.5">
                0{group.currentStageId}
                <span className="text-xs text-slate-400 font-normal">/08</span>
              </div>
              <div className="text-[11px] text-slate-300 font-medium line-clamp-1 max-w-[100px]">
                {stages.find(s => s.id === group.currentStageId)?.title}
              </div>
            </div>

            <div className="w-px h-12 bg-white/10 hidden sm:block" />

            <div className="text-center px-3 py-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Progres PjBL</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">
                {group.progressPercentage}%
              </div>
              <div className="text-[11px] text-slate-400">
                {group.currentStageId - 1} dari 8 Layak
              </div>
            </div>

            <div className="w-px h-12 bg-white/10 hidden sm:block" />

            <div className="text-center px-3 py-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Skor Rata-Rata</div>
              <div className="text-2xl font-black text-indigo-400 mt-0.5">
                {group.overallScore > 0 ? group.overallScore : '-'}
              </div>
              <div className="text-[11px] text-slate-400">
                {group.overallScore >= 85 ? 'Sangat Baik (A)' : group.overallScore >= 75 ? 'Baik (B)' : 'Belum Ada'}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
            <span>Alur Kelayakan Milestone Tugas (Gating System)</span>
            <span className="font-semibold text-amber-300">
              {group.currentStageId === 8 && group.progressPercentage === 100
                ? 'Semua Tahap Selesai!'
                : `Target: Tahap ${group.currentStageId}`}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 transition-all duration-700 shadow-sm"
              style={{ width: `${Math.max(10, group.progressPercentage)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Gating Notice Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 bg-amber-500 text-white rounded-xl shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Ketentuan Kelayakan Tahapan PjBL:</h4>
            <p className="text-xs text-amber-800/90 dark:text-amber-300/90">
              Setiap kelompok harus memperoleh status <span className="font-bold underline">"LAYAK"</span> dan skor minimal KKM (≥ 75-80) dari Guru Pembimbing sebelum dapat beralih ke tugas selanjutnya.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGuidelines}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-200/60 dark:bg-amber-900/40 hover:bg-amber-200 text-amber-900 dark:text-amber-100 transition-colors"
          >
            Lihat Panduan Singkat
          </button>
          <button
            onClick={onOpenChat}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-colors shadow-sm"
          >
            Tanya Guru Pembimbing
          </button>
        </div>
      </div>

      {/* 8 Stages Interactive Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              Peta Jalan 8 Tahapan Proyek (Roadmap)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Klik setiap tahapan untuk melihat rincian deliverable, unggah karya, atau cek umpan balik guru.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {stages.map((stage: ProjectStage) => {
            const submission = getSubmissionForStage(stage.id);
            const isUnlocked = stage.id <= group.currentStageId;
            const isPassed = submission?.status === 'layak_lolos';
            const isWaitingReview = submission?.status === 'menunggu_review';
            const isNeedsRevision = submission?.status === 'perlu_revisi';
            const isCurrentActive = stage.id === group.currentStageId;
            const isExpanded = expandedStageId === stage.id;

            return (
              <div
                key={stage.id}
                className={`rounded-2xl transition-all border ${
                  isPassed
                    ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/70 shadow-sm'
                    : isWaitingReview
                    ? 'bg-amber-50/40 dark:bg-slate-900 border-amber-300 dark:border-amber-700/60 shadow-md ring-1 ring-amber-400/30'
                    : isNeedsRevision
                    ? 'bg-rose-50/40 dark:bg-slate-900 border-rose-300 dark:border-rose-800/70 shadow-md ring-1 ring-rose-400/30'
                    : isCurrentActive
                    ? 'bg-white dark:bg-slate-900 border-indigo-400 dark:border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-slate-100/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/60 opacity-80'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => isUnlocked && setExpandedStageId(isExpanded ? null : stage.id)}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none`}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Status Badge Icon */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-base shadow-sm shrink-0 ${
                        isPassed
                          ? 'bg-emerald-500 text-white'
                          : isWaitingReview
                          ? 'bg-amber-500 text-white animate-pulse'
                          : isNeedsRevision
                          ? 'bg-rose-500 text-white'
                          : isCurrentActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isNeedsRevision ? (
                        <AlertCircle className="w-6 h-6" />
                      ) : isWaitingReview ? (
                        <Clock className="w-6 h-6" />
                      ) : isUnlocked ? (
                        stage.code
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Tahap {stage.code} • {stage.monthSchedule}
                        </span>
                        {/* Status Label */}
                        {isPassed && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            LAYAK LOLOS (Skor: {submission?.feedback?.totalScore})
                          </span>
                        )}
                        {isWaitingReview && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Menunggu Review Guru
                          </span>
                        )}
                        {isNeedsRevision && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Perlu Revisi (Skor: {submission?.feedback?.totalScore})
                          </span>
                        )}
                        {isCurrentActive && !submission && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                            Sedang Dikerjakan
                          </span>
                        )}
                        {!isUnlocked && (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            Terkunci
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                        {stage.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                        {stage.subtitle} — {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Right */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {isUnlocked && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onOpenSubmitModal(stage.id);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                          isNeedsRevision
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                            : isWaitingReview
                            ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20'
                            : isPassed
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'
                        }`}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        {submission ? 'Perbarui / Kirim Revisi' : 'Unggah Tugas'}
                      </button>
                    )}

                    {isUnlocked && (
                      <div className="text-slate-400 p-1">
                        <ChevronRight
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Section */}
                {isExpanded && isUnlocked && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-5">
                    {/* Target Deliverables Required */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-amber-500" />
                        Target Luaran / Deliverables Tahap Ini:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {stage.targetDeliverables.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                          >
                            <span className="w-5 h-5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-[10px]">
                              {idx + 1}
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Teacher Feedback & Rubric (If available) */}
                    {submission?.feedback && (
                      <div
                        className={`rounded-2xl p-4 sm:p-5 border ${
                          submission.feedback.isEligibleForNextStage
                            ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                            : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Umpan Balik Langsung Guru Pembimbing
                            </span>
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                              {submission.feedback.teacherName}
                            </h5>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">
                              {new Date(submission.feedback.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            <div className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 font-extrabold text-sm shadow-sm border border-slate-200 dark:border-slate-700">
                              Skor Akhir: {submission.feedback.totalScore} / 100
                            </div>
                          </div>
                        </div>

                        {/* Rubric Breakdown */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-center">
                            <div className="text-[10px] text-slate-500 uppercase font-semibold">Kreativitas</div>
                            <div className="text-base font-black text-amber-600 dark:text-amber-400">
                              {submission.feedback.rubric.kreativitas}
                            </div>
                          </div>
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-center">
                            <div className="text-[10px] text-slate-500 uppercase font-semibold">Budaya Jatim</div>
                            <div className="text-base font-black text-rose-600 dark:text-rose-400">
                              {submission.feedback.rubric.relevansiBudaya}
                            </div>
                          </div>
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-center">
                            <div className="text-[10px] text-slate-500 uppercase font-semibold">Kualitas Teknis</div>
                            <div className="text-base font-black text-indigo-600 dark:text-indigo-400">
                              {submission.feedback.rubric.kualitasTeknis}
                            </div>
                          </div>
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-center">
                            <div className="text-[10px] text-slate-500 uppercase font-semibold">Kesesuaian Brief</div>
                            <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                              {submission.feedback.rubric.kesesuaianBrief}
                            </div>
                          </div>
                        </div>

                        {/* Written Comments */}
                        <div className="space-y-2 mt-3">
                          <div className="text-xs text-slate-700 dark:text-slate-300">
                            <span className="font-semibold text-slate-900 dark:text-white">Ulasan Kurator: </span>
                            "{submission.feedback.generalComment}"
                          </div>

                          {submission.feedback.revisionNotes && (
                            <div className="p-3 rounded-xl bg-rose-100/70 dark:bg-rose-950/40 border border-rose-300/80 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 font-medium">
                              <span className="font-bold block mb-0.5">Catatan Perbaikan (Revisi):</span>
                              {submission.feedback.revisionNotes}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Current Submission Files (if already submitted) */}
                    {submission && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Paperclip className="w-3.5 h-3.5 text-indigo-500" />
                          Berkas & Karya yang Telah Diunggah:
                        </h4>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">
                            {submission.title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {submission.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {submission.attachments.map(att => (
                              <div
                                key={att.id}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs shadow-xs"
                              >
                                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                                <span className="font-medium text-slate-800 dark:text-slate-200">
                                  {att.name}
                                </span>
                                <span className="text-[10px] text-slate-400">({att.fileSize})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Required Deliverables Matrix from PDF Slide 15 */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Daftar Wajib Luaran Desain Fisik & Digital (SMKN 1 Surabaya)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sesuai lembar tugas praktik Project Based Learning Konsentrasi DKV:
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Standar Kurikulum Merdeka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
            <span className="text-xl">👕</span>
            <div className="font-bold text-xs text-slate-900 dark:text-white">3 Desain Kaos A4</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Full color ukuran A4, tema budaya wisata Jatim, sablon digital/DTF.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-1">
            <span className="text-xl">👜</span>
            <div className="font-bold text-xs text-slate-900 dark:text-white">3 Desain Totebag A4</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Full color ukuran A4 bahan kanvas/blacu ramah lingkungan.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1">
            <span className="text-xl">🥤</span>
            <div className="font-bold text-xs text-slate-900 dark:text-white">2 Desain Tumbler</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Desain silinder melingkar atau sablon uv untuk botol minum.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
            <span className="text-xl">🏷️</span>
            <div className="font-bold text-xs text-slate-900 dark:text-white">PIN, Ganci & Stiker</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              2 PIN, 2 Gantungan Kunci, dan 2 Stiker die-cut vinyl.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" />
            <span>Format output wajib: Vector asli (.AI / .CDR) + PNG 300 DPI + Fisik Prototype Tercetak</span>
          </div>
          <button
            onClick={() => onOpenSubmitModal(4)}
            className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
          >
            Unggah Aset Final &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
