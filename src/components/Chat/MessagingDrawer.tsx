import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  MessageSquare,
  Sparkles,
  Users,
  Shield,
  Clock,
  Layers
} from 'lucide-react';

interface MessagingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  targetGroupId?: string;
}

export const MessagingDrawer: React.FC<MessagingDrawerProps> = ({
  isOpen,
  onClose,
  targetGroupId
}) => {
  const {
    currentUser,
    groups,
    stages,
    chatMessages,
    sendChatMessage,
    selectedGroupId,
    setSelectedGroupId
  } = useApp();

  const activeGroupId = targetGroupId || (currentUser.role === 'siswa' && currentUser.groupId ? currentUser.groupId : selectedGroupId);
  const activeGroup = groups.find(g => g.id === activeGroupId) || groups[0];

  const [inputMessage, setInputMessage] = useState('');

  if (!isOpen) return null;

  const groupChats = chatMessages.filter(m => m.groupId === activeGroup?.id);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeGroup) return;
    sendChatMessage(activeGroup.id, inputMessage.trim(), activeGroup.currentStageId);
    setInputMessage('');
  };

  const handleQuickTemplate = (template: string) => {
    setInputMessage(template);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            {activeGroup?.avatarLogo || '💬'}
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{activeGroup?.agencyName}</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Umpan Balik & Diskusi Tim • Destinasi: {activeGroup?.destinationCity}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Group selector for teachers */}
      {currentUser.role === 'guru' && (
        <div className="p-2.5 bg-slate-100/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-xs flex items-center gap-2">
          <span className="text-slate-500 font-semibold text-[11px] shrink-0">Pilih Tim:</span>
          <select
            value={activeGroup?.id}
            onChange={e => setSelectedGroupId(e.target.value)}
            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-slate-900 dark:text-white font-medium"
          >
            {groups.map(g => (
              <option key={g.id} value={g.id}>
                {g.avatarLogo} {g.agencyName} ({g.destinationCity})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {groupChats.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs space-y-2">
            <MessageSquare className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
            <p>Belum ada riwayat pesan untuk tim ini.</p>
            <p className="text-[11px]">Kirimkan pesan pertama untuk memulai konsultasi tugas.</p>
          </div>
        ) : (
          groupChats.map(msg => {
            const isMe = msg.senderId === currentUser.id;
            const isTeacher = msg.senderRole === 'guru';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  isMe ? 'items-end' : 'items-start'
                } space-y-1`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {msg.senderName}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed shadow-xs ${
                    msg.isTeacherFeedbackAlert
                      ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200'
                      : isMe
                      ? 'bg-amber-500 text-white rounded-tr-none'
                      : isTeacher
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 rounded-tl-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Replies for fast feedback */}
      <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-wrap gap-1 text-[11px]">
        {currentUser.role === 'guru' ? (
          <>
            <button
              onClick={() => handleQuickTemplate('Desain sudah sangat baik dan siap masuk tahap produksi fisik.')}
              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50"
            >
              ✓ Siap Produksi
            </button>
            <button
              onClick={() => handleQuickTemplate('Perhatikan ketebalan garis vektor sablon minimal 1pt agar tidak putus.')}
              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50"
            >
              ⚠️ Garis Vektor
            </button>
            <button
              onClick={() => handleQuickTemplate('Kombinasi warna dan ikon khas Jawa Timur sangat representatif!')}
              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50"
            >
              🌟 Warna Khas
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleQuickTemplate('Pak/Bu, kami sudah memperbarui file mockup 300 DPI, mohon arahannya.')}
              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50"
            >
              📤 Kirim Revisi
            </button>
            <button
              onClick={() => handleQuickTemplate('Apakah pemilihan jenis bahan blacu untuk totebag sudah disetujui?')}
              className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-50"
            >
              ❓ Bahan Totebag
            </button>
          </>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder={`Tulis pesan untuk ${activeGroup?.agencyName}...`}
          className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
