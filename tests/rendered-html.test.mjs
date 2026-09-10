import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const publicRoot = new URL("../public/", import.meta.url);

test("lists EZMark in the bilingual project section", async () => {
  const html = await readFile(new URL("index.html", publicRoot), "utf8");

  assert.match(html, /id="project"/);
  assert.match(html, /EZMark｜多模态 AI 智能阅卷/);
  assert.match(html, /EZMark · Multimodal AI Grading/);
  assert.match(html, /href="ezmark-content\.html"/);
  assert.match(html, /https:\/\/github\.com\/Sherrytsr\/EZMark/);
});

test("provides a complete EZMark case-study page", async () => {
  const html = await readFile(new URL("ezmark-content.html", publicRoot), "utf8");

  assert.match(html, /MULTIMODAL AI · HUMAN-IN-THE-LOOP/);
  assert.match(html, /异常兜底与人机协同/);
  assert.match(html, /客观题初判准确率/);
  assert.match(html, /20 人班级由约 60 分钟缩短至 15 分钟/);
  assert.match(html, /href="detail\.css"/);
  assert.match(html, /src="detail\.js"/);
  assert.match(html, /href="index\.html#project"/);
});

test("generates a company version with the resume-aligned iFLYTEK internship", async () => {
  const [defaultHtml, companyHtml] = await Promise.all([
    readFile(new URL("index.html", publicRoot), "utf8"),
    readFile(new URL("company-portfolio.html", publicRoot), "utf8"),
  ]);

  assert.match(defaultHtml, /科大讯飞/);
  assert.match(defaultHtml, /data-portfolio-item="experience:iflytek"/);
  assert.match(companyHtml, /科大讯飞/);
  assert.match(companyHtml, /大模型评测实习生/);
  assert.match(companyHtml, /端到端评测集构建/);
  assert.match(companyHtml, /竞品模型横评/);
  assert.doesNotMatch(companyHtml, /沉淀60\+|推动10\+/);
  assert.match(companyHtml, /商汤科技/);
  assert.match(companyHtml, /EZMark｜多模态 AI 智能阅卷/);
  assert.match(companyHtml, /href="company-sensetime-content\.html"/);
  assert.match(companyHtml, /href="company-iflytek-content\.html"/);
  assert.match(companyHtml, /href="company-diet-agent-content\.html"/);
  assert.match(companyHtml, /href="company-ezmark-content\.html"/);
  assert.match(companyHtml, /href="company-advsort-content\.html"/);
  assert.match(companyHtml, /href="company-medical-deblur-content\.html"/);
});

test("keeps every company detail page inside the company version", async () => {
  const detailPages = [
    ["company-sensetime-content.html", "experience"],
    ["company-iflytek-content.html", "experience"],
    ["company-diet-agent-content.html", "project"],
    ["company-ezmark-content.html", "project"],
    ["company-advsort-content.html", "research"],
    ["company-medical-deblur-content.html", "research"],
  ];

  for (const [file, section] of detailPages) {
    const html = await readFile(new URL(file, publicRoot), "utf8");
    assert.match(html, new RegExp(`href="company-portfolio\\.html#${section}"`));
    assert.doesNotMatch(html, /href="index\.html#/);
  }
});

test("keeps competitor benchmark data off the tailored iFLYTEK page", async () => {
  const html = await readFile(new URL("company-iflytek-content.html", publicRoot), "utf8");

  assert.match(html, /竞品模型横评与能力归因/);
  assert.match(html, /按学科、题型及输入模态拆解模型表现/);
  assert.doesNotMatch(html, /60\+|10\+|准确率|领先|分数|排名/);
});
