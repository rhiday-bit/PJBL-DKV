import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  UserRole,
  AgencyGroup,
  StageSubmission,
  ProjectStage,
  AppNotification,
  CalendarDeadline,
  ChatMessage,
  TeacherFeedback,
  StageId
} from '../types';
import {
  PROJECT_STAGES,
  INITIAL_USERS,
  INITIAL_GROUPS,
  INITIAL_SUBMISSIONS,
  INITIAL_CALENDAR_DEADLINES,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHATS
} from '../data/initialData';

interface AppContextType {
  currentUser: User;
  users: User[];
  groups: AgencyGroup[];
  stages: ProjectStage[];
  submissions: StageSubmission[];
  notifications: AppNotification[];
  calendarDeadlines: CalendarDeadline[];
  chatMessages: ChatMessage[];
  selectedGroupId: string;
  theme: 'light' | 'dark';
  pushNotificationEnabled: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSelectedGroupId: (groupId: string) => void;
  toggleTheme: () => void;
  togglePushNotifications: () => Promise<boolean>;
  switchUser: (userId: string) => void;
  submitStageTask: (
    groupId: string,
    stageId: StageId,
    data: {
      title: string;
      description: string;
      attachments: { name: string; fileType: string; fileSize: string; fileUrl: string }[];
      deliverablesCompleted: { [key: string]: number };
    }
  ) => void;
  reviewSubmission: (
    submissionId: string,
    rubric: { kreativitas: number; relevansiBudaya: number; kualitasTeknis: number; kesesuaianBrief: number },
    isEligible: boolean,
    generalComment: string,
    revisionNotes?: string
  ) => void;
  sendChatMessage: (groupId: string, text: string, stageId?: StageId) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addUser: (userData: Omit<User, 'id'>) => void;
  addGroup: (groupData: Omit<AgencyGroup, 'id' | 'currentStageId' | 'overallScore' | 'progressPercentage'>) => void;
  triggerBrowserNotification: (title: string, body: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sipantau_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sipantau_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Push notification state
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState<boolean>(() => {
    return localStorage.getItem('sipantau_push_enabled') === 'true';
  });

  // Users & Current User
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sipantau_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem('sipantau_current_user_id');
    return saved || INITIAL_USERS[0].id;
  });

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  // Groups
  const [groups, setGroups] = useState<AgencyGroup[]>(() => {
    const saved = localStorage.getItem('sipantau_groups');
    return saved ? JSON.parse(saved) : INITIAL_GROUPS;
  });

  // Submissions
  const [submissions, setSubmissions] = useState<StageSubmission[]>(() => {
    const saved = localStorage.getItem('sipantau_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('sipantau_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Calendar
  const [calendarDeadlines] = useState<CalendarDeadline[]>(INITIAL_CALENDAR_DEADLINES);
  const [stages] = useState<ProjectStage[]>(PROJECT_STAGES);

  // Chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sipantau_chats');
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Selected Group ID for detail viewing (defaults to student's own group or first group)
  const [selectedGroupId, setSelectedGroupId] = useState<string>(() => {
    if (currentUser.role === 'siswa' && currentUser.groupId) {
      return currentUser.groupId;
    }
    return INITIAL_GROUPS[0].id;
  });

  // Sync selected group when switching user
  useEffect(() => {
    if (currentUser.role === 'siswa' && currentUser.groupId) {
      setSelectedGroupId(currentUser.groupId);
    }
  }, [currentUser]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('sipantau_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('sipantau_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('sipantau_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('sipantau_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('sipantau_chats', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('sipantau_current_user_id', currentUserId);
  }, [currentUserId]);

  // Helper trigger browser push notification
  const triggerBrowserNotification = (title: string, body: string) => {
    if (pushNotificationEnabled && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico'
        });
      } catch (err) {
        console.warn('Native notification failed:', err);
      }
    }
  };

  const togglePushNotifications = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      alert('Browser ini tidak mendukung Web Push Notification.');
      return false;
    }

    if (!pushNotificationEnabled) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setPushNotificationEnabled(true);
          localStorage.setItem('sipantau_push_enabled', 'true');
          triggerBrowserNotification('Notifikasi Diaktifkan', 'Anda akan menerima pembaruan berkala tentang progres tugas siswa!');
          return true;
        } else {
          alert('Izin notifikasi ditolak oleh peramban.');
          return false;
        }
      } catch {
        setPushNotificationEnabled(true);
        localStorage.setItem('sipantau_push_enabled', 'true');
        return true;
      }
    } else {
      setPushNotificationEnabled(false);
      localStorage.setItem('sipantau_push_enabled', 'false');
      return false;
    }
  };

  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(userId);
      if (target.role === 'siswa' && target.groupId) {
        setSelectedGroupId(target.groupId);
      }
    }
  };

  // Submit/Update task from student side
  const submitStageTask = (
    groupId: string,
    stageId: StageId,
    data: {
      title: string;
      description: string;
      attachments: { name: string; fileType: string; fileSize: string; fileUrl: string }[];
      deliverablesCompleted: { [key: string]: number };
    }
  ) => {
    const group = groups.find(g => g.id === groupId);
    const stage = stages.find(s => s.id === stageId);
    const groupName = group ? group.agencyName : 'Kelompok Siswa';
    const stageTitle = stage ? stage.title : `Tahap ${stageId}`;

    const existingIndex = submissions.findIndex(s => s.groupId === groupId && s.stageId === stageId);
    const nowISO = new Date().toISOString();

    const formattedAttachments = data.attachments.map((att, i) => ({
      id: `att-${Date.now()}-${i}`,
      name: att.name,
      fileType: att.fileType,
      fileUrl: att.fileUrl,
      fileSize: att.fileSize,
      uploadedAt: new Date().toLocaleString('id-ID')
    }));

    // Default deliverables summary mapped
    const deliverablesSummary = (stage?.targetDeliverables || []).map(item => ({
      itemType: 'kaos' as const,
      title: item,
      requiredCount: 1,
      completedCount: data.deliverablesCompleted[item] ? 1 : 1
    }));

    let updatedSubmissions: StageSubmission[];

    if (existingIndex >= 0) {
      const existing = submissions[existingIndex];
      const updated: StageSubmission = {
        ...existing,
        title: data.title,
        description: data.description,
        status: 'menunggu_review',
        updatedAt: nowISO,
        attachments: [...existing.attachments, ...formattedAttachments],
        deliverablesSummary
      };
      updatedSubmissions = [...submissions];
      updatedSubmissions[existingIndex] = updated;
    } else {
      const newSub: StageSubmission = {
        id: `sub-${Date.now()}`,
        groupId,
        stageId,
        title: data.title,
        description: data.description,
        status: 'menunggu_review',
        submittedAt: nowISO,
        updatedAt: nowISO,
        attachments: formattedAttachments,
        deliverablesSummary
      };
      updatedSubmissions = [newSub, ...submissions];
    }

    setSubmissions(updatedSubmissions);

    // Push notification to teachers
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'guru',
      title: `📤 Kiriman Tugas Baru: ${groupName}`,
      message: `${groupName} telah mengunggah pembaruan tugas untuk ${stageTitle}. Siap untuk diperiksa & dinilai kelayakannya.`,
      type: 'submission',
      createdAt: 'Baru saja',
      isRead: false,
      linkStageId: stageId
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Send automated chat message in the group thread
    const newChat: ChatMessage = {
      id: `chat-${Date.now()}`,
      groupId,
      stageId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: 'siswa',
      text: `[SISTEM] Kami telah memperbarui kiriman tugas untuk ${stageTitle}: "${data.title}". Menunggu kurasi & umpan balik dari Bapak/Ibu Guru.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newChat]);

    triggerBrowserNotification(
      `Pembaruan Tugas: ${groupName}`,
      `Tugas ${stageTitle} berhasil dikirim dan menunggu penilaian.`
    );
  };

  // Review & scoring from teacher side (Gating Approval)
  const reviewSubmission = (
    submissionId: string,
    rubric: { kreativitas: number; relevansiBudaya: number; kualitasTeknis: number; kesesuaianBrief: number },
    isEligible: boolean,
    generalComment: string,
    revisionNotes?: string
  ) => {
    const subIndex = submissions.findIndex(s => s.id === submissionId);
    if (subIndex === -1) return;

    const targetSub = submissions[subIndex];
    const totalScore = Math.round(
      (rubric.kreativitas + rubric.relevansiBudaya + rubric.kualitasTeknis + rubric.kesesuaianBrief) / 4
    );

    const nowISO = new Date().toISOString();
    const stage = stages.find(s => s.id === targetSub.stageId);
    const minPass = stage?.minScoreToPass || 75;

    // Check passing requirement: user marked eligible AND score >= minPass
    const passed = isEligible && totalScore >= minPass;

    const teacherFeedback: TeacherFeedback = {
      id: `fb-${Date.now()}`,
      teacherId: currentUser.id,
      teacherName: currentUser.name,
      createdAt: nowISO,
      rubric,
      totalScore,
      isEligibleForNextStage: passed,
      generalComment,
      revisionNotes
    };

    const updatedSub: StageSubmission = {
      ...targetSub,
      status: passed ? 'layak_lolos' : 'perlu_revisi',
      feedback: teacherFeedback
    };

    const newSubmissionsList = [...submissions];
    newSubmissionsList[subIndex] = updatedSub;
    setSubmissions(newSubmissionsList);

    const group = groups.find(g => g.id === targetSub.groupId);
    const groupName = group ? group.agencyName : 'Kelompok Siswa';

    if (passed) {
      // Trigger confetti celebrate
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti error', err);
      }

      // Update Group progression if they advanced
      if (group) {
        const nextStageId = Math.min(8, (targetSub.stageId + 1) as StageId) as StageId;
        const newProgressPercentage = Math.round((Math.max(group.currentStageId, nextStageId) / 8) * 100);

        // Recalculate average score
        const allGroupSubmissions = newSubmissionsList.filter(s => s.groupId === group.id && s.feedback);
        const avgScore = allGroupSubmissions.length > 0
          ? Math.round(allGroupSubmissions.reduce((acc, s) => acc + (s.feedback?.totalScore || 0), 0) / allGroupSubmissions.length)
          : totalScore;

        setGroups(prev =>
          prev.map(g => {
            if (g.id === group.id) {
              return {
                ...g,
                currentStageId: targetSub.stageId >= g.currentStageId ? nextStageId : g.currentStageId,
                progressPercentage: newProgressPercentage,
                overallScore: avgScore
              };
            }
            return g;
          })
        );
      }

      // Notification for Student
      const nextStageTitle = stages.find(s => s.id === (targetSub.stageId + 1))?.title || 'Pameran Akhir';
      const congratsNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        targetRole: 'siswa',
        targetGroupId: targetSub.groupId,
        title: `🎉 Selamat! Tahap ${targetSub.stageId} Dinyatakan LAYAK (${totalScore}/100)`,
        message: `Guru Pembimbing telah menyetujui tugas ${stage?.title} dengan skor ${totalScore}. Anda resmi berhak melanjutkan ke Tahap ${targetSub.stageId < 8 ? targetSub.stageId + 1 : 8}: ${nextStageTitle}!`,
        type: 'approval',
        createdAt: 'Baru saja',
        isRead: false,
        score: totalScore,
        linkStageId: targetSub.stageId
      };
      setNotifications(prev => [congratsNotif, ...prev]);

      // Chat Message
      const feedbackChat: ChatMessage = {
        id: `chat-${Date.now()}`,
        groupId: targetSub.groupId,
        stageId: targetSub.stageId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: 'guru',
        text: `🌟 [HASIL KURASI - LAYAK LOLOS] Selamat tim ${groupName}! Tugas ${stage?.title} memperoleh nilai ${totalScore}/100. "${generalComment}". Gerbang menuju tahap selanjutnya telah dibuka!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTeacherFeedbackAlert: true
      };
      setChatMessages(prev => [...prev, feedbackChat]);

      triggerBrowserNotification(
        `Selamat ${groupName}! Skor: ${totalScore}`,
        `Tugas Anda dinyatakan LAYAK beralih ke tugas selanjutnya.`
      );
    } else {
      // Notification for Revision
      const revisionNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        targetRole: 'siswa',
        targetGroupId: targetSub.groupId,
        title: `⚠️ Catatan Revisi Tugas Tahap ${targetSub.stageId}`,
        message: `Tugas ${stage?.title} memperoleh nilai ${totalScore}. Diperlukan revisi sebelum diizinkan melangkah ke tahap berikutnya. Catatan: ${revisionNotes || generalComment}`,
        type: 'revision',
        createdAt: 'Baru saja',
        isRead: false,
        score: totalScore,
        linkStageId: targetSub.stageId
      };
      setNotifications(prev => [revisionNotif, ...prev]);

      // Chat Message
      const revisionChat: ChatMessage = {
        id: `chat-${Date.now()}`,
        groupId: targetSub.groupId,
        stageId: targetSub.stageId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderRole: 'guru',
        text: `⚠️ [CATATAN KURASI - PERLU REVISI] Nilai: ${totalScore}/100. ${generalComment}. Harap lakukan perbaikan sesuai catatan: "${revisionNotes || 'Perbaiki aspek teknis & konsep budaya'}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTeacherFeedbackAlert: true
      };
      setChatMessages(prev => [...prev, revisionChat]);

      triggerBrowserNotification(
        `Revisi Diperlukan: ${groupName}`,
        `Tugas ${stage?.title} membutuhkan revisi sebelum melangkah ke tahap selanjutnya.`
      );
    }
  };

  const sendChatMessage = (groupId: string, text: string, stageId?: StageId) => {
    if (!text.trim()) return;
    const newChat: ChatMessage = {
      id: `chat-${Date.now()}`,
      groupId,
      stageId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newChat]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`
    };
    setUsers(prev => [...prev, newUser]);
  };

  const addGroup = (groupData: Omit<AgencyGroup, 'id' | 'currentStageId' | 'overallScore' | 'progressPercentage'>) => {
    const newGroup: AgencyGroup = {
      ...groupData,
      id: `group-${Date.now()}`,
      currentStageId: 1,
      overallScore: 0,
      progressPercentage: 10
    };
    setGroups(prev => [...prev, newGroup]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        groups,
        stages,
        submissions,
        notifications,
        calendarDeadlines,
        chatMessages,
        selectedGroupId,
        theme,
        pushNotificationEnabled,
        activeTab,
        setActiveTab,
        setSelectedGroupId,
        toggleTheme,
        togglePushNotifications,
        switchUser,
        submitStageTask,
        reviewSubmission,
        sendChatMessage,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addUser,
        addGroup,
        triggerBrowserNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
