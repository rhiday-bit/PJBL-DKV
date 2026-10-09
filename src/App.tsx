import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard/TeacherDashboard';
import { ProjectCalendar } from './components/Calendar/ProjectCalendar';
import { AnalyticsView } from './components/Analytics/AnalyticsView';
import { ReviewModal } from './components/Modals/ReviewModal';
import { SubmissionModal } from './components/Modals/SubmissionModal';
import { MaterialGuidelineModal } from './components/Modals/MaterialGuidelineModal';
import { AccountManagementModal } from './components/Modals/AccountManagementModal';
import { ExportReportsModal } from './components/Modals/ExportReportsModal';
import { MessagingDrawer } from './components/Chat/MessagingDrawer';
import { NotificationsDrawer } from './components/Notifications/NotificationsDrawer';
import { StageSubmission, StageId } from './types';

const MainApp: React.FC = () => {
  const { currentUser, activeTab, setActiveTab, setSelectedGroupId } = useApp();

  // Modals state
  const [reviewSubmission, setReviewSubmission] = useState<StageSubmission | null>(null);
  const [submitModalStageId, setSubmitModalStageId] = useState<StageId | null>(null);
  const [showGuidelines, setShowGuidelines] = useState<boolean>(false);
  const [showAccounts, setShowAccounts] = useState<boolean>(false);
  const [showExport, setShowExport] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [chatTargetGroupId, setChatTargetGroupId] = useState<string | undefined>(undefined);

  const handleOpenChatWithGroup = (groupId: string) => {
    setChatTargetGroupId(groupId);
    setSelectedGroupId(groupId);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navbar */}
      <Navbar
        onOpenGuidelines={() => setShowGuidelines(true)}
        onOpenAccounts={() => setShowAccounts(true)}
        onOpenExport={() => setShowExport(true)}
        onToggleChat={() => {
          setChatTargetGroupId(undefined);
          setIsChatOpen(prev => !prev);
        }}
        onToggleNotifications={() => setIsNotificationsOpen(prev => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          currentUser.role === 'guru' ? (
            <TeacherDashboard
              onOpenReviewModal={(sub) => setReviewSubmission(sub)}
              onOpenExportModal={() => setShowExport(true)}
              onOpenAccountsModal={() => setShowAccounts(true)}
              onGoToAnalytics={() => setActiveTab('analytics')}
              onOpenChatWithGroup={handleOpenChatWithGroup}
            />
          ) : (
            <StudentDashboard
              onOpenSubmitModal={(stageId) => setSubmitModalStageId(stageId)}
              onOpenChat={() => setIsChatOpen(true)}
              onOpenGuidelines={() => setShowGuidelines(true)}
            />
          )
        )}

        {activeTab === 'calendar' && <ProjectCalendar />}

        {activeTab === 'analytics' && currentUser.role === 'guru' && <AnalyticsView />}

        {activeTab === 'analytics' && currentUser.role === 'siswa' && (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-lg font-bold">Akses Terbatas untuk Siswa</h3>
            <p className="text-xs text-slate-500">
              Analitik kelas menyeluruh dikhususkan untuk Guru Pembimbing. Anda dapat melihat progres kelompok Anda di menu Dashboard.
            </p>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold"
            >
              Kembali ke Dashboard
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">SiPantau PjBL</span>
            <span>•</span>
            <span>Konsentrasi Keahlian Desain Komunikasi Visual (DKV)</span>
            <span>•</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">SMK Negeri 1 Surabaya</span>
          </div>
          <div>
            Projek: Perancangan Lini Produk Merchandise Pariwisata Budaya Jawa Timur
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Quick Guidelines on Mobile */}
      <div className="no-print fixed bottom-6 left-6 z-30 sm:hidden">
        <button
          onClick={() => setShowGuidelines(true)}
          className="p-3 bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 rounded-full shadow-lg shadow-black/20 flex items-center justify-center font-bold text-xs"
        >
          📖 Brief
        </button>
      </div>

      {/* Modals & Drawers */}
      {reviewSubmission && (
        <ReviewModal
          submission={reviewSubmission}
          onClose={() => setReviewSubmission(null)}
        />
      )}

      {submitModalStageId !== null && (
        <SubmissionModal
          stageId={submitModalStageId}
          onClose={() => setSubmitModalStageId(null)}
        />
      )}

      {showGuidelines && (
        <MaterialGuidelineModal onClose={() => setShowGuidelines(false)} />
      )}

      {showAccounts && (
        <AccountManagementModal onClose={() => setShowAccounts(false)} />
      )}

      {showExport && (
        <ExportReportsModal onClose={() => setShowExport(false)} />
      )}

      <MessagingDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        targetGroupId={chatTargetGroupId}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
