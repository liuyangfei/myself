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
    title: '🔧 后端开发',
    skills: ['Java', 'SpringBoot', 'SpringCloud', 'Grpc', 'Netty', 'DDD', 'ELK'],
  },
  {
    title: '🎨 前端开发',
    skills: ['React', 'Vue'],
  },
  {
    title: '🗄️ 数据库 & 中间件',
    skills: ['MySQL', 'Redis', 'MongoDB', 'ShardingSphere', 'RabbitMQ', 'RocketMQ', 'CMQ', 'Kafka'],
  },
  {
    title: '⚙️ DevOps & 运维',
    skills: ['K8s', 'Docker', 'Nginx', 'Linux', 'Jenkins CI/CD', 'Git', 'Maven', 'Nacos', 'XxlJob'],
  },
  {
    title: '🤖 AI & 新技术',
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

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* ===== 导航栏 ===== */}
      <Navbar mobileOpen={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} />

      {/* ===== Hero 区 ===== */}
      <Hero />

      {/* ===== 关于我 ===== */}
      <About stats={STATS} />

      {/* ===== 技能 ===== */}
      <Skills categories={SKILL_CATEGORIES} />

      {/* ===== 工作经历 ===== */}
      <Experience experiences={EXPERIENCES} />

      {/* ===== 项目 ===== */}
      <Projects projects={PROJECTS} />

      {/* ===== 教育背景 ===== */}
      <Education />

      {/* ===== 联系方式 ===== */}
      <Contact />

      {/* ===== 页脚 ===== */}
      <Footer />
    </div>
  )
}

/* ==================== 导航栏 ==================== */
function Navbar({ mobileOpen, onToggle }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold gradient-text">LYF</a>

        {/* 桌面导航 */}
        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={onToggle}
          aria-label="切换菜单"
        >
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
        <div className="md:hidden bg-white border-b border-gray-100 px-6 pb-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ==================== Hero 区 ==================== */
function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center gradient-bg pt-16">
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        {/* 标签 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          开放工作机会 — 期待新的挑战
        </div>

        {/* 名字 */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
          你好，我是
          <br />
          <span className="gradient-text">刘洋飞</span>
        </h1>

        {/* 描述 */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
          Java 高级开发工程师 · 12 年经验 · 全栈能力
          <br />
          专注高可用分布式系统、DDD 领域驱动设计、AI 应用开发
        </p>

        {/* CTA 按钮 */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
          <a
            href="#contact"
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            联系我
          </a>
          <a
            href="#experience"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            查看经历
          </a>
        </div>

        {/* 向下箭头 */}
        <div className="mt-16 animate-bounce">
          <a href="#about" className="text-gray-400 hover:text-blue-500 transition-colors">
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="ABOUT" title="关于我" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左侧文字 */}
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              一名拥有 <strong className="text-gray-900">12 年</strong> 经验的 Java 开发工程师，
              具备从 <strong className="text-gray-900">0 到 1</strong> 构建大型 SaaS 平台的能力。
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              精通 <strong className="text-gray-900">SpringBoot / SpringCloud</strong> 微服务生态，
              深度实践 <strong className="text-gray-900">DDD（领域驱动设计）</strong>，
              在金融科技、SaaS 平台、高性能 SDK 等领域有丰富的实战经验。
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              近期积极拥抱 <strong className="text-gray-900">AI 技术</strong>，
              掌握 AI Coding、RAG、Agent 等 AI 应用开发技能，
              致力于将 AI 能力融入企业级软件开发流程。
            </p>
          </div>

          {/* 右侧统计 */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 card-hover"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {stat.value}
                  <span className="text-lg text-gray-500 ml-1">{stat.unit}</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
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
    <section id="skills" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="SKILLS" title="技术栈" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-white rounded-2xl p-6 card-hover border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag inline-block px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-blue-50 hover:text-blue-700 cursor-default"
                  >
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
    <section id="experience" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="EXPERIENCE" title="工作经历" />

        <div className="timeline-line pl-8 md:pl-0 md:ml-[calc(50%-1px)]">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`timeline-dot relative mb-10 pl-8 md:w-1/2 md:pl-0 ${
                i % 2 === 0
                  ? 'md:pr-12 md:text-right md:ml-[-50%]'
                  : 'md:pl-12 md:ml-0'
              }`}
            >
              {/* 时间标签 */}
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-3">
                {exp.period}
              </span>

              {/* 卡片 */}
              <div className={`bg-white rounded-2xl p-6 border border-gray-100 card-hover ${
                i % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}>
                <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3">{exp.company}</p>
                <ul className={`space-y-2 text-gray-600 text-sm leading-relaxed ${
                  i % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 md:justify-end">
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
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

/* ==================== 项目 ==================== */
function Projects({ projects }) {
  return (
    <section id="projects" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle subtitle="PROJECTS" title="项目经验" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj.name} className="bg-white rounded-2xl p-6 border border-gray-100 card-hover flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{proj.name}</h3>
              <p className="text-xs text-blue-600 font-medium mb-3">{proj.period}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tech.split('+').map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                    {t.trim()}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 text-sm text-gray-600 flex-1">
                {proj.achievements.map((a, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <SectionTitle subtitle="EDUCATION" title="教育背景" />

        <div className="inline-block bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">本科学历</h3>
          <p className="text-gray-500">2010.09 — 2014.07</p>
        </div>
      </div>
    </section>
  )
}

/* ==================== 联系方式 ==================== */
function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 gradient-bg">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <SectionTitle subtitle="CONTACT" title="联系我" />

        <p className="text-gray-600 mb-10 text-lg">
          如果您对我的背景感兴趣，欢迎随时联系我！
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 邮箱 */}
          <a
            href="mailto:13823296947@139.com"
            className="flex items-center gap-4 bg-white rounded-2xl p-6 card-hover border border-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              📧
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-500">邮箱</div>
              <div className="text-gray-900 font-medium">13823296947@139.com</div>
            </div>
          </a>

          {/* 电话 */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-6 card-hover border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              📱
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-500">电话</div>
              <div className="text-gray-900 font-medium">13823296947</div>
            </div>
          </div>
        </div>

        {/* 开放工作 */}
        <div className="bg-white rounded-2xl p-6 border border-green-200 inline-block">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-700 font-medium">目前开放工作机会，期待与您交流！</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================== 页脚 ==================== */
function Footer() {
  return (
    <footer className="py-8 bg-gray-900 text-gray-400 text-sm text-center">
      <div className="max-w-6xl mx-auto px-6">
        <p>© {new Date().getFullYear()} 刘洋飞. All rights reserved.</p>
      </div>
    </footer>
  )
}

/* ==================== 通用组件: 标题 ==================== */
function SectionTitle({ subtitle, title }) {
  return (
    <div className="text-center mb-14">
      <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-2">
        {subtitle}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4" />
    </div>
  )
}
