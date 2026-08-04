import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

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
    icon: '▚',
    skills: ['Java', 'SpringBoot', 'SpringCloud', 'gRPC', 'Netty', 'DDD', '微服务治理'],
  },
  {
    title: '前端开发',
    icon: '◈',
    skills: ['React', 'Vue'],
  },
  {
    title: '数据库 & 缓存',
    icon: '⬡',
    skills: ['MySQL 分库分表', 'Redis', 'ShardingSphere', 'MongoDB'],
  },
  {
    title: '消息中间件',
    icon: '⟁',
    skills: ['RabbitMQ', 'RocketMQ', 'CMQ', 'Kafka'],
  },
  {
    title: 'DevOps & 云平台',
    icon: '⌁',
    skills: ['K8s', 'Docker', 'Nginx', 'Linux', 'Jenkins', 'Git', 'Maven', 'Nacos', 'XxlJob', '云厂商'],
  },
  {
    title: '金融业务',
    icon: '✦',
    skills: ['人行征信', '监管报送', '贷中风控', '信贷保障', '保险对接', '海外征信'],
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
    period: '2023.07 — 至今',
    role: 'Java 开发工程师',
    company: '深圳市互联数智科技有限公司',
    subtitle: '金融科技 SaaS · 核心开发兼架构设计',
    highlights: [
      '独立负责征信业务系统与融担 SaaS 监管上报平台两大核心平台的全栈建设，覆盖后端、前端（React、Vue）及运维部署',
      '搭建基于 SpringBoot + gRPC 的微服务架构，结合 Redis 缓存与 MySQL 分库分表，引入 ShardingSphere 按日期分表及 MongoDB 存储非结构化附件',
      '开发可配置化规则引擎，将监管校验逻辑抽离为配置脚本，支持监管字段频繁变更场景下的快速迭代',
      '负责 Linux 环境部署、Nginx 负载均衡及日常运维，保障系统全年 99.99% 可用性',
    ],
    metrics: [
      { value: '700万', label: '成本节省' },
      { value: '100万+', label: '征信上报' },
      { value: '300万+', label: '在线查询' },
      { value: '100%', label: '合规率' },
    ],
  },
  {
    period: '2021.01 — 2023.07',
    role: 'Java 开发工程师',
    company: '深圳市富融信息科技有限公司',
    subtitle: '香港富融银行（Fusion Bank）· 技术负责人',
    highlights: [
      '主导贷中触达平台从 C++ 至 Java 的完整 DDD 重构，采用限界上下文将业务划分为"通知域""策略域""事件域"，通过领域事件解耦各业务模块',
      '设计并实施"双写+灰度"平滑迁移策略，新旧系统并行运行、逐步切换流量，确保迁移过程零故障',
      '对接 TransUnion（香港）海外征信系统，实现客户信用数据实时查询，补强贷中风控数据维度',
      '使用多线程等策略对重构后系统进行性能优化，并发吞吐量提升至原来的 3 倍，响应时间降低 50%',
    ],
    metrics: [
      { value: '3x', label: '并发吞吐' },
      { value: '-50%', label: '响应时间' },
      { value: '10亿+', label: '信贷规模' },
      { value: '0', label: '重大故障' },
    ],
  },
  {
    period: '2019.07 — 2020.12',
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
      { value: '100%', label: 'C++→Java' },
      { value: '99.9%', label: '对接成功率' },
      { value: '10+', label: '跨系统步骤' },
    ],
  },
  {
    period: '2017.02 — 2019.07',
    role: 'Java 开发工程师',
    company: '珠海市小源科技有限公司',
    subtitle: '信析宝 SDK 核心接口组 · 获"性能优化奖"',
    highlights: [
      '基于 SpringBoot + Netty 构建非阻塞 NIO I/O 模型，替代传统 Tomcat BIO，并发连接数提升 5 倍',
      '构建 Redis + 本地多级缓存架构，结合布隆过滤器 + 互斥锁防御缓存击穿，保障热点查询稳定性',
      '主导全链路压测与 JVM 调优（GC 停顿优化），荣获公司年度"性能优化奖"',
    ],
    metrics: [
      { value: '15亿/日', label: '接口请求' },
      { value: '-40%', label: '响应时间' },
      { value: '5x', label: '并发连接' },
    ],
  },
  {
    period: '2015.09 — 2016.10',
    role: 'Java 开发工程师',
    company: '云印技术有限公司',
    subtitle: '互联网印刷电商 · 后台开发',
    highlights: [
      '负责电商平台后台订单模块的架构重构，引入 RabbitMQ 实现订单创建、支付、履约等关键节点的业务解耦',
      '通过消息异步化改造，显著提升系统稳定性，降低模块间耦合风险，改善线上问题定位效率',
    ],
  },
  {
    period: '2014.03 — 2015.09',
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
    period: '2023.07 — 至今',
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
    period: '2023.07 — 至今',
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
    period: '2021.01 — 2023.07',
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
    period: '2019.07 — 2020.12',
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
    period: '2017.02 — 2019.07',
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
  { value: '12', unit: '年', label: 'JAVA 开发经验' },
  { value: '700', unit: '万', label: '成本节省' },
  { value: '99.99', unit: '%', label: '系统可用性' },
  { value: '3', unit: 'x', label: '并发吞吐提升' },
]

/* ==================== 根组件 ==================== */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const active = useActiveSection()

  useScrollReveal()

  return (
    <div className="min-h-screen bg-[#07080d] text-[#eceef5]">
      <Aurora />
      <div className="sci-fi-root">
        <Navbar mobileOpen={mobileOpen} onToggle={() => setMobileOpen(!mobileOpen)} active={active} />
        <Hero />
        <About stats={STATS} />
        <Skills categories={SKILL_CATEGORIES} />
        <Experience experiences={EXPERIENCES} />
        <Projects projects={PROJECTS} />
        <Education />
        <Contact />
        <Footer />
        <BackToTop />
      </div>
    </div>
  )
}

/* ==================== 极光背景 ==================== */
function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora-blob aurora-1" />
      <div className="aurora-blob aurora-2" />
      <div className="aurora-blob aurora-3" />
      <div className="aurora-blob aurora-4" />
      <div className="aurora-particles" />
    </div>
  )
}

/* ==================== 滚动渐显 Hook ==================== */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (els.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('reveal-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ==================== 当前区块 Hook ==================== */
function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.slice(1))

    const onScroll = () => {
      const pos = window.scrollY + 140
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) current = id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return active
}

/* ==================== 打字机效果 ==================== */
function Typewriter({ text, speed = 90, startDelay = 400 }) {
  const [count, setCount] = useState(0)
  const reduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (reduced.current) {
      setCount(text.length)
      return
    }

    setCount(0)
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c + 1 >= text.length) {
            clearInterval(interval)
            return text.length
          }
          return c + 1
        })
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, speed, startDelay])

  const done = count >= text.length

  return (
    <span>
      {text.slice(0, count)}
      <span className={`typing-cursor ${done ? 'typing-cursor-done' : ''}`}>▍</span>
    </span>
  )
}

/* ==================== 数字滚动 ==================== */
function CountUp({ value, unit, duration = 1500 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        const target = parseFloat(value)
        const isFloat = value.includes('.')
        const start = performance.now()

        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(
            isFloat ? (target * eased).toFixed(2) : String(Math.round(target * eased))
          )
          if (p < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {display}
      {unit && <span className="unit">{unit}</span>}
    </span>
  )
}

/* ==================== 回到顶部 ==================== */
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`back-to-top ${visible ? 'back-to-top-visible' : ''}`}
      aria-label="回到顶部"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}

/* ==================== 导航栏 ==================== */
function Navbar({ mobileOpen, onToggle, active }) {
  return (
    <nav className="sci-nav">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="text-base font-bold tracking-[0.18em] gradient-text">LYF</span>
        </a>

        <ul className="hidden md:flex gap-1 text-sm">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`sci-nav-link ${active === item.href.slice(1) ? 'sci-nav-link-active' : ''}`}
              >
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
        <div className="md:hidden px-4 pb-4"
          style={{ background: 'rgba(7,8,13,0.92)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="block py-2.5 sci-nav-link"
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
    <section id="top" className="relative min-h-screen flex items-center justify-center pt-14 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        {/* 标识 */}
        <div className="glass-pill animate-fade-in inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8">
          <span className="pulse-dot" />
          <span className="text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: 'var(--text-secondary)' }}>
            Java Backend Engineer
          </span>
        </div>

        {/* 名字 */}
        <h1 className="animate-fade-in animate-delay-1 mb-6">
          <span className="hero-title gradient-text">刘洋飞</span>
        </h1>

        {/* 副标题 */}
        <p className="animate-fade-in animate-delay-2 text-lg md:text-xl mb-3"
          style={{ color: 'var(--text-secondary)', minHeight: '1.8em' }}>
          <Typewriter text="Java 后端开发工程师 · 12 年经验 · 深圳" />
        </p>
        <p className="animate-fade-in animate-delay-2 text-sm md:text-base mb-10"
          style={{ color: 'var(--text-muted)' }}>
          专注高可用分布式系统 · DDD 领域驱动设计 · AI 应用开发
        </p>

        {/* 技术标签 */}
        <div className="animate-fade-in animate-delay-2 flex flex-wrap justify-center gap-2 mb-12">
          {['DDD', 'FIN-TECH', 'HIGH-CONCURRENCY', 'AI CODING'].map((t) => (
            <span key={t} className="sci-chip">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-in animate-delay-3 flex flex-wrap justify-center gap-4">
          <a href="#contact" className="sci-btn-primary">联系我</a>
          <a href="#experience" className="sci-btn-ghost">查看经历</a>
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

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* 左侧文字 */}
          <div className="sci-card p-7 md:p-9" data-reveal>
            <p className="text-[#a7abb8] text-base leading-relaxed mb-5">
              <strong className="gradient-text" style={{ WebkitTextFillColor: 'var(--cyan)' }}>12 年</strong>{' '}
              Java 后端开发经验，具备技术架构设计、团队核心开发与跨系统项目管理等综合能力。
            </p>
            <p className="text-[#a7abb8] text-base leading-relaxed mb-5">
              擅长将 <strong style={{ color: 'var(--text-primary)' }}>DDD 设计理念</strong> 落地于
              复杂金融业务场景，主导多次 C++ 至 Java 系统重构，
              善于利用 <strong style={{ color: 'var(--cyan)' }}>AI 工具（AI Coding）</strong> 赋能团队效能提升。
            </p>
            <p className="text-[#a7abb8] text-base leading-relaxed">
              持有公司 <strong style={{ color: 'var(--text-primary)' }}>"性能优化奖"</strong> 与
              <strong style={{ color: 'var(--text-primary)' }}>"文化先锋"</strong> 荣誉。
            </p>
          </div>

          {/* 右侧统计 */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={stat.label} className="sci-card p-6 text-center"
                data-reveal style={{ '--reveal-delay': `${i * 100}ms` }}>
                <div className="sci-stat-value">
                  <CountUp value={stat.value} unit={stat.unit} />
                </div>
                <div className="text-xs mt-2 tracking-wide" style={{ color: 'var(--text-muted)' }}>
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
          {categories.map((cat, i) => (
            <div key={cat.title} className="skill-cat-card sci-card p-6"
              data-reveal style={{ '--reveal-delay': `${(i % 3) * 100}ms` }}>
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"
                style={{ color: 'var(--text-primary)' }}>
                <span className="gradient-text" style={{ fontSize: '1rem' }}>{cat.icon}</span>
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="sci-chip">{skill}</span>
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

        <div className="sci-timeline pl-14">
          {experiences.map((exp, i) => (
            <div key={i} className="relative mb-9 group" data-reveal>
              {/* 节点 */}
              <span className={`tl-node ${i === 0 ? 'tl-node-active' : ''}`} />

              {/* 时间 */}
              <span className="inline-block text-xs font-mono tracking-wider mb-2.5"
                style={{ color: 'var(--cyan)' }}>
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
                  <p className="text-xs mb-3 font-mono tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {exp.subtitle}
                  </p>
                )}
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-1.5 flex-shrink-0" style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: 'var(--cyan)', opacity: 0.7,
                      }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {exp.metrics && (
                  <div className="mt-4 pt-4 flex flex-wrap gap-2"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
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

/* ==================== 项目经历 ==================== */
function Projects({ projects }) {
  return (
    <section id="projects" className="relative py-20 md:py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="PROJECTS" title="项目经历" />

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((proj, i) => (
            <div key={proj.name} className="sci-card p-6 flex flex-col"
              data-reveal style={{ '--reveal-delay': `${(i % 2) * 100}ms` }}>
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {proj.name}
                </h3>
                {proj.role && (
                  <span className="text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-mono"
                    style={{
                      color: 'var(--cyan)',
                      background: 'rgba(34,211,238,0.08)',
                      border: '1px solid rgba(34,211,238,0.2)',
                    }}>
                    {proj.role}
                  </span>
                )}
              </div>

              <p className="text-xs font-mono tracking-wider mb-3"
                style={{ color: 'var(--cyan)', opacity: 0.8 }}>
                {proj.period}
              </p>

              {proj.intro && (
                <p className="text-sm mb-3.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {proj.intro}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {proj.tech.map((t) => (
                  <span key={t} className="sci-chip" style={{ fontSize: '0.72rem', padding: '4px 11px' }}>
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 flex-1">
                {proj.achievements.map((a, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-1 flex-shrink-0" style={{ color: 'var(--cyan)' }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="EDUCATION" title="教育背景" />

        <div className="sci-card inline-block p-8 md:p-10 min-w-[320px] text-left" data-reveal>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
            🎓
          </div>
          <h3 className="text-lg font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
            郑州轻工业大学
          </h3>
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            计算机科学与技术 · 本科 · 统招
          </p>
          <p className="text-sm font-mono tracking-wider" style={{ color: 'var(--cyan)' }}>
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
    <section id="contact" className="relative py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="CONTACT" title="联系我" />

        <p className="mb-10 text-center text-base" style={{ color: 'var(--text-secondary)' }}>
          如果您对我的背景感兴趣，欢迎随时联系
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div data-reveal style={{ '--reveal-delay': '0ms' }}>
            <RevealCard
              icon="📧"
              label="EMAIL"
              masked="138****@139.com"
              full="13823296947@139.com"
              href="mailto:13823296947@139.com"
              actionLabel="发送邮件"
            />
          </div>
          <div data-reveal style={{ '--reveal-delay': '100ms' }}>
            <RevealCard
              icon="📱"
              label="PHONE"
              masked="138****6947"
              full="13823296947"
              href="tel:13823296947"
              actionLabel="拨打电话"
            />
          </div>
        </div>

        <div className="glass-pill inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
          data-reveal style={{ '--reveal-delay': '150ms' }}>
          <span style={{ color: 'var(--text-muted)' }}>📍</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            期望地区：<strong style={{ color: 'var(--cyan)' }}>深圳</strong>
          </span>
        </div>
      </div>
    </section>
  )
}

/* ==================== 验证码生成器 ==================== */
function generateCaptcha() {
  const patterns = [
    () => {
      const a = rand(3, 9), b = rand(4, 12), c = rand(5, 20)
      return { question: `${a} × ${b} + ${c} = ?`, answer: a * b + c }
    },
    () => {
      const a = rand(4, 11), b = rand(3, 8)
      const max = a * b - 3
      const c = rand(5, Math.max(6, max))
      return { question: `${a} × ${b} − ${c} = ?`, answer: a * b - c }
    },
    () => {
      const a = rand(2, 9), b = rand(3, 8), c = rand(2, 7)
      return { question: `(${a} + ${b}) × ${c} = ?`, answer: (a + b) * c }
    },
    () => {
      const a = rand(2, 7), b = rand(3, 8), c = rand(2, 6), d = rand(3, 7)
      return { question: `${a} × ${b} + ${c} × ${d} = ?`, answer: a * b + c * d }
    },
    () => {
      const a = rand(3, 9), b = rand(3, 8), c = rand(2, 7)
      return { question: `${a}² + ${b} × ${c} = ?`, answer: a * a + b * c }
    },
  ]
  return patterns[Math.floor(Math.random() * patterns.length)]()
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* ==================== 可揭示的联系卡片（验证码弹窗） ==================== */
const MAX_ATTEMPTS = 3
const LOCK_SECONDS = 30

function RevealCard({ icon, label, masked, full, href, actionLabel }) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [captcha, setCaptcha] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [captchaError, setCaptchaError] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const [locked, setLocked] = useState(false)
  const [lockLeft, setLockLeft] = useState(0)

  useEffect(() => {
    if (!locked || lockLeft <= 0) return
    const t = setTimeout(() => {
      setLockLeft((c) => {
        if (c <= 1) {
          setLocked(false)
          setAttempts(0)
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearTimeout(t)
  }, [locked, lockLeft])

  useEffect(() => {
    if (!showModal) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [showModal])

  const handleCardClick = () => {
    if (revealed) {
      setRevealed(false)
      return
    }
    if (locked) return
    setCaptcha(generateCaptcha())
    setShowModal(true)
    setUserAnswer('')
    setCaptchaError(false)
  }

  const closeModal = () => {
    setShowModal(false)
    setUserAnswer('')
    setCaptchaError(false)
  }

  const handleVerify = () => {
    const num = parseInt(userAnswer, 10)

    if (Number.isNaN(num)) {
      setCaptchaError(true)
      return
    }

    if (num === captcha.answer) {
      closeModal()
      setRevealed(true)
      setAttempts(0)
      return
    }

    const next = attempts + 1
    setAttempts(next)

    if (next >= MAX_ATTEMPTS) {
      closeModal()
      setLocked(true)
      setLockLeft(LOCK_SECONDS)
      return
    }

    setCaptchaError(true)
    setCaptcha(generateCaptcha())
    setUserAnswer('')
  }

  const handleInputKey = (e) => {
    if (e.key === 'Enter') {
      handleVerify()
    }
    e.stopPropagation()
  }

  const handleCopy = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const attemptsLeft = MAX_ATTEMPTS - attempts

  return (
    <div
      className="contact-card sci-card p-5 flex items-center gap-4 cursor-pointer select-none"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick() }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.18)' }}>
        {icon}
      </div>

      <div className="text-left flex-1 min-w-0">
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>
          {label}
        </div>
        <div className="font-mono text-sm font-medium transition-all duration-300"
          style={{ color: revealed ? 'var(--cyan)' : 'var(--text-muted)' }}>
          {revealed ? full : masked}
        </div>
      </div>

      {/* 右侧状态区 */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {!revealed && !locked && (
          <span className="text-xs font-mono tracking-wider"
            style={{ color: 'var(--text-muted)', opacity: 0.55 }}>
            点击查看
          </span>
        )}

        {locked && (
          <span className="text-xs font-mono animate-shake" style={{ color: '#f87171' }}>
            🔒 {lockLeft}s
          </span>
        )}

        {revealed && (
          <>
            <button onClick={handleCopy} className="w-7 h-7 flex items-center justify-center rounded-full transition-all"
              style={{
                background: copied ? 'rgba(34,211,238,0.12)' : 'rgba(255,255,255,0.02)',
                border: copied ? '1px solid rgba(34,211,238,0.4)' : '1px solid rgba(255,255,255,0.1)',
                color: copied ? 'var(--cyan)' : 'var(--text-muted)',
              }} title="复制">
              {copied ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            <a href={href} onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 flex items-center justify-center rounded-full transition-all"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}
              title={actionLabel}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </>
        )}
      </div>

      {/* ===== 验证码弹窗（Portal 到 body 顶层） ===== */}
      {showModal && captcha &&
        createPortal(
          <div className="modal-backdrop" onClick={closeModal}>
            <div
              className="modal-panel"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="人机验证"
            >
              <button className="modal-close" onClick={closeModal} aria-label="关闭">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center">
                <div className="font-mono text-[10px] tracking-[0.3em] mb-3 uppercase"
                  style={{ color: 'var(--text-muted)' }}>
                  ⚙ Human Verification
                </div>

                <div className="font-mono text-xl font-bold tracking-wider mb-5"
                  style={{ color: 'var(--text-primary)' }}>
                  {captcha.question}
                </div>

                <div className={`flex items-center justify-center gap-2 ${captchaError ? 'animate-shake' : ''}`}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={userAnswer}
                    onChange={(e) => { setUserAnswer(e.target.value); setCaptchaError(false) }}
                    onKeyDown={handleInputKey}
                    autoFocus
                    placeholder="输入答案"
                    className="w-28 px-3 py-2.5 text-center font-mono text-sm outline-none"
                    style={{
                      background: captchaError ? 'rgba(248,113,113,0.08)' : 'rgba(255,255,255,0.03)',
                      border: captchaError
                        ? '1.5px solid rgba(248,113,113,0.5)'
                        : '1px solid rgba(255,255,255,0.12)',
                      color: 'var(--text-primary)',
                      borderRadius: '12px',
                      transition: 'all 0.2s',
                      boxShadow: captchaError ? '0 0 12px rgba(248,113,113,0.15)' : 'none',
                    }}
                  />
                  <button
                    onClick={handleVerify}
                    className="px-4 py-2.5 font-mono text-sm font-semibold transition-all"
                    style={{
                      background: 'linear-gradient(120deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))',
                      border: '1px solid rgba(34,211,238,0.3)',
                      color: 'var(--cyan)',
                      borderRadius: '12px',
                    }}
                  >
                    验证
                  </button>
                </div>

                <div className="mt-3 min-h-[20px]">
                  {captchaError ? (
                    <div className="font-mono text-xs" style={{ color: '#f87171' }}>
                      ✗ 答案错误，还可尝试 {attemptsLeft} 次
                    </div>
                  ) : (
                    <div className="font-mono text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                      剩余 {attemptsLeft} 次尝试机会
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

/* ==================== 页脚 ==================== */
function Footer() {
  return (
    <footer className="sci-footer py-10 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-base font-bold tracking-[0.2em] gradient-text mb-3">LYF</div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} 刘洋飞 · Java Backend Engineer
        </p>
      </div>
    </footer>
  )
}

/* ==================== 通用组件: 区块标题 ==================== */
function SectionTitle({ subtitle, title }) {
  return (
    <div className="text-center mb-12">
      <span className="sci-section-label">{subtitle}</span>
      <h2 className="sci-section-title">{title}</h2>
      <div className="sci-divider" />
    </div>
  )
}
