import React, { useState } from 'react';
import { Copy, Check, UserPlus, Key, Shuffle } from 'lucide-react';
import { ColabSession, SSHUser } from '../types';
import { TranslationStrings } from '../i18n';

interface SSHManagerProps {
  session: ColabSession;
  t: TranslationStrings;
  onCreateUser: (username: string, password: string) => Promise<void>;
  onChangePassword: (username: string, newPassword: string) => Promise<void>;
}

export const SSHManager: React.FC<SSHManagerProps> = ({
  session,
  t,
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
    const pwd = randomPwd ? Math.random().toString(36).substring(2, 8) : '123456';
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

  const userList: SSHUser[] = session.ssh_users || [
    { username: 'colab', role: 'root', created_at: 'Init' }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 space-y-6">
      {/* SSH Command Box */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">{t.ssh.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{t.ssh.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Host: <b className="text-white">{sshHost}</b></span>
            <span>·</span>
            <span>Port: <b className="text-amber-400 tabular-nums">{sshPort}</b></span>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950 gap-3">
          <div className="font-mono text-xs sm:text-sm text-emerald-400 font-semibold truncate">
            $ {primaryCommand}
          </div>
          <button
            type="button"
            onClick={() => copyCommand(primaryCommand)}
            className="min-h-[42px] px-4 py-2 text-xs font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
          >
            {copiedSSH ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSSH ? t.telemetry.copiedBtn : t.ssh.copyCmdBtn}</span>
          </button>
        </div>
      </div>

      {/* SSH User Controls */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white">{t.ssh.usersTitle}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{t.ssh.usersSubtitle}</p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickAdd(false)}
              disabled={loading}
              className="min-h-[40px] px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors whitespace-nowrap"
            >
              {t.ssh.quickAddBtn}
            </button>
            <button
              type="button"
              onClick={() => handleQuickAdd(true)}
              disabled={loading}
              className="min-h-[40px] px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors whitespace-nowrap flex items-center justify-center gap-1"
            >
              <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.ssh.randomAddBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              disabled={loading}
              className="min-h-[40px] px-3 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/60 rounded-xl transition-colors whitespace-nowrap flex items-center justify-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t.ssh.customAddBtn}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowPasswordModal({ open: true, targetUser: 'ALL' })}
              disabled={loading}
              className="min-h-[40px] px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/60 rounded-xl transition-colors whitespace-nowrap flex items-center justify-center gap-1"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{t.ssh.changeAllPwdBtn}</span>
            </button>
          </div>
        </div>

        {/* DESKTOP VIEW: High-Density Tabular Grid */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/50">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">{t.ssh.colUser}</th>
                <th className="py-3 px-4">{t.ssh.colRole}</th>
                <th className="py-3 px-4">{t.ssh.colCmd}</th>
                <th className="py-3 px-4">{t.ssh.colTime}</th>
                <th className="py-3 px-4 text-right">{t.ssh.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {userList.map((u) => {
                const userCmd = `ssh ${u.username}@${sshHost} -p ${sshPort}`;
                return (
                  <tr key={u.username} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-white">{u.username}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">{u.role || 'sudo'}</td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      <div className="flex items-center gap-2">
                        <span>{userCmd}</span>
                        <button
                          type="button"
                          onClick={() => copyCommand(userCmd)}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 underline"
                        >
                          {t.telemetry.copyBtn}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400 tabular-nums">
                      {u.created_at}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setShowPasswordModal({ open: true, targetUser: u.username })}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
                      >
                        {t.ssh.changePwdBtn}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW: Dedicated Touch-First Stacked Cards */}
        <div className="sm:hidden space-y-2.5">
          {userList.map((u) => {
            const userCmd = `ssh ${u.username}@${sshHost} -p ${sshPort}`;
            return (
              <div
                key={u.username}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono font-bold text-sm text-white">
                    {u.username}{' '}
                    <span className="text-xs font-normal text-emerald-400">· {u.role}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{u.created_at}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 truncate">
                  {userCmd}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => copyCommand(userCmd)}
                    className="min-h-[40px] py-2 px-3 text-xs font-semibold text-cyan-300 bg-slate-900 border border-slate-800 rounded-lg"
                  >
                    {t.telemetry.copyBtn} SSH
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal({ open: true, targetUser: u.username })}
                    className="min-h-[40px] py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded-lg"
                  >
                    {t.ssh.changePwdBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <form
            onSubmit={handleSubmitNewUser}
            className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <h3 className="text-base font-bold text-white">{t.ssh.customAddBtn}</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.ssh.colUser}
              </label>
              <input
                type="text"
                required
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="worker2"
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="text"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">
              {t.ssh.changePwdBtn}:{' '}
              <span className="text-cyan-400 font-mono">{showPasswordModal.targetUser}</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['123456', '12345678', '88888888', 'colab@123'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleUpdatePassword(preset)}
                  className="py-2.5 px-3 text-xs font-mono bg-slate-800 hover:bg-slate-700 rounded-xl text-white border border-slate-700"
                >
                  {preset}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={customPassword}
                onChange={(e) => setCustomPassword(e.target.value)}
                placeholder="Custom password..."
                className="flex-1 px-3.5 py-2 text-xs font-mono bg-slate-950 border border-slate-700 rounded-xl text-white"
              />
              <button
                type="button"
                onClick={() => customPassword && handleUpdatePassword(customPassword)}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 rounded-xl"
              >
                Save
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowPasswordModal({ open: false, targetUser: '' })}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
