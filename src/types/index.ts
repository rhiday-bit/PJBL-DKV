export type UserRole = 'guru' | 'siswa';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  nipOrNisn: string;
  groupId?: string; // if student
  title?: string; // e.g. "Guru Pembimbing DKV", "Ketua Kelompok"
}

export type StageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ProjectStage {
  id: StageId;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  monthSchedule: string; // e.g. "Sept II - IV"
  targetDeliverables: string[];
  minScoreToPass: number; // default 75
}

export type SubmissionStatus = 
  | 'belum_mengirim' // Not submitted
  | 'menunggu_review' // Submitted, waiting review
  | 'perlu_revisi' // Reviewed, needs revision
  | 'layak_lolos'; // Approved, eligible to advance

export interface SubmissionDeliverable {
  itemType: 'kaos' | 'totebag' | 'tumbler' | 'pin_ganci' | 'stiker' | 'packaging' | 'vektor_ai_cdr' | 'png_hd' | 'display_pameran';
  title: string;
  requiredCount: number;
  completedCount: number;
  notes?: string;
}

export interface TeacherFeedback {
  id: string;
  teacherId: string;
  teacherName: string;
  createdAt: string;
  rubric: {
    kreativitas: number; // 0-100
    relevansiBudaya: number; // 0-100
    kualitasTeknis: number; // 0-100
    kesesuaianBrief: number; // 0-100
  };
  totalScore: number;
  isEligibleForNextStage: boolean;
  generalComment: string;
  revisionNotes?: string;
}

export interface SubmissionAttachment {
  id: string;
  name: string;
  fileType: string;
  fileUrl: string;
  fileSize: string;
  uploadedAt: string;
}

export interface StageSubmission {
  id: string;
  groupId: string;
  stageId: StageId;
  title: string;
  status: SubmissionStatus;
  submittedAt?: string;
  updatedAt?: string;
  description: string;
  attachments: SubmissionAttachment[];
  deliverablesSummary: SubmissionDeliverable[];
  feedback?: TeacherFeedback;
}

export interface AgencyGroup {
  id: string;
  agencyName: string;
  destinationCity: 'Banyuwangi' | 'Ponorogo' | 'Malang' | 'Surabaya' | 'Madiun' | 'Madura';
  projectType: 'Iconic Tourism' | 'Local Culture' | 'Wisata dalam Satu Ilustrasi' | 'Tourist Souvenir Brand';
  tourismCategory: 'Pantai' | 'Budaya' | 'Kuliner' | 'Sejarah' | 'Ekowisata' | 'Pegunungan';
  visualTheme: string; // e.g. "Reog Ponorogo Warok Modern"
  leaderName: string;
  members: string[];
  currentStageId: StageId;
  overallScore: number;
  progressPercentage: number;
  avatarLogo: string;
}

export interface ChatMessage {
  id: string;
  groupId: string;
  stageId?: StageId;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  isTeacherFeedbackAlert?: boolean;
}

export interface AppNotification {
  id: string;
  targetRole: 'all' | 'guru' | 'siswa';
  targetGroupId?: string;
  title: string;
  message: string;
  type: 'submission' | 'approval' | 'revision' | 'milestone' | 'deadline';
  createdAt: string;
  isRead: boolean;
  score?: number;
  linkStageId?: StageId;
}

export interface CalendarDeadline {
  id: string;
  stageId: StageId;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  periodLabel: string; // e.g. "September Minggu ke-2 - Minggu ke-4"
  description: string;
  type: 'milestone' | 'submission_deadline' | 'exhibition';
}
