import { ProjectStage, AgencyGroup, StageSubmission, User, CalendarDeadline, AppNotification, ChatMessage } from '../types';

export const PROJECT_STAGES: ProjectStage[] = [
  {
    id: 1,
    code: '01',
    title: 'Research & Identifikasi',
    subtitle: 'Riset Potensi, Ikon, Budaya & Daya Tarik',
    description: 'Mengidentifikasi sejarah, keunikan, ikon, budaya, kuliner, flora/fauna, serta karakter khas daerah wisata Jawa Timur yang dipilih.',
    monthSchedule: 'Sept II - IV',
    targetDeliverables: [
      'Dokumen riset demografi & keunikan daerah wisata',
      'Peta ikon budaya & visual heritage',
      'Laporan analisis SWOT & potensi pasar souvenir'
    ],
    minScoreToPass: 75
  },
  {
    id: 2,
    code: '02',
    title: 'Design Brief & Konsep',
    subtitle: 'Target Audiens, Tujuan & Gaya Visual',
    description: 'Menentukan target audiens wisatawan (lokal/mancanegara), tujuan desain, positioning brand, pesan kunci, serta penetapan gaya visual (retro tourism, modern flat, pop art, pattern kontemporer).',
    monthSchedule: 'Sept IV - Okt I',
    targetDeliverables: [
      'Lembar Design Brief resmi agency',
      'Matriks target audiens & user persona',
      'Pernyataan visi desain merchandise daerah'
    ],
    minScoreToPass: 75
  },
  {
    id: 3,
    code: '03',
    title: 'Eksplorasi Visual',
    subtitle: 'Moodboard, Mindmap, Sketch & Tipografi',
    description: 'Membuat moodboard, mindmap ide, puluhan thumbnail sketch pensil/digital, eksplorasi palet warna khas Jawa Timur, dan seleksi tipografi identitas.',
    monthSchedule: 'Okt II',
    targetDeliverables: [
      'Moodboard referensi visual & warna',
      'Minimal 10 thumbnail sketch eksplorasi',
      'Studi tipografi & color palette guide'
    ],
    minScoreToPass: 75
  },
  {
    id: 4,
    code: '04',
    title: 'Final Digital Design',
    subtitle: 'Master Vektor & Aset Digital Siap Cetak',
    description: 'Menghasilkan desain final digital siap aplikasi: 3 Desain Kaos A4, 3 Desain Totebag A4, 2 Desain Tumbler, 2 Desain PIN/Ganci, dan 2 Stiker dalam format vektor mentah (.ai/.cdr) dan PNG High-Res.',
    monthSchedule: 'Okt II - IV',
    targetDeliverables: [
      '3 Desain Kaos Full Color A4',
      '3 Desain Totebag Full Color A4',
      '2 Desain Tumbler Sublim/Sablon',
      '2 Desain PIN & 2 Gantungan Kunci',
      '2 Desain Stiker Die-cut',
      'Aset master format Vector (.ai / .cdr) & PNG HD'
    ],
    minScoreToPass: 78
  },
  {
    id: 5,
    code: '05',
    title: 'Merchandise Production',
    subtitle: 'Cetak Fisik & Sampling Prototype',
    description: 'Melakukan proses produksi fisik dan cetak sample prototype minimal 4 jenis merchandise (Kaos, Totebag, Tumbler, Stiker, PIN, Ganci) dengan pengawasan kontrol kualitas (QC) warna dan bahan.',
    monthSchedule: 'Nov I - IV',
    targetDeliverables: [
      'Sample fisik cetak kaos & totebag',
      'Sample fisik cetak tumbler stainless/plastik',
      'Sample cetak merchandise cetak ganci/pin & stiker vinyl',
      'Laporan quality control (QC) hasil cetak'
    ],
    minScoreToPass: 80
  },
  {
    id: 6,
    code: '06',
    title: 'Packaging & Identity',
    subtitle: 'Kemasan, Hang Tag & Story Card Wisata',
    description: 'Merancang kemasan produk yang ramah lingkungan, label woven/sablon, hang tag premium, kartu narasi informasi wisata daerah, dan unboxing experience yang memikat.',
    monthSchedule: 'Nov III - IV',
    targetDeliverables: [
      'Desain & mock kemasan dus/pouch ramah lingkungan',
      'Hang tag merchandise & label produk',
      'Kartu informasi / story card sejarah destinasi Jatim'
    ],
    minScoreToPass: 78
  },
  {
    id: 7,
    code: '07',
    title: 'Marketing & Promosi',
    subtitle: 'Katalog, Foto Produk & Video Campaign',
    description: 'Memproduksi aset promosi pemasaran terpadu: sesi foto produk komersial, poster promosi A2, feeding media sosial Instagram/TikTok/Reels, dan video teaser promosi merchandise.',
    monthSchedule: 'Nov I - Des I',
    targetDeliverables: [
      'Katalog foto produk lookbook studio & outdoor',
      'Poster promosi ukuran A2 & banner digital',
      'Konten feeds carousel & reels Instagram',
      'Video promosi teaser 30-60 detik'
    ],
    minScoreToPass: 80
  },
  {
    id: 8,
    code: '08',
    title: 'Exhibition & Pitching',
    subtitle: 'Pameran PjBL & Presentasi Konsep Karya',
    description: 'Menyiapkan konsep booth display pameran "PjBL Merchandise Exhibition" SMKN 1 Surabaya, menata display karya secara artistik, dan mempresentasikan konsep bisnis kepada kurator/guru & publik.',
    monthSchedule: 'Des I - II',
    targetDeliverables: [
      'Denah & rancangan booth display 3D/maket',
      'Display instalasi fisik lengkap semua lini merchandise',
      'Slide presentasi pitching & evaluasi komersial'
    ],
    minScoreToPass: 80
  }
];

export const DESTINATION_OPTIONS = [
  { city: 'Surabaya', category: 'Sejarah & Budaya', highlights: 'Tugu Pahlawan, Suro & Boyo, Jembatan Merah, Kuliner Rujak Uleg' },
  { city: 'Ponorogo', category: 'Seni Budaya Luhur', highlights: 'Reog Ponorogo, Warok, Jathil, Seni Kriya & Ornamen Tradisional' },
  { city: 'Banyuwangi', category: 'Pantai & Ekowisata', highlights: 'Kawah Ijen Blue Fire, Suku Osing, Pantai Pulau Merah, Alas Purwo' },
  { city: 'Malang', category: 'Pegunungan & Heritage', highlights: 'Bromo Tengger Semeru, Apel Batu, Kampung Warna Warni, Osob Kiwalan' },
  { city: 'Madiun', category: 'Budaya & Kuliner', highlights: 'Kota Pendekar, Pecel Madiun, Sejarah Industri Kereta Api INKA' },
  { city: 'Madura', category: 'Budaya Bahari', highlights: 'Karapan Sapi, Batik Gentongan Bangkalan, Suramadu, Pantai Lombang' }
];

export const SPECIFIC_PROJECT_TYPES = [
  { title: 'Iconic Tourism', desc: 'Mengubah ikon wisata menjadi ilustrasi aplikatif pada kaos, tumbler, totebag, stiker, dan pin.' },
  { title: 'Local Culture', desc: 'Mengeksplorasi motif, pakaian adat, dan ornamen tradisional menjadi pattern kontemporer modern.' },
  { title: 'Wisata dalam Satu Ilustrasi', desc: 'Menyatukan minimal 4 elemen khas daerah dalam 1 key visual harmonis.' },
  { title: 'Tourist Souvenir Brand', desc: 'Membangun ekosistem brand merchandise lengkap: logo, visual identity, packaging, dan strategi promosi.' }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'teacher-1',
    name: 'Hendra Dwi Prasetyo, S.Pd., M.Sn.',
    email: 'hendra.dkv@smkn1-surabaya.sch.id',
    role: 'guru',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    nipOrNisn: '19840512 200801 1 008',
    title: 'Guru Pembimbing & Kurator PjBL DKV'
  },
  {
    id: 'teacher-2',
    name: 'Siti Rahayu, S.Sn.',
    email: 'siti.rahayu@smkn1-surabaya.sch.id',
    role: 'guru',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    nipOrNisn: '19890918 201202 2 004',
    title: 'Guru Pengampu Produksi Grafika DKV'
  },
  {
    id: 'student-1',
    name: 'Budi Pratama (Ketua Kelompok 1)',
    email: 'budi.pratama@smkn1-sby.id',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    nipOrNisn: '0068912345',
    groupId: 'group-1',
    title: 'Creative Lead - Suroboyo Heritage Studio'
  },
  {
    id: 'student-2',
    name: 'Dimas Setiawan (Ketua Kelompok 2)',
    email: 'dimas.setiawan@smkn1-sby.id',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    nipOrNisn: '0067823412',
    groupId: 'group-2',
    title: 'Creative Lead - Singo Barong Creative'
  },
  {
    id: 'student-3',
    name: 'Nabila Putri (Ketua Kelompok 3)',
    email: 'nabila.putri@smkn1-sby.id',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    nipOrNisn: '0069123847',
    groupId: 'group-3',
    title: 'Creative Lead - Osing Sunrise Visual'
  }
];

export const INITIAL_GROUPS: AgencyGroup[] = [
  {
    id: 'group-1',
    agencyName: 'Suroboyo Heritage Studio',
    destinationCity: 'Surabaya',
    projectType: 'Tourist Souvenir Brand',
    tourismCategory: 'Sejarah',
    visualTheme: 'Surabaya Juang & Modern Vintage Pop Art',
    leaderName: 'Budi Pratama',
    members: ['Budi Pratama', 'Aulia Rahmawati', 'Fajar Ramadhan', 'Dina Kurniawati', 'Bagus Saputra'],
    currentStageId: 4,
    overallScore: 88,
    progressPercentage: 50,
    avatarLogo: '🏛️'
  },
  {
    id: 'group-2',
    agencyName: 'Singo Barong Creative',
    destinationCity: 'Ponorogo',
    projectType: 'Local Culture',
    tourismCategory: 'Budaya',
    visualTheme: 'Mistis Megah Reog Ponorogo Kontemporer',
    leaderName: 'Dimas Setiawan',
    members: ['Dimas Setiawan', 'Larasati Dewi', 'Bayu Anggoro', 'Citra Permata', 'Eko Wahyudi', 'Rina Tri'],
    currentStageId: 3,
    overallScore: 84,
    progressPercentage: 38,
    avatarLogo: '🦁'
  },
  {
    id: 'group-3',
    agencyName: 'Osing Sunrise Visual',
    destinationCity: 'Banyuwangi',
    projectType: 'Iconic Tourism',
    tourismCategory: 'Pantai',
    visualTheme: 'The Sunrise of Java: Ijen Api Biru & Gandrung',
    leaderName: 'Nabila Putri',
    members: ['Nabila Putri', 'Aris Munandar', 'Tania Safitri', 'Galih Prasetyo', 'Zahra Amelia'],
    currentStageId: 5,
    overallScore: 92,
    progressPercentage: 62,
    avatarLogo: '🌋'
  },
  {
    id: 'group-4',
    agencyName: 'Arema Apel Motion',
    destinationCity: 'Malang',
    projectType: 'Wisata dalam Satu Ilustrasi',
    tourismCategory: 'Pegunungan',
    visualTheme: 'Panorama Bromo-Semeru & Apel Heritage',
    leaderName: 'Farhan Maulana',
    members: ['Farhan Maulana', 'Gita Gutawa', 'Hadi Sucipto', 'Indah Permatasari', 'Joko Susilo'],
    currentStageId: 2,
    overallScore: 78,
    progressPercentage: 25,
    avatarLogo: '🍎'
  },
  {
    id: 'group-5',
    agencyName: 'Karapan Art Lab',
    destinationCity: 'Madura',
    projectType: 'Local Culture',
    tourismCategory: 'Budaya',
    visualTheme: 'Dinamika Semangat Karapan Sapi & Batik Gentongan',
    leaderName: 'Siti Rahmawati',
    members: ['Siti Rahmawati', 'Kresna Wardana', 'Lukman Hakim', 'Maya Anggraini', 'Nurul Hidayat', 'Oki Setiawan'],
    currentStageId: 1,
    overallScore: 74,
    progressPercentage: 12,
    avatarLogo: '🐂'
  },
  {
    id: 'group-6',
    agencyName: 'Madiun Pendekar Craft',
    destinationCity: 'Madiun',
    projectType: 'Tourist Souvenir Brand',
    tourismCategory: 'Sejarah',
    visualTheme: 'Warisan Kota Pendekar & Lokomotif Sejarah',
    leaderName: 'Rizky Ananda',
    members: ['Rizky Ananda', 'Pandu Pratama', 'Qori Annisa', 'Restu Adi', 'Salsa Bella'],
    currentStageId: 3,
    overallScore: 82,
    progressPercentage: 38,
    avatarLogo: '⚔️'
  }
];

export const INITIAL_SUBMISSIONS: StageSubmission[] = [
  // Group 1 (Surabaya) - Stage 1 (Approved)
  {
    id: 'sub-g1-s1',
    groupId: 'group-1',
    stageId: 1,
    title: 'Laporan Riset Budaya & Destinasi Wisata Surabaya Heritage',
    status: 'layak_lolos',
    submittedAt: '2026-09-18T14:20:00Z',
    updatedAt: '2026-09-20T10:15:00Z',
    description: 'Riset mendalam mengenai arsitektur kolonial Jembatan Merah, Tugu Pahlawan, dan kuliner legendaris Rujak Uleg & Lontong Balap sebagai inspirasi visual souvenir.',
    attachments: [
      {
        id: 'att-1',
        name: 'Riset_Karakter_Surabaya_Heritage.pdf',
        fileType: 'PDF Document',
        fileUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop&q=80',
        fileSize: '4.8 MB',
        uploadedAt: '2026-09-18 14:20'
      }
    ],
    deliverablesSummary: [
      { itemType: 'packaging', title: 'Laporan Riset Demografi & Wisatawan', requiredCount: 1, completedCount: 1 }
    ],
    feedback: {
      id: 'fb-1',
      teacherId: 'teacher-1',
      teacherName: 'Hendra Dwi Prasetyo, S.Pd., M.Sn.',
      createdAt: '2026-09-20T10:15:00Z',
      rubric: { kreativitas: 88, relevansiBudaya: 92, kualitasTeknis: 86, kesesuaianBrief: 90 },
      totalScore: 89,
      isEligibleForNextStage: true,
      generalComment: 'Riset sangat komprehensif, sudut pandang Surabaya Juang sangat kuat dan orisinil!',
      revisionNotes: 'Lanjutkan ke penyusunan Design Brief dengan mempertegas segmentasi target wisatawan muda.'
    }
  },
  // Group 1 (Surabaya) - Stage 2 (Approved)
  {
    id: 'sub-g1-s2',
    groupId: 'group-1',
    stageId: 2,
    title: 'Design Brief & Positioning Brand: Suroboyo Heritage',
    status: 'layak_lolos',
    submittedAt: '2026-09-28T16:00:00Z',
    updatedAt: '2026-09-30T09:30:00Z',
    description: 'Perumusan segmentasi wisatawan Gen Z & milenial, eksplorasi gaya visual vintage retro modern, dan perumusan tone of voice merek souvenir.',
    attachments: [
      {
        id: 'att-2',
        name: 'Creative_Brief_Suroboyo_Heritage.pdf',
        fileType: 'PDF Document',
        fileUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
        fileSize: '3.2 MB',
        uploadedAt: '2026-09-28 16:00'
      }
    ],
    deliverablesSummary: [
      { itemType: 'packaging', title: 'Lembar Design Brief & Persona', requiredCount: 1, completedCount: 1 }
    ],
    feedback: {
      id: 'fb-2',
      teacherId: 'teacher-1',
      teacherName: 'Hendra Dwi Prasetyo, S.Pd., M.Sn.',
      createdAt: '2026-09-30T09:30:00Z',
      rubric: { kreativitas: 85, relevansiBudaya: 88, kualitasTeknis: 90, kesesuaianBrief: 89 },
      totalScore: 88,
      isEligibleForNextStage: true,
      generalComment: 'Konsep brand positioning sudah tepat. Target audiens terdefinisi dengan jelas.',
      revisionNotes: 'Dapat langsung melangkah ke Eksplorasi Visual (sketsa & moodboard).'
    }
  },
  // Group 1 (Surabaya) - Stage 3 (Approved)
  {
    id: 'sub-g1-s3',
    groupId: 'group-1',
    stageId: 3,
    title: 'Eksplorasi Visual: Moodboard, Thumbnail Sketsa & Tipografi',
    status: 'layak_lolos',
    submittedAt: '2026-10-06T11:30:00Z',
    updatedAt: '2026-10-08T13:40:00Z',
    description: '15 lembar thumbnail sketsa ikonik Suro & Boyo bergaya street-art heritage, moodboard palet warna merah bata & hijau daun semanggi, serta tipografi display kustom.',
    attachments: [
      {
        id: 'att-3',
        name: 'Moodboard_Sketsa_Suroboyo.jpg',
        fileType: 'Image Sheet',
        fileUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
        fileSize: '6.4 MB',
        uploadedAt: '2026-10-06 11:30'
      }
    ],
    deliverablesSummary: [
      { itemType: 'packaging', title: '15 Thumbnail Sketsa & Palet Warna', requiredCount: 1, completedCount: 1 }
    ],
    feedback: {
      id: 'fb-3',
      teacherId: 'teacher-1',
      teacherName: 'Hendra Dwi Prasetyo, S.Pd., M.Sn.',
      createdAt: '2026-10-08T13:40:00Z',
      rubric: { kreativitas: 92, relevansiBudaya: 90, kualitasTeknis: 85, kesesuaianBrief: 91 },
      totalScore: 90,
      isEligibleForNextStage: true,
      generalComment: 'Sketsa sangat dinamis! Tipografi kustom memiliki karakter kepahlawanan yang kuat. Selamat, berhak melangkah ke Tahap 4: Final Digital Design!',
      revisionNotes: 'Perhatikan detail kurva vektor saat digitalisasi agar aman ketika dicetak sablon kaos.'
    }
  },
  // Group 1 (Surabaya) - Stage 4 (Menunggu Review - current)
  {
    id: 'sub-g1-s4',
    groupId: 'group-1',
    stageId: 4,
    title: 'Paket Final Digital Design (Vector & PNG) Surabaya Juang',
    status: 'menunggu_review',
    submittedAt: '2026-10-09T08:15:00Z',
    updatedAt: '2026-10-09T08:15:00Z',
    description: 'Pengerjaan lengkap seluruh deliverable: 3 Desain Kaos A4 full color, 3 Desain Totebag A4, 2 Desain Tumbler, 2 Desain PIN/Gantungan Kunci, dan 2 Desain Stiker Die-cut. Dilengkapi master vector .AI & CDR serta PNG resolusi 300 DPI.',
    attachments: [
      {
        id: 'att-4a',
        name: 'Desain_Kaos_Totebag_Surabaya.ai',
        fileType: 'Adobe Illustrator Vector',
        fileUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
        fileSize: '24.5 MB',
        uploadedAt: '2026-10-09 08:15'
      },
      {
        id: 'att-4b',
        name: 'Preview_Lini_Merchandise_300dpi.png',
        fileType: 'PNG Image HD',
        fileUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
        fileSize: '8.1 MB',
        uploadedAt: '2026-10-09 08:15'
      }
    ],
    deliverablesSummary: [
      { itemType: 'kaos', title: 'Desain Kaos Full Color A4', requiredCount: 3, completedCount: 3 },
      { itemType: 'totebag', title: 'Desain Totebag Full Color A4', requiredCount: 3, completedCount: 3 },
      { itemType: 'tumbler', title: 'Desain Tumbler', requiredCount: 2, completedCount: 2 },
      { itemType: 'pin_ganci', title: 'Desain PIN & Gantungan Kunci', requiredCount: 2, completedCount: 2 },
      { itemType: 'stiker', title: 'Desain Stiker Die-cut', requiredCount: 2, completedCount: 2 },
      { itemType: 'vektor_ai_cdr', title: 'File Master Vector .AI/.CDR', requiredCount: 1, completedCount: 1 },
      { itemType: 'png_hd', title: 'File PNG Digital Design 300DPI', requiredCount: 1, completedCount: 1 }
    ]
  },

  // Group 2 (Ponorogo) - Stage 3 (Perlu Revisi)
  {
    id: 'sub-g2-s3',
    groupId: 'group-2',
    stageId: 3,
    title: 'Eksplorasi Sketsa Karakter Reog & Ornamen Dadak Merak',
    status: 'perlu_revisi',
    submittedAt: '2026-10-07T15:20:00Z',
    updatedAt: '2026-10-08T11:00:00Z',
    description: 'Eksplorasi sketsa ornamen bulu merak dan topeng singo barong. Masih membutuhkan penyelarasan proporsi anatomi dan pilihan warna kontemporer.',
    attachments: [
      {
        id: 'att-2-1',
        name: 'Sketsa_Reog_Ponorogo.jpg',
        fileType: 'Image Sheet',
        fileUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
        fileSize: '5.2 MB',
        uploadedAt: '2026-10-07 15:20'
      }
    ],
    deliverablesSummary: [
      { itemType: 'packaging', title: 'Thumbnail Sketsa & Moodboard', requiredCount: 1, completedCount: 1 }
    ],
    feedback: {
      id: 'fb-2-1',
      teacherId: 'teacher-2',
      teacherName: 'Siti Rahayu, S.Sn.',
      createdAt: '2026-10-08T11:00:00Z',
      rubric: { kreativitas: 72, relevansiBudaya: 85, kualitasTeknis: 64, kesesuaianBrief: 70 },
      totalScore: 72,
      isEligibleForNextStage: false,
      generalComment: 'Tema budaya Ponorogo sangat menarik, tetapi detail ornamen dadak merak terlalu rumit untuk cetak sablon manual kaos & tumbler.',
      revisionNotes: 'Perlu simplifikasi ornamen menjadi gaya pattern modern kontemporer agar tidak pecah/blooming saat dicetak. Perbaiki sketsa sebelum diizinkan melangkah ke Final Design.'
    }
  },

  // Group 3 (Banyuwangi) - Stage 5 (Layak Lolos - Production underway)
  {
    id: 'sub-g3-s4',
    groupId: 'group-3',
    stageId: 4,
    title: 'Final Master Vector & Aset Digital Pariwisata Osing Sunrise',
    status: 'layak_lolos',
    submittedAt: '2026-10-05T09:00:00Z',
    updatedAt: '2026-10-06T14:00:00Z',
    description: 'Master vektor siap cetak untuk 3 Kaos A4, 3 Totebag A4, 2 Tumbler, 2 Pin/Ganci, dan 2 Stiker bertema Kawah Ijen Blue Fire & Gandrung.',
    attachments: [
      {
        id: 'att-3-4',
        name: 'Master_Vector_Osing_Sunrise.cdr',
        fileType: 'CorelDRAW Vector',
        fileUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
        fileSize: '19.8 MB',
        uploadedAt: '2026-10-05 09:00'
      }
    ],
    deliverablesSummary: [
      { itemType: 'kaos', title: 'Desain Kaos Full Color A4', requiredCount: 3, completedCount: 3 },
      { itemType: 'totebag', title: 'Desain Totebag Full Color A4', requiredCount: 3, completedCount: 3 },
      { itemType: 'tumbler', title: 'Desain Tumbler', requiredCount: 2, completedCount: 2 },
      { itemType: 'pin_ganci', title: 'Desain PIN & Gantungan Kunci', requiredCount: 2, completedCount: 2 },
      { itemType: 'stiker', title: 'Desain Stiker Die-cut', requiredCount: 2, completedCount: 2 },
      { itemType: 'vektor_ai_cdr', title: 'File Master Vector .CDR', requiredCount: 1, completedCount: 1 }
    ],
    feedback: {
      id: 'fb-3-4',
      teacherId: 'teacher-1',
      teacherName: 'Hendra Dwi Prasetyo, S.Pd., M.Sn.',
      createdAt: '2026-10-06T14:00:00Z',
      rubric: { kreativitas: 95, relevansiBudaya: 94, kualitasTeknis: 92, kesesuaianBrief: 95 },
      totalScore: 94,
      isEligibleForNextStage: true,
      generalComment: 'Luar biasa! Harmonisasi warna gradasi api biru kawah Ijen dan siluet penari Gandrung sangat artistik dan siap diproduksi massal.',
      revisionNotes: 'Layak melangkah ke Tahap 5: Merchandise Production. Segera koordinasikan dengan mitra vendor cetak sablon & sublimasi.'
    }
  }
];

export const INITIAL_CALENDAR_DEADLINES: CalendarDeadline[] = [
  {
    id: 'cal-1',
    stageId: 1,
    title: 'Milestone 01: Research & Identifikasi Potensi Daerah',
    startDate: '2026-09-08',
    endDate: '2026-09-25',
    periodLabel: 'Sept Minggu II - Minggu IV',
    description: 'Pengumpulan data keunikan, sejarah, flora/fauna, kuliner, dan ikon Jawa Timur.',
    type: 'milestone'
  },
  {
    id: 'cal-2',
    stageId: 2,
    title: 'Milestone 02: Design Brief & Strategi Konsep',
    startDate: '2026-09-26',
    endDate: '2026-10-05',
    periodLabel: 'Sept Minggu IV - Oktober Minggu I',
    description: 'Penyusunan target audiens wisatawan, gaya visual, dan brief resmi agency.',
    type: 'submission_deadline'
  },
  {
    id: 'cal-3',
    stageId: 3,
    title: 'Milestone 03: Eksplorasi Visual & Sketsa Thumbnail',
    startDate: '2026-10-06',
    endDate: '2026-10-15',
    periodLabel: 'Oktober Minggu II',
    description: 'Pembuatan moodboard, mindmap, 10+ sketsa thumbnail pensil & eksplorasi tipografi.',
    type: 'submission_deadline'
  },
  {
    id: 'cal-4',
    stageId: 4,
    title: 'Milestone 04: Final Digital Design (Vector & PNG Siap Cetak)',
    startDate: '2026-10-16',
    endDate: '2026-10-31',
    periodLabel: 'Oktober Minggu II - Minggu IV',
    description: 'Tenggat akhir pengunggahan file vector .ai/.cdr & PNG HD seluruh 5 jenis produk (Kaos, Totebag, Tumbler, PIN, Stiker).',
    type: 'submission_deadline'
  },
  {
    id: 'cal-5',
    stageId: 5,
    title: 'Milestone 05: Merchandise Production (Cetak Fisik)',
    startDate: '2026-11-01',
    endDate: '2026-11-25',
    periodLabel: 'November Minggu I - Minggu IV',
    description: 'Realisasi cetak prototype minimal 4 produk fisik dan uji kelayakan mutu sablon/sublim.',
    type: 'milestone'
  },
  {
    id: 'cal-6',
    stageId: 6,
    title: 'Milestone 06: Packaging & Story Card Wisata',
    startDate: '2026-11-15',
    endDate: '2026-11-30',
    periodLabel: 'November Minggu III - Minggu IV',
    description: 'Perancangan kemasan dus/pouch, label hang tag, dan kartu informasi edukasi wisata.',
    type: 'submission_deadline'
  },
  {
    id: 'cal-7',
    stageId: 7,
    title: 'Milestone 07: Marketing & Katalog Foto Produk',
    startDate: '2026-11-01',
    endDate: '2026-12-05',
    periodLabel: 'November Minggu I - Desember Minggu I',
    description: 'Pembuatan foto produk komersial, poster promo A2, dan video teaser kampanye.',
    type: 'milestone'
  },
  {
    id: 'cal-8',
    stageId: 8,
    title: 'Milestone 08: PjBL Merchandise Exhibition & Pitching',
    startDate: '2026-12-01',
    endDate: '2026-12-15',
    periodLabel: 'Desember Minggu I - Minggu II',
    description: 'Gelar pameran produk di aula SMKN 1 Surabaya, penataan display stand booth, dan kurasi nilai akhir.',
    type: 'exhibition'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    targetRole: 'guru',
    title: 'Kiriman Tugas Baru Menunggu Penilaian',
    message: 'Kelompok Suroboyo Heritage Studio telah mengunggah tugas "Final Master Vector & Aset Digital" (Tahap 4). Mohon berikan penilaian kelayakan.',
    type: 'submission',
    createdAt: 'Baru saja',
    isRead: false,
    linkStageId: 4
  },
  {
    id: 'notif-2',
    targetRole: 'siswa',
    targetGroupId: 'group-3',
    title: '🎉 Selamat! Tugas Lolos dengan Skor Tinggi',
    message: 'Tugas Final Digital Design disetujui Guru dengan nilai 94 (Predikat A). Anda dinyatakan LAYAK beralih ke Tahap 5: Merchandise Production!',
    type: 'approval',
    createdAt: '2 jam lalu',
    isRead: false,
    score: 94,
    linkStageId: 5
  },
  {
    id: 'notif-3',
    targetRole: 'siswa',
    targetGroupId: 'group-2',
    title: 'Catatan Revisi dari Guru Pembimbing',
    message: 'Tugas Eksplorasi Sketsa (Tahap 3) membutuhkan simplifikasi ornamen Reog agar aman dicetak. Silakan tinjau catatan revisi.',
    type: 'revision',
    createdAt: 'Kemarin',
    isRead: true,
    linkStageId: 3
  },
  {
    id: 'notif-4',
    targetRole: 'all',
    title: 'Pengingat Tenggat Waktu: Final Vector Design',
    message: 'Tenggat waktu pengumpulan file vector .AI/.CDR untuk Tahap 4 jatuh tempo akhir Oktober. Pastikan grup Anda telah mengunggah mockup & vector.',
    type: 'deadline',
    createdAt: '2 hari lalu',
    isRead: true,
    linkStageId: 4
  }
];

export const INITIAL_CHATS: ChatMessage[] = [
  {
    id: 'msg-1',
    groupId: 'group-1',
    stageId: 4,
    senderId: 'student-1',
    senderName: 'Budi Pratama (Ketua Tim Suroboyo)',
    senderRole: 'siswa',
    text: 'Selamat pagi Pak Hendra, kami dari Suroboyo Heritage Studio sudah mengunggah master vector untuk 3 kaos, totebag, tumbler, dan pin ganci. Mohon arahannya apakah kurva warnanya sudah siap cetak?',
    timestamp: '08:20'
  },
  {
    id: 'msg-2',
    groupId: 'group-1',
    stageId: 4,
    senderId: 'teacher-1',
    senderName: 'Hendra Dwi Prasetyo, S.Pd., M.Sn.',
    senderRole: 'guru',
    text: 'Halo Budi dan tim, selamat atas ketepatan waktunya. Sedang Bapak unduh dan periksa di Illustrator. Secara sekilas komposisi warna tema Surabaya Juang sangat matang!',
    timestamp: '08:35'
  },
  {
    id: 'msg-3',
    groupId: 'group-2',
    stageId: 3,
    senderId: 'teacher-2',
    senderName: 'Siti Rahayu, S.Sn.',
    senderRole: 'guru',
    text: 'Untuk tim Singo Barong Ponorogo: tolong garis bulu merak pada sketsa jangan dibuat terlalu tipis (minimal 1 pt) agar saat sablon kaos tidak mudah terputus.',
    timestamp: 'Kemarin 11:05'
  }
];
