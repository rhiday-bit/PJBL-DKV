import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  Users,
  CheckCircle2,
  PieChart,
  Compass,
  MapPin,
  Sparkles
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { groups, submissions, stages } = useApp();

  // Calculate stats
  const totalGroups = groups.length;
  const gradedSubmissions = submissions.filter(s => s.feedback);
  const totalApproved = submissions.filter(s => s.status === 'layak_lolos').length;
  const totalRevisions = submissions.filter(s => s.status === 'perlu_revisi').length;

  const averageScore = gradedSubmissions.length > 0
    ? Math.round(gradedSubmissions.reduce((acc, s) => acc + (s.feedback?.totalScore || 0), 0) / gradedSubmissions.length)
    : 0;

  // Average score per stage (1 to 8)
  const stageStats = stages.map(st => {
    const stageSubs = submissions.filter(s => s.stageId === st.id && s.feedback);
    const avg = stageSubs.length > 0
      ? Math.round(stageSubs.reduce((acc, s) => acc + (s.feedback?.totalScore || 0), 0) / stageSubs.length)
      : 0;
    const approvedCount = submissions.filter(s => s.stageId === st.id && s.status === 'layak_lolos').length;
    const revisionCount = submissions.filter(s => s.stageId === st.id && s.status === 'perlu_revisi').length;

    return {
      stageId: st.id,
      code: st.code,
      title: st.title,
      avgScore: avg,
      approvedCount,
      revisionCount,
      totalCount: stageSubs.length
    };
  });

  // Groups sorted by progress and score
  const sortedAgencies = [...groups].sort((a, b) => {
    if (b.progressPercentage !== a.progressPercentage) {
      return b.progressPercentage - a.progressPercentage;
    }
    return b.overallScore - a.overallScore;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300">
                Dashboard Analitik Kurasi & Asesmen
              </span>
              <span className="text-xs text-slate-400">PjBL Konsentrasi DKV</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Ringkasan Analitik Performa Kelas
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Evaluasi komprehensif tingkat kelayakan karya siswa, rata-rata kompetensi per tahapan, dan deteksi kendala teknis (bottleneck) dalam perancangan merchandise.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <div className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase">Rata-Rata Kelas</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{averageScore}</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase">Tingkat Kelayakan</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {gradedSubmissions.length > 0 ? Math.round((totalApproved / gradedSubmissions.length) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart: Average Score per Stage */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Perbandingan Rata-Rata Skor per Tahapan Proyek (01 - 08)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Menampilkan distribusi performa siswa pada setiap tahap deliverable.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            Skala Nilai 0 - 100
          </span>
        </div>

        {/* Visual Bar Graph */}
        <div className="space-y-4">
          {stageStats.map(st => {
            const hasData = st.avgScore > 0;
            const displayScore = hasData ? st.avgScore : 0;
            const barWidth = hasData ? `${displayScore}%` : '8%';

            return (
              <div key={st.stageId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                      {st.code}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {st.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px]">
                      {st.approvedCount} Lolos • {st.revisionCount} Revisi
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-sm">
                      {hasData ? `${st.avgScore}` : 'Belum Ada'}
                    </span>
                  </div>
                </div>

                <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      !hasData
                        ? 'bg-slate-300 dark:bg-slate-700'
                        : st.avgScore >= 85
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : st.avgScore >= 75
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                        : 'bg-gradient-to-r from-rose-500 to-rose-400'
                    }`}
                    style={{ width: barWidth }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2 Columns: Agency Progress Leaderboard & Diagnostic Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard / Agency Rankings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Peringkat Progres & Keaktifan Creative Agency
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Berdasarkan persentase kelulusan tahap dan rata-rata skor kurasi
            </p>
          </div>

          <div className="space-y-3">
            {sortedAgencies.map((agency, idx) => (
              <div
                key={agency.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                      idx === 0
                        ? 'bg-amber-500 text-white shadow-xs'
                        : idx === 1
                        ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white'
                        : idx === 2
                        ? 'bg-amber-700/60 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                      <span>{agency.avatarLogo}</span>
                      <span>{agency.agencyName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{agency.destinationCity}</span>
                      <span>•</span>
                      <span>Tahap {agency.currentStageId}/8</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                    {agency.progressPercentage}%
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Skor: <span className="font-semibold text-slate-700 dark:text-slate-300">{agency.overallScore || '-'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Bottlenecks & Teacher Recommendations */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Temuan Evaluasi Pembelajaran (Bottleneck Analysis)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Poin kritis yang membutuhkan bimbingan intensif dari guru pembimbing
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Titik Kritis: Tahap 03 - Eksplorasi Visual & Sketsa</span>
              </div>
              <p className="text-xs text-amber-800/90 dark:text-amber-300/80">
                Terdapat 2 kelompok yang mengalami revisi karena sketsa motif (Reog & Batik) terlalu detail dan rawan gagal cetak saat disablon manual. Disarankan mengadakan sesi workshop simplifikasi ornamen kontemporer.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Kekuatan Utama: Riset Budaya & Pemilihan Tema Jatim</span>
              </div>
              <p className="text-xs text-indigo-800/90 dark:text-indigo-300/80">
                Seluruh 6 kelompok menunjukkan pemahaman yang sangat mendalam terkait ikon sejarah dan kearifan lokal Jawa Timur (Ijen Banyuwangi, Surabaya Juang, dll) dengan skor riset rata-rata di atas 88.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Kesiapan Tahap 05: Produksi Fisik Merchandise</span>
              </div>
              <p className="text-xs text-emerald-800/90 dark:text-emerald-300/80">
                Kelompok Osing Sunrise Visual (Banyuwangi) dan Suroboyo Heritage Studio sudah memasuki tahap proofing cetak fisik kaos dan tote bag A4. Koordinasi vendor cetak berjalan tepat waktu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
