import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Moon,
  Sun,
  Users,
  Calendar,
  BarChart3,
  BookOpen,
  MessageSquare,
  FileSpreadsheet,
  UserCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface NavbarProps {
  onOpenGuidelines: () => void;
  onOpenAccounts: () => void;
  onOpenExport: () => void;
  onToggleChat: () => void;
  onToggleNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGuidelines,
  onOpenAccounts,
  onOpenExport,
  onToggleChat,
  onToggleNotifications
}) => {
  const {
    currentUser,
    users,
    switchUser,
    theme,
    toggleTheme,
    pushNotificationEnabled,
    togglePushNotifications,
    notifications,
    activeTab,
    setActiveTab,
    groups,
    selectedGroupId,
    setSelectedGroupId
  } = useApp();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & School Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-amber-500/20">
              DKV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  SiPantau PjBL
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 rounded-full border border-amber-300 dark:border-amber-700/50">
                  SMKN 1 Surabaya
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Merchandise Pariwisata Budaya Jawa Timur
              </p>
            </div>
          </div>

          {/* Navigation Links (Tabs) */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                activeTab === 'calendar'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Jadwal & Deadline
            </button>
            {currentUser.role === 'guru' && (
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Analitik Kelas
              </button>
            )}
            <button
              onClick={onOpenGuidelines}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Materi & Brief
            </button>
          </nav>

          {/* Action Tools & User Profiles */}
          <div className="flex items-center gap-2">
            {/* Quick Export for teachers */}
            {currentUser.role === 'guru' && (
              <button
                onClick={onOpenExport}
                title="Ekspor Laporan Nilai PDF & Excel"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Ekspor Nilai
              </button>
            )}

            {/* Discussion / Chat button */}
            <button
              onClick={onToggleChat}
              title="Pesan & Umpan Balik Tim"
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={onToggleNotifications}
              title="Notifikasi Progres"
              className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Web Push Notification Toggle */}
            <button
              onClick={togglePushNotifications}
              title={pushNotificationEnabled ? 'Push Notification Aktif' : 'Aktifkan Push Notification'}
              className={`p-2 rounded-lg transition-colors ${
                pushNotificationEnabled
                  ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                  : 'text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="relative">
                <Bell className="w-5 h-5" />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ${
                    pushNotificationEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              </div>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* User Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 bg-slate-50 dark:bg-slate-800/80 transition-all text-left"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
                <div className="hidden lg:block">
                  <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 max-w-[130px]">
                    {currentUser.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        currentUser.role === 'guru' ? 'bg-indigo-500' : 'bg-emerald-500'
                      }`}
                    />
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">
                      {currentUser.role}
                    </span>
                  </div>
                </div>
              </button>

              {/* User Switcher Popover */}
              {showUserDropdown && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                      Profil Aktif
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-mono">
                        {currentUser.role === 'guru' ? 'NIP' : 'NISN'}: {currentUser.nipOrNisn}
                      </span>
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded text-amber-800 dark:text-amber-300 font-medium">
                        {currentUser.title}
                      </span>
                    </div>
                  </div>

                  {/* Switch to Teacher or Student */}
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Beralih Pengguna (Role Demo)
                  </span>
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                    {users.map(u => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setShowUserDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                          u.id === currentUser.id
                            ? 'bg-amber-500 text-white font-semibold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              u.role === 'guru' ? 'bg-indigo-400' : 'bg-emerald-400'
                            }`}
                          />
                          <div>
                            <div className="font-medium line-clamp-1">{u.name}</div>
                            <div className="text-[10px] opacity-75">{u.role === 'guru' ? 'Guru' : 'Siswa'}</div>
                          </div>
                        </div>
                        {u.id === currentUser.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>

                  {/* Group switcher if teacher wants to focus on a particular group */}
                  {currentUser.role === 'guru' && (
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <label className="text-[11px] font-semibold text-slate-400 uppercase block mb-1">
                        Pilih Fokus Kelompok:
                      </label>
                      <select
                        value={selectedGroupId}
                        onChange={e => setSelectedGroupId(e.target.value)}
                        className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-slate-800 dark:text-slate-200"
                      >
                        {groups.map(g => (
                          <option key={g.id} value={g.id}>
                            {g.agencyName} ({g.destinationCity})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Account management link */}
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onOpenAccounts();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                    >
                      <Users className="w-3.5 h-3.5" />
                      Kelola Akun Guru & Kelompok Baru
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-1 px-3 rounded-lg font-medium ${
              activeTab === 'dashboard'
                ? 'bg-amber-500 text-white'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-1 px-3 rounded-lg font-medium ${
              activeTab === 'calendar'
                ? 'bg-amber-500 text-white'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Jadwal
          </button>
          {currentUser.role === 'guru' && (
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-1 px-3 rounded-lg font-medium ${
                activeTab === 'analytics'
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Analitik
            </button>
          )}
          <button
            onClick={onOpenGuidelines}
            className="py-1 px-3 rounded-lg font-medium text-slate-600 dark:text-slate-300"
          >
            Brief
          </button>
        </div>
      </div>
    </header>
  );
};
