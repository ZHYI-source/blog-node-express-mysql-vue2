// Any plugins you want to use has to be imported see https://code-farmer-i.github.io/vue-markdown-editor/zh/

import Vue from "vue";

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
//行号
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
//任务todo
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
//表情
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
//高亮某行
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';
//一键复制代码
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

//引入行号
VueMarkdownEditor.use(createCopyCodePlugin());
//引入行号
VueMarkdownEditor.use(createLineNumbertPlugin());
//todolist
VueMarkdownEditor.use(createTodoListPlugin());

VueMarkdownEditor.use(createEmojiPlugin());

VueMarkdownEditor.use(createHighlightLinesPlugin());


VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});

Vue.use(VueMarkdownEditor);
