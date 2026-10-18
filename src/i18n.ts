export type LanguageCode =
  | 'vi'
  | 'en'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'fr'
  | 'de'
  | 'es'
  | 'pt'
  | 'ru'
  | 'th'
  | 'id';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  shortLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', shortLabel: 'VN' },
  { code: 'en', name: 'English', nativeName: 'English', shortLabel: 'EN' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', shortLabel: 'ZH' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', shortLabel: 'JA' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', shortLabel: 'KO' },
  { code: 'fr', name: 'French', nativeName: 'Français', shortLabel: 'FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', shortLabel: 'DE' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', shortLabel: 'ES' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', shortLabel: 'PT' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', shortLabel: 'RU' },
  { code: 'th', name: 'Thai', nativeName: 'ภาษาไทย', shortLabel: 'TH' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', shortLabel: 'ID' }
];

export interface TranslationStrings {
  nav: {
    home: string;
    dashboard: string;
    sshTerminal: string;
    telegramBot: string;
    pricing: string;
    signInGoogle: string;
    signOut: string;
    activeLab: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    googleFastLogin: string;
    statUptime: string;
    statRam: string;
    statTunnel: string;
    statSecurity: string;
  };
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
  };
  auth: {
    modalTitle: string;
    modalSubtitle: string;
    continueWithGoogle: string;
    googleFastDesc: string;
    googleEmailLabel: string;
    googleNameLabel: string;
    verifyGoogleBtn: string;
    autoLinkColabCheckbox: string;
    securityNote: string;
    verifiedBadge: string;
  };
  colabLink: {
    title: string;
    subtitle: string;
    connected: string;
    notConnected: string;
    changeAccount: string;
    linkedEmail: string;
    ccuBalance: string;
    labQuota: string;
    step1Title: string;
    step1Desc: string;
    step1Btn: string;
    step2Title: string;
    step2Desc: string;
    step2Placeholder: string;
    step2Btn: string;
    quickDemoBtn: string;
  };
  launcher: {
    title: string;
    subtitle: string;
    hwLabel: string;
    highMemTitle: string;
    highMemDesc: string;
    tunnelLabel: string;
    tunnelBoreTitle: string;
    tunnelBoreDesc: string;
    tunnelTtyTitle: string;
    tunnelTtyDesc: string;
    tunnelNgrokTitle: string;
    tunnelNgrokDesc: string;
    sshPwdLabel: string;
    randomPwdBtn: string;
    startBtn: string;
    startingBtn: string;
    restartBtn: string;
    stopBtn: string;
    openNotebookBtn: string;
    singleLockTitle: string;
    singleLockDesc: string;
  };
  telemetry: {
    machineIdLabel: string;
    copyBtn: string;
    copiedBtn: string;
    telegramStatusLabel: string;
    telegramPaired: string;
    telegramWaiting: string;
    openBotBtn: string;
    testBotWebBtn: string;
    uptimeLabel: string;
    antiKillBadge: string;
    ramLabel: string;
    diskLabel: string;
  };
  ssh: {
    title: string;
    subtitle: string;
    copyCmdBtn: string;
    usersTitle: string;
    usersSubtitle: string;
    quickAddBtn: string;
    randomAddBtn: string;
    customAddBtn: string;
    changeAllPwdBtn: string;
    colUser: string;
    colRole: string;
    colCmd: string;
    colTime: string;
    colAction: string;
    changePwdBtn: string;
  };
  pricing: {
    kicker: string;
    title: string;
    subtitle: string;
    monthly: string;
    annual: string;
    starterName: string;
    starterDesc: string;
    standardName: string;
    standardDesc: string;
    proName: string;
    proDesc: string;
    selectBtn: string;
    popularBadge: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  vi: {
    nav: {
      home: 'Trang Chủ',
      dashboard: 'Bảng Điều Khiển',
      sshTerminal: 'SSH & Terminal',
      telegramBot: 'Bot Telegram',
      pricing: 'Gói Dịch Vụ',
      signInGoogle: 'Đăng nhập Google',
      signOut: 'Đăng xuất',
      activeLab: '1 Lab Đang Chạy'
    },
    hero: {
      kicker: 'Hạ Tầng Đám Mây Suzlab · Triển Khai Trên Railway',
      title: 'Treo Hộ Google Colab 24/7 & Cấp SSH Tự Động',
      subtitle: 'Không cần giữ trình duyệt. Hệ thống tự động cấp phát máy ảo qua google-colab-cli, nạp Agent mã hóa trực tiếp vào RAM (Zero Source-Code Exposure), mở cổng Tunnel miễn phí và điều khiển qua Telegram Bot @Colab_lab_bot.',
      primaryCta: '⚡ Bật Treo Hộ Colab Ngay',
      secondaryCta: 'Trải Nghiệm SSH & Terminal',
      googleFastLogin: 'Đăng nhập nhanh bằng Google',
      statUptime: 'Bảo vệ Anti-Kill 24/7',
      statRam: 'RAM Railway < 150MB',
      statTunnel: 'Auto Free Tunnel bore.pub',
      statSecurity: '100% Nạp RAM qua Stdin'
    },
    features: {
      sectionTitle: 'Kiến Trúc Đám Mây Thế Hệ Mới',
      sectionSubtitle: 'Tối ưu hóa riêng biệt cho cả máy tính trạm và điện thoại di động với độ trễ cực thấp.',
      f1Title: '01. Bên Mình Treo Hộ 100%',
      f1Desc: 'Khách hàng chỉ cần đăng nhập Google và bấm bật máy. Máy chủ Railway của Suzlab sẽ duy trì kết nối WebSocket và tự động phục hồi Kernel 24/7.',
      f2Title: '02. Bảo Mật Zero Source-Code',
      f2Desc: 'Payload nén 3 lớp (XOR + Zlib + Base85) truyền thẳng vào RAM qua luồng stdin. Không bao giờ lưu bất kỳ file .py nào trên /content hay Google Drive.',
      f3Title: '03. Auto Free Tunnel Không Cần Token',
      f3Desc: 'Tự động tải và mở cổng bore.pub / pinggy.io ngay khi máy khởi chạy. Có ngay lệnh SSH chuẩn mà không cần đăng ký tài khoản Ngrok.',
      f4Title: '04. Điều Khiển Qua @Colab_lab_bot',
      f4Desc: 'Đồng bộ đa máy với cơ chế đọc offset âm (-25). Quản lý Uptime, tạo thêm User SSH và đổi mật khẩu đồng loạt bằng bàn phím Inline trên Telegram.'
    },
    auth: {
      modalTitle: 'Xác Minh & Đăng Nhập Bằng Google',
      modalSubtitle: 'Sử dụng tài khoản Google của bạn để đăng nhập hệ thống Suzlab Colab trong 1 chạm.',
      continueWithGoogle: 'Đăng nhập nhanh với Google (1-Chạm)',
      googleFastDesc: 'Xác thực tức thì bằng tài khoản Google và tự động đồng bộ hạn mức Compute Units (CCU).',
      googleEmailLabel: 'Địa chỉ Gmail của bạn',
      googleNameLabel: 'Tên hiển thị',
      verifyGoogleBtn: 'Xác nhận & Đăng nhập bằng Google',
      autoLinkColabCheckbox: 'Tự động liên kết luôn quyền Google Colab CLI cho tài khoản này',
      securityNote: 'Bảo mật OAuth2 chính thức · Không lưu mật khẩu Google của bạn.',
      verifiedBadge: 'Đã xác minh Google'
    },
    colabLink: {
      title: 'Liên Kết Tài Khoản Google Colab Cá Nhân',
      subtitle: 'Giao thức OAuth2 Remote chuẩn của google-colab-cli (4 Scopes bảo mật).',
      connected: 'Đã Liên Kết Google Colab',
      notConnected: 'Chưa Liên Kết',
      changeAccount: 'Đổi tài khoản Google',
      linkedEmail: 'Tài Khoản Google Đã Gắn',
      ccuBalance: 'Số Dư Compute Units (CCU)',
      labQuota: 'Khóa Phiên (Single-Session Lock)',
      step1Title: 'Bước 1: Mở Trang Cấp Quyền Google',
      step1Desc: 'Nhấn nút bên dưới để mở cửa sổ ủy quyền chính thức của Google Cloud SDK và chọn tài khoản Colab.',
      step1Btn: '1. Mở Trang Cấp Quyền Google',
      step2Title: 'Bước 2: Dán Mã Xác Thực (Auth Code)',
      step2Desc: 'Sao chép mã 4/0A... từ Google trả về và dán vào ô dưới đây để hoàn tất:',
      step2Placeholder: 'Dán mã xác thực Google (VD: 4/0AbCd...)',
      step2Btn: '2. Xác Nhận Liên Kết Colab',
      quickDemoBtn: 'Điền mã xác thực mẫu để thử ngay'
    },
    launcher: {
      title: 'Khởi Tạo & Cấu Hình Treo Hộ (1-Click Launcher)',
      subtitle: 'Chọn phần cứng GPU/TPU và chế độ kết nối SSH. Khóa cứng 1 Tài khoản = 1 Lab.',
      hwLabel: '1. Chọn Phần Cứng Máy Ảo Google Colab',
      highMemTitle: 'Bật Chế Độ RAM Cao (--high-mem)',
      highMemDesc: 'Mở rộng lên tới 52GB System RAM cho các tác vụ huấn luyện AI và xử lý dữ liệu lớn.',
      tunnelLabel: '2. Chọn Chế Độ Tunnel Kết Nối SSH',
      tunnelBoreTitle: 'Suzlab Auto Free Tunnel (bore.pub)',
      tunnelBoreDesc: 'Khuyên dùng · Tự động cấp cổng SSH miễn phí, không cần điền bất kỳ Token nào.',
      tunnelTtyTitle: 'Web Terminal Trực Tiếp (/colab/tty)',
      tunnelTtyDesc: 'Gõ lệnh Bash trực tiếp ngay trên trình duyệt điện thoại hoặc máy tính.',
      tunnelNgrokTitle: 'Ngrok TCP Tunnel Cá Nhân',
      tunnelNgrokDesc: 'Sử dụng mã NGROK_TOKEN riêng của bạn để mở đường truyền TCP.',
      sshPwdLabel: '3. Mật Khẩu SSH Mặc Định (User: colab)',
      randomPwdBtn: 'Tạo ngẫu nhiên',
      startBtn: '⚡ BẬT TREO HỘ COLAB NGAY (24/7)',
      startingBtn: 'Đang cấp phát máy ảo & bơm Agent vào RAM...',
      restartBtn: 'Khởi Động Lại Kernel',
      stopBtn: 'Tắt & Giải Phóng Máy Colab',
      openNotebookBtn: 'Mở Google Colab Notebook',
      singleLockTitle: 'Đang Kích Hoạt Khóa 1 Tài Khoản = 1 Lab',
      singleLockDesc: 'Mỗi tài khoản chỉ được treo hộ tối đa 1 phiên suzlab_main để bảo vệ an toàn hạn mức Google.'
    },
    telemetry: {
      machineIdLabel: 'Mã Định Danh Máy Ảo',
      copyBtn: 'Sao chép',
      copiedBtn: 'Đã chép',
      telegramStatusLabel: 'Kết Nối Bot @Colab_lab_bot',
      telegramPaired: 'Đã liên kết Telegram',
      telegramWaiting: 'Đang chờ liên kết Telegram...',
      openBotBtn: 'Mở @Colab_lab_bot & Tự Động Liên Kết',
      testBotWebBtn: 'Mở Trình Giả Lập Bot Trên Web',
      uptimeLabel: 'Thời Gian Hoạt Động (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill: ĐANG BẢO VỆ 24/7',
      ramLabel: 'Bộ Nhớ RAM Đang Dùng',
      diskLabel: 'Dung Lượng Ổ Cứng SSD'
    },
    ssh: {
      title: 'Thông Tin Kết Nối SSH & Quản Lý Tài Khoản',
      subtitle: 'Sao chép lệnh SSH 1 chạm hoặc tạo thêm nhiều tài khoản sudo độc lập trên máy ảo.',
      copyCmdBtn: 'Copy Lệnh SSH',
      usersTitle: 'Danh Sách User SSH Trên Máy',
      usersSubtitle: 'Tất cả tài khoản đều được cấp quyền sudo NOPASSWD:ALL.',
      quickAddBtn: '+ Tạo nhanh (MK: 123456)',
      randomAddBtn: '+ Tạo nhanh (MK Ngẫu nhiên)',
      customAddBtn: 'Tạo User tùy chỉnh',
      changeAllPwdBtn: 'Đổi MK Tất Cả User',
      colUser: 'Tài Khoản',
      colRole: 'Quyền Hạn',
      colCmd: 'Lệnh Kết Nối Nhanh',
      colTime: 'Thời Gian Tạo',
      colAction: 'Thao Tác',
      changePwdBtn: 'Đổi mật khẩu'
    },
    pricing: {
      kicker: 'Bảng Giá Dịch Vụ Cloud SaaS',
      title: 'Gói Treo Hộ Google Colab 24/7',
      subtitle: 'Chi phí tối ưu, tự động hóa hoàn toàn từ lúc cấp phát máy đến khi mở cổng SSH.',
      monthly: 'Theo Tháng',
      annual: 'Theo Năm (-20%)',
      starterName: 'Gói Trải Nghiệm (Free)',
      starterDesc: 'Phù hợp kiểm thử kết nối SSH và trải nghiệm điều khiển qua Bot Telegram.',
      standardName: 'Gói Tiêu Chuẩn 24/7',
      standardDesc: 'Treo hộ liên tục 24/7 không giới hạn, bảo vệ chống ngắt kết nối toàn diện.',
      proName: 'Gói Chuyên Nghiệp Pro AI',
      proDesc: 'Hỗ trợ GPU A100/H100, RAM 52GB và luồng ưu tiên tốc độ cao trên Railway.',
      selectBtn: 'Chọn Gói Dịch Vụ Này',
      popularBadge: 'Phổ Biến Nhất'
    }
  },
  en: {
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      sshTerminal: 'SSH & Terminal',
      telegramBot: 'Telegram Bot',
      pricing: 'Pricing',
      signInGoogle: 'Sign in with Google',
      signOut: 'Sign Out',
      activeLab: '1 Active Lab'
    },
    hero: {
      kicker: 'Suzlab Cloud Infrastructure · Powered by Railway',
      title: '24/7 Google Colab Hosting & Automated SSH Cloud',
      subtitle: 'Zero browser tabs required. Automated VM provisioning via google-colab-cli, encrypted in-memory RAM payload injection (Zero Source-Code Exposure), instant free SSH tunnels, and full Telegram Bot @Colab_lab_bot control.',
      primaryCta: '⚡ Launch 24/7 Colab Now',
      secondaryCta: 'Explore SSH & Web Terminal',
      googleFastLogin: 'Instant Google Sign-In',
      statUptime: '24/7 Anti-Kill Shield',
      statRam: 'Railway Footprint < 150MB',
      statTunnel: 'Auto Free Tunnel bore.pub',
      statSecurity: '100% In-Memory Stdin Exec'
    },
    features: {
      sectionTitle: 'Next-Gen Cloud Hosting Architecture',
      sectionSubtitle: 'Purpose-built for both desktop workstations and mobile devices with ultra-low latency.',
      f1Title: '01. 100% Managed Cloud Hosting',
      f1Desc: 'Sign in with Google and click Launch. Suzlab Railway servers maintain persistent WebSocket heartbeats and auto-recover kernels 24/7.',
      f2Title: '02. Zero Source-Code Exposure',
      f2Desc: '3-layer encrypted payload (XOR + Zlib + Base85) piped directly into RAM via stdin. Zero .py files ever touch /content or Google Drive.',
      f3Title: '03. Tokenless Auto Free Tunnel',
      f3Desc: 'Automatically provisions bore.pub / pinggy.io TCP tunnels on boot. Get a working SSH command immediately without Ngrok tokens.',
      f4Title: '04. @Colab_lab_bot Remote Control',
      f4Desc: 'Multi-instance negative offset (-25) polling lets you check Uptime, create SSH users, and batch-rotate passwords via Telegram Inline Buttons.'
    },
    auth: {
      modalTitle: 'Google Account Verification & Sign-In',
      modalSubtitle: 'Sign in to Suzlab Colab in one tap using your Google Account.',
      continueWithGoogle: 'Continue with Google (1-Tap)',
      googleFastDesc: 'Instant verification with your Google Account and automatic Compute Units (CCU) sync.',
      googleEmailLabel: 'Your Google Email',
      googleNameLabel: 'Display Name',
      verifyGoogleBtn: 'Verify & Sign In with Google',
      autoLinkColabCheckbox: 'Automatically link Google Colab CLI permissions for this account',
      securityNote: 'Official OAuth2 Protocol · Your Google password is never stored.',
      verifiedBadge: 'Google Verified'
    },
    colabLink: {
      title: 'Connect Personal Google Colab Account',
      subtitle: 'Official google-colab-cli OAuth2 Remote flow (4 mandatory scopes).',
      connected: 'Colab Account Linked',
      notConnected: 'Not Connected',
      changeAccount: 'Switch Google Account',
      linkedEmail: 'Connected Google Account',
      ccuBalance: 'Compute Units (CCU) Balance',
      labQuota: 'Single-Session Lock Status',
      step1Title: 'Step 1: Open Google Authorization Page',
      step1Desc: 'Click below to open the official Google Cloud SDK consent screen and authorize Colab CLI.',
      step1Btn: '1. Open Google Consent Page',
      step2Title: 'Step 2: Paste Authorization Code',
      step2Desc: 'Copy the 4/0A... verification code from Google and paste it below:',
      step2Placeholder: 'Paste Google Auth Code (e.g. 4/0AbCd...)',
      step2Btn: '2. Verify & Link Colab',
      quickDemoBtn: 'Fill sample verification code for instant test'
    },
    launcher: {
      title: '1-Click Cloud Launcher & Hardware Config',
      subtitle: 'Select GPU/TPU runtime and SSH tunnel mode. Strictly locked to 1 Lab per account.',
      hwLabel: '1. Select Google Colab Runtime Hardware',
      highMemTitle: 'Enable High-RAM Mode (--high-mem)',
      highMemDesc: 'Expand up to 52GB System RAM for heavy AI training and dataset workloads.',
      tunnelLabel: '2. Select SSH Tunnel Mode',
      tunnelBoreTitle: 'Suzlab Auto Free Tunnel (bore.pub)',
      tunnelBoreDesc: 'Recommended · Zero-config public SSH port, no third-party token required.',
      tunnelTtyTitle: 'Direct Web Terminal (/colab/tty)',
      tunnelTtyDesc: 'Run bash commands directly inside your mobile or desktop browser.',
      tunnelNgrokTitle: 'Personal Ngrok TCP Tunnel',
      tunnelNgrokDesc: 'Use your own NGROK_TOKEN for dedicated TCP forwarding.',
      sshPwdLabel: '3. Default SSH Password (User: colab)',
      randomPwdBtn: 'Generate Random',
      startBtn: '⚡ LAUNCH 24/7 COLAB INSTANCE NOW',
      startingBtn: 'Provisioning VM & injecting RAM payload...',
      restartBtn: 'Restart Kernel',
      stopBtn: 'Stop & Release Colab VM',
      openNotebookBtn: 'Open Colab Notebook UI',
      singleLockTitle: 'Single-Session Lock Active (1 Account = 1 Lab)',
      singleLockDesc: 'Your account is isolated in /tmp/suzlab_users/ with an active suzlab_main runtime.'
    },
    telemetry: {
      machineIdLabel: 'Machine Identifier Code',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      telegramStatusLabel: '@Colab_lab_bot Connection',
      telegramPaired: 'Linked to Telegram',
      telegramWaiting: 'Waiting for Telegram link...',
      openBotBtn: 'Open @Colab_lab_bot & Auto-Pair',
      testBotWebBtn: 'Open Interactive Bot Simulator',
      uptimeLabel: 'Live Runtime Uptime',
      antiKillBadge: 'Suzlab Anti-Kill: 24/7 PROTECTED',
      ramLabel: 'System RAM Usage',
      diskLabel: 'SSD Disk Usage'
    },
    ssh: {
      title: 'Direct SSH Connection & User Management',
      subtitle: 'One-click copy SSH command or provision additional passwordless-sudo users.',
      copyCmdBtn: 'Copy SSH Command',
      usersTitle: 'Active SSH Users on VM',
      usersSubtitle: 'All provisioned users include full NOPASSWD:ALL sudo privileges.',
      quickAddBtn: '+ Quick User (PW: 123456)',
      randomAddBtn: '+ Quick User (Random PW)',
      customAddBtn: 'Create Custom User',
      changeAllPwdBtn: 'Rotate All Passwords',
      colUser: 'Username',
      colRole: 'Privilege',
      colCmd: 'SSH Command',
      colTime: 'Created',
      colAction: 'Action',
      changePwdBtn: 'Change Password'
    },
    pricing: {
      kicker: 'Cloud SaaS Plans',
      title: '24/7 Managed Google Colab Plans',
      subtitle: 'Transparent pricing with full automation from runtime creation to SSH tunneling.',
      monthly: 'Monthly',
      annual: 'Annual (-20%)',
      starterName: 'Starter Trial (Free)',
      starterDesc: 'Ideal for testing automated SSH tunnels and Telegram Bot remote controls.',
      standardName: 'Standard 24/7 Hosting',
      standardDesc: 'Uninterrupted 24/7 keep-alive hosting with automated kernel recovery.',
      proName: 'Pro AI Enterprise',
      proDesc: 'Full access to A100/H100 GPUs, 52GB High-RAM, and priority Railway workers.',
      selectBtn: 'Select This Plan',
      popularBadge: 'Most Popular'
    }
  },
  zh: {
    nav: {
      home: '首页',
      dashboard: '控制台',
      sshTerminal: 'SSH 与终端',
      telegramBot: '电报机器人',
      pricing: '服务套餐',
      signInGoogle: 'Google 登录',
      signOut: '退出登录',
      activeLab: '1 台运行中'
    },
    hero: {
      kicker: 'Suzlab 云基础设施 · Railway 驱动',
      title: 'Google Colab 24/7 全天候代挂与自动 SSH 云平台',
      subtitle: '无需保持浏览器开启。通过 google-colab-cli 自动分配虚拟机，内存级加密注入（零源码泄露），自动免费开启 SSH 隧道，并通过 @Colab_lab_bot 随时掌控。',
      primaryCta: '⚡ 立即开启 24/7 代挂',
      secondaryCta: '体验网页终端与 SSH',
      googleFastLogin: 'Google 账号一键登录',
      statUptime: '24/7 防断开保护',
      statRam: '服务器内存 < 150MB',
      statTunnel: '免费隧道 bore.pub',
      statSecurity: '100% 内存流注入'
    },
    features: {
      sectionTitle: '新一代云端托管架构',
      sectionSubtitle: '专为桌面工作站与手机移动端双端独立优化。',
      f1Title: '01. 100% 云端全自动托管',
      f1Desc: '使用 Google 登录后一键启动，Suzlab 服务器全天候维持心跳并自动恢复崩溃内核。',
      f2Title: '02. 零源码暴露安全架构',
      f2Desc: '三层加密载荷直接通过 stdin 注入内存执行，绝不在 /content 或云盘生成任何 .py 文件。',
      f3Title: '03. 免令牌自动免费隧道',
      f3Desc: '开机自动配置 bore.pub / pinggy.io 端口，无需注册 Ngrok 即可获得公网 SSH 连接。',
      f4Title: '04. @Colab_lab_bot 远程控制',
      f4Desc: '支持多机并发与内联按钮控制，随时查看运行时间、创建新 SSH 用户或批量修改密码。'
    },
    auth: {
      modalTitle: 'Google 账号验证与登录',
      modalSubtitle: '使用您的 Google 账号一键安全登录 Suzlab Colab。',
      continueWithGoogle: '使用 Google 账号继续 (一键登录)',
      googleFastDesc: '即时验证 Google 身份并自动同步 Colab 计算单元 (CCU) 余额。',
      googleEmailLabel: '您的 Gmail 邮箱',
      googleNameLabel: '显示名称',
      verifyGoogleBtn: '验证并登录 Google',
      autoLinkColabCheckbox: '同时自动绑定该账号的 Google Colab CLI 权限',
      securityNote: '官方 OAuth2 协议 · 绝不存储您的 Google 密码。',
      verifiedBadge: 'Google 已验证'
    },
    colabLink: {
      title: '绑定个人 Google Colab 账号',
      subtitle: '基于 google-colab-cli 官方 OAuth2 远程授权流程。',
      connected: '已绑定 Colab',
      notConnected: '未绑定',
      changeAccount: '切换 Google 账号',
      linkedEmail: '已关联 Google 邮箱',
      ccuBalance: '计算单元 (CCU) 余额',
      labQuota: '单会话锁定状态',
      step1Title: '第一步：打开 Google 授权页面',
      step1Desc: '点击下方按钮打开 Google Cloud SDK 授权窗口并允许访问。',
      step1Btn: '1. 打开 Google 授权页面',
      step2Title: '第二步：粘贴授权码',
      step2Desc: '复制 Google 返回的 4/0A... 授权码并粘贴至下方：',
      step2Placeholder: '在此粘贴授权码 (例如 4/0AbCd...)',
      step2Btn: '2. 确认绑定账号',
      quickDemoBtn: '填入演示授权码快速测试'
    },
    launcher: {
      title: '一键云启动器与硬件配置',
      subtitle: '选择 GPU/TPU 硬件与 SSH 隧道模式（每账号严格锁定 1 台实例）。',
      hwLabel: '1. 选择硬件加速类型',
      highMemTitle: '开启高内存模式 (--high-mem)',
      highMemDesc: '启用高达 52GB 系统内存，适合大模型训练与数据处理。',
      tunnelLabel: '2. 选择 SSH 隧道模式',
      tunnelBoreTitle: 'Suzlab 自动免费隧道 (bore.pub)',
      tunnelBoreDesc: '推荐 · 免配置免 Token 自动分配公网 SSH 端口。',
      tunnelTtyTitle: '网页直连终端 (/colab/tty)',
      tunnelTtyDesc: '直接在手机或电脑浏览器中运行 Bash 命令。',
      tunnelNgrokTitle: '个人 Ngrok TCP 隧道',
      tunnelNgrokDesc: '使用您个人的 NGROK_TOKEN 创建专属隧道。',
      sshPwdLabel: '3. 默认 SSH 密码 (用户: colab)',
      randomPwdBtn: '随机生成',
      startBtn: '⚡ 立即启动 24/7 COLAB 云主机',
      startingBtn: '正在分配虚拟机并注入内存载荷...',
      restartBtn: '重启内核',
      stopBtn: '停止并释放实例',
      openNotebookBtn: '打开 Colab 笔记本',
      singleLockTitle: '单实例锁定保护已激活 (1 账号 = 1 实例)',
      singleLockDesc: '您的会话已在独立目录隔离运行，防止配额冲突。'
    },
    telemetry: {
      machineIdLabel: '机器识别码',
      copyBtn: '复制',
      copiedBtn: '已复制',
      telegramStatusLabel: '@Colab_lab_bot 绑定状态',
      telegramPaired: '已绑定 Telegram',
      telegramWaiting: '等待绑定 Telegram...',
      openBotBtn: '打开 @Colab_lab_bot 自动配对',
      testBotWebBtn: '网页端交互模拟机器人',
      uptimeLabel: '持续运行时间 (Uptime)',
      antiKillBadge: 'Suzlab 防休眠：24/7 保护中',
      ramLabel: '内存使用率',
      diskLabel: '磁盘使用率'
    },
    ssh: {
      title: 'SSH 连接信息与多用户管理',
      subtitle: '一键复制 SSH 命令，或创建多个免密 sudo 账号。',
      copyCmdBtn: '复制 SSH 命令',
      usersTitle: '当前 SSH 用户列表',
      usersSubtitle: '所有用户均具备 NOPASSWD:ALL 管理员权限。',
      quickAddBtn: '+ 快速创建 (密码: 123456)',
      randomAddBtn: '+ 快速创建 (随机密码)',
      customAddBtn: '自定义新用户',
      changeAllPwdBtn: '批量修改所有密码',
      colUser: '用户名',
      colRole: '权限',
      colCmd: '连接命令',
      colTime: '创建时间',
      colAction: '操作',
      changePwdBtn: '修改密码'
    },
    pricing: {
      kicker: '云服务价格方案',
      title: '24/7 Google Colab 托管套餐',
      subtitle: '高性价比自动化云主机方案，支持全天候保活。',
      monthly: '按月付费',
      annual: '按年付费 (-20%)',
      starterName: '体验版 (免费)',
      starterDesc: '适合测试自动 SSH 隧道与电报机器人控制。',
      standardName: '标准版 24/7 托管',
      standardDesc: '全天候防休眠托管，支持内核崩溃自动恢复。',
      proName: '专业版 Pro AI',
      proDesc: '支持 A100/H100 显卡、52GB 高内存与优先调度。',
      selectBtn: '选择此方案',
      popularBadge: '最受欢迎'
    }
  },
  ja: {
    nav: {
      home: 'ホーム',
      dashboard: 'ダッシュボード',
      sshTerminal: 'SSH & ターミナル',
      telegramBot: 'Telegram ボット',
      pricing: '料金プラン',
      signInGoogle: 'Googleでログイン',
      signOut: 'ログアウト',
      activeLab: '1台稼働中'
    },
    hero: {
      kicker: 'Suzlab クラウド基盤 · Railway 稼働',
      title: 'Google Colab 24時間自動ホスティング & SSH クラウド',
      subtitle: 'ブラウザを開きっぱなしにする必要はありません。google-colab-cli による自動VM割り当て、RAM直接注入（ソースコード完全非公開）、無料SSHトンネル、Telegramボット @Colab_lab_bot 連携を提供します。',
      primaryCta: '⚡ 今すぐ24時間ホスティング開始',
      secondaryCta: 'SSH & Webターミナルを開く',
      googleFastLogin: 'Googleでワンタップログイン',
      statUptime: '24/7 Anti-Kill 保護',
      statRam: 'サーバーRAM < 150MB',
      statTunnel: '無料トンネル bore.pub',
      statSecurity: '100% RAM直接実行'
    },
    features: {
      sectionTitle: '次世代クラウドアーキテクチャ',
      sectionSubtitle: 'PCとスマートフォンの双方に専用設計されたハイパフォーマンスUI。',
      f1Title: '01. 100% クラウド自動維持',
      f1Desc: 'Googleでログインして起動するだけ。Railwayサーバーが24時間キープアライブと自動復旧を行います。',
      f2Title: '02. ゼロ・ソースコード露出',
      f2Desc: '3重暗号化ペイロードをstdin経由でRAMに直接展開。Googleドライブや/contentにファイルを一切残しません。',
      f3Title: '03. トークン不要の自動トンネル',
      f3Desc: 'bore.pub / pinggy.io を自動構成し、Ngrok登録なしで即座にSSH接続が可能です。',
      f4Title: '04. @Colab_lab_bot リモート管理',
      f4Desc: 'Telegramのインラインボタンから稼働時間確認、SSHユーザー追加、一括パスワード変更が可能です。'
    },
    auth: {
      modalTitle: 'Google アカウント認証 & ログイン',
      modalSubtitle: 'Googleアカウントを使ってワンタップでSuzlab Colabにログインします。',
      continueWithGoogle: 'Googleで続行 (ワンタップ)',
      googleFastDesc: 'Googleアカウントで即時認証し、Colab CCU残高を自動同期します。',
      googleEmailLabel: 'Gmail アドレス',
      googleNameLabel: '表示名',
      verifyGoogleBtn: 'Googleで認証してログイン',
      autoLinkColabCheckbox: 'Google Colab CLI の権限も自動的にリンクする',
      securityNote: '公式 OAuth2 プロトコル · パスワードは一切保存されません。',
      verifiedBadge: 'Google 認証済'
    },
    colabLink: {
      title: 'Google Colab アカウント連携',
      subtitle: 'google-colab-cli 公式 OAuth2 リモート認証フロー。',
      connected: '連携済み',
      notConnected: '未連携',
      changeAccount: 'アカウント変更',
      linkedEmail: '連携中のGoogleメール',
      ccuBalance: 'コンピューティング単位 (CCU)',
      labQuota: 'シングルセッション制限',
      step1Title: 'ステップ1: Google 認証ページを開く',
      step1Desc: '下のボタンを押してGoogleの認可画面を開き、アクセスを許可してください。',
      step1Btn: '1. Google 認証画面を開く',
      step2Title: 'ステップ2: 認証コードを貼り付け',
      step2Desc: '表示された 4/0A... のコードを貼り付けて連携を完了します：',
      step2Placeholder: '認証コードを貼り付け (例: 4/0AbCd...)',
      step2Btn: '2. 連携を確認する',
      quickDemoBtn: 'テスト用サンプルコードを入力'
    },
    launcher: {
      title: '1クリック・クラウドランチャー',
      subtitle: 'GPU/TPUハードウェアとトンネルモードを選択（1アカウント最大1台）。',
      hwLabel: '1. ハードウェアの選択',
      highMemTitle: 'ハイメモリモード (--high-mem)',
      highMemDesc: '最大52GBのシステムRAMを有効化します。',
      tunnelLabel: '2. SSH トンネルモードの選択',
      tunnelBoreTitle: 'Suzlab 自動無料トンネル (bore.pub)',
      tunnelBoreDesc: '推奨 · トークン不要で即座に公開SSHポートを割り当てます。',
      tunnelTtyTitle: 'ダイレクト Web ターミナル (/colab/tty)',
      tunnelTtyDesc: 'ブラウザ上で直接Bashコマンドを実行します。',
      tunnelNgrokTitle: '個人用 Ngrok TCP トンネル',
      tunnelNgrokDesc: '独自の NGROK_TOKEN を使用して接続します。',
      sshPwdLabel: '3. 初期 SSH パスワード (colab)',
      randomPwdBtn: 'ランダム生成',
      startBtn: '⚡ 24時間 COLAB ホスティングを起動',
      startingBtn: 'VMを割り当て、RAMへ注入中...',
      restartBtn: 'カーネル再起動',
      stopBtn: '停止してリソース解放',
      openNotebookBtn: 'Colab ノートブックを開く',
      singleLockTitle: 'シングルセッションロック有効',
      singleLockDesc: '1アカウントにつき1つの suzlab_main セッションが安全に分離されています。'
    },
    telemetry: {
      machineIdLabel: 'マシン識別コード',
      copyBtn: 'コピー',
      copiedBtn: '完了',
      telegramStatusLabel: '@Colab_lab_bot 連携状態',
      telegramPaired: 'Telegram 連携済',
      telegramWaiting: 'Telegram 連携待ち...',
      openBotBtn: '@Colab_lab_bot を開いて自動連携',
      testBotWebBtn: 'Web上でボットをシミュレート',
      uptimeLabel: '連続稼働時間 (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill: 24/7 保護中',
      ramLabel: 'RAM 使用量',
      diskLabel: 'ディスク使用量'
    },
    ssh: {
      title: 'SSH 接続情報 & ユーザー管理',
      subtitle: 'ワンクリックでSSHコマンドをコピー、または新規sudoユーザーを追加。',
      copyCmdBtn: 'コマンドをコピー',
      usersTitle: '登録済み SSH ユーザー',
      usersSubtitle: '全ユーザーに sudo NOPASSWD:ALL 権限が付与されています。',
      quickAddBtn: '+ クイック作成 (PW: 123456)',
      randomAddBtn: '+ クイック作成 (ランダムPW)',
      customAddBtn: 'カスタム作成',
      changeAllPwdBtn: '全パスワード一括変更',
      colUser: 'ユーザー名',
      colRole: '権限',
      colCmd: '接続コマンド',
      colTime: '作成時刻',
      colAction: '操作',
      changePwdBtn: 'PW変更'
    },
    pricing: {
      kicker: 'クラウド料金プラン',
      title: '24/7 Google Colab ホスティングプラン',
      subtitle: '起動からSSHトンネル構築まで完全自動化されたプラン。',
      monthly: '月払い',
      annual: '年払い (-20%)',
      starterName: 'スターター (無料)',
      starterDesc: 'SSH接続とTelegramボット操作のテストに最適。',
      standardName: 'スタンダード 24/7',
      standardDesc: '24時間無制限のキープアライブと自動カーネル復旧。',
      proName: 'Pro AI エンタープライズ',
      proDesc: 'A100/H100 GPU、52GB RAM、優先ワーカーをサポート。',
      selectBtn: 'このプランを選択',
      popularBadge: '人気 No.1'
    }
  },
  ko: {
    nav: {
      home: '홈',
      dashboard: '대시보드',
      sshTerminal: 'SSH & 터미널',
      telegramBot: '텔레그램 봇',
      pricing: '요금제',
      signInGoogle: 'Google 로그인',
      signOut: '로그아웃',
      activeLab: '1대 실행 중'
    },
    hero: {
      kicker: 'Suzlab 클라우드 인프라 · Railway 기반',
      title: 'Google Colab 24/7 무중단 호스팅 & 자동 SSH 클라우드',
      subtitle: '브라우저를 켜둘 필요가 없습니다. google-colab-cli를 통한 자동 VM 할당, 메모리 직접 주입(소스 코드 노출 제로), 무료 SSH 터널링 및 @Colab_lab_bot 원격 제어를 제공합니다.',
      primaryCta: '⚡ 지금 24/7 호스팅 시작',
      secondaryCta: 'SSH & 웹 터미널 열기',
      googleFastLogin: 'Google 계정 원탭 로그인',
      statUptime: '24/7 Anti-Kill 보호',
      statRam: '서버 RAM < 150MB',
      statTunnel: '무료 터널 bore.pub',
      statSecurity: '100% RAM 메모리 실행'
    },
    features: {
      sectionTitle: '차세대 클라우드 아키텍처',
      sectionSubtitle: '데스크톱과 모바일 환경 모두에 최적화된 전용 반응형 인터페이스.',
      f1Title: '01. 100% 클라우드 자동 유지',
      f1Desc: 'Google 로그인 후 버튼만 누르면 Railway 서버가 24시간 연결을 유지하고 커널을 자동 복구합니다.',
      f2Title: '02. 소스 코드 노출 제로 보안',
      f2Desc: '3중 암호화된 페이로드를 stdin을 통해 RAM에 직접 주입하여 파일 흔적을 남기지 않습니다.',
      f3Title: '03. 토큰 불필요 자동 무료 터널',
      f3Desc: '부팅 즉시 bore.pub / pinggy.io 포트를 개방하여 Ngrok 없이 바로 SSH 접속이 가능합니다.',
      f4Title: '04. @Colab_lab_bot 원격 제어',
      f4Desc: '텔레그램 인라인 버튼으로 가동 시간 확인, SSH 계정 생성 및 비밀번호 일괄 변경을 수행합니다.'
    },
    auth: {
      modalTitle: 'Google 계정 인증 및 로그인',
      modalSubtitle: 'Google 계정으로 원탭하여 Suzlab Colab에 즉시 로그인하세요.',
      continueWithGoogle: 'Google 계정으로 계속하기 (1-Tap)',
      googleFastDesc: 'Google 신원을 즉시 확인하고 Colab 컴퓨팅 단위(CCU)를 동기화합니다.',
      googleEmailLabel: 'Gmail 주소',
      googleNameLabel: '표시 이름',
      verifyGoogleBtn: 'Google 인증 및 로그인 완료',
      autoLinkColabCheckbox: '이 계정에 Google Colab CLI 권한 자동 연결',
      securityNote: '공식 OAuth2 보안 프로토콜 · 비밀번호를 저장하지 않습니다.',
      verifiedBadge: 'Google 인증됨'
    },
    colabLink: {
      title: '개인 Google Colab 계정 연결',
      subtitle: 'google-colab-cli 공식 OAuth2 원격 인증 프로토콜.',
      connected: '연결 완료',
      notConnected: '미연결',
      changeAccount: '계정 변경',
      linkedEmail: '연결된 Google 이메일',
      ccuBalance: '컴퓨팅 단위 (CCU) 잔액',
      labQuota: '단일 세션 잠금 상태',
      step1Title: '1단계: Google 권한 승인 페이지 열기',
      step1Desc: '아래 버튼을 눌러 Google Cloud SDK 승인 창을 열고 권한을 허용하세요.',
      step1Btn: '1. Google 승인 페이지 열기',
      step2Title: '2단계: 인증 코드 붙여넣기',
      step2Desc: '발급된 4/0A... 코드를 복사하여 아래에 붙여넣으세요:',
      step2Placeholder: '인증 코드 입력 (예: 4/0AbCd...)',
      step2Btn: '2. 연결 확인 및 완료',
      quickDemoBtn: '빠른 테스트를 위해 샘플 코드 채우기'
    },
    launcher: {
      title: '원클릭 클라우드 런처 & 하드웨어 설정',
      subtitle: 'GPU/TPU 사양 및 SSH 터널 모드를 선택하세요 (계정당 최대 1대).',
      hwLabel: '1. 가상머신 하드웨어 선택',
      highMemTitle: '고용량 RAM 모드 (--high-mem)',
      highMemDesc: '대규모 AI 학습을 위해 최대 52GB 시스템 RAM을 활성화합니다.',
      tunnelLabel: '2. SSH 터널 모드 선택',
      tunnelBoreTitle: 'Suzlab 자동 무료 터널 (bore.pub)',
      tunnelBoreDesc: '추천 · 토큰 입력 없이 무료 공인 SSH 포트를 즉시 할당합니다.',
      tunnelTtyTitle: '웹 터미널 직접 연결 (/colab/tty)',
      tunnelTtyDesc: '모바일이나 PC 브라우저에서 바로 Bash 명령을 실행합니다.',
      tunnelNgrokTitle: '개인 Ngrok TCP 터널',
      tunnelNgrokDesc: '개인 NGROK_TOKEN을 사용하여 전용 터널을 엽니다.',
      sshPwdLabel: '3. 기본 SSH 비밀번호 (colab)',
      randomPwdBtn: '무작위 생성',
      startBtn: '⚡ 24/7 COLAB 호스팅 지금 시작',
      startingBtn: 'VM 할당 및 RAM 페이로드 주입 중...',
      restartBtn: '커널 재시작',
      stopBtn: '중지 및 리소스 해제',
      openNotebookBtn: 'Colab 노트북 열기',
      singleLockTitle: '단일 세션 잠금 활성화됨 (1계정 = 1랩)',
      singleLockDesc: '독립된 컨테이너 경로에서 안전하게 단일 런타임을 유지합니다.'
    },
    telemetry: {
      machineIdLabel: '머신 식별 코드',
      copyBtn: '복사',
      copiedBtn: '복사됨',
      telegramStatusLabel: '@Colab_lab_bot 연결 상태',
      telegramPaired: '텔레그램 연결됨',
      telegramWaiting: '텔레그램 연결 대기 중...',
      openBotBtn: '@Colab_lab_bot 열기 및 자동 연동',
      testBotWebBtn: '웹에서 봇 시뮬레이터 열기',
      uptimeLabel: '실시간 가동 시간 (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill: 24/7 보호 작동 중',
      ramLabel: '시스템 RAM 사용량',
      diskLabel: 'SSD 디스크 사용량'
    },
    ssh: {
      title: 'SSH 접속 정보 및 계정 관리',
      subtitle: '원클릭으로 SSH 명령어를 복사하거나 추가 sudo 계정을 생성하세요.',
      copyCmdBtn: 'SSH 명령어 복사',
      usersTitle: '활성 SSH 사용자 목록',
      usersSubtitle: '모든 사용자는 NOPASSWD:ALL sudo 권한을 가집니다.',
      quickAddBtn: '+ 빠른 생성 (PW: 123456)',
      randomAddBtn: '+ 빠른 생성 (랜덤 PW)',
      customAddBtn: '사용자 지정 생성',
      changeAllPwdBtn: '전체 비밀번호 변경',
      colUser: '사용자',
      colRole: '권한',
      colCmd: '접속 명령어',
      colTime: '생성 시간',
      colAction: '관리',
      changePwdBtn: '비밀번호 변경'
    },
    pricing: {
      kicker: '클라우드 SaaS 요금제',
      title: '24/7 Google Colab 호스팅 플랜',
      subtitle: '런타임 할당부터 SSH 터널 개방까지 완벽한 자동화 서비스.',
      monthly: '월간 결제',
      annual: '연간 결제 (-20%)',
      starterName: '스타터 체험판 (무료)',
      starterDesc: '자동 SSH 터널과 텔레그램 봇 제어를 테스트하기에 적합합니다.',
      standardName: '스탠다드 24/7 호스팅',
      standardDesc: '무중단 24/7 킵얼라이브 및 커널 자동 복구 지원.',
      proName: '프로 AI 엔터프라이즈',
      proDesc: 'A100/H100 GPU, 52GB RAM 및 우선 실행 큐 지원.',
      selectBtn: '이 플랜 선택',
      popularBadge: '인기 플랜'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      dashboard: 'Tableau de bord',
      sshTerminal: 'SSH & Terminal',
      telegramBot: 'Bot Telegram',
      pricing: 'Tarifs',
      signInGoogle: 'Connexion Google',
      signOut: 'Déconnexion',
      activeLab: '1 Lab Actif'
    },
    hero: {
      kicker: 'Infrastructure Cloud Suzlab · Propulsé par Railway',
      title: 'Hébergement Google Colab 24/7 & Tunnel SSH Automatisé',
      subtitle: 'Aucun onglet de navigateur requis. Provisionnement automatique via google-colab-cli, injection chiffrée directement en RAM (Zéro exposition du code), tunnel SSH gratuit et contrôle via @Colab_lab_bot.',
      primaryCta: '⚡ Lancer Colab 24/7 Maintenant',
      secondaryCta: 'Ouvrir SSH & Terminal Web',
      googleFastLogin: 'Connexion rapide avec Google',
      statUptime: 'Protection Anti-Kill 24/7',
      statRam: 'RAM Serveur < 150 Mo',
      statTunnel: 'Tunnel Gratuit bore.pub',
      statSecurity: '100% Exécution RAM Stdin'
    },
    features: {
      sectionTitle: 'Architecture Cloud Nouvelle Génération',
      sectionSubtitle: 'Conçu sur mesure pour les écrans de bureau et la navigation tactile mobile.',
      f1Title: '01. Hébergement 100% Géré',
      f1Desc: 'Connectez-vous avec Google et lancez. Nos serveurs Railway maintiennent la session active 24h/24 et 7j/7.',
      f2Title: '02. Zéro Exposition du Code Source',
      f2Desc: 'Charge utile chiffrée en 3 couches injectée en RAM via stdin. Aucun fichier .py créé sur Google Drive.',
      f3Title: '03. Tunnel Gratuit Sans Jeton',
      f3Desc: 'Ouverture automatique de port via bore.pub / pinggy.io dès le démarrage sans compte Ngrok.',
      f4Title: '04. Contrôle via @Colab_lab_bot',
      f4Desc: 'Gérez le temps de fonctionnement, les utilisateurs SSH et les mots de passe depuis Telegram.'
    },
    auth: {
      modalTitle: 'Vérification & Connexion Google',
      modalSubtitle: 'Connectez-vous à Suzlab Colab en un clic avec votre compte Google.',
      continueWithGoogle: 'Continuer avec Google (1-Clic)',
      googleFastDesc: 'Vérification instantanée et synchronisation automatique des unités de calcul (CCU).',
      googleEmailLabel: 'Votre adresse Gmail',
      googleNameLabel: 'Nom complet',
      verifyGoogleBtn: 'Vérifier et se connecter avec Google',
      autoLinkColabCheckbox: 'Lier automatiquement les permissions Google Colab CLI',
      securityNote: 'Protocole OAuth2 officiel · Aucun mot de passe stocké.',
      verifiedBadge: 'Vérifié par Google'
    },
    colabLink: {
      title: 'Lier votre compte Google Colab personnel',
      subtitle: 'Flux OAuth2 distant officiel de google-colab-cli (4 scopes sécurisés).',
      connected: 'Compte Colab Lié',
      notConnected: 'Non Connecté',
      changeAccount: 'Changer de compte',
      linkedEmail: 'Compte Google Associé',
      ccuBalance: 'Solde Compute Units (CCU)',
      labQuota: 'Verrouillage Session Unique',
      step1Title: 'Étape 1 : Autorisation Google',
      step1Desc: 'Ouvrez la page de consentement Google Cloud SDK pour autoriser Colab CLI.',
      step1Btn: '1. Ouvrir la page Google',
      step2Title: 'Étape 2 : Coller le code d’autorisation',
      step2Desc: 'Collez le code 4/0A... fourni par Google ci-dessous :',
      step2Placeholder: 'Collez le code Google (ex: 4/0AbCd...)',
      step2Btn: '2. Confirmer la liaison',
      quickDemoBtn: 'Remplir un code démo pour tester'
    },
    launcher: {
      title: 'Lanceur Cloud 1-Clic & Configuration',
      subtitle: 'Choisissez votre GPU/TPU et le mode de tunnel SSH (1 Lab max par compte).',
      hwLabel: '1. Matériel de la machine virtuelle',
      highMemTitle: 'Mode Haute Mémoire (--high-mem)',
      highMemDesc: 'Jusqu’à 52 Go de RAM système pour les charges IA intensives.',
      tunnelLabel: '2. Mode Tunnel SSH',
      tunnelBoreTitle: 'Tunnel Gratuit Auto Suzlab (bore.pub)',
      tunnelBoreDesc: 'Recommandé · Port SSH public automatique sans jeton requis.',
      tunnelTtyTitle: 'Terminal Web Direct (/colab/tty)',
      tunnelTtyDesc: 'Exécutez des commandes Bash directement dans votre navigateur.',
      tunnelNgrokTitle: 'Tunnel TCP Ngrok Personnel',
      tunnelNgrokDesc: 'Utilisez votre propre jeton NGROK_TOKEN.',
      sshPwdLabel: '3. Mot de passe SSH initial (colab)',
      randomPwdBtn: 'Aléatoire',
      startBtn: '⚡ LANCER L’INSTANCE COLAB 24/7',
      startingBtn: 'Allocation VM et injection RAM en cours...',
      restartBtn: 'Redémarrer le noyau',
      stopBtn: 'Arrêter et libérer la VM',
      openNotebookBtn: 'Ouvrir le Notebook Colab',
      singleLockTitle: 'Verrouillage Session Unique Actif',
      singleLockDesc: 'Session isolée dans /tmp/suzlab_users/ pour protéger votre quota.'
    },
    telemetry: {
      machineIdLabel: 'Identifiant Machine',
      copyBtn: 'Copier',
      copiedBtn: 'Copié',
      telegramStatusLabel: 'Statut @Colab_lab_bot',
      telegramPaired: 'Lié à Telegram',
      telegramWaiting: 'En attente de liaison Telegram...',
      openBotBtn: 'Ouvrir @Colab_lab_bot & Lier',
      testBotWebBtn: 'Simulateur Bot Interactif',
      uptimeLabel: 'Temps de fonctionnement (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill : PROTÉGÉ 24/7',
      ramLabel: 'Utilisation RAM',
      diskLabel: 'Utilisation Disque SSD'
    },
    ssh: {
      title: 'Connexion SSH & Gestion des Utilisateurs',
      subtitle: 'Copiez la commande SSH en 1 clic ou créez des utilisateurs sudo supplémentaires.',
      copyCmdBtn: 'Copier la commande SSH',
      usersTitle: 'Utilisateurs SSH Actifs',
      usersSubtitle: 'Privilèges sudo NOPASSWD:ALL inclus pour chaque compte.',
      quickAddBtn: '+ Ajout rapide (MDP: 123456)',
      randomAddBtn: '+ Ajout rapide (MDP aléatoire)',
      customAddBtn: 'Utilisateur personnalisé',
      changeAllPwdBtn: 'Changer tous les MDP',
      colUser: 'Utilisateur',
      colRole: 'Rôle',
      colCmd: 'Commande SSH',
      colTime: 'Créé à',
      colAction: 'Action',
      changePwdBtn: 'Changer MDP'
    },
    pricing: {
      kicker: 'Forfaits Cloud SaaS',
      title: 'Offres d’Hébergement Colab 24/7',
      subtitle: 'Tarification transparente avec automatisation complète.',
      monthly: 'Mensuel',
      annual: 'Annuel (-20%)',
      starterName: 'Découverte (Gratuit)',
      starterDesc: 'Idéal pour tester le tunnel SSH et le bot Telegram.',
      standardName: 'Standard 24/7',
      standardDesc: 'Maintien en ligne 24/7 avec récupération automatique du noyau.',
      proName: 'Pro AI Entreprise',
      proDesc: 'Accès GPU A100/H100, 52 Go RAM et file prioritaire.',
      selectBtn: 'Choisir cette offre',
      popularBadge: 'Le Plus Populaire'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      dashboard: 'Dashboard',
      sshTerminal: 'SSH & Terminal',
      telegramBot: 'Telegram Bot',
      pricing: 'Preise',
      signInGoogle: 'Mit Google anmelden',
      signOut: 'Abmelden',
      activeLab: '1 Lab Aktiv'
    },
    hero: {
      kicker: 'Suzlab Cloud-Infrastruktur · Bereitgestellt auf Railway',
      title: '24/7 Google Colab Hosting & Automatisierter SSH-Cloud-Dienst',
      subtitle: 'Kein offener Browser-Tab erforderlich. Automatische VM-Bereitstellung über google-colab-cli, verschlüsselte RAM-Injektion (Zero Source-Code Exposure), kostenloser SSH-Tunnel und Steuerung über @Colab_lab_bot.',
      primaryCta: '⚡ 24/7 Colab Jetzt Starten',
      secondaryCta: 'SSH & Web-Terminal öffnen',
      googleFastLogin: 'Schnellanmeldung mit Google',
      statUptime: '24/7 Anti-Kill-Schutz',
      statRam: 'Server-RAM < 150 MB',
      statTunnel: 'Kostenloser bore.pub Tunnel',
      statSecurity: '100% RAM Stdin-Ausführung'
    },
    features: {
      sectionTitle: 'Cloud-Architektur der nächsten Generation',
      sectionSubtitle: 'Speziell optimiert für Desktop-Workstations und mobile Smartphones.',
      f1Title: '01. 100% Verwaltetes Hosting',
      f1Desc: 'Mit Google anmelden und starten. Railway-Server halten die Verbindung 24/7 aktiv.',
      f2Title: '02. Kein Quellcode-Leck',
      f2Desc: '3-fach verschlüsselte Payload wird direkt über stdin in den RAM geladen.',
      f3Title: '03. Tokenloser Gratis-Tunnel',
      f3Desc: 'Automatischer bore.pub / pinggy.io SSH-Port beim Start ohne Ngrok-Konto.',
      f4Title: '04. @Colab_lab_bot Fernsteuerung',
      f4Desc: 'Uptime prüfen, SSH-Benutzer anlegen und Passwörter per Telegram Inline-Tasten ändern.'
    },
    auth: {
      modalTitle: 'Google-Kontoverifizierung & Login',
      modalSubtitle: 'Melden Sie sich mit einem Klick über Ihr Google-Konto bei Suzlab Colab an.',
      continueWithGoogle: 'Weiter mit Google (1-Klick)',
      googleFastDesc: 'Sofortige Verifizierung und Synchronisierung Ihrer Compute Units (CCU).',
      googleEmailLabel: 'Ihre Gmail-Adresse',
      googleNameLabel: 'Anzeigename',
      verifyGoogleBtn: 'Verifizieren & mit Google anmelden',
      autoLinkColabCheckbox: 'Google Colab CLI-Berechtigungen automatisch verknüpfen',
      securityNote: 'Offizielles OAuth2-Protokoll · Keine Passwortspeicherung.',
      verifiedBadge: 'Google-verifiziert'
    },
    colabLink: {
      title: 'Persönliches Google Colab-Konto verknüpfen',
      subtitle: 'Offizieller google-colab-cli OAuth2-Remote-Flow (4 Sicherheits-Scopes).',
      connected: 'Colab Verknüpft',
      notConnected: 'Nicht verbunden',
      changeAccount: 'Konto wechseln',
      linkedEmail: 'Verknüpftes Google-Konto',
      ccuBalance: 'Compute Units (CCU) Guthaben',
      labQuota: 'Einzelsitzungs-Sperre',
      step1Title: 'Schritt 1: Google-Autorisierung öffnen',
      step1Desc: 'Öffnen Sie die Google Cloud SDK-Zustimmungsseite und erlauben Sie den Zugriff.',
      step1Btn: '1. Google-Freigabeseite öffnen',
      step2Title: 'Schritt 2: Autorisierungscode einfügen',
      step2Desc: 'Fügen Sie den 4/0A...-Code von Google unten ein:',
      step2Placeholder: 'Google Auth-Code einfügen (z.B. 4/0AbCd...)',
      step2Btn: '2. Verknüpfung bestätigen',
      quickDemoBtn: 'Demo-Code zum schnellen Testen einfügen'
    },
    launcher: {
      title: '1-Klick Cloud-Launcher & Hardware-Konfiguration',
      subtitle: 'GPU/TPU-Hardware und SSH-Tunnel wählen (max. 1 Lab pro Konto).',
      hwLabel: '1. Virtuelle Hardware auswählen',
      highMemTitle: 'High-RAM-Modus aktivieren (--high-mem)',
      highMemDesc: 'Bis zu 52 GB System-RAM für großes KI-Training.',
      tunnelLabel: '2. SSH-Tunnel-Modus wählen',
      tunnelBoreTitle: 'Suzlab Auto-Gratis-Tunnel (bore.pub)',
      tunnelBoreDesc: 'Empfohlen · Öffentlicher SSH-Port ohne Token.',
      tunnelTtyTitle: 'Direktes Web-Terminal (/colab/tty)',
      tunnelTtyDesc: 'Bash-Befehle direkt im Browser ausführen.',
      tunnelNgrokTitle: 'Persönlicher Ngrok TCP-Tunnel',
      tunnelNgrokDesc: 'Eigenen NGROK_TOKEN verwenden.',
      sshPwdLabel: '3. Standard-SSH-Passwort (colab)',
      randomPwdBtn: 'Zufällig',
      startBtn: '⚡ 24/7 COLAB-INSTANZ JETZT STARTEN',
      startingBtn: 'VM wird zugewiesen & RAM-Payload geladen...',
      restartBtn: 'Kernel neu starten',
      stopBtn: 'Colab-VM stoppen & freigeben',
      openNotebookBtn: 'Colab-Notebook öffnen',
      singleLockTitle: 'Einzelsitzungs-Sperre aktiv (1 Konto = 1 Lab)',
      singleLockDesc: 'Isolierte Ausführung unter /tmp/suzlab_users/.'
    },
    telemetry: {
      machineIdLabel: 'Maschinen-ID',
      copyBtn: 'Kopieren',
      copiedBtn: 'Kopiert',
      telegramStatusLabel: '@Colab_lab_bot Status',
      telegramPaired: 'Mit Telegram verknüpft',
      telegramWaiting: 'Warte auf Telegram-Verknüpfung...',
      openBotBtn: '@Colab_lab_bot öffnen & koppeln',
      testBotWebBtn: 'Bot-Simulator im Web öffnen',
      uptimeLabel: 'Aktive Laufzeit (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill: 24/7 GESCHÜTZT',
      ramLabel: 'RAM-Auslastung',
      diskLabel: 'SSD-Speicherplatz'
    },
    ssh: {
      title: 'SSH-Verbindung & Benutzerverwaltung',
      subtitle: 'SSH-Befehl mit einem Klick kopieren oder sudo-Benutzer anlegen.',
      copyCmdBtn: 'SSH-Befehl kopieren',
      usersTitle: 'Aktive SSH-Benutzer',
      usersSubtitle: 'Alle Konten besitzen NOPASSWD:ALL sudo-Rechte.',
      quickAddBtn: '+ Schnell-User (PW: 123456)',
      randomAddBtn: '+ Schnell-User (Zufalls-PW)',
      customAddBtn: 'Benutzerdefiniert',
      changeAllPwdBtn: 'Alle Passwörter ändern',
      colUser: 'Benutzer',
      colRole: 'Rolle',
      colCmd: 'SSH-Befehl',
      colTime: 'Erstellt',
      colAction: 'Aktion',
      changePwdBtn: 'PW ändern'
    },
    pricing: {
      kicker: 'Cloud-SaaS-Tarife',
      title: '24/7 Google Colab Hosting-Pakete',
      subtitle: 'Transparente Preise mit vollständiger Automatisierung.',
      monthly: 'Monatlich',
      annual: 'Jährlich (-20%)',
      starterName: 'Starter (Kostenlos)',
      starterDesc: 'Ideal zum Testen von SSH-Tunnel und Telegram-Bot.',
      standardName: 'Standard 24/7 Hosting',
      standardDesc: 'Dauerhafter 24/7-Betrieb mit automatischer Kernel-Wiederherstellung.',
      proName: 'Pro AI Enterprise',
      proDesc: 'A100/H100 GPUs, 52 GB RAM und Prioritäts-Queue.',
      selectBtn: 'Tarif auswählen',
      popularBadge: 'Beliebteste Wahl'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      dashboard: 'Panel de Control',
      sshTerminal: 'SSH y Terminal',
      telegramBot: 'Bot Telegram',
      pricing: 'Planes',
      signInGoogle: 'Iniciar con Google',
      signOut: 'Cerrar sesión',
      activeLab: '1 Lab Activo'
    },
    hero: {
      kicker: 'Infraestructura Cloud Suzlab · Desplegado en Railway',
      title: 'Hosting Google Colab 24/7 y Servidor SSH Automatizado',
      subtitle: 'Sin mantener pestañas abiertas. Aprovisionamiento automático vía google-colab-cli, inyección cifrada en RAM (Cero exposición de código), túnel SSH gratuito y control total desde Telegram @Colab_lab_bot.',
      primaryCta: '⚡ Activar Colab 24/7 Ahora',
      secondaryCta: 'Abrir SSH y Terminal Web',
      googleFastLogin: 'Acceso rápido con Google',
      statUptime: 'Protección Anti-Kill 24/7',
      statRam: 'RAM Servidor < 150 MB',
      statTunnel: 'Túnel Gratis bore.pub',
      statSecurity: '100% En Memoria RAM'
    },
    features: {
      sectionTitle: 'Arquitectura Cloud de Nueva Generación',
      sectionSubtitle: 'Diseño independiente optimizado para ordenadores de escritorio y teléfonos móviles.',
      f1Title: '01. Hosting 100% Gestionado',
      f1Desc: 'Inicia sesión con Google y activa tu máquina. Nuestros servidores en Railway mantienen la sesión viva 24/7.',
      f2Title: '02. Cero Exposición de Código Fuente',
      f2Desc: 'Carga cifrada en 3 capas inyectada en RAM por stdin. Nunca se guardan archivos .py en Google Drive.',
      f3Title: '03. Túnel Gratis Sin Token',
      f3Desc: 'Apertura automática de puerto bore.pub / pinggy.io sin necesidad de cuenta Ngrok.',
      f4Title: '04. Control con @Colab_lab_bot',
      f4Desc: 'Consulta Uptime, crea usuarios SSH y cambia contraseñas desde Telegram con botones Inline.'
    },
    auth: {
      modalTitle: 'Verificación e Inicio de Sesión con Google',
      modalSubtitle: 'Accede a Suzlab Colab en un toque usando tu cuenta de Google.',
      continueWithGoogle: 'Continuar con Google (1-Toque)',
      googleFastDesc: 'Verificación instantánea y sincronización automática de unidades de cómputo (CCU).',
      googleEmailLabel: 'Tu correo Gmail',
      googleNameLabel: 'Nombre a mostrar',
      verifyGoogleBtn: 'Verificar y Entrar con Google',
      autoLinkColabCheckbox: 'Vincular automáticamente permisos de Google Colab CLI',
      securityNote: 'Protocolo oficial OAuth2 · Nunca almacenamos tu contraseña.',
      verifiedBadge: 'Verificado por Google'
    },
    colabLink: {
      title: 'Vincular Cuenta Personal de Google Colab',
      subtitle: 'Flujo remoto OAuth2 oficial de google-colab-cli (4 permisos seguros).',
      connected: 'Colab Vinculado',
      notConnected: 'Sin Vincular',
      changeAccount: 'Cambiar cuenta',
      linkedEmail: 'Cuenta Google Conectada',
      ccuBalance: 'Saldo Compute Units (CCU)',
      labQuota: 'Bloqueo de Sesión Única',
      step1Title: 'Paso 1: Abrir Autorización de Google',
      step1Desc: 'Abre la ventana oficial de Google Cloud SDK y autoriza el acceso.',
      step1Btn: '1. Abrir Página de Google',
      step2Title: 'Paso 2: Pegar Código de Autorización',
      step2Desc: 'Pega el código 4/0A... proporcionado por Google:',
      step2Placeholder: 'Pega el código aquí (ej: 4/0AbCd...)',
      step2Btn: '2. Confirmar Vinculación',
      quickDemoBtn: 'Rellenar código de demostración rápido'
    },
    launcher: {
      title: 'Lanzador Cloud 1-Clic y Configuración',
      subtitle: 'Selecciona GPU/TPU y modo de túnel SSH (1 Lab máximo por cuenta).',
      hwLabel: '1. Seleccionar Hardware de la VM',
      highMemTitle: 'Activar Modo Alta RAM (--high-mem)',
      highMemDesc: 'Hasta 52 GB de RAM del sistema para cargas pesadas de IA.',
      tunnelLabel: '2. Seleccionar Modo de Túnel SSH',
      tunnelBoreTitle: 'Túnel Gratis Auto Suzlab (bore.pub)',
      tunnelBoreDesc: 'Recomendado · Puerto SSH público sin necesidad de Token.',
      tunnelTtyTitle: 'Terminal Web Directa (/colab/tty)',
      tunnelTtyDesc: 'Ejecuta comandos Bash directamente desde el navegador.',
      tunnelNgrokTitle: 'Túnel TCP Ngrok Personal',
      tunnelNgrokDesc: 'Usa tu propio NGROK_TOKEN personal.',
      sshPwdLabel: '3. Contraseña SSH Inicial (colab)',
      randomPwdBtn: 'Aleatoria',
      startBtn: '⚡ ENCENDER MÁQUINA COLAB 24/7 AHORA',
      startingBtn: 'Asignando VM e inyectando agente en RAM...',
      restartBtn: 'Reiniciar Kernel',
      stopBtn: 'Apagar y Liberar Máquina',
      openNotebookBtn: 'Abrir Notebook Colab',
      singleLockTitle: 'Bloqueo de Sesión Única Activo',
      singleLockDesc: 'Entorno aislado en /tmp/suzlab_users/ para proteger tu cuenta.'
    },
    telemetry: {
      machineIdLabel: 'Código Identificador de Máquina',
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      telegramStatusLabel: 'Estado de @Colab_lab_bot',
      telegramPaired: 'Vinculado a Telegram',
      telegramWaiting: 'Esperando vinculación con Telegram...',
      openBotBtn: 'Abrir @Colab_lab_bot y Vincular',
      testBotWebBtn: 'Simulador Interactivo del Bot',
      uptimeLabel: 'Tiempo Activo (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill: PROTEGIDO 24/7',
      ramLabel: 'Uso de Memoria RAM',
      diskLabel: 'Uso de Disco SSD'
    },
    ssh: {
      title: 'Conexión SSH y Gestión de Usuarios',
      subtitle: 'Copia el comando SSH en 1 clic o añade múltiples usuarios sudo.',
      copyCmdBtn: 'Copiar Comando SSH',
      usersTitle: 'Usuarios SSH Activos',
      usersSubtitle: 'Todos los usuarios cuentan con permisos sudo NOPASSWD:ALL.',
      quickAddBtn: '+ Usuario Rápido (Clave: 123456)',
      randomAddBtn: '+ Usuario Rápido (Clave Aleatoria)',
      customAddBtn: 'Usuario Personalizado',
      changeAllPwdBtn: 'Cambiar Todas las Claves',
      colUser: 'Usuario',
      colRole: 'Rol',
      colCmd: 'Comando SSH',
      colTime: 'Creado',
      colAction: 'Acción',
      changePwdBtn: 'Cambiar Clave'
    },
    pricing: {
      kicker: 'Planes Cloud SaaS',
      title: 'Planes de Hosting Google Colab 24/7',
      subtitle: 'Automatización total desde el arranque hasta el túnel SSH.',
      monthly: 'Mensual',
      annual: 'Anual (-20%)',
      starterName: 'Plan Inicial (Gratis)',
      starterDesc: 'Ideal para probar el túnel SSH y el bot de Telegram.',
      standardName: 'Plan Estándar 24/7',
      standardDesc: 'Keep-alive ininterrumpido 24/7 y recuperación automática.',
      proName: 'Plan Pro AI Empresarial',
      proDesc: 'Soporte para GPU A100/H100, 52 GB RAM y prioridad.',
      selectBtn: 'Elegir Este Plan',
      popularBadge: 'Más Popular'
    }
  },
  pt: {
    nav: {
      home: 'Início',
      dashboard: 'Painel',
      sshTerminal: 'SSH e Terminal',
      telegramBot: 'Bot Telegram',
      pricing: 'Planos',
      signInGoogle: 'Entrar com Google',
      signOut: 'Sair',
      activeLab: '1 Lab Ativo'
    },
    hero: {
      kicker: 'Infraestrutura Cloud Suzlab · Hospedado na Railway',
      title: 'Hospedagem Google Colab 24/7 e SSH Cloud Automático',
      subtitle: 'Sem precisar manter o navegador aberto. Provisionamento via google-colab-cli, injeção criptografada na RAM (Zero exposição de código), túnel SSH gratuito e controle pelo @Colab_lab_bot.',
      primaryCta: '⚡ Ativar Colab 24/7 Agora',
      secondaryCta: 'Abrir SSH e Terminal Web',
      googleFastLogin: 'Login Rápido com Google',
      statUptime: 'Proteção Anti-Kill 24/7',
      statRam: 'RAM Servidor < 150 MB',
      statTunnel: 'Túnel Grátis bore.pub',
      statSecurity: '100% Execução na RAM'
    },
    features: {
      sectionTitle: 'Arquitetura Cloud de Nova Geração',
      sectionSubtitle: 'Otimizado separadamente para computadores desktop e celulares.',
      f1Title: '01. 100% Gerenciado na Nuvem',
      f1Desc: 'Entre com o Google e clique em iniciar. Os servidores Railway mantêm a máquina ativa 24/7.',
      f2Title: '02. Zero Exposição de Código-Fonte',
      f2Desc: 'Payload criptografado em 3 camadas injetado na RAM via stdin, sem arquivos .py no Drive.',
      f3Title: '03. Túnel Gratuito Sem Token',
      f3Desc: 'Abre automaticamente portas bore.pub / pinggy.io sem precisar de conta Ngrok.',
      f4Title: '04. Controle via @Colab_lab_bot',
      f4Desc: 'Monitore Uptime, crie usuários SSH e altere senhas diretamente pelo Telegram.'
    },
    auth: {
      modalTitle: 'Verificação e Login com Google',
      modalSubtitle: 'Entre no Suzlab Colab com 1 toque usando sua conta do Google.',
      continueWithGoogle: 'Continuar com Google (1-Toque)',
      googleFastDesc: 'Verificação imediata e sincronização de saldo Compute Units (CCU).',
      googleEmailLabel: 'Seu e-mail do Gmail',
      googleNameLabel: 'Nome de exibição',
      verifyGoogleBtn: 'Verificar e Entrar com Google',
      autoLinkColabCheckbox: 'Vincular automaticamente permissões do Google Colab CLI',
      securityNote: 'Protocolo OAuth2 oficial · Sua senha nunca é salva.',
      verifiedBadge: 'Verificado pelo Google'
    },
    colabLink: {
      title: 'Vincular Conta Pessoal do Google Colab',
      subtitle: 'Fluxo OAuth2 remoto oficial do google-colab-cli.',
      connected: 'Colab Conectado',
      notConnected: 'Desconectado',
      changeAccount: 'Trocar conta',
      linkedEmail: 'E-mail Google Conectado',
      ccuBalance: 'Saldo Compute Units (CCU)',
      labQuota: 'Trava de Sessão Única',
      step1Title: 'Passo 1: Abrir Autorização do Google',
      step1Desc: 'Abra a janela oficial do Google Cloud SDK para autorizar o acesso.',
      step1Btn: '1. Abrir Página do Google',
      step2Title: 'Passo 2: Colar Código de Autorização',
      step2Desc: 'Cole o código 4/0A... gerado pelo Google abaixo:',
      step2Placeholder: 'Cole o código aqui (ex: 4/0AbCd...)',
      step2Btn: '2. Confirmar Vínculo',
      quickDemoBtn: 'Preencher código de teste rápido'
    },
    launcher: {
      title: 'Inicializador Cloud 1-Clique e Hardware',
      subtitle: 'Escolha GPU/TPU e modo de túnel SSH (limite de 1 Lab por conta).',
      hwLabel: '1. Escolher Hardware da Máquina Virtual',
      highMemTitle: 'Ativar Modo Alta RAM (--high-mem)',
      highMemDesc: 'Até 52 GB de RAM do sistema para cargas pesadas de IA.',
      tunnelLabel: '2. Modo de Túnel SSH',
      tunnelBoreTitle: 'Túnel Gratuito Auto Suzlab (bore.pub)',
      tunnelBoreDesc: 'Recomendado · Porta SSH pública sem necessidade de Token.',
      tunnelTtyTitle: 'Terminal Web Direto (/colab/tty)',
      tunnelTtyDesc: 'Execute comandos Bash diretamente no navegador.',
      tunnelNgrokTitle: 'Túnel TCP Ngrok Pessoal',
      tunnelNgrokDesc: 'Use seu próprio NGROK_TOKEN.',
      sshPwdLabel: '3. Senha SSH Padrão (colab)',
      randomPwdBtn: 'Gerar Aleatória',
      startBtn: '⚡ LIGAR MÁQUINA COLAB 24/7 AGORA',
      startingBtn: 'Alocando VM e injetando payload na RAM...',
      restartBtn: 'Reiniciar Kernel',
      stopBtn: 'Desligar e Liberar VM',
      openNotebookBtn: 'Abrir Notebook Colab',
      singleLockTitle: 'Trava de Sessão Única Ativa',
      singleLockDesc: 'Isolamento seguro em /tmp/suzlab_users/.'
    },
    telemetry: {
      machineIdLabel: 'Código da Máquina',
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      telegramStatusLabel: 'Status do @Colab_lab_bot',
      telegramPaired: 'Vinculado ao Telegram',
      telegramWaiting: 'Aguardando vínculo com Telegram...',
      openBotBtn: 'Abrir @Colab_lab_bot e Vincular',
      testBotWebBtn: 'Simulador do Bot na Web',
      uptimeLabel: 'Tempo Ativo (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill: PROTEGIDO 24/7',
      ramLabel: 'Uso de RAM',
      diskLabel: 'Uso de Disco SSD'
    },
    ssh: {
      title: 'Conexão SSH e Gerenciamento de Usuários',
      subtitle: 'Copie o comando SSH com 1 clique ou crie novos usuários sudo.',
      copyCmdBtn: 'Copiar Comando SSH',
      usersTitle: 'Usuários SSH na Máquina',
      usersSubtitle: 'Todos os usuários possuem permissão sudo NOPASSWD:ALL.',
      quickAddBtn: '+ Criar Rápido (Senha: 123456)',
      randomAddBtn: '+ Criar Rápido (Senha Aleatória)',
      customAddBtn: 'Usuário Personalizado',
      changeAllPwdBtn: 'Alterar Todas as Senhas',
      colUser: 'Usuário',
      colRole: 'Permissão',
      colCmd: 'Comando SSH',
      colTime: 'Criado em',
      colAction: 'Ação',
      changePwdBtn: 'Mudar Senha'
    },
    pricing: {
      kicker: 'Planos Cloud SaaS',
      title: 'Planos de Hospedagem Colab 24/7',
      subtitle: 'Automação completa com excelente custo-benefício.',
      monthly: 'Mensal',
      annual: 'Anual (-20%)',
      starterName: 'Iniciante (Grátis)',
      starterDesc: 'Ideal para testar túnel SSH e controle via Telegram.',
      standardName: 'Padrão 24/7',
      standardDesc: 'Keep-alive 24/7 contínuo com recuperação automática.',
      proName: 'Pro AI Enterprise',
      proDesc: 'Acesso a GPU A100/H100, 52 GB RAM e fila prioritária.',
      selectBtn: 'Selecionar Plano',
      popularBadge: 'Mais Popular'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      dashboard: 'Панель управления',
      sshTerminal: 'SSH и Терминал',
      telegramBot: 'Telegram Бот',
      pricing: 'Тарифы',
      signInGoogle: 'Войти через Google',
      signOut: 'Выйти',
      activeLab: '1 Активный Lab'
    },
    hero: {
      kicker: 'Облачная инфраструктура Suzlab · На базе Railway',
      title: 'Круглосуточный хостинг Google Colab 24/7 и Авто-SSH',
      subtitle: 'Не нужно держать браузер открытым. Автоматическое выделение ВМ через google-colab-cli, запуск агента прямо в ОЗУ (без сохранения исходного кода), бесплатный SSH-туннель и управление через @Colab_lab_bot.',
      primaryCta: '⚡ Запустить Colab 24/7 Сейчас',
      secondaryCta: 'Открыть SSH и Веб-Терминал',
      googleFastLogin: 'Быстрый вход через Google',
      statUptime: 'Защита Anti-Kill 24/7',
      statRam: 'ОЗУ сервера < 150 МБ',
      statTunnel: 'Бесплатный туннель bore.pub',
      statSecurity: '100% Запуск в ОЗУ (Stdin)'
    },
    features: {
      sectionTitle: 'Облачная Архитектура Нового Поколения',
      sectionSubtitle: 'Раздельная оптимизация интерфейса для ПК и мобильных телефонов.',
      f1Title: '01. 100% Облачное Поддержание',
      f1Desc: 'Войдите через Google и нажмите старт. Серверы Railway поддерживают работу ВМ 24/7.',
      f2Title: '02. Полная Защита Исходного Кода',
      f2Desc: 'Трехуровневое шифрование с передачей прямо в ОЗУ через stdin без создания .py файлов.',
      f3Title: '03. Бесплатный Туннель Без Токенов',
      f3Desc: 'Автоматический проброс порта через bore.pub / pinggy.io сразу после запуска.',
      f4Title: '04. Управление через @Colab_lab_bot',
      f4Desc: 'Проверка Uptime, создание SSH-пользователей и смена паролей через инлайн-кнопки Telegram.'
    },
    auth: {
      modalTitle: 'Авторизация через аккаунт Google',
      modalSubtitle: 'Войдите в систему Suzlab Colab в один клик с помощью Google.',
      continueWithGoogle: 'Продолжить через Google (1-Клик)',
      googleFastDesc: 'Мгновенный вход и автоматическая синхронизация баланса Compute Units (CCU).',
      googleEmailLabel: 'Ваш адрес Gmail',
      googleNameLabel: 'Отображаемое имя',
      verifyGoogleBtn: 'Подтвердить и войти через Google',
      autoLinkColabCheckbox: 'Автоматически привязать доступ Google Colab CLI',
      securityNote: 'Официальный протокол OAuth2 · Пароли не сохраняются.',
      verifiedBadge: 'Подтверждено Google'
    },
    colabLink: {
      title: 'Привязка личного аккаунта Google Colab',
      subtitle: 'Официальный протокол OAuth2 через google-colab-cli.',
      connected: 'Colab Подключен',
      notConnected: 'Не подключено',
      changeAccount: 'Сменить аккаунт',
      linkedEmail: 'Привязанный аккаунт Google',
      ccuBalance: 'Баланс Compute Units (CCU)',
      labQuota: 'Лимит (1 Аккаунт = 1 Сессия)',
      step1Title: 'Шаг 1: Открыть страницу разрешений Google',
      step1Desc: 'Откройте окно авторизации Google Cloud SDK и предоставьте доступ.',
      step1Btn: '1. Открыть авторизацию Google',
      step2Title: 'Шаг 2: Вставьте код подтверждения',
      step2Desc: 'Скопируйте код 4/0A... от Google и вставьте ниже:',
      step2Placeholder: 'Вставьте код (например, 4/0AbCd...)',
      step2Btn: '2. Подтвердить привязку',
      quickDemoBtn: 'Вставить демо-код для быстрого теста'
    },
    launcher: {
      title: 'Облачный Лаунчер в 1 Клик и Конфигурация',
      subtitle: 'Выберите GPU/TPU и режим SSH-туннеля (строго 1 сессия на аккаунт).',
      hwLabel: '1. Выбор оборудования ВМ',
      highMemTitle: 'Режим увеличенной ОЗУ (--high-mem)',
      highMemDesc: 'До 52 ГБ системной памяти для ресурсоемких задач ИИ.',
      tunnelLabel: '2. Режим SSH-туннеля',
      tunnelBoreTitle: 'Авто-туннель Suzlab (bore.pub)',
      tunnelBoreDesc: 'Рекомендуется · Бесплатный публичный порт без токенов.',
      tunnelTtyTitle: 'Прямой Веб-Терминал (/colab/tty)',
      tunnelTtyDesc: 'Выполнение Bash-команд прямо в браузере.',
      tunnelNgrokTitle: 'Личный Ngrok TCP Туннель',
      tunnelNgrokDesc: 'Использование собственного NGROK_TOKEN.',
      sshPwdLabel: '3. Пароль SSH по умолчанию (colab)',
      randomPwdBtn: 'Случайный',
      startBtn: '⚡ ЗАПУСТИТЬ COLAB 24/7 СЕЙЧАС',
      startingBtn: 'Выделение ВМ и загрузка агента в ОЗУ...',
      restartBtn: 'Перезапустить ядро',
      stopBtn: 'Остановить и освободить ВМ',
      openNotebookBtn: 'Открыть блокнот Colab',
      singleLockTitle: 'Активна блокировка одной сессии',
      singleLockDesc: 'Изолированный каталог /tmp/suzlab_users/.'
    },
    telemetry: {
      machineIdLabel: 'Идентификатор Машины',
      copyBtn: 'Копировать',
      copiedBtn: 'Скопировано',
      telegramStatusLabel: 'Статус @Colab_lab_bot',
      telegramPaired: 'Привязано к Telegram',
      telegramWaiting: 'Ожидание привязки Telegram...',
      openBotBtn: 'Открыть @Colab_lab_bot и привязать',
      testBotWebBtn: 'Веб-симулятор бота Telegram',
      uptimeLabel: 'Время непрерывной работы (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill: ЗАЩИТА 24/7',
      ramLabel: 'Использование ОЗУ',
      diskLabel: 'Использование SSD'
    },
    ssh: {
      title: 'SSH-подключение и управление пользователями',
      subtitle: 'Скопируйте команду SSH в 1 клик или добавьте новых sudo-пользователей.',
      copyCmdBtn: 'Скопировать SSH команду',
      usersTitle: 'Список SSH-пользователей',
      usersSubtitle: 'Все пользователи имеют права sudo NOPASSWD:ALL.',
      quickAddBtn: '+ Быстро (Пароль: 123456)',
      randomAddBtn: '+ Быстро (Случайный пароль)',
      customAddBtn: 'Свой пользователь',
      changeAllPwdBtn: 'Сменить все пароли',
      colUser: 'Логин',
      colRole: 'Права',
      colCmd: 'Команда подключения',
      colTime: 'Создан',
      colAction: 'Действие',
      changePwdBtn: 'Сменить пароль'
    },
    pricing: {
      kicker: 'Тарифные планы Cloud SaaS',
      title: 'Тарифы хостинга Google Colab 24/7',
      subtitle: 'Полная автоматизация от запуска ВМ до открытия SSH-туннеля.',
      monthly: 'Помесячно',
      annual: 'На год (-20%)',
      starterName: 'Стартовый (Бесплатно)',
      starterDesc: 'Для проверки SSH-туннеля и управления через Telegram-бота.',
      standardName: 'Стандарт 24/7',
      standardDesc: 'Круглосуточная поддержка активности и авто-восстановление.',
      proName: 'Pro AI Корпоративный',
      proDesc: 'Доступ к GPU A100/H100, 52 ГБ ОЗУ и приоритетный поток.',
      selectBtn: 'Выбрать тариф',
      popularBadge: 'Популярный'
    }
  },
  th: {
    nav: {
      home: 'หน้าแรก',
      dashboard: 'แดชบอร์ด',
      sshTerminal: 'SSH & เทอร์มินัล',
      telegramBot: 'บอท Telegram',
      pricing: 'แพ็กเกจราคา',
      signInGoogle: 'เข้าสู่ระบบด้วย Google',
      signOut: 'ออกจากระบบ',
      activeLab: 'ทำงานอยู่ 1 เครื่อง'
    },
    hero: {
      kicker: 'โครงสร้างพื้นฐานคลาวด์ Suzlab · รันบน Railway',
      title: 'บริการเปิดบอท Google Colab 24/7 & สร้าง SSH อัตโนมัติ',
      subtitle: 'ไม่ต้องเปิดเบราว์เซอร์ค้างไว้ ระบบจัดสรร VM อัตโนมัติผ่าน google-colab-cli ฉีดสคริปต์เข้ารหัสลง RAM โดยตรง (ไม่เปิดเผยซอร์สโค้ด) เปิด Tunnel ฟรี และควบคุมผ่าน @Colab_lab_bot',
      primaryCta: '⚡ เปิดใช้งาน Colab 24/7 ทันที',
      secondaryCta: 'ลองใช้ SSH & เว็บเทอร์มินัล',
      googleFastLogin: 'เข้าสู่ระบบด่วนด้วย Google',
      statUptime: 'ป้องกันการตัด 24/7',
      statRam: 'ใช้ RAM เซิร์ฟเวอร์ < 150MB',
      statTunnel: 'ฟรี Tunnel bore.pub',
      statSecurity: 'รันใน RAM 100%'
    },
    features: {
      sectionTitle: 'สถาปัตยกรรมคลาวด์ยุคใหม่',
      sectionSubtitle: 'ออกแบบแยกเฉพาะสำหรับหน้าจอคอมพิวเตอร์และสมาร์ทโฟนอย่างลงตัว',
      f1Title: '01. ดูแลระบบให้ 100% ตลอด 24 ชม.',
      f1Desc: 'เพียงล็อกอินด้วย Google แล้วกดเปิด เซิร์ฟเวอร์ Railway ของเราจะรักษาการเชื่อมต่อและกู้คืน Kernel อัตโนมัติ',
      f2Title: '02. ปลอดภัยไร้ไฟล์ตกค้าง',
      f2Desc: 'เข้ารหัส 3 ชั้นส่งตรงเข้า RAM ผ่าน stdin ไม่มีการสร้างไฟล์ .py ใน Google Drive ของคุณ',
      f3Title: '03. ฟรี Tunnel ไม่ต้องใช้โทเค็น',
      f3Desc: 'เปิดพอร์ต bore.pub / pinggy.io อัตโนมัติทันทีที่เครื่องเปิดใช้งานโดยไม่ต้องสมัคร Ngrok',
      f4Title: '04. ควบคุมผ่าน @Colab_lab_bot',
      f4Desc: 'เช็ค Uptime สร้างผู้ใช้ SSH เพิ่ม และเปลี่ยนรหัสผ่านได้ทันทีผ่านปุ่มกดใน Telegram'
    },
    auth: {
      modalTitle: 'ยืนยันตัวตนและเข้าสู่ระบบด้วย Google',
      modalSubtitle: 'เข้าใช้งาน Suzlab Colab ในคลิกเดียวด้วยบัญชี Google ของคุณ',
      continueWithGoogle: 'ดำเนินการต่อด้วย Google (1-คลิก)',
      googleFastDesc: 'ยืนยันตัวตนทันทีพร้อมซิงค์ข้อมูลหน่วยประมวลผล (CCU) อัตโนมัติ',
      googleEmailLabel: 'อีเมล Gmail ของคุณ',
      googleNameLabel: 'ชื่อที่แสดง',
      verifyGoogleBtn: 'ยืนยันและเข้าสู่ระบบด้วย Google',
      autoLinkColabCheckbox: 'เชื่อมต่อสิทธิ์ Google Colab CLI ให้บัญชีนี้อัตโนมัติ',
      securityNote: 'มาตรฐาน OAuth2 อย่างเป็นทางการ · ไม่มีการเก็บรหัสผ่านของคุณ',
      verifiedBadge: 'ยืนยันโดย Google แล้ว'
    },
    colabLink: {
      title: 'เชื่อมต่อบัญชี Google Colab ส่วนตัว',
      subtitle: 'ระบบยืนยันตัวตน OAuth2 มาตรฐานของ google-colab-cli',
      connected: 'เชื่อมต่อแล้ว',
      notConnected: 'ยังไม่เชื่อมต่อ',
      changeAccount: 'เปลี่ยนบัญชี',
      linkedEmail: 'อีเมล Google ที่เชื่อมต่อ',
      ccuBalance: 'คงเหลือ Compute Units (CCU)',
      labQuota: 'สถานะล็อก 1 บัญชี = 1 เครื่อง',
      step1Title: 'ขั้นตอนที่ 1: เปิดหน้าอนุญาตสิทธิ์ Google',
      step1Desc: 'คลิกปุ่มด้านล่างเพื่อเปิดหน้าต่างอนุญาตของ Google Cloud SDK',
      step1Btn: '1. เปิดหน้าอนุญาต Google',
      step2Title: 'ขั้นตอนที่ 2: วางรหัสยืนยัน (Auth Code)',
      step2Desc: 'คัดลอกรหัส 4/0A... ที่ได้จาก Google มาวางที่นี่:',
      step2Placeholder: 'วางรหัสยืนยันที่นี่ (เช่น 4/0AbCd...)',
      step2Btn: '2. ยืนยันการเชื่อมต่อ',
      quickDemoBtn: 'กรอกรหัสตัวอย่างเพื่อทดสอบทันที'
    },
    launcher: {
      title: 'ตัวเปิดระบบคลาวด์ 1-คลิก & ตั้งค่าฮาร์ดแวร์',
      subtitle: 'เลือกสเปค GPU/TPU และโหมด SSH Tunnel (จำกัด 1 เครื่องต่อบัญชี)',
      hwLabel: '1. เลือกฮาร์ดแวร์เครื่องเสมือน',
      highMemTitle: 'เปิดโหมด RAM สูง (--high-mem)',
      highMemDesc: 'ขยาย RAM ระบบสูงสุด 52GB สำหรับงาน AI ขนาดใหญ่',
      tunnelLabel: '2. เลือกโหมด SSH Tunnel',
      tunnelBoreTitle: 'Suzlab Auto Free Tunnel (bore.pub)',
      tunnelBoreDesc: 'แนะนำ · เปิดพอร์ต SSH ฟรีอัตโนมัติโดยไม่ต้องกรอก Token',
      tunnelTtyTitle: 'เว็บเทอร์มินัลโดยตรง (/colab/tty)',
      tunnelTtyDesc: 'พิมพ์คำสั่ง Bash บนเบราว์เซอร์มือถือหรือคอมพิวเตอร์ได้ทันที',
      tunnelNgrokTitle: 'Ngrok TCP Tunnel ส่วนตัว',
      tunnelNgrokDesc: 'ใช้ NGROK_TOKEN ส่วนตัวของคุณเอง',
      sshPwdLabel: '3. รหัสผ่าน SSH เริ่มต้น (ผู้ใช้: colab)',
      randomPwdBtn: 'สุ่มรหัสผ่าน',
      startBtn: '⚡ เปิดเครื่อง COLAB 24/7 ทันที',
      startingBtn: 'กำลังสร้าง VM และฉีดเอเจนต์เข้าสู่ RAM...',
      restartBtn: 'รีสตาร์ท Kernel',
      stopBtn: 'ปิดเครื่องและคืนทรัพยากร',
      openNotebookBtn: 'เปิดหน้า Colab Notebook',
      singleLockTitle: 'เปิดใช้งานระบบล็อก 1 บัญชีต่อ 1 เครื่อง',
      singleLockDesc: 'แยกโฟลเดอร์ปลอดภัยใน /tmp/suzlab_users/'
    },
    telemetry: {
      machineIdLabel: 'รหัสประจำเครื่อง (Machine ID)',
      copyBtn: 'คัดลอก',
      copiedBtn: 'คัดลอกแล้ว',
      telegramStatusLabel: 'สถานะบอท @Colab_lab_bot',
      telegramPaired: 'เชื่อมต่อ Telegram แล้ว',
      telegramWaiting: 'กำลังรอการเชื่อมต่อ Telegram...',
      openBotBtn: 'เปิด @Colab_lab_bot & เชื่อมต่ออัตโนมัติ',
      testBotWebBtn: 'จำลองการใช้งานบอทบนเว็บ',
      uptimeLabel: 'เวลาทำงานต่อเนื่อง (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill: ปกป้อง 24/7',
      ramLabel: 'การใช้หน่วยความจำ RAM',
      diskLabel: 'การใช้พื้นที่ดิสก์ SSD'
    },
    ssh: {
      title: 'ข้อมูลการเชื่อมต่อ SSH & จัดการผู้ใช้',
      subtitle: 'คัดลอกคำสั่ง SSH ในคลิกเดียว หรือเพิ่มบัญชีผู้ใช้ sudo ใหม่',
      copyCmdBtn: 'คัดลอกคำสั่ง SSH',
      usersTitle: 'รายชื่อผู้ใช้ SSH ในเครื่อง',
      usersSubtitle: 'ทุกบัญชีได้รับสิทธิ์ sudo NOPASSWD:ALL',
      quickAddBtn: '+ สร้างด่วน (รหัส: 123456)',
      randomAddBtn: '+ สร้างด่วน (สุ่มรหัส)',
      customAddBtn: 'สร้างผู้ใช้กำหนดเอง',
      changeAllPwdBtn: 'เปลี่ยนรหัสผ่านทั้งหมด',
      colUser: 'ชื่อผู้ใช้',
      colRole: 'สิทธิ์',
      colCmd: 'คำสั่งเชื่อมต่อ',
      colTime: 'เวลาสร้าง',
      colAction: 'จัดการ',
      changePwdBtn: 'เปลี่ยนรหัส'
    },
    pricing: {
      kicker: 'แพ็กเกจบริการ Cloud SaaS',
      title: 'แพ็กเกจเปิดบอท Google Colab 24/7',
      subtitle: 'คุ้มค่าด้วยระบบอัตโนมัติเต็มรูปแบบตั้งแต่ต้นจนจบ',
      monthly: 'รายเดือน',
      annual: 'รายปี (-20%)',
      starterName: 'แพ็กเกจทดลองใช้ (ฟรี)',
      starterDesc: 'เหมาะสำหรับทดสอบ SSH Tunnel และการควบคุมผ่านบอท Telegram',
      standardName: 'แพ็กเกจมาตรฐาน 24/7',
      standardDesc: 'ออนไลน์ต่อเนื่อง 24/7 พร้อมระบบกู้คืน Kernel อัตโนมัติ',
      proName: 'แพ็กเกจ Pro AI',
      proDesc: 'รองรับ GPU A100/H100, RAM 52GB และคิวประมวลผลพิเศษ',
      selectBtn: 'เลือกแพ็กเกจนี้',
      popularBadge: 'ยอดนิยม'
    }
  },
  id: {
    nav: {
      home: 'Beranda',
      dashboard: 'Dasbor',
      sshTerminal: 'SSH & Terminal',
      telegramBot: 'Bot Telegram',
      pricing: 'Harga',
      signInGoogle: 'Masuk dengan Google',
      signOut: 'Keluar',
      activeLab: '1 Lab Aktif'
    },
    hero: {
      kicker: 'Infrastruktur Cloud Suzlab · Ditenagai Railway',
      title: 'Hosting Google Colab 24/7 & Cloud SSH Otomatis',
      subtitle: 'Tanpa perlu membuka tab browser terus-menerus. Penyediaan VM otomatis via google-colab-cli, injeksi payload terenkripsi langsung ke RAM (Zero Source-Code Exposure), tunnel SSH gratis, dan kendali penuh via @Colab_lab_bot.',
      primaryCta: '⚡ Aktifkan Colab 24/7 Sekarang',
      secondaryCta: 'Buka SSH & Terminal Web',
      googleFastLogin: 'Login Cepat dengan Google',
      statUptime: 'Proteksi Anti-Kill 24/7',
      statRam: 'RAM Server < 150MB',
      statTunnel: 'Tunnel Gratis bore.pub',
      statSecurity: '100% Eksekusi RAM Stdin'
    },
    features: {
      sectionTitle: 'Arsitektur Cloud Generasi Baru',
      sectionSubtitle: 'Dioptimalkan secara terpisah untuk layar PC desktop dan ponsel pintar.',
      f1Title: '01. 100% Hosting Terkelola',
      f1Desc: 'Cukup masuk dengan Google dan klik mulai. Server Railway kami menjaga koneksi tetap hidup 24/7.',
      f2Title: '02. Tanpa Eksposur Kode Sumber',
      f2Desc: 'Payload terenkripsi 3 lapis dikirim langsung ke RAM melalui stdin tanpa menyimpan file .py di Drive.',
      f3Title: '03. Tunnel Gratis Tanpa Token',
      f3Desc: 'Membuka port publik bore.pub / pinggy.io secara otomatis saat mesin menyala tanpa akun Ngrok.',
      f4Title: '04. Kendali Jarak Jauh @Colab_lab_bot',
      f4Desc: 'Cek Uptime, tambah pengguna SSH, dan ubah kata sandi massal melalui tombol Inline Telegram.'
    },
    auth: {
      modalTitle: 'Verifikasi & Login Akun Google',
      modalSubtitle: 'Masuk ke Suzlab Colab dalam satu ketukan menggunakan akun Google Anda.',
      continueWithGoogle: 'Lanjutkan dengan Google (1-Klik)',
      googleFastDesc: 'Verifikasi instan dan sinkronisasi saldo Compute Units (CCU) otomatis.',
      googleEmailLabel: 'Alamat Gmail Anda',
      googleNameLabel: 'Nama Tampilan',
      verifyGoogleBtn: 'Verifikasi & Masuk dengan Google',
      autoLinkColabCheckbox: 'Tautkan izin Google Colab CLI secara otomatis',
      securityNote: 'Protokol OAuth2 Resmi · Kata sandi Anda tidak pernah disimpan.',
      verifiedBadge: 'Terverifikasi Google'
    },
    colabLink: {
      title: 'Tautkan Akun Google Colab Pribadi',
      subtitle: 'Alur OAuth2 jarak jauh resmi google-colab-cli (4 scope keamanan).',
      connected: 'Colab Terhubung',
      notConnected: 'Belum Terhubung',
      changeAccount: 'Ganti akun',
      linkedEmail: 'Akun Google Terhubung',
      ccuBalance: 'Saldo Compute Units (CCU)',
      labQuota: 'Kunci Sesi Tunggal',
      step1Title: 'Langkah 1: Buka Halaman Izin Google',
      step1Desc: 'Buka halaman persetujuan Google Cloud SDK dan berikan izin akses.',
      step1Btn: '1. Buka Halaman Izin Google',
      step2Title: 'Langkah 2: Tempel Kode Otorisasi',
      step2Desc: 'Salin kode 4/0A... dari Google dan tempel di bawah ini:',
      step2Placeholder: 'Tempel kode otorisasi (mis: 4/0AbCd...)',
      step2Btn: '2. Konfirmasi Tautan Colab',
      quickDemoBtn: 'Isi kode sampel untuk uji coba cepat'
    },
    launcher: {
      title: 'Peluncur Cloud 1-Klik & Konfigurasi',
      subtitle: 'Pilih hardware GPU/TPU dan mode tunnel SSH (maksimal 1 Lab per akun).',
      hwLabel: '1. Pilih Hardware Mesin Virtual',
      highMemTitle: 'Aktifkan Mode RAM Tinggi (--high-mem)',
      highMemDesc: 'Hingga 52GB RAM sistem untuk pelatihan AI dan data besar.',
      tunnelLabel: '2. Pilih Mode Tunnel SSH',
      tunnelBoreTitle: 'Suzlab Auto Free Tunnel (bore.pub)',
      tunnelBoreDesc: 'Direkomendasikan · Port SSH publik otomatis tanpa perlu Token.',
      tunnelTtyTitle: 'Terminal Web Langsung (/colab/tty)',
      tunnelTtyDesc: 'Jalankan perintah Bash langsung di browser ponsel atau PC.',
      tunnelNgrokTitle: 'Tunnel TCP Ngrok Pribadi',
      tunnelNgrokDesc: 'Gunakan NGROK_TOKEN pribadi Anda.',
      sshPwdLabel: '3. Kata Sandi SSH Awal (colab)',
      randomPwdBtn: 'Acak',
      startBtn: '⚡ NYALAKAN MESIN COLAB 24/7 SEKARANG',
      startingBtn: 'Mengalokasikan VM & menyuntikkan payload ke RAM...',
      restartBtn: 'Muat Ulang Kernel',
      stopBtn: 'Hentikan & Lepaskan VM',
      openNotebookBtn: 'Buka Notebook Colab',
      singleLockTitle: 'Kunci Sesi Tunggal Aktif (1 Akun = 1 Lab)',
      singleLockDesc: 'Direktori terisolasi dengan aman di /tmp/suzlab_users/.'
    },
    telemetry: {
      machineIdLabel: 'Kode Identitas Mesin',
      copyBtn: 'Salin',
      copiedBtn: 'Tersalin',
      telegramStatusLabel: 'Status Bot @Colab_lab_bot',
      telegramPaired: 'Terhubung ke Telegram',
      telegramWaiting: 'Menunggu tautan Telegram...',
      openBotBtn: 'Buka @Colab_lab_bot & Tautkan',
      testBotWebBtn: 'Buka Simulator Bot di Web',
      uptimeLabel: 'Waktu Aktif (Uptime)',
      antiKillBadge: 'Suzlab Anti-Kill: DILINDUNGI 24/7',
      ramLabel: 'Penggunaan RAM',
      diskLabel: 'Penggunaan Disk SSD'
    },
    ssh: {
      title: 'Koneksi SSH & Manajemen Pengguna',
      subtitle: 'Salin perintah SSH 1 klik atau buat akun pengguna sudo tambahan.',
      copyCmdBtn: 'Salin Perintah SSH',
      usersTitle: 'Daftar Pengguna SSH Aktif',
      usersSubtitle: 'Semua pengguna memiliki hak akses sudo NOPASSWD:ALL.',
      quickAddBtn: '+ Tambah Cepat (Sandi: 123456)',
      randomAddBtn: '+ Tambah Cepat (Sandi Acak)',
      customAddBtn: 'Pengguna Kustom',
      changeAllPwdBtn: 'Ubah Semua Sandi',
      colUser: 'Pengguna',
      colRole: 'Hak Akses',
      colCmd: 'Perintah SSH',
      colTime: 'Dibuat',
      colAction: 'Tindakan',
      changePwdBtn: 'Ubah Sandi'
    },
    pricing: {
      kicker: 'Paket Harga Cloud SaaS',
      title: 'Paket Hosting Google Colab 24/7',
      subtitle: 'Otomatisasi penuh dari penyediaan VM hingga pembukaan tunnel SSH.',
      monthly: 'Bulanan',
      annual: 'Tahunan (-20%)',
      starterName: 'Paket Pemula (Gratis)',
      starterDesc: 'Cocok untuk menguji tunnel SSH dan kendali bot Telegram.',
      standardName: 'Paket Standar 24/7',
      standardDesc: 'Keep-alive 24/7 tanpa henti dengan pemulihan kernel otomatis.',
      proName: 'Paket Pro AI Enterprise',
      proDesc: 'Dukungan GPU A100/H100, RAM 52GB, dan antrean prioritas.',
      selectBtn: 'Pilih Paket Ini',
      popularBadge: 'Paling Populer'
    }
  }
};
