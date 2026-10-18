export interface User {
  id: string;
  email: string;
  username: string;
  tier: 'free' | 'standard' | 'pro';
  colab_connected: boolean;
  colab_email: string;
  ccu_balance: number;
  ccu_rate: number;
}

export interface SSHUser {
  username: string;
  role: string;
  created_at: string;
}

export interface PairedTelegram {
  chat_id?: number | string;
  username?: string;
  paired_at?: string;
}

export interface ColabSession {
  machine_code: string;
  hardware_type: string;
  tunnel_mode: 'bore' | 'web_tty' | 'ngrok';
  status: 'idle' | 'starting' | 'online' | 'stopped';
  ssh_host: string;
  ssh_port: number;
  ssh_users: SSHUser[];
  ram_usage: string;
  disk_usage: string;
  uptime_seconds: number;
  paired_telegram: PairedTelegram;
  colab_notebook_url: string;
  anti_kill_active: boolean;
  high_mem: boolean;
  started_at: string;
}
