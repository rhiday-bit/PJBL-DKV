import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DESTINATION_OPTIONS, SPECIFIC_PROJECT_TYPES } from '../../data/initialData';
import {
  X,
  UserPlus,
  Users,
  Building,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

interface AccountManagementModalProps {
  onClose: () => void;
}

export const AccountManagementModal: React.FC<AccountManagementModalProps> = ({ onClose }) => {
  const { users, groups, addUser, addGroup } = useApp();

  const [activeTab, setActiveTab] = useState<'users_list' | 'add_teacher' | 'add_group'>('users_list');

  // Form State: Add Teacher
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherNip, setTeacherNip] = useState('');
  const [teacherTitle, setTeacherTitle] = useState('Guru Pembimbing DKV');

  // Form State: Add Group
  const [agencyName, setAgencyName] = useState('');
  const [destinationCity, setDestinationCity] = useState<'Banyuwangi' | 'Ponorogo' | 'Malang' | 'Surabaya' | 'Madiun' | 'Madura'>('Surabaya');
  const [projectType, setProjectType] = useState<'Iconic Tourism' | 'Local Culture' | 'Wisata dalam Satu Ilustrasi' | 'Tourist Souvenir Brand'>('Tourist Souvenir Brand');
  const [tourismCategory, setTourismCategory] = useState<'Pantai' | 'Budaya' | 'Kuliner' | 'Sejarah' | 'Ekowisata' | 'Pegunungan'>('Sejarah');
  const [visualTheme, setVisualTheme] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [membersRaw, setMembersRaw] = useState('');
  const [leaderNisn, setLeaderNisn] = useState('');
  const [avatarLogo, setAvatarLogo] = useState('🎨');

  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !teacherEmail || !teacherNip) return;

    addUser({
      name: teacherName,
      email: teacherEmail,
      role: 'guru',
      nipOrNisn: teacherNip,
      title: teacherTitle,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    });

    setSuccessNotice(`Akun guru ${teacherName} berhasil ditambahkan!`);
    setTeacherName('');
    setTeacherEmail('');
    setTeacherNip('');
    setTimeout(() => {
      setSuccessNotice(null);
      setActiveTab('users_list');
    }, 1500);
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agencyName || !leaderName) return;

    const membersList = membersRaw
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);

    if (!membersList.includes(leaderName)) {
      membersList.unshift(leaderName);
    }

    const newGroupId = `group-${Date.now()}`;

    // Add agency group
    addGroup({
      agencyName,
      destinationCity,
      projectType,
      tourismCategory,
      visualTheme: visualTheme || `Eksplorasi Pariwisata ${destinationCity}`,
      leaderName,
      members: membersList.length > 0 ? membersList : [leaderName, 'Anggota 2', 'Anggota 3', 'Anggota 4', 'Anggota 5'],
      avatarLogo
    });

    // Also add student account for the leader
    addUser({
      name: `${leaderName} (Ketua ${agencyName})`,
      email: `${leaderName.toLowerCase().replace(/\s+/g, '')}@smkn1-sby.id`,
      role: 'siswa',
      nipOrNisn: leaderNisn || `006${Math.floor(1000000 + Math.random() * 9000000)}`,
      groupId: newGroupId,
      title: `Creative Lead - ${agencyName}`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });

    setSuccessNotice(`Kelompok Agency ${agencyName} dan akun siswa berhasil didaftarkan!`);
    setAgencyName('');
    setLeaderName('');
    setMembersRaw('');
    setVisualTheme('');
    setTimeout(() => {
      setSuccessNotice(null);
      setActiveTab('users_list');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                Manajemen Akun Guru & Kelompok Siswa
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pendaftaran guru pembimbing baru dan pembentukan creative agency siswa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="px-6 pt-4 border-b border-slate-100 dark:border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveTab('users_list')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all px-2 ${
              activeTab === 'users_list'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Daftar Akun Terdaftar ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('add_group')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all px-2 flex items-center gap-1.5 ${
              activeTab === 'add_group'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            + Buat Creative Agency Baru (5-6 Siswa)
          </button>
          <button
            onClick={() => setActiveTab('add_teacher')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all px-2 flex items-center gap-1.5 ${
              activeTab === 'add_teacher'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            + Tambah Guru Pembimbing
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successNotice && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {successNotice}
            </div>
          )}

          {/* TAB 1: User list */}
          {activeTab === 'users_list' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Daftar Guru Pembimbing & Siswa Aktif:</span>
                <span>{groups.length} Kelompok Agency Terdaftar</span>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {users.map(u => (
                  <div
                    key={u.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                        ) : (
                          u.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                        <div className="text-[10px] text-slate-400">
                          {u.role === 'guru' ? 'NIP' : 'NISN'}: {u.nipOrNisn} • {u.title}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        u.role === 'guru'
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
                      }`}
                    >
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Add Group */}
          {activeTab === 'add_group' && (
            <form onSubmit={handleCreateGroup} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                <strong>Model "One Destination, One Merchandise":</strong> Setiap kelompok berperan sebagai creative agency independen beranggotakan 5-6 siswa dengan fokus 1 daerah/kota pilihan di Jawa Timur.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Nama Creative Agency:
                  </label>
                  <input
                    type="text"
                    required
                    value={agencyName}
                    onChange={e => setAgencyName(e.target.value)}
                    placeholder="Contoh: Majapahit Design Lab"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Emoji / Ikon Maskot:
                  </label>
                  <input
                    type="text"
                    value={avatarLogo}
                    onChange={e => setAvatarLogo(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Pilihan Kota / Daerah Wisata Jatim:
                  </label>
                  <select
                    value={destinationCity}
                    onChange={e => setDestinationCity(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="Surabaya">Surabaya (Sejarah & Pahlawan)</option>
                    <option value="Ponorogo">Ponorogo (Reog & Budaya)</option>
                    <option value="Banyuwangi">Banyuwangi (Ijen & Pantai)</option>
                    <option value="Malang">Malang (Pegunungan Bromo & Apel)</option>
                    <option value="Madiun">Madiun (Kota Pendekar & Sejarah)</option>
                    <option value="Madura">Madura (Karapan Sapi & Bahari)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Proyek Spesifik DKV:
                  </label>
                  <select
                    value={projectType}
                    onChange={e => setProjectType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="Iconic Tourism">Iconic Tourism</option>
                    <option value="Local Culture">Local Culture (Pattern Kontemporer)</option>
                    <option value="Wisata dalam Satu Ilustrasi">Wisata dalam Satu Ilustrasi</option>
                    <option value="Tourist Souvenir Brand">Tourist Souvenir Brand</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Konsep / Tema Visual Utama:
                  </label>
                  <input
                    type="text"
                    value={visualTheme}
                    onChange={e => setVisualTheme(e.target.value)}
                    placeholder="Contoh: Sunset by the Sea / Retro Tourism Poster Pop Art"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Nama Ketua Kelompok:
                  </label>
                  <input
                    type="text"
                    required
                    value={leaderName}
                    onChange={e => setLeaderName(e.target.value)}
                    placeholder="Contoh: Ahmad Fauzan"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    NISN Ketua:
                  </label>
                  <input
                    type="text"
                    value={leaderNisn}
                    onChange={e => setLeaderNisn(e.target.value)}
                    placeholder="0061234567"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Anggota Kelompok (pisahkan dengan koma):
                  </label>
                  <input
                    type="text"
                    value={membersRaw}
                    onChange={e => setMembersRaw(e.target.value)}
                    placeholder="Contoh: Ahmad Fauzan, Putri Lestari, Kevin Sanjaya, Bella Safira, Doni Kusuma"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors shadow-sm"
                >
                  Daftarkan Creative Agency Baru
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Add Teacher */}
          {activeTab === 'add_teacher' && (
            <form onSubmit={handleCreateTeacher} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Nama Lengkap & Gelar Guru:
                </label>
                <input
                  type="text"
                  required
                  value={teacherName}
                  onChange={e => setTeacherName(e.target.value)}
                  placeholder="Contoh: Bambang Irawan, S.Pd., M.Sn."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Email Resmi Sekolah:
                  </label>
                  <input
                    type="email"
                    required
                    value={teacherEmail}
                    onChange={e => setTeacherEmail(e.target.value)}
                    placeholder="bambang.dkv@smkn1-surabaya.sch.id"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Nomor Induk Pegawai (NIP):
                  </label>
                  <input
                    type="text"
                    required
                    value={teacherNip}
                    onChange={e => setTeacherNip(e.target.value)}
                    placeholder="19870101 201001 1 005"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Jabatan / Mata Pelajaran Kejuruan:
                </label>
                <input
                  type="text"
                  value={teacherTitle}
                  onChange={e => setTeacherTitle(e.target.value)}
                  placeholder="Guru Pembimbing Desain Grafis & Merchandise DKV"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-sm"
                >
                  Simpan Akun Guru Pembimbing
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
