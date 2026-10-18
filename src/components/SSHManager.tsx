import React, { useState } from 'react';
import { ColabSession, SSHUser } from '../types';

interface SSHManagerProps {
  session: ColabSession;
  onCreateUser: (username: string, password: string) => Promise<void>;
  onChangePassword: (username: string, newPassword: string) => Promise<void>;
}

export const SSHManager: React.FC<SSHManagerProps> = ({
  session,
  onCreateUser,
  onChangePassword
}) => {
  const [copiedSSH, setCopiedSSH] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState<{ open: boolean; targetUser: string }>({
    open: false,
    targetUser: ''
  });

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('123456');
  const [customPassword, setCustomPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const sshHost = session.ssh_host || 'bore.pub';
  const sshPort = session.ssh_port || 45123;
  const primaryCommand = `ssh colab@${sshHost} -p ${sshPort}`;

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedSSH(true);
    setTimeout(() => setCopiedSSH(false), 2000);
  };

  const handleQuickAdd = async (randomPwd: boolean) => {
    const nextIdx = (session.ssh_users?.length || 1) + 1;
    const uname = `user${nextIdx}`;
    let pwd = '123456';
    if (randomPwd) {
      pwd = Math.random().toString(36).substring(2, 8);
    }
    setLoading(true);
    try {
      await onCreateUser(uname, pwd);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) return;
    setLoading(true);
    try {
      await onCreateUser(newUsername.trim(), newPassword || '123456');
      setShowAddModal(false);
      setNewUsername('');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (pwd: string) => {
    setLoading(true);
    try {
      await onChangePassword(showPasswordModal.targetUser, pwd);
      setShowPasswordModal({ open: false, targetUser: '' });
      setCustomPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm space-y-6">
      {/* SSH Connection Snippet */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>📋</span>
              <span>Thông Tin Kết Nối SSH Trực Tiếp</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Kết nối từ máy tính của bạn bằng OpenSSH, PuTTY, Tabby hoặc VSCode Remote SSH.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Tunnel:</span>
            <span className="text-cyan-400 font-bold uppercase">{session.tunnel_mode}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Host:</span>
            <span className="text-white font-bold">{sshHost}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Port:</span>
            <span className="text-amber-400 font-bold">{sshPort}</span>
          </div>
        </div>

        {/* 1-Click Copy Command Box */}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 gap-3">
          <div className="flex items-center gap-3 overflow-x-auto font-mono text-xs text-emerald-400">
            <span className="text-slate-500 select-none">$</span>
            <span className="font-semibold select-all whitespace-nowrap">{primaryCommand}</span>
          </div>
          <button
            onClick={() => copyCommand(primaryCommand)}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>{copiedSSH ? '✓' : '📋'}</span>
            <span>{copiedSSH ? 'Đã Copy Lệnh' : 'Copy 1-Chạm'}</span>
          </button>
        </div>
      </div>

      {/* SSH User Management Table */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>👥</span>
              <span>Danh Sách Tài Khoản SSH Trên Máy Ảo</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Mỗi user đều được cấp quyền sudo NOPASSWD:ALL độc lập.
            </p>
          </div>

          {/* User action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleQuickAdd(false)}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              ⚡ Tạo nhanh (MK: 123456)
            </button>
            <button
              onClick={() => handleQuickAdd(true)}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              🎲 Tạo nhanh (MK Ngẫu nhiên)
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 disabled:opacity-50 border border-cyan-800/60 rounded-lg transition-colors whitespace-nowrap"
            >
              ✍️ Tạo User tùy chỉnh
            </button>
            <button
              onClick={() => setShowPasswordModal({ open: true, targetUser: 'ALL' })}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 disabled:opacity-50 border border-amber-800/60 rounded-lg transition-colors whitespace-nowrap"
            >
              🔑 Đổi MK Tất Cả User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono text-[11px] uppercase">
              <tr>
                <th className="py-2.5 px-4">Tên User SSH</th>
                <th className="py-2.5 px-4">Quyền Hạn</th>
                <th className="py-2.5 px-4">Lệnh Kết Nối Đầy Đủ</th>
                <th className="py-2.5 px-4">Thời Gian Tạo</th>
                <th className="py-2.5 px-4 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {(session.ssh_users || [{ username: 'colab', role: 'root', created_at: 'Khởi tạo' }]).map((u: SSHUser) => {
                const userCmd = `ssh ${u.username}@${sshHost} -p ${sshPort}`;
                return (
                  <tr key={u.username} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {u.username}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                        {u.role || 'sudo'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[280px]">{userCmd}</span>
                        <button
                          onClick={() => copyCommand(userCmd)}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 underline"
                        >
                          Copy
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {u.created_at || 'Mặc định'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setShowPasswordModal({ open: true, targetUser: u.username })}
                        className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
                      >
                        🔑 Đổi mật khẩu
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Custom User */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmitNewUser} className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>✍️</span>
              <span>Tạo Tài Khoản SSH Mới Tùy Chỉnh</span>
            </h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tên User (không dấu, viết liền):</label>
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="VD: worker1, dev, bot"
                className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mật khẩu:</label>
              <input
                type="text"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="123456"
                className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg"
              >
                {loading ? 'Đang tạo...' : 'Xác Nhận Tạo'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Change Password */}
      {showPasswordModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🔑</span>
              <span>
                Đổi Mật Khẩu Cho: <span className="text-cyan-400 font-mono">{showPasswordModal.targetUser === 'ALL' ? 'TẤT CẢ USER' : showPasswordModal.targetUser}</span>
              </span>
            </h3>

            <p className="text-xs text-slate-400">
              Chọn nhanh mật khẩu thông dụng hoặc tự gõ mật khẩu mới:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUpdatePassword('123456')}
                className="py-2 px-3 text-xs font-mono bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700"
              >
                123456
              </button>
              <button
                type="button"
                onClick={() => handleUpdatePassword('12345678')}
                className="py-2 px-3 text-xs font-mono bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700"
              >
                12345678
              </button>
              <button
                type="button"
                onClick={() => handleUpdatePassword('88888888')}
                className="py-2 px-3 text-xs font-mono bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700"
              >
                88888888
              </button>
              <button
                type="button"
                onClick={() => handleUpdatePassword(Math.random().toString(36).substring(2, 8))}
                className="py-2 px-3 text-xs font-mono bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700"
              >
                🎲 Ngẫu Nhiên
              </button>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hoặc tự nhập mật khẩu mới:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customPassword}
                  onChange={(e) => setCustomPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="flex-1 px-3 py-2 text-xs font-mono bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => customPassword && handleUpdatePassword(customPassword)}
                  disabled={!customPassword || loading}
                  className="px-3 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg"
                >
                  Lưu
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowPasswordModal({ open: false, targetUser: '' })}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
