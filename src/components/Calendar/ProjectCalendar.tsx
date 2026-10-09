import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarDeadline, StageId } from '../../types';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Flag,
  ArrowRight,
  Filter,
  Sparkles
} from 'lucide-react';

export const ProjectCalendar: React.FC = () => {
  const { calendarDeadlines, stages, groups, currentUser, selectedGroupId } = useApp();

  const [selectedMonth, setSelectedMonth] = useState<'all' | 'september' | 'oktober' | 'november' | 'desember'>('all');
  const group = groups.find(g => g.id === (currentUser.groupId || selectedGroupId)) || groups[0];

  const monthsData = [
    { key: 'september', label: 'September', weeks: ['I', 'II', 'III', 'IV'] },
    { key: 'oktober', label: 'Oktober', weeks: ['I', 'II', 'III', 'IV'] },
    { key: 'november', label: 'November', weeks: ['I', 'II', 'III', 'IV'] },
    { key: 'desember', label: 'Desember', weeks: ['I', 'II', 'III', 'IV'] }
  ];

  // Schedule Gantt mapping matching PDF Slide 8
  const ganttSchedule = [
    { no: 1, name: 'Research & Identifikasi', sept: [false, true, true, true], okt: [false, false, false, false], nov: [false, false, false, false], des: [false, false, false, false] },
    { no: 2, name: 'Design Brief & Konsep', sept: [false, false, false, true], okt: [true, false, false, false], nov: [false, false, false, false], des: [false, false, false, false] },
    { no: 3, name: 'Eksplorasi Visual (Sketsa)', sept: [false, false, false, false], okt: [false, true, false, false], nov: [false, false, false, false], des: [false, false, false, false] },
    { no: 4, name: 'Final Digital Design (Vektor)', sept: [false, false, false, false], okt: [false, true, true, true], nov: [false, false, false, false], des: [false, false, false, false] },
    { no: 5, name: 'Merchandise Production (Cetak)', sept: [false, false, false, false], okt: [false, false, false, false], nov: [true, true, true, true], des: [false, false, false, false] },
    { no: 6, name: 'Packaging & Story Card', sept: [false, false, false, false], okt: [false, false, false, false], nov: [false, false, true, true], des: [false, false, false, false] },
    { no: 7, name: 'Marketing & Promosi', sept: [false, false, false, false], okt: [false, false, false, false], nov: [true, true, true, true], des: [true, false, false, false] },
    { no: 8, name: 'Exhibition & Presentation', sept: [false, false, false, false], okt: [false, false, false, false], nov: [false, false, false, false], des: [true, true, false, false] }
  ];

  const filteredMilestones = calendarDeadlines.filter(item => {
    if (selectedMonth === 'all') return true;
    if (selectedMonth === 'september') return item.startDate.includes('-09-');
    if (selectedMonth === 'oktober') return item.startDate.includes('-10-') || item.endDate.includes('-10-');
    if (selectedMonth === 'november') return item.startDate.includes('-11-');
    if (selectedMonth === 'desember') return item.startDate.includes('-12-');
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                Kalender Pelaksanaan Resmi PjBL DKV
              </span>
              <span className="text-xs text-slate-400">SMKN 1 Surabaya</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Jadwal & Tenggat Waktu Proyek (Sept - Des)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Struktur linimasa tahapan riset, desain digital, produksi sampel fisik merchandise hingga gelar pameran akhir di bulan Desember.
            </p>
          </div>

          {/* Month Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl text-xs">
            <button
              onClick={() => setSelectedMonth('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedMonth === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Semua Bulan
            </button>
            <button
              onClick={() => setSelectedMonth('september')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedMonth === 'september'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              September
            </button>
            <button
              onClick={() => setSelectedMonth('oktober')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedMonth === 'oktober'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Oktober
            </button>
            <button
              onClick={() => setSelectedMonth('november')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedMonth === 'november'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              November
            </button>
            <button
              onClick={() => setSelectedMonth('desember')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedMonth === 'desember'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Desember
            </button>
          </div>
        </div>
      </div>

      {/* Official Gantt Chart View (Recreated directly from PDF slide 8) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-base font-display text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-amber-500" />
              Tabel Matriks Pelaksanaan Tahapan Proyek (Gantt Chart Kurikulum)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sinkronisasi waktu pelaksanaan per minggu (Minggu I - IV)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50">
                <th className="py-2.5 px-3 w-10 text-center font-bold" rowSpan={2}>NO</th>
                <th className="py-2.5 px-3 font-bold" rowSpan={2}>KEGIATAN</th>
                <th className="py-2 px-2 text-center font-bold border-l border-slate-200 dark:border-slate-700" colSpan={4}>SEPTEMBER</th>
                <th className="py-2 px-2 text-center font-bold border-l border-slate-200 dark:border-slate-700" colSpan={4}>OKTOBER</th>
                <th className="py-2 px-2 text-center font-bold border-l border-slate-200 dark:border-slate-700" colSpan={4}>NOVEMBER</th>
                <th className="py-2 px-2 text-center font-bold border-l border-slate-200 dark:border-slate-700" colSpan={4}>DESEMBER</th>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 text-center bg-slate-50/50 dark:bg-slate-800/30">
                {/* Sept weeks */}
                <th className="py-1 px-1 border-l border-slate-200 dark:border-slate-700">I</th>
                <th className="py-1 px-1">II</th>
                <th className="py-1 px-1">III</th>
                <th className="py-1 px-1">IV</th>
                {/* Okt weeks */}
                <th className="py-1 px-1 border-l border-slate-200 dark:border-slate-700">I</th>
                <th className="py-1 px-1">II</th>
                <th className="py-1 px-1">III</th>
                <th className="py-1 px-1">IV</th>
                {/* Nov weeks */}
                <th className="py-1 px-1 border-l border-slate-200 dark:border-slate-700">I</th>
                <th className="py-1 px-1">II</th>
                <th className="py-1 px-1">III</th>
                <th className="py-1 px-1">IV</th>
                {/* Des weeks */}
                <th className="py-1 px-1 border-l border-slate-200 dark:border-slate-700">I</th>
                <th className="py-1 px-1">II</th>
                <th className="py-1 px-1">III</th>
                <th className="py-1 px-1">IV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {ganttSchedule.map(item => {
                const isPassed = group.currentStageId > item.no;
                const isCurrent = group.currentStageId === item.no;

                return (
                  <tr
                    key={item.no}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                      isCurrent ? 'bg-amber-500/5 font-semibold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 text-center text-slate-500">{item.no}</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500 text-white font-bold">
                            Aktif
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Sept */}
                    {item.sept.map((active, i) => (
                      <td
                        key={`s-${i}`}
                        className={`text-center py-2 px-1 ${i === 0 ? 'border-l border-slate-200 dark:border-slate-700' : ''}`}
                      >
                        {active && (
                          <span className="w-5 h-5 mx-auto rounded-md bg-indigo-600/90 text-white font-bold text-[11px] flex items-center justify-center">
                            ✓
                          </span>
                        )}
                      </td>
                    ))}

                    {/* Okt */}
                    {item.okt.map((active, i) => (
                      <td
                        key={`o-${i}`}
                        className={`text-center py-2 px-1 ${i === 0 ? 'border-l border-slate-200 dark:border-slate-700' : ''}`}
                      >
                        {active && (
                          <span className="w-5 h-5 mx-auto rounded-md bg-amber-500 text-white font-bold text-[11px] flex items-center justify-center">
                            ✓
                          </span>
                        )}
                      </td>
                    ))}

                    {/* Nov */}
                    {item.nov.map((active, i) => (
                      <td
                        key={`n-${i}`}
                        className={`text-center py-2 px-1 ${i === 0 ? 'border-l border-slate-200 dark:border-slate-700' : ''}`}
                      >
                        {active && (
                          <span className="w-5 h-5 mx-auto rounded-md bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center">
                            ✓
                          </span>
                        )}
                      </td>
                    ))}

                    {/* Des */}
                    {item.des.map((active, i) => (
                      <td
                        key={`d-${i}`}
                        className={`text-center py-2 px-1 ${i === 0 ? 'border-l border-slate-200 dark:border-slate-700' : ''}`}
                      >
                        {active && (
                          <span className="w-5 h-5 mx-auto rounded-md bg-rose-600 text-white font-bold text-[11px] flex items-center justify-center">
                            ✓
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deadline Milestone Cards */}
      <div className="space-y-4">
        <h3 className="font-bold text-base font-display text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          Detail Tenggat Waktu & Rincian Deliverable
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMilestones.map(deadline => {
            const stage = stages.find(s => s.id === deadline.stageId);
            const isCompleted = group.currentStageId > deadline.stageId;
            const isCurrent = group.currentStageId === deadline.stageId;

            return (
              <div
                key={deadline.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isCompleted
                    ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800'
                    : isCurrent
                    ? 'bg-amber-50/50 dark:bg-slate-900 border-amber-400 dark:border-amber-700 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {deadline.periodLabel}
                  </span>
                  {isCompleted ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Tuntas
                    </span>
                  ) : isCurrent ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white animate-pulse flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Sedang Berjalan
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Mendatang
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {deadline.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {deadline.description}
                </p>

                {/* Deliverables tags */}
                {stage && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                      Target Luaran Wajib:
                    </span>
                    <ul className="space-y-1">
                      {stage.targetDeliverables.map((d, idx) => (
                        <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
