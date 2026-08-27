import type { Metadata } from "next";

const title = "Diet-Agent｜唐少柔";
const description = "智能饮食推荐 Agent：多 Agent 编排、Trace 可观测、离线评估与异常兜底。";
export const metadata: Metadata = { title, description, openGraph:{title,description,images:[]}, twitter:{card:"summary",title,description,images:[]} };

const pillars = [
  ["01", "产品链路", "结合心情、场景与健康诉求，完成意图识别、槽位澄清、标签检索重排和推荐理由生成。"],
  ["02", "评估闭环", "以后端规则、LLM Judge 和用户反馈加权评分，覆盖 10+ 项质量、成本与性能指标。"],
  ["03", "全链路可观测", "关键节点记录输入输出、Token、耗时、异常与降级状态，支持会话还原和逐步回放。"],
  ["04", "异常兜底", "模型超时或输出异常时由规则、词典与模板接管，确保业务流程不中断。"],
];

export default function DietAgentPage(){return <main className="detailPage">
  <header className="detailNav wrap"><a href="/">← 返回首页</a><span>PROJECT / 01</span></header>
  <section className="detailHero wrap"><p className="detailType">AI AGENT · 0→1 个人项目 · 2026</p><h1>Diet-Agent</h1><p className="detailLead">一个解决“今天吃什么”的对话式推荐产品，也是一次关于 Agent 如何被观测、评估和可靠运行的完整实践。</p><div className="detailTags"><span>AgentScope</span><span>Spring Boot</span><span>MySQL</span><span>LLM Judge</span></div></section>
  <section className="detailBlock dark"><div className="wrap detailGrid"><p className="blockLabel">THE CHALLENGE</p><div><h2>推荐不是给出一个答案，<br/>而是完成一次可信的决策。</h2><p>用户表达通常模糊、动态且不完整。系统不仅要理解“想吃什么”，还要在缺少信息时主动澄清，并在任何模型节点异常时仍然给出有效回复。</p></div></div></section>
  <section className="detailBlock wrap"><div className="detailGrid"><p className="blockLabel">SYSTEM DESIGN</p><div><h2>编排中枢 + 专职 Worker</h2><p>将意图理解、槽位澄清、检索重排和推荐生成解耦为独立推理单元。LLM 只负责结构化语义推理，会话流转、状态跃迁和异常处理由编排层统一管理。</p><div className="process"><span>用户输入</span><i>→</i><span>意图 / 槽位</span><i>→</i><span>检索重排</span><i>→</i><span>推荐生成</span></div></div></div></section>
  <section className="detailBlock soft"><div className="wrap"><p className="blockLabel">WHAT I BUILT</p><div className="pillarList">{pillars.map(([no,name,text])=><article key={no}><span>{no}</span><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>
  <section className="detailBlock wrap"><div className="detailGrid"><p className="blockLabel">PRODUCT SCOPE</p><div><h2>一套产品，两种使用视角</h2><div className="twoCols"><div><h3>用户侧</h3><p>双数据源对话推荐、个人菜单维护、反馈与偏好沉淀。</p></div><div><h3>研发侧</h3><p>Trace 查询与回放、样本标注、批量评估和低分样本分析。</p></div></div><p className="placeholder">下一步补充：产品截图、GitHub 仓库与在线演示</p></div></div></section>
  <footer className="detailFooter wrap"><a href="/experience/sensetime">下一个案例：智能学习产品 →</a></footer>
</main>}
