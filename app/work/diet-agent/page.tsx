import type { Metadata } from "next";

const title = "吃什么｜智能饮食推荐 Agent｜唐少柔";
const description = "面向日常吃什么决策场景的对话式饮食推荐 Agent，覆盖多 Agent 编排、Trace 可观测、离线评估与全链路兜底。";
export const metadata: Metadata = { title, description, openGraph:{title,description,images:[]}, twitter:{card:"summary",title,description,images:[]} };

const pillars = [
  ["01", "全链路可观测能力设计", "LLM 输出不稳定，线上问题很难只靠日志判断是哪一步出错。", "在请求入口、Agent 调用、槽位合并、澄清决策、检索排序、最终响应等节点记录 Trace，采集输入输出、模型名、Token、耗时与异常状态。", "支持按会话还原链路和逐节点回放，能定位意图误判、槽位残留、检索过严、排序排除或模型异常。"],
  ["02", "评估体系设计与评估闭环", "推荐质量不能只靠主观感觉，需要稳定的量化指标来指导优化。", "批量解析 Trace，综合后端规则、LLM Judge 与用户反馈生成百分制评分报告，覆盖意图准确率、槽位准确率、Token 消耗、延迟、安全合规、幻觉控制等 10+ 指标。", "低分样本可以回流到 prompt、规则和餐食库优化，形成 Trace 标注、批量评估、指标驱动迭代闭环。"],
  ["03", "LLM 全链路 Fallback 设计", "LLM 可能超时、额度耗尽、返回空内容或格式错误，直接依赖模型会导致主流程中断。", "意图识别失败时走关键词规则，澄清追问失败时用固定模板，推荐应答失败时用模板生成话术，但推荐卡片仍来自数据库检索排序。", "用户感知是回复略模板化，而不是系统报错，保证全链路任一 LLM 异常时对话仍有结果。"],
  ["04", "完整产品设计", "单纯聊天推荐只能完成一次体验，无法支撑偏好沉淀、问题排查和持续优化。", "用户侧设计公共/个人双数据源推荐、个人餐食库管理和反馈入口；研发侧设计 Trace 查询、样本标注与批量评估。", "覆盖对话推荐、菜单维护、Trace 标注、批量评估四套能力，打通使用、反馈、标注、评估、迭代闭环。"],
  ["05", "后端多 Agent 协作架构", "如果把理解、追问、推荐、评估都塞进一个大模型调用，逻辑不可控，也不利于定位问题。", "采用“编排中枢 + 专职 Worker”分层模式，将意图理解、槽位澄清、推荐生成、质量评估拆成独立 Agent 单元，由 Orchestrator 统一管控状态流转。", "LLM 负责结构化推理和语言生成，后端负责确定性流程控制，系统更容易扩展、调试和降级。"],
  ["06", "意图识别与规则兜底", "用户表达模糊，多轮上下文容易导致错误路由或槽位残留，影响推荐结果。", "IntentAgent 识别 6 类意图与 7 维槽位，并叠加意图状态矫正、低置信度降级、关键词 Fallback；槽位抽取通过 diet_slot_option 词典强约束。", "降低错误路由、低质量推荐和模型幻觉，让推荐条件更稳定地进入检索排序链路。"],
];

export default function DietAgentPage(){return <main className="detailPage">
  <header className="detailNav wrap"><a href="/">← 返回首页</a><span>PROJECT / 01</span></header>
  <section className="detailHero wrap"><p className="detailType">AI AGENT · 0→1 个人项目 · 2026.03 - 2026.06</p><h1>吃什么｜智能饮食推荐 Agent</h1><p className="detailLead">面向日常“吃什么”的决策场景，从 0 到 1 设计并实现结合用户心情、就餐场景与健康诉求的对话式饮食推荐 Agent。</p><div className="detailTags"><span>AgentScope</span><span>Spring Boot</span><span>MySQL</span><span>Trace</span><span>LLM Judge</span></div><a className="githubLink" href="https://github.com/Sherrytsr/smart-meal-agent" target="_blank" rel="noreferrer">在 GitHub 查看项目 ↗</a></section>
  <section className="detailBlock dark"><div className="wrap detailGrid"><p className="blockLabel">PROJECT OVERVIEW</p><div><h2>把模糊的就餐表达，<br/>转成可执行的推荐决策。</h2><p>系统通过编排多 Agent 协作，实现“意图识别 → 槽位澄清 → 标签检索重排 → LLM 推荐理由生成”的完整对话式推荐链路，并设计 Trace 全链路监控与离线评估体系。</p></div></div></section>
  <section className="detailBlock wrap"><div className="detailGrid"><p className="blockLabel">SYSTEM DESIGN</p><div><h2>编排中枢 + 专职 Worker</h2><p>后端 Orchestrator 统一管理会话状态、意图路由、槽位合并、异常降级和 Trace 记录；IntentAgent、ClarifyAgent、RecommendResponseAgent 分别负责语义理解、追问话术和推荐理由生成。推荐卡片来自 MySQL 标签检索与规则排序，不由 LLM 凭空生成。</p><div className="process"><span>意图识别</span><i>→</i><span>槽位澄清</span><i>→</i><span>标签检索重排</span><i>→</i><span>推荐理由生成</span></div></div></div></section>
  <section className="detailBlock soft"><div className="wrap"><p className="blockLabel">CORE DESIGN</p><div className="pillarList">{pillars.map(([no,name,problem,solution,value])=><article key={no}><span>{no}</span><h3>{name}</h3><p><b>问题：</b>{problem}<br/><b>方案：</b>{solution}<br/><b>价值：</b>{value}</p></article>)}</div></div></section>
  <section className="detailBlock wrap"><div className="detailGrid"><p className="blockLabel">TECH STACK / GITHUB</p><div><h2>工程实现与代码仓库</h2><div className="twoCols"><div><h3>技术栈</h3><p>Java 21、Spring Boot、Maven、MyBatis、MySQL 8.0、AgentScope、DashScope / 通义千问、原生 HTML / CSS / JavaScript。</p></div><div><h3>代码仓库</h3><p>仓库包含后端 Agent 编排、Prompt、数据库脚本、静态前端页面、Trace 与评估相关代码。</p></div></div><p className="placeholder">GitHub: github.com/Sherrytsr/smart-meal-agent</p></div></div></section>
  <footer className="detailFooter wrap"><a href="/experience/sensetime">下一个案例：智能学习产品 →</a></footer>
</main>}
