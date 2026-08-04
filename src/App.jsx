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
    skills: ['Java', 'SpringBoot', 'SpringCloud', 'Grpc', 'Netty', 'DDD', 'ELK'],
  },
  {
    title: '前端开发',
    icon: '◈',
    skills: ['React', 'Vue'],
  },
  {
    title: '数据库 & 中间件',
    icon: '◉',
    skills: ['MySQL', 'Redis', 'MongoDB', 'ShardingSphere', 'RabbitMQ', 'RocketMQ', 'CMQ', 'Kafka'],
  },
  {
    title: 'DevOps & 运维',
    icon: '⎔',
    skills: ['K8s', 'Docker', 'Nginx', 'Linux', 'Jenkins CI/CD', 'Git', 'Maven', 'Nacos', 'XxlJob'],
  },
  {
    title: 'AI & 新技术',
    icon: '⟡',
    skills: ['AI Coding', 'RAG', 'Agent', 'AI 应用开发'],
  },
]

/* ========== 工作经历数据 ========== */
const EXPERIENCES = [
  {
    period: '2023.07 - 2026.07',
    role: 'Java 高级开发工程师',
    company: 'SaaS 平台',
    highlights: [
      '负责 SaaS 平台从 0 到 1 的全流程开发与架构设计',
      '基于 SpringBoot + SpringCloud 微服务架构，支撑 700+ 企业客户',
      '实现 100+ 租户、300+ 用户规模下的系统高可用，可用性达 99.99%',
      '集成 CRM 系统，实现客户管理全链路数字化',
      '使用 ShardingSphere 实现数据库分库分表，MongoDB 存储非结构化数据',
    ],
  },
  {
    period: '2021.01 - 2023.07',
    role: 'Java 开发工程师',
    company: 'Fusion Bank （腾讯系数字银行）',
    highlights: [
      '主导 C++ 遗留系统向 Java 微服务架构的迁移，涉及 10+ 核心服务',
      '深度实践 DDD（领域驱动设计），建立团队的 DDD 落地规范',
      '对接 TransUnion 征信系统，实现风控数据实时查询，性能提升 350%',
      '使用 Grpc 实现服务间高性能通信，CMQ 消息队列保证数据最终一致性',
    ],
  },
  {
    period: '2019.07 - 2020.12',
    role: 'Java 开发工程师',
    company: 'NYSE:XYF （纽交所上市金融科技公司）',
    highlights: [
      '负责金融核心系统 C++ 转 Java 的技术改造，100% 完成迁移',
      '基于 DDD 进行领域建模，重构核心业务逻辑',
      '设计 Scheduler + Saturn 分布式任务调度体系，管理 10+ 定时任务',
      '系统可用性保持在 99.9% 以上',
    ],
  },
  {
    period: '2017.02 - 2019.07',
    role: 'Java 开发工程师',
    company: 'SDK 平台',
    highlights: [
      '负责 15 款 SDK 的设计、开发与维护，覆盖多种业务场景',
      '使用 SpringBoot + Netty 构建高性能网关，NIO 模型替换传统 Tomcat BIO',
      '接口响应时间从 200ms 降至 120ms，性能提升 40%',
      'Redis + MySQL 多级缓存方案，大幅降低数据库压力',
      'JVM 性能调优，解决内存泄漏与 GC 停顿问题',
    ],
  },
  {
    period: '2015.09 - 2016.10',
    role: 'Java 开发工程师',
    company: '互联网公司',
    highlights: [
      '负责后端服务设计与开发',
      '使用 RabbitMQ 实现异步消息处理，解耦系统模块',
    ],
  },
  {
    period: '2014.03 - 2015.09',
    role: 'Java 开发工程师',
    company: '139 邮箱 （中国移动）',
    highlights: [
      '参与 PNS139 推送通知服务平台开发',
      '负责 iOS/Android 双端消息推送服务，支撑 139 邮箱百万级用户',
      '设计并实现高并发消息推送架构',
    ],
  },
]

/* ========== 项目数据 ========== */
const PROJECTS = [
  {
    name: 'SaaS 多租户平台',
    period: '2023.07 - 2026.07',
    tech: 'SpringBoot + Docker + MySQL + Redis + React + Jenkins + Nginx + Nacos + XxlJob',
    achievements: [
      '从 0 到 1 构建，支撑 100+ 企业租户、300+ 活跃用户',
      '基于 XXL-Job 实现分布式任务调度，Redis 缓存方案支撑 1.5万+ QPS',
      '系统可用性 99.99%，100% 租户数据隔离',
      '前端 React 技术栈，Jenkins CI/CD 自动化部署',
    ],
  },
  {
    name: 'SaaS 企业服务平台',
    period: '2023.07 - 2026.07',
    tech: 'SpringBoot + SpringCloud + MySQL + Redis + React + Jenkins + Nginx + Nacos',
    achievements: [
      '微服务架构，ShardingSphere 分库分表应对海量数据',
      'OBS 对象存储集成，100% 文件上传成功率',
      '全链路监控与告警体系建设',
    ],
  },
  {
    name: 'C++ → Java 遗留系统迁移（Fusion Bank）',
    period: '2021.01 - 2023.07',
    tech: 'SpringBoot + CMQ + Grpc + MySQL + Redis',
    achievements: [
      '10+ 核心服务从 C++ 迁移至 Java，350% 性能提升',
      'DDD 领域驱动设计重塑业务模型，"+" 业务增量开发效率大幅提升',
      '对接 TransUnion 征信，实时风控数据查询',
    ],
  },
  {
    name: '金融核心系统改造（NYSE:XYF）',
    period: '2019.07 - 2020.12',
    tech: 'SpringBoot + CMQ + ServiceMesh + MySQL + Scheduler + Saturn',
    achievements: [
      '100% 完成 C++ 到 Java 的代码迁移，10+ 微服务稳定运行',
      'Scheduler + Saturn 分布式定时任务，99.9% 可用性',
      'ServiceMesh 服务网格架构升级，提升服务治理能力',
    ],
  },
  {
    name: '高性能 SDK 网关平台',
    period: '2017.02 - 2019.07',
    tech: 'SpringBoot + Netty + Redis + MySQL + MongoDB',
    achievements: [
      '管理 15 款 SDK 的全生命周期',
      'Netty NIO 替换 Tomcat BIO，响应时间 200ms → 120ms（降低 40%）',
      '多级缓存策略，Redis + MongoDB 应对 5 倍流量增长',
    ],
  },
]

/* ========== 统计数字 ========== */
const STATS = [
  { value: '12', unit: '年', label: 'Java 开发经验' },
  { value: '10+', unit: '个', label: '核心微服务迁移' },
  { value: '99.99', unit: '%', label: '系统可用性' },
  { value: '350', unit: '%', label: '性能提升记录' },
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
            AVAILABLE FOR WORK
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
              <span className="text-xs ml-3" style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>terminal — liuyangfei@system</span>
            </div>
            <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--cyan)' }}>$ </span>
              <span>Java 高级开发工程师 · 12 年经验</span>
              <br />
              <span style={{ color: 'var(--cyan)' }}>$ </span>
              <span>专注高可用分布式系统 · DDD · AI 应用开发</span>
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
      {/* 背景装饰 */}
      <div className="hex-decoration" style={{ top: 40, right: 30, opacity: 0.15, width: 150, height: 150 }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="ABOUT" title="关于我" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧文字卡片 */}
          <div className="sci-card p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🖥️</span>
              <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--cyan)' }}>
                SYS.INFO // PROFILE
              </span>
            </div>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-4">
              一名拥有 <strong style={{ color: 'var(--cyan)' }}>12 年</strong> 经验的 Java 开发工程师，
              具备从 <strong style={{ color: 'var(--cyan)' }}>0 到 1</strong> 构建大型 SaaS 平台的能力。
            </p>
            <p className="text-[#94a3b8] text-base leading-relaxed mb-4">
              精通 <strong style={{ color: 'var(--cyan)' }}>SpringBoot / SpringCloud</strong> 微服务生态，
              深度实践 <strong style={{ color: 'var(--magenta)' }}>DDD（领域驱动设计）</strong>，
              在金融科技、SaaS 平台、高性能 SDK 等领域有丰富的实战经验。
            </p>
            <p className="text-[#94a3b8] text-base leading-relaxed">
              近期积极拥抱 <strong style={{ color: 'var(--purple)' }}>AI 技术</strong>，
              掌握 AI Coding、RAG、Agent 等 AI 应用开发技能，
              致力于将 AI 能力融入企业级软件开发流程。
            </p>
          </div>

          {/* 右侧统计 */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="sci-card p-6 text-center group"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                <div className="sci-stat-value">
                  {stat.value}
                  <span className="text-lg ml-1" style={{ color: 'var(--text-muted)' }}>{stat.unit}</span>
                </div>
                <div className="text-xs mt-2 tracking-wide font-mono" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
                {/* 底部发光条 */}
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
      {/* 装饰 */}
      <div className="hex-decoration" style={{ bottom: 40, left: 20, opacity: 0.1, width: 100, height: 100 }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="SKILLS" title="技术栈" />

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

/* ==================== 工作经历: 科幻时间线 ==================== */
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
              {/* 连接线到卡片 */}
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
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--magenta)' }}>
                  ⬡ {exp.company}
                </p>
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
        <SectionTitle subtitle="PROJECTS" title="项目经验" />

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((proj) => (
            <div key={proj.name} className="sci-card p-6 flex flex-col">
              {/* 标题 */}
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {proj.name}
                </h3>
              </div>
              <p className="text-xs font-mono mb-4" style={{ color: 'var(--cyan)' }}>
                {proj.period}
              </p>

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

              {/* 底部闪烁线 */}
              <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-700 mx-auto"
                style={{ background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)' }}
                onMouseEnter={(e) => e.currentTarget.style.width = '100%'}
              />
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
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>本科学历</h3>
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
      {/* 背景发光 */}
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

        {/* 开放工作 */}
        <div className="sci-card inline-block px-8 py-4" style={{ borderColor: 'rgba(52,211,153,0.2)' }}>
          <div className="flex items-center gap-3">
            <div className="pulse-dot-green" />
            <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--green)' }}>
              目前开放工作机会，期待与您交流！
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
