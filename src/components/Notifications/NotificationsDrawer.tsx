import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Calendar,
  Sparkles,
  CheckCheck
} from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStage?: (stageId: number) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectStage
}) => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    currentUser,
    pushNotificationEnabled,
    togglePushNotifications
  } = useApp();

  if (!isOpen) return null;

  // Filter relevant notifications
  const filteredNotifs = notifications.filter(n => {
    if (n.targetRole === 'all') return true;
    if (currentUser.role === 'guru' && n.targetRole === 'guru') return true;
    if (currentUser.role === 'siswa') {
      if (n.targetRole === 'siswa') {
        if (!n.targetGroupId || n.targetGroupId === currentUser.groupId) return true;
      }
    }
    return true;
  });

  const unreadCount = filteredNotifs.filter(n => !n.isRead).length;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              Notifikasi Sistem Real-Time
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-extrabold">
                  {unreadCount} baru
                </span>
              )}
            </h3>
            <p className="text-[11px] text-slate-500">
              Pembaruan kiriman tugas, umpan balik & skor kelayakan
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

      {/* Push Notification Bar */}
      <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 border-b border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200">
          <span className={`w-2 h-2 rounded-full ${pushNotificationEnabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          <span className="text-[11px] font-medium">
            {pushNotificationEnabled ? 'Push notification aktif di browser' : 'Push notification belum aktif'}
          </span>
        </div>
        <button
          onClick={togglePushNotifications}
          className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {pushNotificationEnabled ? 'Nonaktifkan' : 'Aktifkan'}
        </button>
      </div>

      {/* Subheader action */}
      {unreadCount > 0 && (
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={markAllNotificationsAsRead}
            className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Tandai Semua Sudah Dibaca
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs">
            <Bell className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700 mb-2" />
            <p>Belum ada notifikasi baru.</p>
          </div>
        ) : (
          filteredNotifs.map(notif => {
            const isApproval = notif.type === 'approval';
            const isSubmission = notif.type === 'submission';
            const isRevision = notif.type === 'revision';
            const isDeadline = notif.type === 'deadline';

            return (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.linkStageId && onSelectStage) {
                    onSelectStage(notif.linkStageId);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  !notif.isRead
                    ? 'bg-amber-50/40 dark:bg-slate-800 border-amber-300 dark:border-amber-700 shadow-xs'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
                      isApproval
                        ? 'bg-emerald-500'
                        : isSubmission
                        ? 'bg-indigo-600'
                        : isRevision
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                    }`}
                  >
                    {isApproval ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isSubmission ? (
                      <Upload className="w-4 h-4" />
                    ) : isRevision ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Calendar className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {notif.createdAt}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {notif.message}
                    </p>

                    {notif.score && (
                      <div className="pt-1">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-black">
                          Skor Kelulusan: {notif.score}/100
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
