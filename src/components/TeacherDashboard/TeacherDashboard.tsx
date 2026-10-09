import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StageSubmission, AgencyGroup, StageId } from '../../types';
import {
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  Filter,
  Eye,
  FileCheck2,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Layers,
  MapPin,
  TrendingUp,
  FileSpreadsheet,
  UserPlus
} from 'lucide-react';

interface TeacherDashboardProps {
  onOpenReviewModal: (submission: StageSubmission) => void;
  onOpenExportModal: () => void;
  onOpenAccountsModal: () => void;
  onGoToAnalytics: () => void;
  onOpenChatWithGroup: (groupId: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onOpenReviewModal,
  onOpenExportModal,
  onOpenAccountsModal,
  onGoToAnalytics,
  onOpenChatWithGroup
}) => {
  const { groups, submissions, stages, currentUser } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'menunggu_review' | 'perlu_revisi' | 'layak_lolos'>('all');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');

  // Stats calculation
  const pendingSubmissions = submissions.filter(s => s.status === 'menunggu_review');
  const needsRevisionSubmissions = submissions.filter(s => s.status === 'perlu_revisi');
  const approvedSubmissions = submissions.filter(s => s.status === 'layak_lolos');

  const gradedSubmissions = submissions.filter(s => s.feedback);
  const classAvgScore = gradedSubmissions.length > 0
    ? Math.round(gradedSubmissions.reduce((acc, s) => acc + (s.feedback?.totalScore || 0), 0) / gradedSubmissions.length)
    : 0;

  // Filtered submissions list
  const filteredSubmissions = submissions.filter(s => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (selectedCityFilter !== 'all') {
      const g = groups.find(grp => grp.id === s.groupId);
      if (g?.destinationCity !== selectedCityFilter) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Teacher Welcome & Top Metric Cards */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300">
              Panel Kurator & Guru Pembimbing
            </span>
            <span className="text-xs text-slate-400">
              Tahun Ajaran 2026/2027
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
            Selamat Datang, {currentUser.name}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Pantau progres real-time perancangan lini produk merchandise pariwisata budaya Jawa Timur siswa DKV SMKN 1 Surabaya. Lakukan verifikasi kelayakan bertahap sebelum siswa melangkah ke tahap selanjutnya.
          </p>
        </div>

        {/* Quick Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Ekspor Nilai (PDF / Excel)
          </button>
          <button
            onClick={onOpenAccountsModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Kelola Akun
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Total Creative Agency</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{groups.length} Kelompok</div>
            <div className="text-[11px] text-slate-500">6 Kota Destinasi Jatim</div>
          </div>
        </div>

        {/* Metric 2: Pending Reviews (Highlighted) */}
        <div className={`p-5 rounded-2xl border shadow-sm flex items-center gap-4 transition-all ${
          pendingSubmissions.length > 0
            ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 ring-2 ring-amber-400/20'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-amber-900 dark:text-amber-300 font-semibold uppercase">Menunggu Review</div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
              {pendingSubmissions.length} Tugas
            </div>
            <div className="text-[11px] text-amber-800/80 dark:text-amber-400">
              Perlu kurasi kelayakan
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Rata-Rata Nilai PjBL</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {classAvgScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              KKM Kelulusan: 75
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Perlu Revisi</div>
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
              {needsRevisionSubmissions.length} Tugas
            </div>
            <div className="text-[11px] text-slate-500">
              Menunggu pembaruan siswa
            </div>
          </div>
        </div>
      </div>

      {/* Visual Progress Matrix (All Groups x 8 Stages) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              Matriks Progres Kelayakan Kelas (Gating Matrix)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pantau posisi tahapan masing-masing kelompok agency secara real-time.
            </p>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Layak Lolos
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> Review Guru
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Perlu Revisi
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" /> Terkunci / Belum
            </span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase">
                <th className="py-3 px-3">Creative Agency</th>
                <th className="py-3 px-2">Kota Destinasi</th>
                {stages.map(st => (
                  <th key={st.id} className="py-3 px-2 text-center" title={`${st.title} (${st.monthSchedule})`}>
                    T{st.code}
                  </th>
                ))}
                <th className="py-3 px-3 text-center">Progres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {groups.map(group => {
                return (
                  <tr key={group.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span>{group.avatarLogo}</span>
                        <div>
                          <div>{group.agencyName}</div>
                          <div className="text-[10px] text-slate-400 font-normal">Ketua: {group.leaderName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-medium text-[11px]">
                        {group.destinationCity}
                      </span>
                    </td>
                    {stages.map(st => {
                      const sub = submissions.find(s => s.groupId === group.id && s.stageId === st.id);
                      const isApproved = sub?.status === 'layak_lolos';
                      const isPending = sub?.status === 'menunggu_review';
                      const isRevision = sub?.status === 'perlu_revisi';
                      const isCurrent = group.currentStageId === st.id;

                      return (
                        <td key={st.id} className="py-3 px-2 text-center">
                          {isApproved ? (
                            <button
                              onClick={() => sub && onOpenReviewModal(sub)}
                              title={`Tahap ${st.code}: Layak Lolos (Skor: ${sub?.feedback?.totalScore}). Klik untuk kurasi.`}
                              className="w-7 h-7 mx-auto rounded-lg bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
                            >
                              {sub?.feedback?.totalScore || '✓'}
                            </button>
                          ) : isPending ? (
                            <button
                              onClick={() => sub && onOpenReviewModal(sub)}
                              title={`Tahap ${st.code}: Tugas Masuk! Klik untuk periksa & beri penilaian.`}
                              className="w-7 h-7 mx-auto rounded-lg bg-amber-500 text-white font-bold text-[11px] flex items-center justify-center hover:scale-110 transition-transform animate-pulse shadow-xs"
                            >
                              ⏳
                            </button>
                          ) : isRevision ? (
                            <button
                              onClick={() => sub && onOpenReviewModal(sub)}
                              title={`Tahap ${st.code}: Perlu Revisi. Klik untuk melihat catatan.`}
                              className="w-7 h-7 mx-auto rounded-lg bg-rose-500 text-white font-bold text-[11px] flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
                            >
                              !
                            </button>
                          ) : isCurrent ? (
                            <span
                              title={`Tahap ${st.code}: Sedang berlangsung (Belum dikirim)`}
                              className="w-7 h-7 mx-auto rounded-lg border-2 border-dashed border-indigo-400 dark:border-indigo-600 text-indigo-500 text-[10px] flex items-center justify-center font-bold"
                            >
                              {st.code}
                            </span>
                          ) : (
                            <span
                              title={`Tahap ${st.code}: Terkunci`}
                              className="w-7 h-7 mx-auto rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-300 dark:text-slate-600 text-[10px] flex items-center justify-center"
                            >
                              •
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="w-16 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${group.progressPercentage}%` }}
                          />
                        </div>
                        <span className="font-bold text-[11px] text-slate-700 dark:text-slate-300">
                          {group.progressPercentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Desk / Submissions Queue */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-amber-500" />
              Antrean Pengumpulan Tugas & Kurasi Kelayakan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Berikan skor rubrik (0-100) dan tentukan kelayakan siswa melangkah ke tahap selanjutnya.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Semua ({submissions.length})
              </button>
              <button
                onClick={() => setStatusFilter('menunggu_review')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'menunggu_review'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Menunggu ({pendingSubmissions.length})
              </button>
              <button
                onClick={() => setStatusFilter('perlu_revisi')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'perlu_revisi'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Revisi ({needsRevisionSubmissions.length})
              </button>
              <button
                onClick={() => setStatusFilter('layak_lolos')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  statusFilter === 'layak_lolos'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Layak ({approvedSubmissions.length})
              </button>
            </div>

            {/* Destination filter */}
            <select
              value={selectedCityFilter}
              onChange={e => setSelectedCityFilter(e.target.value)}
              className="text-xs bg-slate-100 dark:bg-slate-800 border-none rounded-xl p-2 text-slate-700 dark:text-slate-300 font-medium"
            >
              <option value="all">Semua Destinasi Jatim</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Ponorogo">Ponorogo</option>
              <option value="Banyuwangi">Banyuwangi</option>
              <option value="Malang">Malang</option>
              <option value="Madiun">Madiun</option>
              <option value="Madura">Madura</option>
            </select>
          </div>
        </div>

        {/* Submissions Cards */}
        {filteredSubmissions.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-400">Tidak ada data kiriman tugas yang sesuai filter.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSubmissions.map(sub => {
              const grp = groups.find(g => g.id === sub.groupId);
              const stage = stages.find(s => s.id === sub.stageId);

              return (
                <div
                  key={sub.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    sub.status === 'menunggu_review'
                      ? 'bg-amber-50/30 dark:bg-amber-950/15 border-amber-300 dark:border-amber-800 shadow-sm'
                      : sub.status === 'perlu_revisi'
                      ? 'bg-rose-50/20 dark:bg-rose-950/15 border-rose-200 dark:border-rose-900'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{grp?.avatarLogo}</span>
                          {grp?.agencyName}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {grp?.destinationCity}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                          Tahap {stage?.code}: {stage?.title}
                        </span>

                        {/* Status Badge */}
                        {sub.status === 'menunggu_review' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white animate-pulse">
                            Menunggu Review
                          </span>
                        )}
                        {sub.status === 'layak_lolos' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            ✓ LAYAK LOLOS (Skor: {sub.feedback?.totalScore})
                          </span>
                        )}
                        {sub.status === 'perlu_revisi' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                            ⚠️ Perlu Revisi (Skor: {sub.feedback?.totalScore})
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        "{sub.title}"
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 max-w-3xl">
                        {sub.description}
                      </p>

                      {/* Attachments preview list */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {sub.attachments.map(att => (
                          <span
                            key={att.id}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]"
                          >
                            📎 {att.name} <span className="text-slate-400 text-[10px]">({att.fileSize})</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
                      <button
                        onClick={() => grp && onOpenChatWithGroup(grp.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        Kirim Pesan
                      </button>
                      <button
                        onClick={() => onOpenReviewModal(sub)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                          sub.status === 'menunggu_review'
                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {sub.feedback ? 'Edit Penilaian & Umpan Balik' : 'Beri Nilai & Umpan Balik'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
