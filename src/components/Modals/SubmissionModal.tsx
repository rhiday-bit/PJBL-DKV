import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StageId, ProjectStage } from '../../types';
import {
  X,
  Upload,
  FileText,
  Paperclip,
  CheckSquare,
  Sparkles,
  Layers,
  Check,
  AlertCircle
} from 'lucide-react';

interface SubmissionModalProps {
  stageId: StageId;
  onClose: () => void;
}

export const SubmissionModal: React.FC<SubmissionModalProps> = ({ stageId, onClose }) => {
  const {
    stages,
    groups,
    currentUser,
    selectedGroupId,
    submissions,
    submitStageTask
  } = useApp();

  const group = groups.find(g => g.id === (currentUser.groupId || selectedGroupId)) || groups[0];
  const stage = stages.find(s => s.id === stageId) || stages[0];

  const existingSub = submissions.find(s => s.groupId === group.id && s.stageId === stageId);

  const [title, setTitle] = useState(
    existingSub?.title || `Hasil Karya ${stage.title} - ${group.agencyName}`
  );
  const [description, setDescription] = useState(
    existingSub?.description ||
      `Berikut adalah luaran pengerjaan ${stage.title} bertema pariwisata ${group.destinationCity}. Desain mengeksplorasi nilai kearifan lokal "${group.visualTheme}" dan telah disesuaikan dengan kebutuhan lini produk merchandise.`
  );

  const [completedItems, setCompletedItems] = useState<{ [key: string]: boolean }>(() => {
    const initial: { [key: string]: boolean } = {};
    stage.targetDeliverables.forEach(item => {
      initial[item] = true;
    });
    return initial;
  });

  // Attachments mock list with easy presets
  const [attachments, setAttachments] = useState<
    { name: string; fileType: string; fileSize: string; fileUrl: string }[]
  >(
    existingSub?.attachments || [
      {
        name: `Desain_${stage.code}_${group.destinationCity}_Vector.ai`,
        fileType: 'Vector Master (.ai)',
        fileSize: '18.4 MB',
        fileUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80'
      },
      {
        name: `Mockup_Lini_Merchandise_HighRes.png`,
        fileType: 'PNG 300 DPI',
        fileSize: '6.2 MB',
        fileUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
      }
    ]
  );

  const [customFileName, setCustomFileName] = useState('');

  const handleAddAttachment = () => {
    if (!customFileName.trim()) return;
    setAttachments(prev => [
      ...prev,
      {
        name: customFileName.trim(),
        fileType: customFileName.endsWith('.pdf')
          ? 'Dokumen PDF'
          : customFileName.endsWith('.ai') || customFileName.endsWith('.cdr')
          ? 'Vector Master File'
          : 'Image Preview',
        fileSize: `${(Math.random() * 8 + 2).toFixed(1)} MB`,
        fileUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
      }
    ]);
    setCustomFileName('');
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitStageTask(group.id, stageId, {
      title,
      description,
      attachments,
      deliverablesCompleted: Object.keys(completedItems).reduce((acc, key) => {
        acc[key] = completedItems[key] ? 1 : 0;
        return acc;
      }, {} as { [key: string]: number })
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Unggah Progres / Tugas: Tahap {stage.code}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {stage.title} • {group.agencyName} ({group.destinationCity})
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

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Notice */}
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Notifikasi Otomatis Aktif:</span> Setiap pengunggahan atau pembaruan progres akan langsung diteruskan ke Guru Pembimbing untuk kurasi kelayakan tahap berikutnya.
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Judul Kiriman / Nama Berkas Utama:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Contoh: Paket Master Vektor & Mockup Kaos Totebag Surabaya Juang"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Deskripsi Konsep & Laporan Pengerjaan:
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Jelaskan konsep visual, filosofi warna, dan teknik aplikasi merchandise..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Target Deliverables Checklist */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Checklist Target Luaran yang Disertakan:
            </label>
            <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              {stage.targetDeliverables.map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={!!completedItems[item]}
                    onChange={e =>
                      setCompletedItems(prev => ({ ...prev, [item]: e.target.checked }))
                    }
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Attachments List & Add new */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Berkas Lampiran Desain (Format .ai, .cdr, .png, .pdf):
            </label>

            <div className="space-y-2">
              {attachments.map((att, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-indigo-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{att.name}</span>
                    <span className="text-[10px] text-slate-400">({att.fileType} • {att.fileSize})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(idx)}
                    className="text-rose-500 hover:text-rose-700 text-xs font-semibold p-1"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            {/* Quick add filename field */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Tambah nama berkas (cth: Desain_Totebag_A4_300dpi.png)"
                value={customFileName}
                onChange={e => setCustomFileName(e.target.value)}
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 shrink-0"
              >
                + Tambah Berkas
              </button>
            </div>
          </div>

          {/* Footer Action */}
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
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 shadow-md shadow-indigo-600/20"
            >
              <Upload className="w-4 h-4" />
              Kirim Progres ke Guru Pembimbing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
