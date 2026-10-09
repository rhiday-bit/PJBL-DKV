import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  FileSpreadsheet,
  Printer,
  Download,
  FileText,
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';

interface ExportReportsModalProps {
  onClose: () => void;
}

export const ExportReportsModal: React.FC<ExportReportsModalProps> = ({ onClose }) => {
  const { groups, stages, submissions, currentUser } = useApp();
  const [activeFormat, setActiveFormat] = useState<'preview_pdf' | 'excel'>('preview_pdf');

  // Prepare table data for each group
  const reportData = groups.map((group, idx) => {
    const groupSubs = submissions.filter(s => s.groupId === group.id);
    const stageScores: { [key: number]: number | null } = {};

    let totalScoreSum = 0;
    let gradedCount = 0;

    stages.forEach(st => {
      const sub = groupSubs.find(s => s.stageId === st.id);
      if (sub?.feedback) {
        stageScores[st.id] = sub.feedback.totalScore;
        totalScoreSum += sub.feedback.totalScore;
        gradedCount += 1;
      } else {
        stageScores[st.id] = null;
      }
    });

    const avg = gradedCount > 0 ? Math.round(totalScoreSum / gradedCount) : group.overallScore || 0;
    const predikat = avg >= 85 ? 'Sangat Baik (A)' : avg >= 75 ? 'Baik (B)' : avg > 0 ? 'Cukup (C)' : 'Belum Lengkap';
    const kelayakan = group.currentStageId >= 5 ? 'LAYAK PRODUKSI' : 'TAHAP PENGEMBANGAN';

    return {
      no: idx + 1,
      agencyName: group.agencyName,
      destination: group.destinationCity,
      projectType: group.projectType,
      leader: group.leaderName,
      members: group.members.join(', '),
      stageScores,
      avg,
      predikat,
      kelayakan,
      currentStage: group.currentStageId
    };
  });

  // Handle Export to CSV (Excel compatible)
  const handleExportCSV = () => {
    const headers = [
      'No',
      'Nama Creative Agency',
      'Destinasi Wisata Jatim',
      'Model Proyek DKV',
      'Ketua Kelompok',
      'Anggota Tim',
      'Tahap 1 (Riset)',
      'Tahap 2 (Brief)',
      'Tahap 3 (Sketsa)',
      'Tahap 4 (Vector)',
      'Tahap 5 (Produksi)',
      'Tahap 6 (Packaging)',
      'Tahap 7 (Marketing)',
      'Tahap 8 (Pameran)',
      'Rata-Rata Nilai',
      'Predikat',
      'Status Kelayakan'
    ];

    const rows = reportData.map(d => [
      d.no,
      `"${d.agencyName}"`,
      `"${d.destination}"`,
      `"${d.projectType}"`,
      `"${d.leader}"`,
      `"${d.members}"`,
      d.stageScores[1] ?? '-',
      d.stageScores[2] ?? '-',
      d.stageScores[3] ?? '-',
      d.stageScores[4] ?? '-',
      d.stageScores[5] ?? '-',
      d.stageScores[6] ?? '-',
      d.stageScores[7] ?? '-',
      d.stageScores[8] ?? '-',
      d.avg,
      `"${d.predikat}"`,
      `"${d.kelayakan}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Laporan_Nilai_PjBL_DKV_SMKN1_Surabaya_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-5xl max-h-[94vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header toolbar */}
        <div className="no-print sticky top-0 bg-white dark:bg-slate-900 z-10 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Ekspor Laporan Penilaian PjBL DKV
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Format resmi administrasi kurikulum SMKN 1 Surabaya (PDF & Excel)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Excel (.CSV)
            </button>
            <button
              onClick={handlePrintPDF}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              Cetak / Simpan PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Document Sheet */}
        <div className="p-6 sm:p-10 bg-white text-slate-900 min-h-[600px] print:p-0 print:m-0">
          {/* Official Letterhead / Kop Surat */}
          <div className="border-b-4 border-double border-slate-900 pb-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="text-left leading-tight">
                <h4 className="text-sm font-bold uppercase tracking-wide">
                  PEMERINTAH PROVINSI JAWA TIMUR • DINAS PENDIDIKAN
                </h4>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-900">
                  SEKOLAH MENENGAH KEJURUAN NEGERI 1 SURABAYA
                </h2>
                <p className="text-xs font-semibold text-slate-700">
                  KONSENTRASI KEAHLIAN DESAIN KOMUNIKASI VISUAL (DKV)
                </p>
                <p className="text-[11px] text-slate-600">
                  Jl. SMEA No. 4, Wonokromo, Kota Surabaya, Jawa Timur 60243 | Telp. (031) 8292038
                </p>
              </div>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center my-6">
            <h3 className="text-base sm:text-lg font-black uppercase tracking-wide underline underline-offset-4">
              REKAPITULASI PENILAIAN PROJECT BASED LEARNING (PjBL)
            </h3>
            <p className="text-xs font-semibold text-slate-700 mt-1">
              Topik: Perancangan Lini Produk Merchandise Pariwisata Budaya Jawa Timur
            </p>
            <p className="text-[11px] text-slate-500">
              Semester Gasal • Tahun Ajaran 2026/2027 • Kelas XII DKV
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto my-4">
            <table className="w-full text-xs text-left border border-slate-400 border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold text-center border-b border-slate-400">
                  <th className="p-2 border border-slate-400 w-8" rowSpan={2}>No</th>
                  <th className="p-2 border border-slate-400 text-left min-w-[140px]" rowSpan={2}>Nama Agency & Destinasi</th>
                  <th className="p-2 border border-slate-400 text-left" rowSpan={2}>Ketua Kelompok</th>
                  <th className="p-1 border border-slate-400" colSpan={8}>Tahapan Proyek (01 - 08)</th>
                  <th className="p-2 border border-slate-400 w-12" rowSpan={2}>Rata-Rata</th>
                  <th className="p-2 border border-slate-400 w-16" rowSpan={2}>Predikat</th>
                  <th className="p-2 border border-slate-400 min-w-[90px]" rowSpan={2}>Status Kelayakan</th>
                </tr>
                <tr className="bg-slate-50 text-[10px] text-slate-600 font-bold text-center border-b border-slate-400">
                  <th className="p-1 border border-slate-400" title="Riset">T1</th>
                  <th className="p-1 border border-slate-400" title="Brief">T2</th>
                  <th className="p-1 border border-slate-400" title="Sketsa">T3</th>
                  <th className="p-1 border border-slate-400" title="Vector">T4</th>
                  <th className="p-1 border border-slate-400" title="Produksi">T5</th>
                  <th className="p-1 border border-slate-400" title="Packaging">T6</th>
                  <th className="p-1 border border-slate-400" title="Marketing">T7</th>
                  <th className="p-1 border border-slate-400" title="Pameran">T8</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map(row => (
                  <tr key={row.no} className="border-b border-slate-300 hover:bg-slate-50">
                    <td className="p-2 border border-slate-300 text-center font-bold">{row.no}</td>
                    <td className="p-2 border border-slate-300">
                      <div className="font-bold text-slate-900">{row.agencyName}</div>
                      <div className="text-[10px] text-slate-600">{row.destination} ({row.projectType})</div>
                    </td>
                    <td className="p-2 border border-slate-300 text-slate-800">{row.leader}</td>
                    
                    {/* Scores */}
                    <td className="p-1 border border-slate-300 text-center font-medium">{row.stageScores[1] ?? '-'}</td>
                    <td className="p-1 border border-slate-300 text-center font-medium">{row.stageScores[2] ?? '-'}</td>
                    <td className="p-1 border border-slate-300 text-center font-medium">{row.stageScores[3] ?? '-'}</td>
                    <td className="p-1 border border-slate-300 text-center font-medium">{row.stageScores[4] ?? '-'}</td>
                    <td className="p-1 border border-slate-300 text-center font-medium">{row.stageScores[5] ?? '-'}</td>
                    <td className="p-1 border border-slate-300 text-center font-medium">{row.stageScores[6] ?? '-'}</td>
                    <td className="p-1 border border-slate-300 text-center font-medium">{row.stageScores[7] ?? '-'}</td>
                    <td className="p-1 border border-slate-300 text-center font-medium">{row.stageScores[8] ?? '-'}</td>

                    <td className="p-2 border border-slate-300 text-center font-black text-slate-900">{row.avg}</td>
                    <td className="p-2 border border-slate-300 text-center font-semibold text-[11px]">{row.predikat}</td>
                    <td className="p-2 border border-slate-300 text-center font-bold text-[10px] text-emerald-800">
                      {row.kelayakan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Keterangan Ambang Batas Kelulusan */}
          <div className="my-4 text-[11px] text-slate-600 space-y-0.5">
            <p><strong>Catatan Kriteria Kelayakan:</strong></p>
            <p>• Kriteria Ketuntasan Minimal (KKM): Skor 75 (Tahap 1-3) & Skor 78-80 (Tahap 4-8).</p>
            <p>• Siswa diwajibkan menyelesaikan cetak prototype fisik minimal 4 produk (Kaos, Totebag, Tumbler, PIN/Stiker) sebelum mengikuti pameran purna karya.</p>
          </div>

          {/* Formal Sign-off Section */}
          <div className="mt-12 pt-6 flex justify-between text-xs text-slate-900 print:mt-8">
            <div className="text-center w-64">
              <p>Mengetahui,</p>
              <p className="font-semibold">Kepala Program Keahlian DKV</p>
              <div className="h-20" />
              <p className="font-bold underline">Drs. H. Mulyono, M.Ds.</p>
              <p className="text-[11px] text-slate-500">NIP. 19720415 199802 1 003</p>
            </div>

            <div className="text-center w-64">
              <p>Surabaya, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="font-semibold">Guru Pembimbing / Kurator PjBL</p>
              <div className="h-20" />
              <p className="font-bold underline">{currentUser.role === 'guru' ? currentUser.name : 'Hendra Dwi Prasetyo, S.Pd., M.Sn.'}</p>
              <p className="text-[11px] text-slate-500">NIP. 19840512 200801 1 008</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
