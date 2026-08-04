import { useState } from 'react'

/* ========== 导航栏数据 ========== */
const NAV_ITEMS = [
  { label: '关于', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: '经历', href: '#experience' },
  { label: '项目', href: '#projects' },
  { label: '联系', href: '#contact' },
]

/* ========== 技能数据 ========== */
const SKILL_CATEGORIES = [
  {
    title: '后端开发',
    icon: '⬡',
    skills: ['Java', 'SpringBoot', 'SpringCloud', 'gRPC', 'Netty', 'DDD 领域驱动设计', '微服务治理'],
  },
  {
    title: '前端开发',
    icon: '◈',
    skills: ['React', 'Vue'],
  },
  {
    title: '数据库 & 缓存',
    icon: '◉',
    skills: ['MySQL 分库分表/索引优化', 'Redis 缓存策略/持久化', 'ShardingSphere', 'MongoDB'],
  },
  {
    title: '消息中间件',
    icon: '⬙',
    skills: ['RabbitMQ', 'RocketMQ', 'CMQ', 'Kafka'],
  },
  {
    title: 'DevOps & 云平台',
    icon: '⎔',
    skills: ['K8s', 'Docker', 'Nginx', 'Linux', 'Jenkins CI/CD', 'Git', 'Maven', 'Nacos', 'XxlJob', '阿里云/华为云/腾讯云'],
  },
  {
    title: '金融业务',
    icon: '◈',
    skills: ['人行征信上报与查询', '金融监管报送', '贷中风控', '信贷保障', '保险对接（众安）', '海外征信（TransUnion）'],
  },
  {
    title: 'AI & 新技术',
    icon: '⟡',
    skills: ['AI Coding', 'Agent'],
  },
]

/* ========== 工作经历数据 ========== */
const EXPERIENCES = [
  {
    period: '2023.07 - 至今',
    role: 'Java 开发工程师',
    company: '深圳市互联数智科技有限公司',
    subtitle: '金融科技 SaaS 服务商 · 核心开发兼架构设计',
    highlights: [
      '独立负责征信业务系统与融担 SaaS 监管上报平台两大核心平台的全栈建设，覆盖后端、前端（React、Vue）及运维部署',
      '搭建基于 SpringBoot + gRPC 的微服务架构，结合 Redis 缓存与 MySQL 分库分表，引入 ShardingSphere 按日期分表及 MongoDB 存储非结构化附件',
      '开发可配置化规则引擎，将监管校验逻辑抽离为配置脚本，支持监管字段频繁变更场景下的快速迭代',
      '负责 Linux 环境部署、Nginx 负载均衡及日常运维，保障系统全年 99.99% 可用性',
    ],
    metrics: [
      { value: '700万', label: '成本节省' },
      { value: '100万+', label: '征信上报笔数' },
      { value: '300万+', label: '在线查询笔数' },
      { value: '100%', label: '监管合规率' },
    ],
  },
  {
    period: '2021.01 - 2023.07',
    role: 'Java 开发工程师',
    company: '深圳市富融信息科技有限公司',
    subtitle: '香港富融银行（Fusion Bank）大陆技术研发 · 技术负责人',
    highlights: [
      '主导贷中触达平台从 C++ 至 Java 的完整 DDD 重构，采用限界上下文将业务划分为"通知域""策略域""事件域"，通过领域事件解耦各业务模块',
      '设计并实施"双写+灰度"平滑迁移策略，新旧系统并行运行、逐步切换流量，确保迁移过程零故障',
      '对接 TransUnion（香港）海外征信系统，实现客户信用数据实时查询，补强贷中风控数据维度',
      '使用多线程等策略对重构后系统进行性能优化，并发吞吐量提升至原来的 3 倍，响应时间降低 50%',
    ],
    metrics: [
      { value: '3x', label: '并发吞吐提升' },
      { value: '50%', label: '响应时间降低' },
      { value: '10亿+', label: '信贷规模（港币）' },
      { value: '0', label: '迁移重大故障' },
    ],
  },
  {
    period: '2019.07 - 2020.12',
    role: 'Java 开发工程师',
    company: '深圳市小赢科技有限公司',
    subtitle: '小赢科技（NYSE: XYF）· 后台核心开发',
    highlights: [
      '负责信贷保障全流程（授信、投保、报案、追偿还款）系统的设计与开发，主导核心业务模块从 C++ 至 Java 的 DDD 重构',
      '使用 Scheduler + Saturn 分布式调度框架编排跨系统业务流程，结合状态机管理，确保 10+ 个跨系统步骤有序执行',
      '采用分布式事务补偿机制，保障投保与追偿金融交易的数据一致性，异常时自动触发重试与告警',
      '对接众安保险系统，保障保险对接与还款跟踪的高可靠性',
    ],
    metrics: [
      { value: '100%', label: 'C++→Java 迁移完成' },
      { value: '99.9%', label: '保险对接成功率' },
      { value: '10+', label: '跨系统步骤编排' },
    ],
  },
  {
    period: '2017.02 - 2019.07',
    role: 'Java 开发工程师',
    company: '珠海市小源科技有限公司',
    subtitle: '信析宝 SDK 核心接口组 · 骨干开发 · 获"性能优化奖"',
    highlights: [
      '基于 SpringBoot + Netty 构建非阻塞 NIO I/O 模型，替代传统 Tomcat BIO，并发连接数提升 5 倍',
      '构建 Redis + 本地多级缓存架构，结合布隆过滤器 + 互斥锁防御缓存击穿，保障热点查询稳定性',
      '主导全链路压测与 JVM 调优（GC 停顿优化），荣获公司年度"性能优化奖"',
    ],
    metrics: [
      { value: '15亿', unit: '次/日', label: '接口请求量' },
      { value: '40%', label: '响应时间降低' },
      { value: '5x', label: '并发连接提升' },
    ],
  },
  {
    period: '2015.09 - 2016.10',
    role: 'Java 开发工程师',
    company: '云印技术有限公司',
    subtitle: '互联网印刷电商 · 后台开发',
    highlights: [
      '负责电商平台后台订单模块的架构重构，引入 RabbitMQ 实现订单创建、支付、履约等关键节点的业务解耦',
      '通过消息异步化改造，显著提升系统稳定性，降低模块间耦合风险，改善线上问题定位效率',
    ],
  },
  {
    period: '2014.03 - 2015.09',
    role: 'Java 开发工程师',
    company: '深圳市彩讯科技有限公司',
    subtitle: '中国移动 139 邮箱技术服务商 · 中间件研发',
    highlights: [
      '参与研发高可用 PNS 消息推送平台，服务 139 邮箱及多家企业客户，支持 iOS/Android 多端长连接推送',
      '参与 139 邮箱配置中心开发，基于长连接实现配置实时下发与动态刷新能力',
      '参与移动公司招投标技术标书编写，助力项目成功中标',
    ],
  },
]

/* ========== 项目数据 ========== */
const PROJECTS = [
  {
    name: '征信业务系统',
    period: '2023.07 - 至今',
    role: '总负责人',
    intro: '面向融担/小贷公司的统一征信前置平台，对接人行征信系统，实现征信报送、查询及离线建模支撑一体化。',
    tech: 'SpringBoot + Docker + MySQL + Redis + React + Jenkins + Nginx + Nacos + XxlJob + 华为云/阿里云',
    achievements: [
      '设计百亿级数据存储方案，解决人行征信数百个字段与业务数据库的合规映射问题',
      '采用 XXL 切片 + 多线程策略，保障风控征信报文在数十秒内完成查询与返回',
      '引入 Redis 热点数据缓存与线程池限流措施，应对日均 1.5 万+ 笔并发查询及人行 QPS 限制约束',
      '累计完成 100 万+ 笔征信上报（准确率 100%）及 300 万+ 笔在线查询，自建系统直接节省成本 700 万元',
    ],
  },
  {
    name: '融担业务数据管理 SaaS 及监管上报平台',
    period: '2023.07 - 至今',
    role: '总负责人',
    intro: '面向融担公司的 SaaS 化监管上报平台，支撑向天津金融监管局报送百亿级担保数据，服务多家头部融担公司。',
    tech: 'SpringBoot + gRPC + MySQL + Redis + React + Jenkins + Nginx + Nacos + XxlJob + 华为云',
    achievements: [
      '采用 ShardingSphere 按日期分表策略应对百亿级担保数据存储，引入 MongoDB 存储非结构化担保附件',
      '开发可配置化规则引擎，将数百项监管字段校验逻辑抽离为配置化脚本，支持监管规则频繁变更',
      '设计"预校验+正式上报"双阶段流程，正式上报后实时回执确认，确保上报合规性与准确性',
      '累计上报百亿级担保数据，合规达标率 100%，服务明东东华、华澎等多家头部融担公司',
    ],
  },
  {
    name: '富融银行贷中触达系统重构',
    period: '2021.01 - 2023.07',
    role: '技术负责人',
    intro: '香港富融银行贷中触达核心系统，原系统基于 C++ 老旧框架，重构至 Java 微服务架构，支撑超 10 亿港币信贷规模。',
    tech: 'SpringBoot + CMQ + gRPC + MySQL + Redis',
    achievements: [
      '主导从 C++ 至 Java 的完整 DDD 重构，将业务划分为"通知域""策略域""事件域"，通过领域事件解耦业务模块',
      '设计并实施"双写+灰度"平滑迁移策略，新旧系统并行运行、逐步切换流量，迁移过程零重大故障',
      '对接 TransUnion（香港）海外征信系统，实现客户信用数据实时查询，补强贷中风控数据维度',
      '重构后并发吞吐量提升至原来的 3 倍，响应时间降低 50%，技术栈风险全面消除',
    ],
  },
  {
    name: '信贷保障方平台',
    period: '2019.07 - 2020.12',
    role: '技术负责人',
    intro: '小赢科技信贷业务全流程保障平台，对接众安保险，覆盖授信、投保、报案、追偿还款全流程。',
    tech: 'SpringBoot + CMQ + Service Mesh + MySQL + Scheduler + Saturn',
    achievements: [
      '主导全流程业务模块从 C++ 至 Java 的 DDD 重构，落地高内聚低耦合业务模型，消除旧系统技术债',
      '采用 Scheduler + Saturn 分布式调度框架实现跨系统任务编排，结合状态机管理，确保 10+ 步骤有序可靠执行',
      '采用分布式事务补偿机制保障金融交易数据一致性，异常时自动触发重试与告警',
      '100% 完成 C++ 至 Java 重构，保险对接成功率提升至 99.9%',
    ],
  },
  {
    name: '信析宝 SDK 核心接口',
    period: '2017.02 - 2019.07',
    role: '技术负责人',
    intro: '嵌入华为、小米、联想等手机系统的智能短信 SDK，日均请求量 15 亿次，国内规模最大的手机系统级智能短信服务之一。',
    tech: 'SpringBoot + Netty + Redis + MySQL + MongoDB',
    achievements: [
      '采用 Netty 实现 NIO 非阻塞 I/O 模型，替代传统 Tomcat BIO，并发连接数提升 5 倍',
      '构建 Redis + 本地多级缓存架构，结合布隆过滤器 + 互斥锁防御缓存击穿，保障热点查询稳定性',
      '主导全链路压测与 JVM 调优（GC 停顿优化），核心接口响应时间从 200ms 降至 120ms（提升 40%）',
      '全年无重大故障，荣获公司年度"性能优化奖"',
    ],
  },
]

/* ========== 统计数字 ========== */
const STATS = [
  { value: '12', unit: '年', label: 'Java 开发经验' },
  { value: '700', unit: '万', label: '成本节省' },
  { value: '99.99', unit: '%', label: '系统可用性' },
  { value: '3x', label: '并发吞吐提升' },
]

/* ==================== 根组件 ==================== */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#e2e8f0]">
      {/* 扫描线覆盖 */}
      <div className="scanlines" />

      {/* 主内容 */}
      <div className="sci-fi-root">
        <Navbar mobileOpen={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />
        <Hero />
        <About stats={STATS} />
        <Skills categories={SKILL_CATEGORIES} />
        <Experience experiences={EXPERIENCES} />
        <Projects projects={PROJECTS} />
        <Education />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

/* ==================== 导航栏 ==================== */
function Navbar({ mobileOpen, onToggle }) {
  return (
    <nav className="sci-nav">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <span className="text-xl font-bold tracking-wider neon-text" style={{ color: 'var(--cyan)' }}>
            LYF
          </span>
          <span className="hidden sm:inline text-xs px-2 py-0.5 rounded border font-mono"
            style={{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)' }}>
            SYS.ONLINE
          </span>
        </a>

        {/* 桌面导航 */}
        <ul className="hidden md:flex gap-8 text-sm">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="sci-nav-link">
                <span style={{ color: 'var(--text-muted)', marginRight: 6 }}>0{NAV_ITEMS.indexOf(item) + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 移动端菜单按钮 */}
        <button className="md:hidden p-2" onClick={onToggle} aria-label="切换菜单"
          style={{ color: 'var(--text-secondary)' }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* 移动端菜单 */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-4"
          style={{ background: 'rgba(10,10,15,0.95)', borderBottom: '1px solid var(--border-subtle)' }}>
          {NAV_ITEMS.map((item, i) => (
            <a key={item.href} href={item.href} className="block py-3 sci-nav-link"
              onClick={() => setMobileOpen(false)}>
              <span style={{ color: 'var(--cyan)', marginRight: 8, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                [{String(i + 1).padStart(2, '0')}]
              </span>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ==================== Hero ==================== */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* 发光球体 */}
      <div className="hero-glow" style={{
        background: 'radial-gradient(circle, rgba(0,240,255,0.4) 0%, transparent 70%)',
        top: '10%', left: '50%', transform: 'translate(-50%, 0)',
      }} />
      <div className="hero-glow" style={{
        background: 'radial-gradient(circle, rgba(216,70,239,0.3) 0%, transparent 70%)',
        top: '40%', left: '25%', animationDelay: '3s',
      }} />

      {/* 六边形装饰 */}
      <div className="hex-decoration" style={{ top: '15%', right: '10%', opacity: 0.3 }} />
      <div className="hex-decoration" style={{ bottom: '20%', left: '8%', opacity: 0.2, width: 80, height: 80 }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        {/* 状态标签 */}
        <div className="animate-fade-in inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10"
          style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid var(--border-subtle)' }}>
          <div className="pulse-dot-green" />
          <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--green)' }}>
            求职中 — Java 后端开发工程师 · 期望地区：深圳
          </span>
        </div>

        {/* 名字 */}
        <h1 className="animate-fade-in animate-delay-1 text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          <span className="text-[#e2e8f0]">你好，我是</span>
          <br />
          <span className="gradient-text neon-text">刘洋飞</span>
        </h1>

        {/* 终端风格描述 */}
        <div className="animate-fade-in animate-delay-2 max-w-2xl mx-auto mb-10">
          <div className="inline-block text-left rounded-xl p-5"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-2 mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
              <span className="text-xs ml-3" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>terminal — liuyangfei@sz</span>
            </div>
            <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--cyan)' }}>$ </span>
              <span>Java 后端开发工程师 · 12 年经验 · 深圳</span>
              <br />
              <span style={{ color: 'var(--cyan)' }}>$ </span>
              <span>DDD 领域驱动设计 · 金融科技 · 高并发 · AI Coding</span>
              <span className="terminal-cursor" />
            </p>
          </div>
        </div>

        {/* CTA 按钮 */}
        <div className="animate-fade-in animate-delay-3 flex flex-wrap justify-center gap-4">
          <a href="#contact" className="sci-btn-primary">
            <span>⚡ 联系我</span>
          </a>
          <a href="#experience" className="sci-btn-ghost">
            查看经历 →
          </a>
        </div>

        {/* 向下箭头 */}
        <div className="animate-fade-in animate-delay-4 mt-16" style={{ animation: 'fadeInUp 0.7s ease forwards, bounce 2s ease-in-out 1s infinite' }}>
          <a href="#about" className="inline-block" style={{ color: 'var(--text-muted)' }}>
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ==================== 关于我 ==================== */
function About({ stats }) {
  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="hex-decoration" style={{ top: 40, right: 30, opacity: 0.15, width: 150, height: 150 }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="ABOUT" title="自我评价" />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* 左侧文字卡片 */}
          <div className="sci-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🖥️</span>
              <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--cyan)' }}>
                SYS.INFO // PROFILE
              </span>
            </div>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-4">
              <strong style={{ color: 'var(--cyan)' }}>12 年</strong> Java 后端开发经验，具备
              技术架构设计、团队核心开发与跨系统项目管理等综合能力。
            </p>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-4">
              擅长将 <strong style={{ color: 'var(--magenta)' }}>DDD 设计理念</strong> 落地于
              复杂金融业务场景，主导多次 C++ 至 Java 系统重构，
              善于利用 <strong style={{ color: 'var(--purple)' }}>AI 工具（AI Coding）</strong> 赋能团队效能提升。
            </p>
            <p className="text-[#94a3b8] text-base leading-relaxed">
              持有公司 <strong style={{ color: 'var(--gold)' }}>"性能优化奖"</strong> 与
              <strong style={{ color: 'var(--gold)' }}> "文化先锋"</strong> 荣誉。
            </p>
          </div>

          {/* 右侧统计 */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="sci-card p-6 text-center group"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                <div className="sci-stat-value">
                  {stat.value}
                  {stat.unit && <span className="text-lg ml-1" style={{ color: 'var(--text-muted)' }}>{stat.unit}</span>}
                </div>
                <div className="text-xs mt-2 tracking-wide font-mono" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
                <div className="mt-4 mx-auto w-0 h-0.5 rounded group-hover:w-full transition-all duration-500"
                  style={{ background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================== 技能 ==================== */
function Skills({ categories }) {
  return (
    <section id="skills" className="relative py-20 md:py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="hex-decoration" style={{ bottom: 40, left: 20, opacity: 0.1, width: 100, height: 100 }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="SKILLS" title="专业技能" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div key={cat.title} className="skill-cat-card sci-card p-6">
              <h3 className="text-base font-bold mb-4 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--cyan)', fontSize: '1.2rem' }}>{cat.icon}</span>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="sci-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================== 工作经历 ==================== */
function Experience({ experiences }) {
  return (
    <section id="experience" className="relative py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="EXPERIENCE" title="工作经历" />

        <div className="sci-timeline pl-16">
          {experiences.map((exp, i) => (
            <div key={i} className="relative mb-10 group">
              {/* 时间线节点 */}
              <div style={{
                position: 'absolute',
                left: -44,
                top: 16,
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: '2px solid var(--cyan)',
                background: i === 0 ? 'var(--cyan)' : 'var(--bg-deep)',
                boxShadow: i === 0 ? '0 0 16px var(--cyan), 0 0 32px rgba(0,240,255,0.3)' : '0 0 6px rgba(0,240,255,0.3)',
                zIndex: 2,
                transition: 'all 0.3s',
              }} />
              <div style={{
                position: 'absolute',
                left: -37,
                top: 23,
                width: 30,
                height: 1,
                background: 'var(--border-subtle)',
                transition: 'all 0.3s',
              }}
                className="group-hover:!bg-[var(--border-glow)]" />

              {/* 时间标签 */}
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 font-mono"
                style={{
                  color: 'var(--cyan)',
                  background: 'rgba(0,240,255,0.08)',
                  border: '1px solid var(--border-subtle)',
                }}>
                {exp.period}
              </span>

              {/* 内容卡片 */}
              <div className="sci-card p-6">
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {exp.role}
                </h3>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--magenta)' }}>
                  {exp.company}
                </p>
                {exp.subtitle && (
                  <p className="text-xs mb-3 font-mono" style={{ color: 'var(--text-muted)' }}>
                    {exp.subtitle}
                  </p>
                )}
                <ul className="space-y-2.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-1.5 flex-shrink-0" style={{
                        width: 4, height: 4, borderRadius: '50%',
                        background: 'var(--cyan)', boxShadow: '0 0 4px var(--cyan)',
                      }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* 关键指标 */}
                {exp.metrics && (
                  <div className="mt-4 pt-4 flex flex-wrap gap-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    {exp.metrics.map((m, k) => (
                      <div key={k} className="text-center px-3 py-1.5 rounded-lg"
                        style={{ background: 'rgba(0,240,255,0.04)', border: '1px solid var(--border-subtle)' }}>
                        <div className="text-sm font-bold font-mono" style={{ color: 'var(--cyan)' }}>
                          {m.value}
                        </div>
                        <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================== 项目经验 ==================== */
function Projects({ projects }) {
  return (
    <section id="projects" className="relative py-20 md:py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="PROJECTS" title="项目经历" />

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((proj) => (
            <div key={proj.name} className="sci-card p-6 flex flex-col">
              <div className="flex items-start justify-between mb-1 gap-3">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {proj.name}
                </h3>
                {proj.role && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono flex-shrink-0"
                    style={{ color: 'var(--cyan)', background: 'rgba(0,240,255,0.08)', border: '1px solid var(--border-subtle)' }}>
                    {proj.role}
                  </span>
                )}
              </div>
              <p className="text-xs font-mono mb-2" style={{ color: 'var(--cyan)' }}>
                {proj.period}
              </p>

              {/* 项目简介 */}
              {proj.intro && (
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {proj.intro}
                </p>
              )}

              {/* 技术标签 */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tech.split('+').map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded font-mono"
                    style={{
                      background: 'rgba(0,240,255,0.04)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                    }}>
                    {t.trim()}
                  </span>
                ))}
              </div>

              {/* 成果列表 */}
              <ul className="space-y-2.5 flex-1">
                {proj.achievements.map((a, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: 'var(--green)' }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================== 教育背景 ==================== */
function Education() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <SectionTitle subtitle="EDUCATION" title="教育背景" />

        <div className="sci-card inline-block p-10 group">
          {/* 装饰角 */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: 28, height: 28,
            borderTop: '2px solid var(--border-glow)', borderLeft: '2px solid var(--border-glow)',
            borderRadius: '16px 0 0 0', opacity: 0.5, transition: 'opacity 0.3s',
          }}
            className="group-hover:!opacity-100" />
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: 28, height: 28,
            borderBottom: '2px solid var(--border-glow)', borderRight: '2px solid var(--border-glow)',
            borderRadius: '0 0 16px 0', opacity: 0.5, transition: 'opacity 0.3s',
          }}
            className="group-hover:!opacity-100" />

          <div className="text-5xl mb-5">🎓</div>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            郑州轻工业大学
          </h3>
          <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
            计算机科学与技术 · 本科 · 统招
          </p>
          <p className="font-mono text-sm tracking-wide" style={{ color: 'var(--cyan)' }}>
            2010.09 — 2014.07
          </p>
        </div>
      </div>
    </section>
  )
}

/* ==================== 联系方式 ==================== */
function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      <div className="hero-glow" style={{
        background: 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)',
        top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
      }} />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <SectionTitle subtitle="CONTACT" title="联系我" />

        <p className="text-[#94a3b8] mb-10 text-base">
          如果您对我的背景感兴趣，欢迎随时联系我！
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {/* 邮箱 */}
          <a href="mailto:13823296947@139.com"
            className="contact-card sci-card p-6 flex items-center gap-4 no-underline">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid var(--border-subtle)' }}>
              📧
            </div>
            <div className="text-left">
              <div className="text-xs font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>EMAIL</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                13823296947@139.com
              </div>
            </div>
          </a>

          {/* 电话 */}
          <div className="contact-card sci-card p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
              📱
            </div>
            <div className="text-left">
              <div className="text-xs font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>PHONE</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                13823296947
              </div>
            </div>
          </div>
        </div>

        {/* 期望地区 */}
        <div className="sci-card inline-block px-8 py-4 mb-4" style={{ borderColor: 'rgba(0,240,255,0.15)' }}>
          <div className="flex items-center gap-3">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📍</span>
            <span className="text-sm tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              期望地区：<strong style={{ color: 'var(--cyan)' }}>深圳</strong>
            </span>
          </div>
        </div>

        {/* 求职状态 */}
        <div className="sci-card inline-block px-8 py-4" style={{ borderColor: 'rgba(52,211,153,0.2)' }}>
          <div className="flex items-center gap-3">
            <div className="pulse-dot-green" />
            <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--green)' }}>
              求职意向：Java 后端开发工程师 — 期待与您交流！
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================== 页脚 ==================== */
function Footer() {
  return (
    <footer className="sci-footer py-8 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.7rem' }}>
            SYS_
          </span>
          <span style={{ color: 'var(--cyan)', fontFamily: 'monospace', fontSize: '0.7rem' }}>
            OK
          </span>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
          © {new Date().getFullYear()} 刘洋飞 · All systems operational
        </p>
      </div>
    </footer>
  )
}

/* ==================== 通用组件: 区块标题 ==================== */
function SectionTitle({ subtitle, title }) {
  return (
    <div className="text-center mb-14">
      <div className="sci-section-label">{subtitle}</div>
      <h2 className="sci-section-title gradient-text">{title}</h2>
      <div className="sci-divider mt-4" />
    </div>
  )
}
