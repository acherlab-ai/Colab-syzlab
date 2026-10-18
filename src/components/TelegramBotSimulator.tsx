import React, { useState } from 'react';
import { ColabSession } from '../types';

interface TelegramBotSimulatorProps {
  session: ColabSession;
  onClose?: () => void;
  onCreateUser: (username: string, password: string) => Promise<void>;
  onChangePassword: (username: string, newPassword: string) => Promise<void>;
  onStopLab: () => Promise<void>;
}

export const TelegramBotSimulator: React.FC<TelegramBotSimulatorProps> = ({
  session,
  onClose,
  onCreateUser,
  onChangePassword,
  onStopLab
}) => {
  const [currentMenu, setCurrentMenu] = useState<'main' | 'add_user' | 'change_pwd' | 'timer' | 'stop_confirm'>('main');
  const [botMessage, setBotMessage] = useState<string>(
    `⚡ <b>SUZLAB COLAB CLOUD — KẾT NỐI THÀNH CÔNG</b>\n\n` +
    `🆔 <b>Mã Máy:</b> <code>${session.machine_code}</code>\n` +
    `🛡️ <b>Keep-Alive:</b> Đang bảo vệ 24/7 (Anti-Kill)\n` +
    `💻 <b>Host SSH:</b> <code>${session.ssh_host || 'bore.pub'}:${session.ssh_port || 45123}</code>\n` +
    `⏱ <b>Uptime:</b> ${Math.floor(session.uptime_seconds / 3600)}h ${Math.floor((session.uptime_seconds % 3600) / 60)}m\n\n` +
    `<i>Chọn chức năng điều khiển máy ảo bên dưới:</i>`
  );
  const [statusFeedback, setStatusFeedback] = useState<string>('');

  const formatUptime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  const handleAction = async (action: string) => {
    setStatusFeedback('');
    if (action === 'uptime') {
      setCurrentMenu('main');
      setBotMessage(
        `📊 <b>BÁO CÁO HỆ THỐNG MÁY [${session.machine_code}]</b>\n\n` +
        `⏱ <b>Uptime:</b> <code>${formatUptime(session.uptime_seconds)}</code>\n` +
        `🧠 <b>RAM:</b> <code>${session.ram_usage || '2.4 / 12.7 GB (18.9%)'}</code>\n` +
        `💾 <b>Disk:</b> <code>${session.disk_usage || '31.8 / 107.7 GB (29.5%)'}</code>\n` +
        `🔌 <b>Port 22 SSH:</b> 🟢 HOẠT ĐỘNG\n` +
        `🛡️ <b>Keep-Alive:</b> Bật 24/7 (Anti-Kill Active)`
      );
    } else if (action === 'ssh_info') {
      setCurrentMenu('main');
      const lines = (session.ssh_users || [{ username: 'colab', role: 'root', created_at: '' }]).map(
        (u) => `• User: <code>${u.username}</code>\n  Lệnh: <code>ssh ${u.username}@${session.ssh_host || 'bore.pub'} -p ${session.ssh_port || 45123}</code>`
      );
      setBotMessage(
        `📋 <b>THÔNG TIN KẾT NỐI SSH [${session.machine_code}]</b>\n\n` +
        `🌐 <b>Host:</b> <code>${session.ssh_host || 'bore.pub'}</code>\n` +
        `🔌 <b>Port:</b> <code>${session.ssh_port || 45123}</code>\n\n` +
        `<b>Danh sách lệnh kết nối:</b>\n` +
        lines.join('\n')
      );
    } else if (action === 'list_users') {
      setCurrentMenu('main');
      const rows = (session.ssh_users || [{ username: 'colab', role: 'root', created_at: 'Khởi tạo' }]).map(
        (u) => `• <b>${u.username}</b> (${u.role}) - Tạo lúc: ${u.created_at || 'Mặc định'}`
      );
      setBotMessage(
        `👥 <b>DANH SÁCH USER SSH [${session.machine_code}]</b>\n\n` + rows.join('\n')
      );
    } else if (action === 'menu_add_user') {
      setCurrentMenu('add_user');
      setBotMessage(`➕ <b>Chọn chế độ tạo User SSH mới trên máy [${session.machine_code}]:</b>`);
    } else if (action === 'do_add_quick') {
      const uname = `user${(session.ssh_users?.length || 1) + 1}`;
      await onCreateUser(uname, '123456');
      setCurrentMenu('main');
      setStatusFeedback(`✅ Đã tạo user ${uname} thành công!`);
      setBotMessage(
        `✅ <b>Đã tạo user ${uname} thành công!</b>\n\n🔑 Mật khẩu: <code>123456</code>\n🚀 Lệnh: <code>ssh ${uname}@${session.ssh_host || 'bore.pub'} -p ${session.ssh_port || 45123}</code>`
      );
    } else if (action === 'do_add_rand') {
      const uname = `user${(session.ssh_users?.length || 1) + 1}`;
      const randPwd = Math.random().toString(36).substring(2, 8);
      await onCreateUser(uname, randPwd);
      setCurrentMenu('main');
      setStatusFeedback(`✅ Đã tạo user ${uname} với mật khẩu ngẫu nhiên!`);
      setBotMessage(
        `✅ <b>Đã tạo user ${uname} thành công!</b>\n\n🔑 Mật khẩu ngẫu nhiên: <code>${randPwd}</code>\n🚀 Lệnh: <code>ssh ${uname}@${session.ssh_host || 'bore.pub'} -p ${session.ssh_port || 45123}</code>`
      );
    } else if (action === 'menu_change_pwd') {
      setCurrentMenu('change_pwd');
      setBotMessage(`🔑 <b>Chọn mẫu đổi mật khẩu nhanh cho TẤT CẢ User:</b>`);
    } else if (action.startsWith('do_pwd_')) {
      const mode = action.replace('do_pwd_', '');
      const newPwd = mode === 'rand' ? Math.random().toString(36).substring(2, 8) : mode;
      await onChangePassword('ALL', newPwd);
      setCurrentMenu('main');
      setStatusFeedback(`✅ Đã đổi mật khẩu tất cả user thành: ${newPwd}`);
      setBotMessage(
        `✅ <b>Đã cập nhật mật khẩu cho TẤT CẢ User thành:</b> <code>${newPwd}</code>`
      );
    } else if (action === 'menu_timer') {
      setCurrentMenu('timer');
      setBotMessage(`⏱ <b>Chọn tần suất gửi thông báo Uptime tự động vào Telegram:</b>`);
    } else if (action.startsWith('do_timer_')) {
      const m = action.replace('do_timer_', '');
      setCurrentMenu('main');
      setStatusFeedback(m === '0' ? '🔕 Đã tắt thông báo tự động' : `✅ Đã hẹn giờ báo Uptime mỗi ${m} phút`);
      setBotMessage(
        m === '0'
          ? `🔕 <b>Đã tắt thông báo Uptime tự động định kỳ.</b>`
          : `✅ <b>Đã hẹn giờ tự động gửi báo cáo Uptime mỗi ${m} phút!</b>`
      );
    } else if (action === 'menu_stop') {
      setCurrentMenu('stop_confirm');
      setBotMessage(
        `⚠️ <b>BẠN CÓ CHẮC MUỐN TẮT MÁY ẢO GOOGLE COLAB NÀY?</b>\n\nMáy ảo sẽ bị hủy cấp phát và toàn bộ tiến trình SSH sẽ đóng ngay.`
      );
    } else if (action === 'do_stop') {
      setBotMessage(`🛑 <b>Đang tắt máy ảo [${session.machine_code}] và giải phóng tài nguyên...</b>`);
      await onStopLab();
      setCurrentMenu('main');
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md max-w-lg mx-auto">
      {/* Bot Chat Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold text-sm shadow">
            🤖
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Colab Lab Bot</span>
              <span className="text-[10px] text-cyan-400 font-mono">@Colab_lab_bot</span>
            </div>
            <div className="text-[11px] text-emerald-400">bot · trực tuyến 24/7</div>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
          >
            Đóng
          </button>
        )}
      </div>

      {/* Simulated Chat Bubble */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans shadow-inner">
        <div
          dangerouslySetInnerHTML={{
            __html: botMessage.replace(/\n/g, '<br/>')
          }}
        />
        <div className="text-right text-[10px] text-slate-500 font-mono mt-2">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓✓
        </div>
      </div>

      {statusFeedback && (
        <div className="mt-2 text-[11px] font-semibold text-emerald-400 text-center">
          {statusFeedback}
        </div>
      )}

      {/* 100% Inline Buttons Layout */}
      <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1 text-center">
          Bàn phím Inline Keyboard (Callback: {session.machine_code}|...)
        </div>

        {currentMenu === 'main' && (
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              onClick={() => handleAction('uptime')}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <span>📊</span>
              <span>Báo Uptime & Hệ thống</span>
            </button>
            <button
              onClick={() => handleAction('ssh_info')}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <span>📋</span>
              <span>Thông tin SSH</span>
            </button>

            <button
              onClick={() => handleAction('menu_add_user')}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <span>➕</span>
              <span>Tạo User thêm</span>
            </button>
            <button
              onClick={() => handleAction('menu_change_pwd')}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <span>🔑</span>
              <span>Đổi mật khẩu</span>
            </button>

            <button
              onClick={() => handleAction('list_users')}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <span>👥</span>
              <span>Danh sách User</span>
            </button>
            <button
              onClick={() => handleAction('menu_timer')}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
            >
              <span>⏱</span>
              <span>Hẹn giờ báo Uptime</span>
            </button>

            <a
              href="https://colab.suzlab.com"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 transition-colors border border-cyan-800/60 flex items-center justify-center gap-1.5"
            >
              <span>🌐</span>
              <span>Web colab.suzlab.com</span>
            </a>
            <button
              onClick={() => handleAction('menu_stop')}
              className="p-2.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 transition-colors border border-rose-800/80 flex items-center justify-center gap-1.5"
            >
              <span>🛑</span>
              <span>Tắt Máy Colab</span>
            </button>
          </div>
        )}

        {currentMenu === 'add_user' && (
          <div className="space-y-2 text-xs">
            <button
              onClick={() => handleAction('do_add_quick')}
              className="w-full p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2"
            >
              <span>⚡</span>
              <span>Tạo nhanh User (MK: 123456)</span>
            </button>
            <button
              onClick={() => handleAction('do_add_rand')}
              className="w-full p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2"
            >
              <span>🎲</span>
              <span>Tạo nhanh User (MK Ngẫu nhiên)</span>
            </button>
            <button
              onClick={() => handleAction('uptime')}
              className="w-full p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              🔙 Quay lại Menu Chính
            </button>
          </div>
        )}

        {currentMenu === 'change_pwd' && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAction('do_pwd_123456')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-mono"
              >
                123456
              </button>
              <button
                onClick={() => handleAction('do_pwd_12345678')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-mono"
              >
                12345678
              </button>
              <button
                onClick={() => handleAction('do_pwd_88888888')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-mono"
              >
                88888888
              </button>
              <button
                onClick={() => handleAction('do_pwd_rand')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              >
                🎲 Ngẫu Nhiên
              </button>
            </div>
            <button
              onClick={() => handleAction('uptime')}
              className="w-full p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              🔙 Quay lại Menu Chính
            </button>
          </div>
        )}

        {currentMenu === 'timer' && (
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAction('do_timer_5')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              >
                ⏱ Mỗi 5 phút
              </button>
              <button
                onClick={() => handleAction('do_timer_15')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              >
                ⏱ Mỗi 15 phút
              </button>
              <button
                onClick={() => handleAction('do_timer_30')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              >
                ⏱ Mỗi 30 phút
              </button>
              <button
                onClick={() => handleAction('do_timer_60')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              >
                ⏱ Mỗi 60 phút
              </button>
            </div>
            <button
              onClick={() => handleAction('do_timer_0')}
              className="w-full p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
            >
              🔕 Tắt báo giờ
            </button>
            <button
              onClick={() => handleAction('uptime')}
              className="w-full p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
            >
              🔙 Quay lại Menu Chính
            </button>
          </div>
        )}

        {currentMenu === 'stop_confirm' && (
          <div className="space-y-2 text-xs">
            <button
              onClick={() => handleAction('do_stop')}
              className="w-full p-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold shadow transition-colors"
            >
              ⚠️ XÁC NHẬN TẮT NGAY
            </button>
            <button
              onClick={() => handleAction('uptime')}
              className="w-full p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              ❌ HỦY BỎ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
