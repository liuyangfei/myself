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
    skills: ['Java', 'SpringBoot', 'SpringCloud', 'gRPC', 'Netty', 'DDD 领域驱动设计', '微服务治理'],
  },
  {
    title: '前端开发',
    skills: ['React', 'Vue'],
  },
  {
    title: '数据库 & 缓存',
    skills: ['MySQL 分库分表/索引优化', 'Redis 缓存策略/持久化', 'ShardingSphere', 'MongoDB'],
  },
  {
    title: '消息中间件',
    skills: ['RabbitMQ', 'RocketMQ', 'CMQ', 'Kafka'],
  },
  {
    title: 'DevOps & 云平台',
    skills: ['K8s', 'Docker', 'Nginx', 'Linux', 'Jenkins CI/CD', 'Git', 'Maven', 'Nacos', 'XxlJob', '阿里云/华为云/腾讯云'],
  },
  {
    title: '金融业务',
    skills: ['人行征信上报与查询', '金融监管报送', '贷中风控', '信贷保障', '保险对接（众安）', '海外征信（TransUnion）'],
  },
  {
    title: 'AI & 新技术',
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
      { value: '-50%', label: '响应时间降低' },
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
      { value: '100%', label: 'C++→Java 迁移' },
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
      { value: '15亿/日', label: '接口请求量' },
      { value: '-40%', label: '响应时间降低' },
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
    intro: '面向融担/小贷公司的统一征信前置平台，对接人行征信系统，累计承载 100 万+ 笔上报及 300 万+ 笔在线查询，数据规模达百亿级。',
    tech: ['SpringBoot', 'Docker', 'MySQL', 'Redis', 'React', 'Jenkins', 'Nginx', 'Nacos', 'XxlJob', '华为云/阿里云'],
    achievements: [
      '设计百亿级数据存储方案，解决人行征信数百个字段与业务数据库的合规映射问题',
      '采用 XXL 切片 + 多线程策略，保障风控征信报文在数十秒内完成查询与返回',
      '引入 Redis 热点数据缓存与线程池限流措施，应对日均 1.5 万+ 笔并发查询及人行 QPS 限制约束',
      '累计完成 100 万+ 笔征信上报（准确率 100%），自建系统直接节省成本 700 万元',
    ],
  },
  {
    name: '融担业务数据管理 SaaS 及监管上报平台',
    period: '2023.07 - 至今',
    role: '总负责人',
    intro: '面向融担公司的 SaaS 化监管上报平台，支撑向天津金融监管局报送百亿级担保数据，服务明东东华、华澎等多家头部融担公司。',
    tech: ['SpringBoot', 'gRPC', 'MySQL', 'Redis', 'React', 'Jenkins', 'Nginx', 'Nacos', 'XxlJob', '华为云'],
    achievements: [
      '采用 ShardingSphere 按日期分表策略应对百亿级担保数据存储，引入 MongoDB 存储非结构化担保附件',
      '开发可配置化规则引擎，将数百项监管字段校验逻辑抽离为配置化脚本，支持监管规则频繁变更',
      '设计"预校验+正式上报"双阶段流程，正式上报后实时回执确认，确保上报合规性与准确性',
      '累计上报百亿级担保数据，合规达标率 100%',
    ],
  },
  {
    name: '富融银行贷中触达系统重构',
    period: '2021.01 - 2023.07',
    role: '技术负责人',
    intro: '香港富融银行贷中触达核心系统，原系统基于 C++ 老旧框架，重构至 Java 微服务架构，支撑超 10 亿港币信贷规模。',
    tech: ['SpringBoot', 'CMQ', 'gRPC', 'MySQL', 'Redis'],
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
    tech: ['SpringBoot', 'CMQ', 'Service Mesh', 'MySQL', 'Scheduler', 'Saturn'],
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
    tech: ['SpringBoot', 'Netty', 'Redis', 'MySQL', 'MongoDB'],
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
  { value: '3', unit: 'x', label: '并发吞吐提升' },
]

/* ==================== 根组件 ==================== */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#08080c] text-[#e4e4e7]">
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
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--accent)' }}>
            LYF
          </span>
          <span className="hidden sm:inline text-[10px] tracking-widest font-mono"
            style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
            LIU YANG FEI
          </span>
        </a>

        <ul className="hidden md:flex gap-8 text-sm">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.href}>
              <a href={item.href} className="sci-nav-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="md:hidden p-2" onClick={onToggle} aria-label="切换菜单"
          style={{ color: 'var(--text-secondary)' }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4"
          style={{ background: 'rgba(8,8,12,0.95)', borderBottom: '1px solid var(--border-subtle)' }}>
          {NAV_ITEMS.map((item, i) => (
            <a key={item.href} href={item.href} className="block py-3 sci-nav-link"
              onClick={() => setMobileOpen(false)}>
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
    <section className="relative min-h-screen flex items-center justify-center pt-14 overflow-hidden">
      {/* 微光背景 */}
      <div className="hero-glow" style={{
        background: 'radial-gradient(circle, rgba(45,212,191,0.5) 0%, transparent 70%)',
        top: '5%', left: '50%', transform: 'translate(-50%, 0)',
        animation: 'heroGlowDrift 12s ease-in-out infinite',
      }} />
      <div className="hero-glow" style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
        top: '50%', left: '20%', animation: 'heroGlowDrift 12s ease-in-out 4s infinite',
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        {/* 名字 */}
        <h1 className="animate-fade-in text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <span style={{ color: 'var(--text-primary)' }}>刘洋飞</span>
        </h1>

        {/* 副标题 */}
        <p className="animate-fade-in animate-delay-1 text-lg md:text-xl mb-3"
          style={{ color: 'var(--text-secondary)' }}>
          Java 后端开发工程师
        </p>
        <p className="animate-fade-in animate-delay-1 text-sm md:text-base mb-12"
          style={{ color: 'var(--text-muted)' }}>
          12 年经验 · 深圳 · DDD · 金融科技 · 高并发 · AI Coding
        </p>

        {/* CTA */}
        <div className="animate-fade-in animate-delay-3 flex flex-wrap justify-center gap-4">
          <a href="#contact" className="sci-btn-primary">
            联系我
          </a>
          <a href="#experience" className="sci-btn-ghost">
            查看经历
          </a>
        </div>

        {/* 向下 */}
        <div className="animate-fade-in animate-delay-4 mt-20">
          <a href="#about" className="inline-block" style={{ color: 'var(--text-muted)' }}>
            <svg className="w-4 h-4 mx-auto subtle-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="ABOUT" title="自我评价" />

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* 左侧文字 */}
          <div className="sci-card p-8 md:p-10">
            <p className="text-[#a1a1aa] text-base leading-relaxed mb-5">
              <strong style={{ color: 'var(--text-primary)' }}>12 年</strong> Java 后端开发经验，具备
              技术架构设计、团队核心开发与跨系统项目管理等综合能力。
            </p>
            <p className="text-[#a1a1aa] text-base leading-relaxed mb-5">
              擅长将 <strong style={{ color: 'var(--text-primary)' }}>DDD 设计理念</strong> 落地于
              复杂金融业务场景，主导多次 C++ 至 Java 系统重构，
              善于利用 <strong style={{ color: 'var(--accent)' }}>AI 工具（AI Coding）</strong> 赋能团队效能提升。
            </p>
            <p className="text-[#a1a1aa] text-base leading-relaxed">
              持有公司 <strong style={{ color: 'var(--text-primary)' }}>"性能优化奖"</strong> 与
              <strong style={{ color: 'var(--text-primary)' }}>"文化先锋"</strong> 荣誉。
            </p>
          </div>

          {/* 右侧统计 */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <div key={stat.label} className="sci-card p-5 text-center group">
                <div className="sci-stat-value">
                  {stat.value}
                  <span className="unit">{stat.unit}</span>
                </div>
                <div className="text-xs mt-2 tracking-wide"
                  style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
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
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="SKILLS" title="专业技能" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.title} className="skill-cat-card sci-card p-5">
              <h3 className="text-sm font-semibold mb-3.5 tracking-wide"
                style={{ color: 'var(--text-primary)' }}>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
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

        <div className="sci-timeline pl-14 md:pl-16">
          {experiences.map((exp, i) => (
            <div key={i} className="relative mb-8 group">
              {/* 时间线节点 */}
              <div style={{
                position: 'absolute',
                left: '-44px',
                top: 14,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === 0 ? 'var(--accent)' : 'transparent',
                border: i === 0 ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
                transition: 'all 0.3s',
              }}
                className="group-hover:scale-125" />

              {/* 时间 */}
              <span className="inline-block text-xs font-medium tracking-wide mb-2.5 font-mono"
                style={{ color: 'var(--accent)' }}>
                {exp.period}
              </span>

              {/* 卡片 */}
              <div className="sci-card p-5 md:p-6">
                <h3 className="text-base font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                  {exp.role}
                </h3>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                  {exp.company}
                </p>
                {exp.subtitle && (
                  <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                    {exp.subtitle}
                  </p>
                )}
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-1.5 flex-shrink-0" style={{
                        width: 3, height: 3, borderRadius: '50%',
                        background: 'var(--accent)', opacity: 0.6,
                      }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* 关键指标 */}
                {exp.metrics && (
                  <div className="mt-4 pt-3.5 flex flex-wrap gap-2"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    {exp.metrics.map((m, k) => (
                      <div key={k} className="metric-badge">
                        <span className="metric-value">{m.value}</span>
                        <span className="metric-label">{m.label}</span>
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

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj.name} className="sci-card p-5 md:p-6 flex flex-col">
              {/* 标题 + 角色 */}
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {proj.name}
                </h3>
                {proj.role && (
                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-mono"
                    style={{
                      color: 'var(--accent)',
                      background: 'rgba(45,212,191,0.06)',
                      border: '1px solid rgba(45,212,191,0.12)',
                    }}>
                    {proj.role}
                  </span>
                )}
              </div>

              <p className="text-xs mb-3 font-mono" style={{ color: 'var(--accent)', opacity: 0.7 }}>
                {proj.period}
              </p>

              {/* 简介 */}
              {proj.intro && (
                <p className="text-sm mb-3.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {proj.intro}
                </p>
              )}

              {/* 技术标签 */}
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {proj.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                    }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* 成果 */}
              <ul className="space-y-2 flex-1">
                {proj.achievements.map((a, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: 'var(--accent)' }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <section className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <SectionTitle subtitle="EDUCATION" title="教育背景" />

        <div className="inline-block sci-card p-8 md:p-10">
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            郑州轻工业大学
          </h3>
          <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
            计算机科学与技术 · 本科 · 统招
          </p>
          <p className="text-sm font-mono tracking-wide" style={{ color: 'var(--accent)' }}>
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
        background: 'radial-gradient(circle, rgba(45,212,191,0.25) 0%, transparent 60%)',
        top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
      }} />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <SectionTitle subtitle="CONTACT" title="联系我" />

        <p className="mb-10 text-base" style={{ color: 'var(--text-secondary)' }}>
          如果您对我的背景感兴趣，欢迎随时联系我
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <a href="mailto:13823296947@139.com"
            className="contact-card sci-card p-5 flex items-center gap-4 no-underline">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
              style={{ background: 'rgba(45,212,191,0.06)', border: '1px solid rgba(45,212,191,0.1)' }}>
              📧
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>EMAIL</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                13823296947@139.com
              </div>
            </div>
          </a>

          <div className="contact-card sci-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
              📱
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>PHONE</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                13823296947
              </div>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
          style={{ border: '1px solid var(--border-subtle)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>📍</span>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            期望地区：<strong style={{ color: 'var(--accent)' }}>深圳</strong>
          </span>
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
        <p className="text-xs tracking-wide" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
          © {new Date().getFullYear()} 刘洋飞
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
      <h2 className="sci-section-title">{title}</h2>
      <div className="sci-divider" />
    </div>
  )
}
