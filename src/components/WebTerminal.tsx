import React, { useState, useRef, useEffect } from 'react';
import { ColabSession } from '../types';

interface WebTerminalProps {
  session: ColabSession;
  onExecCommand: (command: string) => Promise<{ stdout: string; stderr: string; code: number }>;
}

interface CommandLog {
  command: string;
  output: string;
  isError?: boolean;
  time: string;
}

export const WebTerminal: React.FC<WebTerminalProps> = ({
  session,
  onExecCommand
}) => {
  const [inputCmd, setInputCmd] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'init',
      output: `[Suzlab Terminal] Connected to Colab Session ${session.machine_code} via WebSocket TTY.\nOS: Ubuntu 22.04 LTS (x86_64) | Kernel 6.1.58+\nType 'help' or click quick commands below.`,
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const quickCommands = [
    { label: 'nvidia-smi', cmd: 'nvidia-smi' },
    { label: 'free -h', cmd: 'free -h' },
    { label: 'df -h', cmd: 'df -h' },
    { label: 'uptime', cmd: 'uptime' },
    { label: 'CPU info', cmd: 'cat /proc/cpuinfo | grep "model name" | head -1' },
    { label: 'whoami', cmd: 'whoami' },
    { label: 'ls -la /content', cmd: 'ls -la /content' },
    { label: 'ps aux | grep ssh', cmd: 'ps aux | grep ssh' }
  ];

  const handleExecute = async (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setLogs([]);
      setInputCmd('');
      return;
    }

    setIsExecuting(true);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    try {
      const res = await onExecCommand(trimmed);
      const out = res.stdout || res.stderr || '(Chạy xong không có output)';
      setLogs((prev) => [
        ...prev,
        {
          command: trimmed,
          output: out,
          isError: res.code !== 0 && Boolean(res.stderr),
          time: new Date().toLocaleTimeString()
        }
      ]);
    } catch (err: any) {
      setLogs((prev) => [
        ...prev,
        {
          command: trimmed,
          output: `Lỗi thực thi: ${err.message || 'Không thể gửi lệnh tới máy Colab'}`,
          isError: true,
          time: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsExecuting(false);
      setInputCmd('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute(inputCmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputCmd(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length > 0 && historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx >= history.length) {
          setHistoryIdx(-1);
          setInputCmd('');
        } else {
          setHistoryIdx(nextIdx);
          setInputCmd(history[nextIdx]);
        }
      }
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-2xl font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-slate-400 font-semibold text-[11px] ml-2">
            Suzlab Web TTY Console · {session.machine_code}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLogs([])}
            className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
          >
            Clear Screen
          </button>
        </div>
      </div>

      {/* Quick Action Commands Strip */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3 pb-3 border-b border-slate-800/60">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mr-1">
          Lệnh nhanh:
        </span>
        {quickCommands.map((q) => (
          <button
            key={q.cmd}
            type="button"
            onClick={() => handleExecute(q.cmd)}
            disabled={isExecuting}
            className="px-2 py-1 text-[11px] font-mono text-cyan-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded transition-colors whitespace-nowrap"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Terminal Output Log Area */}
      <div className="h-72 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-800">
        {logs.map((log, i) => (
          <div key={i} className="space-y-1">
            {log.command !== 'init' && (
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-bold">colab@suzlab-{session.machine_code.toLowerCase()}:~$</span>
                <span className="text-white font-semibold">{log.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{log.time}</span>
              </div>
            )}
            <pre
              className={`p-2 rounded bg-slate-900/60 overflow-x-auto whitespace-pre-wrap leading-relaxed ${
                log.isError ? 'text-rose-400' : 'text-slate-300'
              }`}
            >
              {log.output}
            </pre>
          </div>
        ))}

        {isExecuting && (
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="animate-spin text-sm">⏳</span>
            <span>Đang thực thi lệnh trên Google Colab kernel...</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Active Shell Prompt Input */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2">
        <span className="text-emerald-400 font-bold shrink-0">
          colab@suzlab-{session.machine_code.toLowerCase()}:~$
        </span>
        <input
          type="text"
          value={inputCmd}
          onChange={(e) => setInputCmd(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isExecuting}
          placeholder="Nhập lệnh bash (VD: ls, python3 -V, htop)... (Nhấn Enter)"
          className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none font-mono text-xs"
          autoFocus
        />
        <button
          type="button"
          onClick={() => handleExecute(inputCmd)}
          disabled={!inputCmd.trim() || isExecuting}
          className="px-3 py-1 text-[11px] font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-30 rounded transition-colors whitespace-nowrap"
        >
          Chạy Lệnh
        </button>
      </div>
    </div>
  );
};
