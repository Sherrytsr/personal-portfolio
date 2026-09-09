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
