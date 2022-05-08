/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : mg_db

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 29/04/2022 20:11:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mg_about
-- ----------------------------
DROP TABLE IF EXISTS `mg_about`;
CREATE TABLE `mg_about`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `about_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '关于博主内容',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_about
-- ----------------------------
INSERT INTO `mg_about` VALUES ('aec4181a-bcab-4e7f-aa93-189c38a2ca87', '来的哼', '2022-04-23 13:00:29', '2022-04-23 13:00:29');

-- ----------------------------
-- Table structure for mg_article_tags
-- ----------------------------
DROP TABLE IF EXISTS `mg_article_tags`;
CREATE TABLE `mg_article_tags`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `article_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章id',
  `tag_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签id',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ArticleTags`(`article_id`, `tag_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_article_tags
-- ----------------------------
INSERT INTO `mg_article_tags` VALUES ('84e3d084-cc32-4f94-a3ec-0c86049dce47', '1efd6089-a61b-4db7-8808-65a8eea113b3', '141b1b1e-b233-4182-bfb1-876cd88cd690', '2022-04-24 15:54:42', '2022-04-24 15:54:42');
INSERT INTO `mg_article_tags` VALUES ('a86d0d2e-e52f-4fee-9a89-9dc5b5b2b3c5', '02053028-dec5-459a-a8e5-9c94815a7029', 'f78f1211-08e6-4cac-8ec4-8a9878f9d0cb', '2022-04-24 10:43:52', '2022-04-24 10:43:52');
INSERT INTO `mg_article_tags` VALUES ('c5dd2a90-77cf-4f2c-a3ce-fc2e603696af', 'f3a478df-b157-4f1d-9bc2-bd068cd6eacc', 'beaea537-24ad-45a1-93e3-cac43f2a735e', '2022-04-24 12:23:28', '2022-04-24 12:23:28');
INSERT INTO `mg_article_tags` VALUES ('c7b251d3-c8f5-4811-8b33-820d3e7d2a10', '3c844314-736d-4359-ba5b-cac19640ca6c', 'beaea537-24ad-45a1-93e3-cac43f2a735e', '2022-04-23 23:23:34', '2022-04-23 23:23:34');
INSERT INTO `mg_article_tags` VALUES ('e536f8a4-909d-45a0-9337-c27311aaad73', '02053028-dec5-459a-a8e5-9c94815a7029', 'beaea537-24ad-45a1-93e3-cac43f2a735e', '2022-04-24 10:43:52', '2022-04-24 10:43:52');

-- ----------------------------
-- Table structure for mg_articles
-- ----------------------------
DROP TABLE IF EXISTS `mg_articles`;
CREATE TABLE `mg_articles`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `sort_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类ID',
  `article_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章标题',
  `article_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章内容',
  `article_cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3rMMTNtwMeiHwh3ZBJ-dHyg84iWK04GGyA&usqp=CAU' COMMENT '文章封面',
  `isPublish` tinyint(1) NULL DEFAULT 1 COMMENT '是否发布',
  `viewsCount` int(11) NULL DEFAULT 0 COMMENT '文章浏览量',
  `commentsCount` int(11) NULL DEFAULT 0 COMMENT '文章评论数',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `article_summary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章摘要',
  `isTop` tinyint(1) NULL DEFAULT 0 COMMENT '是否顶置',
  `isHot` tinyint(1) NULL DEFAULT 0 COMMENT '是否火热',
  `isRecommend` tinyint(1) NULL DEFAULT 0 COMMENT '是否推荐',
  `reprint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '转载地址',
  `editType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '编辑器类型',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_articles
-- ----------------------------
INSERT INTO `mg_articles` VALUES ('02053028-dec5-459a-a8e5-9c94815a7029', '9a58d27b-ed33-4cfa-a1a7-af4e8d46e9c6', '5个一定要学会的JavaScript新特性', '#### 1.# 使用\"Object.hasOwn\"替代“in”操作符\n\n有时，我们想知道对象上是否存在某个属性，一般会使用“in”操作符或“obj.hasOwnProperty”，但它们都有各自的缺陷。\nin 如果指定的属性位于对象或其原型链中，“in”运算符将返回true。\n\n``` js\nconst Person = function (age) {\n  this.age = age\n}\nPerson.prototype.name = \'fatfish\'\n\nconst p1 = new Person(24)\nconsole.log(\'age\' in p1) // true \nconsole.log(\'name\' in p1) // true  注意这里\n\n```', 'http://localhost:3001/api/public/admin/getFiles?id=90e858a15a292cdff1bf0362acd1b9fb.png&&mimetype=image/png', 1, 18, 4, '2022-04-24 10:43:52', '2022-04-24 15:41:16', '\"5个一定要学会的JavaScript新特性\"', 0, 0, 1, NULL, 'md');
INSERT INTO `mg_articles` VALUES ('0e74d95a-5277-4297-96b0-10994ff27884', '1ba60c63-9cf9-4e98-9858-c934f44aa511', 'JavaScript新特性', '<div>\n<blockquote>\n<p>也许你我素未谋面，但很可能相见恨晚，我是<strong>前端胖头鱼</strong></p>\n</blockquote>\n<h2 data-id=\"heading-0\">前言</h2>\n<p>JavaScript在不断地升级迭代，越来越多的新特性让我们的代码写起来变得简洁有趣，这篇文章会介绍5个新特性，一起研究一下把。</p>\n<h2 data-id=\"heading-1\">1.# 使用\"Object.hasOwn\"替代&ldquo;in&rdquo;操作符</h2>\n<p>有时，我们想知道对象上是否存在某个属性，一般会使用&ldquo;in&rdquo;操作符或&ldquo;obj.hasOwnProperty&rdquo;，但它们都有各自的缺陷。</p>\n<p><strong>in</strong></p>\n<p>如果指定的属性位于对象或其原型链中，&ldquo;in&rdquo;运算符将返回true。</p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-keyword\">const</span> Person = <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\">age</span>) </span>{\n  <span class=\"hljs-built_in\">this</span>.age = age\n}\nPerson.prototype.name = <span class=\"hljs-string\">\'fatfish\'</span>\n\n<span class=\"hljs-keyword\">const</span> p1 = <span class=\"hljs-keyword\">new</span> Person(<span class=\"hljs-number\">24</span>)\n<span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">\'age\'</span> <span class=\"hljs-keyword\">in</span> p1) <span class=\"hljs-comment\">// true </span>\n<span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">\'name\'</span> <span class=\"hljs-keyword\">in</span> p1) <span class=\"hljs-comment\">// true  注意这里</span>\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<p><strong>obj.hasOwnProperty</strong></p>\n<p><code>hasOwnProperty</code> 方法会返回一个布尔值，表示对象<strong>自身属性</strong>中是否具有对应的值（原型链上的属性不会读取）。</p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-keyword\">const</span> Person = <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\">age</span>) </span>{\n  <span class=\"hljs-built_in\">this</span>.age = age\n}\nPerson.prototype.name = <span class=\"hljs-string\">\'fatfish\'</span>\n\n<span class=\"hljs-keyword\">const</span> p1 = <span class=\"hljs-keyword\">new</span> Person(<span class=\"hljs-number\">24</span>)\n<span class=\"hljs-built_in\">console</span>.log(p1.hasOwnProperty(<span class=\"hljs-string\">\'age\'</span>)) <span class=\"hljs-comment\">// true </span>\n<span class=\"hljs-built_in\">console</span>.log(p1.hasOwnProperty(<span class=\"hljs-string\">\'name\'</span>)) <span class=\"hljs-comment\">// fasle  注意这里</span>\n\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<p><code>obj.hasOwnProperty</code>已经可以过滤掉原型链上的属性，但在某些情况下，它还是不安全。</p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-built_in\">Object</span>.create(<span class=\"hljs-literal\">null</span>).hasOwnProperty(<span class=\"hljs-string\">\'name\'</span>)\n<span class=\"hljs-comment\">// Uncaught TypeError: Object.create(...).hasOwnProperty is not a function</span>\n\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<p><strong>Object.hasOwn</strong></p>\n<p>别急，我们可以使用<code>Object.hasOwn</code>来避免这两个问题，这比&ldquo;obj.hasOwnProperty&rdquo;方法更加方便、安全。</p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-keyword\">let</span> object = { <span class=\"hljs-attr\">age</span>: <span class=\"hljs-number\">24</span> }\n<span class=\"hljs-built_in\">Object</span>.hasOwn(object, <span class=\"hljs-string\">\'age\'</span>) <span class=\"hljs-comment\">// true</span>\n<span class=\"hljs-keyword\">let</span> object2 = <span class=\"hljs-built_in\">Object</span>.create({ <span class=\"hljs-attr\">age</span>: <span class=\"hljs-number\">24</span> })\n<span class=\"hljs-built_in\">Object</span>.hasOwn(object2, <span class=\"hljs-string\">\'age\'</span>) <span class=\"hljs-comment\">// false  </span>\n<span class=\"hljs-keyword\">let</span> object3 = <span class=\"hljs-built_in\">Object</span>.create(<span class=\"hljs-literal\">null</span>)\n<span class=\"hljs-built_in\">Object</span>.hasOwn(object3, <span class=\"hljs-string\">\'age\'</span>) <span class=\"hljs-comment\">// false </span>\n\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<h2 data-id=\"heading-2\">2.# 使用\"#\"声明私有属性</h2>\n<p>以前，我们一般用<code>_</code>表示私有属性，但它并不靠谱，还是会被外部修改。</p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span> <span class=\"hljs-title\">Person</span> </span>{\n  <span class=\"hljs-title\">constructor</span> (<span class=\"hljs-params\">name</span>) {\n    <span class=\"hljs-built_in\">this</span>._money = <span class=\"hljs-number\">1</span>\n    <span class=\"hljs-built_in\">this</span>.name = name\n  }\n  get money () {\n    <span class=\"hljs-keyword\">return</span> <span class=\"hljs-built_in\">this</span>._money\n  }\n  set money (money) {\n    <span class=\"hljs-built_in\">this</span>._money = money\n  }\n  showMoney () {\n    <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-built_in\">this</span>._money)\n  }\n}\n<span class=\"hljs-keyword\">const</span> p1 = <span class=\"hljs-keyword\">new</span> Person(<span class=\"hljs-string\">\'fatfish\'</span>)\n<span class=\"hljs-built_in\">console</span>.log(p1.money) <span class=\"hljs-comment\">// 1</span>\n<span class=\"hljs-built_in\">console</span>.log(p1._money) <span class=\"hljs-comment\">// 1</span>\np1._money = <span class=\"hljs-number\">2</span> <span class=\"hljs-comment\">// 依旧可以从外部修改_money属性，所以这种做法并不安全</span>\n<span class=\"hljs-built_in\">console</span>.log(p1.money) <span class=\"hljs-comment\">// 2</span>\n<span class=\"hljs-built_in\">console</span>.log(p1._money) <span class=\"hljs-comment\">// 2</span>\n\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<p><strong>使用&ldquo;#&rdquo;实现真正私有属性</strong></p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span> <span class=\"hljs-title\">Person</span> </span>{\n  #money=<span class=\"hljs-number\">1</span>\n  <span class=\"hljs-title\">constructor</span> (<span class=\"hljs-params\">name</span>) {\n    <span class=\"hljs-built_in\">this</span>.name = name\n  }\n  get money () {\n    <span class=\"hljs-keyword\">return</span> <span class=\"hljs-built_in\">this</span>.#money\n  }\n  set money (money) {\n    <span class=\"hljs-built_in\">this</span>.#money = money\n  }\n  showMoney () {\n    <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-built_in\">this</span>.#money)\n  }\n}\n<span class=\"hljs-keyword\">const</span> p1 = <span class=\"hljs-keyword\">new</span> Person(<span class=\"hljs-string\">\'fatfish\'</span>)\n<span class=\"hljs-built_in\">console</span>.log(p1.money) <span class=\"hljs-comment\">// 1</span>\n<span class=\"hljs-comment\">// p1.#money = 2 // 没法从外部直接修改</span>\np1.money = <span class=\"hljs-number\">2</span>\n<span class=\"hljs-built_in\">console</span>.log(p1.money) <span class=\"hljs-comment\">// 2</span>\n<span class=\"hljs-built_in\">console</span>.log(p1.#money) <span class=\"hljs-comment\">// Uncaught SyntaxError: Private field \'#money\' must be declared in an enclosing class</span>\n\n\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<h2 data-id=\"heading-3\">3.# 超有用的\"数字分隔符\"</h2>\n<p>直接看例子，惊呆了我...</p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-keyword\">const</span> sixBillion = <span class=\"hljs-number\">6000000000</span>\n<span class=\"hljs-comment\">// ❌ 难以阅读</span>\n<span class=\"hljs-keyword\">const</span> sixBillion2 = <span class=\"hljs-number\">6000_000_000</span>\n<span class=\"hljs-comment\">// ✅ 更加易于阅读</span>\n<span class=\"hljs-built_in\">console</span>.log(sixBillion2) <span class=\"hljs-comment\">// 6000000000</span>\n\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<p>当然也可以使用\"_\"用于计算</p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-keyword\">const</span> sum = <span class=\"hljs-number\">1000</span> + <span class=\"hljs-number\">6000_000_000</span> <span class=\"hljs-comment\">// 6000001000</span>\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<h2 data-id=\"heading-4\">4.# 使用\"?.\"简化\"&amp;&amp;\"和三元运算符</h2>\n<p>这些例子，你一定非常熟悉，咱们有办法可以简化它吗？</p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-keyword\">const</span> obj = <span class=\"hljs-literal\">null</span>\n<span class=\"hljs-built_in\">console</span>.log(obj &amp;&amp; obj.name)\n<span class=\"hljs-keyword\">const</span> $title = <span class=\"hljs-built_in\">document</span>.querySelector(<span class=\"hljs-string\">\'.title\'</span>)\n<span class=\"hljs-keyword\">const</span> title = $title ? title.innerText : <span class=\"hljs-literal\">undefined</span>\n\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<p><strong>&ldquo;?.&rdquo;</strong></p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-keyword\">const</span> obj = <span class=\"hljs-literal\">null</span>\n<span class=\"hljs-built_in\">console</span>.log(obj?.name)\n<span class=\"hljs-keyword\">const</span> $title = <span class=\"hljs-built_in\">document</span>.querySelector(<span class=\"hljs-string\">\'.title\'</span>)\n<span class=\"hljs-keyword\">const</span></code><code class=\"hljs language-javascript copyable\" lang=\"javascript\"> title = $title?.innerText</code><code class=\"hljs language-javascript copyable\" lang=\"javascript\">\n\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<p><strong>Tips</strong></p>\n<p><strong>?.</strong> 的一般用法</p>\n<ol>\n<li>obj?.prop 对象属性</li>\n<li>obj?.[expr] 对象属性</li>\n<li>func?.(...args) 执行函数</li>\n</ol>\n<h2 data-id=\"heading-5\">5.# 使用\"BigInt\"支持大数计算</h2>\n<p>JS中超过&ldquo;Number.MAX_SAFE_INTEGER&rdquo;的数字计算将是不安全的。</p>\n<p><strong>Example:</strong></p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-built_in\">Math</span>.pow(<span class=\"hljs-number\">2</span>, <span class=\"hljs-number\">53</span>) === <span class=\"hljs-built_in\">Math</span>.pow(<span class=\"hljs-number\">2</span>, <span class=\"hljs-number\">53</span>) + <span class=\"hljs-number\">1</span> <span class=\"hljs-comment\">// true</span>\n<span class=\"hljs-comment\">// Math.pow(2, 53) =&gt; 9007199254740992</span>\n<span class=\"hljs-comment\">// Math.pow(2, 53) + 1 =&gt; 9007199254740992</span>\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<p>使用\"BigInt\"完全可以避免这个问题</p>\n<pre><code class=\"hljs language-javascript copyable\" lang=\"javascript\"><span class=\"hljs-built_in\">BigInt</span>(<span class=\"hljs-built_in\">Math</span>.pow(<span class=\"hljs-number\">2</span>, <span class=\"hljs-number\">53</span>)) === <span class=\"hljs-built_in\">BigInt</span>(<span class=\"hljs-built_in\">Math</span>.pow(<span class=\"hljs-number\">2</span>, <span class=\"hljs-number\">53</span>)) + <span class=\"hljs-built_in\">BigInt</span>(<span class=\"hljs-number\">1</span>) <span class=\"hljs-comment\">// false</span>\n\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<h2 data-id=\"heading-6\">最后</h2>\n<p>希望能一直给大家分享实用、基础、进阶的知识点，一起早早下班，快乐摸鱼。</p>\n<p>期待你在<strong>掘金</strong>关注我：<strong>前端胖头鱼</strong>，也可以在<strong>公众号</strong>里找到我：<strong>前端胖头鱼</strong>。</p>\n</div>', 'http://localhost:3001/api/public/admin/getFiles?id=b79ca5d9f281f132fc1c02d6253b7252.jfif&&mimetype=image/jpeg', 1, 26, 0, '2022-04-24 10:45:58', '2022-04-29 13:49:09', '\"JavaScript新特性\"', 1, 1, 1, NULL, 'mce');
INSERT INTO `mg_articles` VALUES ('1efd6089-a61b-4db7-8808-65a8eea113b3', '9a58d27b-ed33-4cfa-a1a7-af4e8d46e9c6', 'JavaScript在不断地升级迭代', '> 也许你我素未谋面，但很可能相见恨晚，我是前端芒果\n\n### 前言:black_nib:\nJavaScript在不断地升级迭代，越来越多的新特性让我们的代码写起来变得简洁有趣，这篇文章会介绍5个新特性，一起研究一下把。\n### 1.# 使用\"Object.hasOwn\"替代“in”操作符:black_nib:\n有时，我们想知道对象上是否存在某个属性，一般会使用“in”操作符或“obj.hasOwnProperty”，但它们都有各自的缺陷。\n``` js\nconst Person = function (age) {\n  this.age = age\n}\nPerson.prototype.name = \'fatfish\'\n\nconst p1 = new Person(24)\nconsole.log(\'age\' in p1) // true \nconsole.log(\'name\' in p1) // true  注意这里\n```\n**hasOwnProperty** 方法会返回一个布尔值，表示对象自身属性中是否具有对应的值（原型链上的属性不会读取）。\n``` js\nObject.create(null).hasOwnProperty(\'name\')\n```\n### 2.# 使用\"#\"声明私有属性:black_nib:\n内容\n\n### 最后 :black_nib:\n希望能一直给大家分享实用、基础、进阶的知识点，一起早早下班', 'http://localhost:3001/api/public/admin/getFiles?id=4a8bd0bc19ce5336c21e49560069d240.jpg&&mimetype=image/jpeg', 1, 3, 0, '2022-04-24 15:54:42', '2022-04-27 13:30:29', '\"JavaScript在不断地升级迭代\"', 1, 0, 1, NULL, 'md');
INSERT INTO `mg_articles` VALUES ('3c844314-736d-4359-ba5b-cac19640ca6c', '9a58d27b-ed33-4cfa-a1a7-af4e8d46e9c6', '没事的罚款决定书', '>Express-Mysql-Server 项目是一套 集成 express sequelize swagger-ui 框架 api 模板，\n***\n:smiley:\n\n![七龙珠](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg)\n\n[Gitee](https://gitee.com/Z568_568)\n\n\"Express-Mysql-Server\"\n一个 \"开箱即用\" node接口服务模板去快速开始你的项目！\n|名称|办公|column3|\n|-|-|-|\n|content1|content2|content3|\n目录\n详细上手指南\n开发前的配置要求\n安装步骤\n文件目录说明\n部署\n使用到的框架\n版本控制\n作者\n详细上手指南\n开发前的配置要求\n1. node.js 环境\n2. Express.js 框架\n3. IDEA / WebStorm / VS Code 开发工具\n4. Navicat 可视化数据库\n5. apiPost / postman 接口调试工具\n安装步骤\n克隆本项目代码\ngit clone https://gitee.com/Z568_568/zy-express-sequelize-mysql.git\n安装依赖\nnpm install\n3.打开 Navicat软件 创建数据库 mk_db,运行sql文件\n\n4.配置数据库信息 文件 config/db.config.js\n\n``` js\n  HOST: \"localhost\",\n    USER: \"root\",\n    PASSWORD: \"root\",\n    DB: \"mk_db\",\n    dialect: \"mysql\",\n    pool: {\n        max: 5,\n        min: 0,\n        acquire: 30000,\n        idle: 10000\n    },\n// 配置文件上传地址信息 文件 config/upload.config.js\nmodule.exports = {\n    \"baseURL\":\"http://localhost:3001\",\n}\n```\n6.启动项目\n\nnodemon app.js (热加载)  or  node app.js\n7.启动成功示例\n\n项目启动成功: http://localhost:3001\n接口文档地址: http://localhost:3001/swagger\n8.测试接口: 打开postman / apiPost 软件 输入获取验证码接口地址\n\n注意： 测试接口中 \'/api/private/\' 开头的接口地址都需要进行token验证，在请求头 header中加入 authorization 并携带 token\n\n获取 token 需要在 登录接口进行登录后用户名：admin 密码：123456 返回 token\n\neg:获取验证码接口 （无需token验证）\n\n GET http://localhost:3001/api/public/v1/captcha \n响应结果是 Svg 格式\n**********************\n``` js\n  {\n	\"data\": {\n		\"codeSvg\": \"<svg xmlns=\\\"http://www.w3.org/2000/svg\\\"....></svg>\",\n		\"codeText\": \"06PEo3AZTK41g7oA7paQAg==\",\n		\"key\": 1649573015653\n	},\n	\"meta\": {\n		\"msg\": \"获取验证码成功\",\n		\"status\": 200\n	}\n}\n```\n9.上面的步骤都已经成功，你就可以开始 增加模块进行 接口开发 并且加上规范的swagger注解后 自动生成接口文档。快去试试吧\n\n文件目录说明\n\n``` js\n├── README.md\n├── cheese.log                日志记录文件\n├── app.js                    入口文件\n├── .env                      环境配置文件\n├── /utils/                   工具方法文件夹\n│  ├── /swagger/              swagger配置文件夹\n│  │  ├── utils.resextra.js   统一响应格式\n│  │  └── utils.loger.js      日志记录配置文件\n│  │  └── ...\n├── /uploads_files/           上传图片存放的文件夹\n│  │  │ \n├── /routes/                  接口路由文件夹\n│  ├── /api/                  api文件夹\n│  │  ├── /private/           存放需要权限token的接口文件夹\n│  │  │  ├── ...    \n│  │  │  │ \n│  │  └── /public/            存放无需token校验的接口\n│  │  │  ├── ...\n│  │  │  │ \n├── /models/                  数据模型和定义\n│  ├── index.js               sequelize 实例 和 模型主入口\n│  ├── ...\n│  │ \n├── /dao/                     数据库查询方法\n│  ├── DAO                    公共数据库查询方法\n│  ├── ...\n├── /controllers/             控制层 处理具体业务\n│  ├── ...\n└──/config/                   数据库等其他配置文件\n│  ├── ...\n└──└──\n```\n \n部署\n暂无\n\n使用到的框架\n``` js\nExpress.js\nSequelize\nSwagger-ui\n```\n版本控制\n该项目使用Git进行版本管理。\n\n作者\n1840354092@qq.com\n\n知乎:芒果快熟   qq:1840354092', 'http://localhost:3001/api/public/admin/getFiles?id=87122ba1894d5d5ce41763fb4b5c47a9.png&&mimetype=image/png', 1, 25, 0, '2022-04-23 23:23:34', '2022-04-29 14:04:07', '\"没事的罚款决定书\"', 0, 0, 1, NULL, 'md');
INSERT INTO `mg_articles` VALUES ('646d84af-baa6-4e11-b4aa-f0870e0c0c0f', '1ba60c63-9cf9-4e98-9858-c934f44aa511', '你说神农', '使用  \n``` js\n  active-text\n```   \n## 属性与inactive-text属性来设置开关的文字描述。\n\n``` xml\n<!DOCTYPE html>\n<title>Title</title>\n\n<style>body {width: 500px;}</style>\n\n<script type=\"application/javascript\">\n  function $init() {return true;}\n</script>\n\n<body>\n  <p checked class=\"title\" id=\'title\'>Title</p>\n  <!-- here goes the rest of the page -->\n</body>\n```\n``` js\nfunction $initHighlight(block, cls) {\n  try {\n    if (cls.search(/\\bno\\-highlight\\b/) != -1)\n      return process(block, true, 0x0F) +\n             ` class=\"${cls}\"`;\n  } catch (e) {\n    /* handle exception */\n  }\n  for (var i = 0 / 2; i < classes.length; i++) {\n    if (checkCondition(classes[i]) === undefined)\n      console.log(\'undefined\');\n  }\n\n  return (\n    <div>\n      <web-component>{block}</web-component>\n    </div>\n  )\n}\n\nexport  $initHighlight;\n```', 'http://localhost:3001/api/public/admin/getFiles?id=f0a6f9e0d65048523039b7e6e78ea0b4.webp&&mimetype=image/webp', 1, 9, 0, '2022-04-23 20:00:31', '2022-04-24 16:18:07', '\"你说神农\"', 0, 0, 1, NULL, 'md');
INSERT INTO `mg_articles` VALUES ('f3a478df-b157-4f1d-9bc2-bd068cd6eacc', '1ba60c63-9cf9-4e98-9858-c934f44aa511', '你觉得JS里命名最糟糕的API有哪些？', '<div>\n<p>比如<code>Object.prototype.hasOwnProperty()</code>， 用于检测某个属性是否属于某个对象，跟in 不同的是，<code>hasOwnProperty</code>排除了原型上的</p>\n<pre><code class=\"hljs language-js copyable\" lang=\"js\"><span class=\"hljs-keyword\">const</span> object1 = {};\nobject1.property1 = <span class=\"hljs-number\">42</span>;\n\n<span class=\"hljs-built_in\">console</span>.log(object1.hasOwnProperty(<span class=\"hljs-string\">\'property1\'</span>));<span class=\"hljs-comment\">// true</span>\n<span class=\"hljs-built_in\">console</span>.log(object1.hasOwnProperty(<span class=\"hljs-string\">\'toString\'</span>));<span class=\"hljs-comment\">//false</span>\n<span class=\"hljs-built_in\">console</span>.log(object1.hasOwnProperty(<span class=\"hljs-string\">\'hasOwnProperty\'</span>));<span class=\"hljs-comment\">// false</span>\n<span class=\"copy-code-btn\">复制代码</span></code></pre>\n<h3 data-id=\"heading-9\">Top10. for in 和 for of</h3>\n<p><code>for..of</code>和<code>for..in</code>均用于迭代，但是它们又有所不同</p>\n<p>首先是<strong>迭代的值不同</strong></p>\n<p><code>for..in</code>迭代的是对象的键的列表，而<code>for..of</code>则迭代对象的键对应的值</p>\n</div>\n<p>&nbsp;</p>', 'https://images.pexels.com/photos/1767016/pexels-photo-1767016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 1, 14, 1, '2022-04-24 12:23:28', '2022-04-29 13:49:01', '\"范德萨范德萨分\"', 1, 0, 1, NULL, 'md');

-- ----------------------------
-- Table structure for mg_comments
-- ----------------------------
DROP TABLE IF EXISTS `mg_comments`;
CREATE TABLE `mg_comments`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `article_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章ID',
  `article_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章标题',
  `pid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父级评论Id',
  `from_userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '评论来源Id',
  `from_username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '评论来源',
  `from_user_logo` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '来源评论用户头像',
  `to_userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '回复评论用户Id',
  `to_username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '回复评论名称',
  `to_user_logo` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '回复评论用户头像',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '回复评论内容',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_comments
-- ----------------------------
INSERT INTO `mg_comments` VALUES ('00cee838-565d-4e34-ae4e-f82ca5ecf719', '02053028-dec5-459a-a8e5-9c94815a7029', NULL, '0', '1', '匿名', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSYITOSgSQdTv0Z_Z0KkvwWsBMwadCA2PRA&usqp=CAU', '', '', '', 'const Person = function (age) {&nbsp; this.age = age}Person.prototype.name = \'fatfish\'const p1 = new Person(24)console.log(\'age\' in p1) // true console.log(\'name\' in p1) // true&nbsp; 注意这里', '2022-04-24 10:48:55', '2022-04-24 10:48:55');
INSERT INTO `mg_comments` VALUES ('1f5906c5-6cf0-448a-b115-c03df32b2999', '02053028-dec5-459a-a8e5-9c94815a7029', NULL, '00cee838-565d-4e34-ae4e-f82ca5ecf719', '1', '周杰伦', 'https://ci.xiaohongshu.com/9c287080-630d-33ad-a988-76a8cf21e152?imageView2/2/w/540/format/jpg', '1', '周杰伦', 'https://ci.xiaohongshu.com/9c287080-630d-33ad-a988-76a8cf21e152?imageView2/2/w/540/format/jpg', '范德萨范德萨', '2022-04-24 14:37:12', '2022-04-24 14:37:12');
INSERT INTO `mg_comments` VALUES ('7ff4a953-a402-40bb-949a-9cf8fa05d5f5', 'f3a478df-b157-4f1d-9bc2-bd068cd6eacc', NULL, '0', '1', '匿名', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSYITOSgSQdTv0Z_Z0KkvwWsBMwadCA2PRA&usqp=CAU', '', '', '', '<img data-v-7c9572d1=\"\" width=\"20\" height=\"20\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHBhdGggZmlsbD0iI0ZGREI1RSIgZD0iTTM0Ljk1NiAxNy45MTZjMC0uNTAzLS4xMi0uOTc1LS4zMjEtMS40MDQtMS4zNDEtNC4zMjYtNy42MTktNC4wMS0xNi41NDktNC4yMjEtMS40OTMtLjAzNS0uNjM5LTEuNzk4LS4xMTUtNS42NjguMzQxLTIuNTE3LTEuMjgyLTYuMzgyLTQuMDEtNi4zODItNC40OTggMC0uMTcxIDMuNTQ4LTQuMTQ4IDEyLjMyMi0yLjEyNSA0LjY4OC02Ljg3NSAyLjA2Mi02Ljg3NSA2Ljc3MXYxMC43MTljMCAxLjgzMy4xOCAzLjU5NSAyLjc1OCAzLjg4NUM4LjE5NSAzNC4yMTkgNy42MzMgMzYgMTEuMjM4IDM2aDE4LjA0NGMxLjgzOCAwIDMuMzMzLTEuNDk2IDMuMzMzLTMuMzM0IDAtLjc2Mi0uMjY3LTEuNDU2LS42OTgtMi4wMTggMS4wMi0uNTcxIDEuNzItMS42NDkgMS43Mi0yLjg5OSAwLS43Ni0uMjY2LTEuNDU0LS42OTYtMi4wMTUgMS4wMjMtLjU3IDEuNzI1LTEuNjQ5IDEuNzI1LTIuOTAxIDAtLjkwOS0uMzY4LTEuNzMzLS45NjEtMi4zMzYuNzU3LS42MTEgMS4yNTEtMS41MzUgMS4yNTEtMi41ODF6Ii8+PHBhdGggZmlsbD0iI0VFOTU0NyIgZD0iTTIzLjAyIDIxLjI0OWg4LjYwNGMxLjE3IDAgMi4yNjgtLjYyNiAyLjg2Ni0xLjYzMy4yNDYtLjQxNS4xMDktLjk1Mi0uMzA3LTEuMTk5LS40MTUtLjI0Ny0uOTUyLS4xMDgtMS4xOTkuMzA3LS4yODMuNDc5LS44MDYuNzc1LTEuMzYxLjc3NWgtOC44MWMtLjg3MyAwLTEuNTgzLS43MS0xLjU4My0xLjU4M3MuNzEtMS41ODMgMS41ODMtMS41ODNIMjguN2MuNDgzIDAgLjg3NS0uMzkyLjg3NS0uODc1cy0uMzkyLS44NzUtLjg3NS0uODc1aC01Ljg4OGMtMS44MzggMC0zLjMzMyAxLjQ5NS0zLjMzMyAzLjMzMyAwIDEuMDI1LjQ3NSAxLjkzMiAxLjIwNSAyLjU0NC0uNjE1LjYwNS0uOTk4IDEuNDQ1LS45OTggMi4zNzMgMCAxLjAyOC40NzggMS45MzggMS4yMTIgMi41NDktLjYxMS42MDQtLjk5IDEuNDQxLS45OSAyLjM2NyAwIDEuMTIuNTU5IDIuMTA4IDEuNDA5IDIuNzEzLS41MjQuNTg5LS44NTIgMS4zNTYtLjg1MiAyLjIwNCAwIDEuODM4IDEuNDk1IDMuMzMzIDMuMzMzIDMuMzMzaDUuNDg0YzEuMTcgMCAyLjI2OS0uNjI1IDIuODY3LTEuNjMyLjI0Ny0uNDE1LjExLS45NTItLjMwNS0xLjE5OS0uNDE2LS4yNDUtLjk1My0uMTEtMS4xOTkuMzA1LS4yODUuNDc5LS44MDguNzc2LTEuMzYzLjc3NmgtNS40ODRjLS44NzMgMC0xLjU4My0uNzEtMS41ODMtMS41ODNzLjcxLTEuNTgzIDEuNTgzLTEuNTgzaDYuNTA2YzEuMTcgMCAyLjI3LS42MjYgMi44NjctMS42MzMuMjQ3LS40MTYuMTEtLjk1My0uMzA1LTEuMTk5LS40MTktLjI1MS0uOTU0LS4xMS0xLjE5OS4zMDUtLjI4OS40ODctLjc5OS43NzctMS4zNjMuNzc3aC03LjA2M2MtLjg3MyAwLTEuNTgzLS43MTEtMS41ODMtMS41ODRzLjcxLTEuNTgzIDEuNTgzLTEuNTgzaDguMDkxYzEuMTcgMCAyLjI2OS0uNjI1IDIuODY3LTEuNjMyLjI0Ny0uNDE1LjExLS45NTItLjMwNS0xLjE5OS0uNDE3LS4yNDYtLjk1My0uMTEtMS4xOTkuMzA1LS4yODkuNDg2LS43OTkuNzc2LTEuMzYzLjc3NkgyMy4wMmMtLjg3MyAwLTEuNTgzLS43MS0xLjU4My0xLjU4M3MuNzA5LTEuNTg0IDEuNTgzLTEuNTg0eiIvPjwvc3ZnPg==\" alt=\"\" class=\"emoji-icon\" style=\"vertical-align: text-top;\">', '2022-04-24 14:18:57', '2022-04-24 14:18:57');
INSERT INTO `mg_comments` VALUES ('ec7d6645-d029-4393-83e1-4a012d47a626', '02053028-dec5-459a-a8e5-9c94815a7029', NULL, '00cee838-565d-4e34-ae4e-f82ca5ecf719', '1', '周杰伦', 'https://ci.xiaohongshu.com/9c287080-630d-33ad-a988-76a8cf21e152?imageView2/2/w/540/format/jpg', '1', '匿名', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSYITOSgSQdTv0Z_Z0KkvwWsBMwadCA2PRA&usqp=CAU', '<img data-v-7c9572d1=\"\" width=\"20\" height=\"20\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNiAzNiI+PHBhdGggZmlsbD0iI0ZGREI1RSIgZD0iTTM0Ljk1NiAxNy45MTZjMC0uNTAzLS4xMi0uOTc1LS4zMjEtMS40MDQtMS4zNDEtNC4zMjYtNy42MTktNC4wMS0xNi41NDktNC4yMjEtMS40OTMtLjAzNS0uNjM5LTEuNzk4LS4xMTUtNS42NjguMzQxLTIuNTE3LTEuMjgyLTYuMzgyLTQuMDEtNi4zODItNC40OTggMC0uMTcxIDMuNTQ4LTQuMTQ4IDEyLjMyMi0yLjEyNSA0LjY4OC02Ljg3NSAyLjA2Mi02Ljg3NSA2Ljc3MXYxMC43MTljMCAxLjgzMy4xOCAzLjU5NSAyLjc1OCAzLjg4NUM4LjE5NSAzNC4yMTkgNy42MzMgMzYgMTEuMjM4IDM2aDE4LjA0NGMxLjgzOCAwIDMuMzMzLTEuNDk2IDMuMzMzLTMuMzM0IDAtLjc2Mi0uMjY3LTEuNDU2LS42OTgtMi4wMTggMS4wMi0uNTcxIDEuNzItMS42NDkgMS43Mi0yLjg5OSAwLS43Ni0uMjY2LTEuNDU0LS42OTYtMi4wMTUgMS4wMjMtLjU3IDEuNzI1LTEuNjQ5IDEuNzI1LTIuOTAxIDAtLjkwOS0uMzY4LTEuNzMzLS45NjEtMi4zMzYuNzU3LS42MTEgMS4yNTEtMS41MzUgMS4yNTEtMi41ODF6Ii8+PHBhdGggZmlsbD0iI0VFOTU0NyIgZD0iTTIzLjAyIDIxLjI0OWg4LjYwNGMxLjE3IDAgMi4yNjgtLjYyNiAyLjg2Ni0xLjYzMy4yNDYtLjQxNS4xMDktLjk1Mi0uMzA3LTEuMTk5LS40MTUtLjI0Ny0uOTUyLS4xMDgtMS4xOTkuMzA3LS4yODMuNDc5LS44MDYuNzc1LTEuMzYxLjc3NWgtOC44MWMtLjg3MyAwLTEuNTgzLS43MS0xLjU4My0xLjU4M3MuNzEtMS41ODMgMS41ODMtMS41ODNIMjguN2MuNDgzIDAgLjg3NS0uMzkyLjg3NS0uODc1cy0uMzkyLS44NzUtLjg3NS0uODc1aC01Ljg4OGMtMS44MzggMC0zLjMzMyAxLjQ5NS0zLjMzMyAzLjMzMyAwIDEuMDI1LjQ3NSAxLjkzMiAxLjIwNSAyLjU0NC0uNjE1LjYwNS0uOTk4IDEuNDQ1LS45OTggMi4zNzMgMCAxLjAyOC40NzggMS45MzggMS4yMTIgMi41NDktLjYxMS42MDQtLjk5IDEuNDQxLS45OSAyLjM2NyAwIDEuMTIuNTU5IDIuMTA4IDEuNDA5IDIuNzEzLS41MjQuNTg5LS44NTIgMS4zNTYtLjg1MiAyLjIwNCAwIDEuODM4IDEuNDk1IDMuMzMzIDMuMzMzIDMuMzMzaDUuNDg0YzEuMTcgMCAyLjI2OS0uNjI1IDIuODY3LTEuNjMyLjI0Ny0uNDE1LjExLS45NTItLjMwNS0xLjE5OS0uNDE2LS4yNDUtLjk1My0uMTEtMS4xOTkuMzA1LS4yODUuNDc5LS44MDguNzc2LTEuMzYzLjc3NmgtNS40ODRjLS44NzMgMC0xLjU4My0uNzEtMS41ODMtMS41ODNzLjcxLTEuNTgzIDEuNTgzLTEuNTgzaDYuNTA2YzEuMTcgMCAyLjI3LS42MjYgMi44NjctMS42MzMuMjQ3LS40MTYuMTEtLjk1My0uMzA1LTEuMTk5LS40MTktLjI1MS0uOTU0LS4xMS0xLjE5OS4zMDUtLjI4OS40ODctLjc5OS43NzctMS4zNjMuNzc3aC03LjA2M2MtLjg3MyAwLTEuNTgzLS43MTEtMS41ODMtMS41ODRzLjcxLTEuNTgzIDEuNTgzLTEuNTgzaDguMDkxYzEuMTcgMCAyLjI2OS0uNjI1IDIuODY3LTEuNjMyLjI0Ny0uNDE1LjExLS45NTItLjMwNS0xLjE5OS0uNDE3LS4yNDYtLjk1My0uMTEtMS4xOTkuMzA1LS4yODkuNDg2LS43OTkuNzc2LTEuMzYzLjc3NkgyMy4wMmMtLjg3MyAwLTEuNTgzLS43MS0xLjU4My0xLjU4M3MuNzA5LTEuNTg0IDEuNTgzLTEuNTg0eiIvPjwvc3ZnPg==\" alt=\"\" class=\"emoji-icon\" style=\"vertical-align: text-top;\">', '2022-04-24 14:33:28', '2022-04-24 14:33:28');
INSERT INTO `mg_comments` VALUES ('fe336f81-97de-41a5-a1b9-1733c5c1049d', '02053028-dec5-459a-a8e5-9c94815a7029', NULL, '00cee838-565d-4e34-ae4e-f82ca5ecf719', '1', '周杰伦', 'https://ci.xiaohongshu.com/9c287080-630d-33ad-a988-76a8cf21e152?imageView2/2/w/540/format/jpg', '1', '周杰伦', 'https://ci.xiaohongshu.com/9c287080-630d-33ad-a988-76a8cf21e152?imageView2/2/w/540/format/jpg', '大师傅大师傅', '2022-04-24 14:37:07', '2022-04-24 14:37:07');

-- ----------------------------
-- Table structure for mg_friends
-- ----------------------------
DROP TABLE IF EXISTS `mg_friends`;
CREATE TABLE `mg_friends`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '友链地址',
  `siteName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '友链站点',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '友链邮箱',
  `desc` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '友链描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_friends
-- ----------------------------
INSERT INTO `mg_friends` VALUES ('3861e7af-350a-43d8-b116-e9f4bc4cd796', 'http://www.zhouyi.run/#/', 'ZY\'blog', '1840354092@qq.com', '个人博客', '2022-04-20 21:23:25', '2022-04-20 21:33:49');
INSERT INTO `mg_friends` VALUES ('44c366ef-755d-4bb0-81b4-87656179180c', 'www.zhouyi.run', 'ZY\'blog是', '1840354092@qq.com', '个人博客，请多关注谢谢', '2022-04-20 21:35:32', '2022-04-20 21:35:32');

-- ----------------------------
-- Table structure for mg_menus
-- ----------------------------
DROP TABLE IF EXISTS `mg_menus`;
CREATE TABLE `mg_menus`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NULL DEFAULT NULL COMMENT '父级ID',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单路径',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单标题',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `createdAt` datetime NOT NULL COMMENT '创建时间',
  `updatedAt` datetime NOT NULL COMMENT '更新时间',
  `lever` int(1) NOT NULL COMMENT '层级',
  `authority` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_menus
-- ----------------------------
INSERT INTO `mg_menus` VALUES (2, 1, '/index', '首页', 'home', '2022-04-26 14:11:49', '2022-04-26 14:11:49', 1, '');
INSERT INTO `mg_menus` VALUES (3, 1, 'client', '客户端管理', 'universal-access', '2022-04-26 14:12:36', '2022-04-28 11:47:48', 1, '');
INSERT INTO `mg_menus` VALUES (5, 3, '/dir-sort-info', '分类管理', 'navicon', '2022-04-26 14:13:06', '2022-04-27 15:47:05', 2, '');
INSERT INTO `mg_menus` VALUES (6, 3, '/dir-friends-info', '友链管理', 'th-large', '2022-04-26 14:13:19', '2022-04-26 14:13:19', 2, '');
INSERT INTO `mg_menus` VALUES (7, 3, '/dir-website-info', '站点管理', 'th-large', '2022-04-26 14:13:35', '2022-04-26 14:13:35', 2, '');
INSERT INTO `mg_menus` VALUES (8, 3, '/dir-about-info', '博主管理', 'th-large', '2022-04-26 14:13:50', '2022-04-26 14:13:50', 2, '');
INSERT INTO `mg_menus` VALUES (9, 3, '/dir-message-info', '留言管理', 'th-large', '2022-04-26 14:14:03', '2022-04-26 14:14:03', 2, '');
INSERT INTO `mg_menus` VALUES (10, 3, '/dir-comments-info', '评论管理', 'th-large', '2022-04-26 14:14:23', '2022-04-26 14:14:23', 2, '');
INSERT INTO `mg_menus` VALUES (11, 3, '/dir-socials-info', '社交管理', 'th-large', '2022-04-26 14:14:36', '2022-04-26 14:14:36', 2, '');
INSERT INTO `mg_menus` VALUES (12, 1, 'sys', '系统管理', 'gear', '2022-04-26 14:15:37', '2022-04-28 11:47:55', 1, '');
INSERT INTO `mg_menus` VALUES (13, 12, '/code/dir-code-info', '代码生成', 'th-large', '2022-04-26 14:15:58', '2022-04-26 14:15:58', 2, '');
INSERT INTO `mg_menus` VALUES (14, 12, '/users/dir-users-info', '用户管理', 'th-large', '2022-04-26 14:16:10', '2022-04-26 14:16:10', 2, '');
INSERT INTO `mg_menus` VALUES (15, 12, '/roles/dir-roles-info', '角色管理', 'th-large', '2022-04-26 14:16:23', '2022-04-26 14:16:23', 2, '');
INSERT INTO `mg_menus` VALUES (16, 12, '/menus/dir-menus-info', '菜单管理', 'th-large', '2022-04-26 14:16:35', '2022-04-26 14:16:35', 2, '');
INSERT INTO `mg_menus` VALUES (31, 3, '/dir-article-info', '博文管理', 'th-large', '2022-04-27 14:12:10', '2022-04-27 14:12:10', 2, '');
INSERT INTO `mg_menus` VALUES (32, 31, 'POST /api/private/article/create', '添加', 'th-large', '2022-04-27 14:13:58', '2022-04-27 14:14:35', 3, 'POST /api/private/article/create');
INSERT INTO `mg_menus` VALUES (33, 31, 'POST /api/private/article/list', '查询', 'th-large', '2022-04-27 14:14:23', '2022-04-27 14:16:36', 3, 'POST /api/private/article/list');
INSERT INTO `mg_menus` VALUES (34, 31, 'POST /api/private/article/update', '修改', 'th-large', '2022-04-27 14:14:59', '2022-04-27 14:14:59', 3, 'POST /api/private/article/update');
INSERT INTO `mg_menus` VALUES (35, 31, 'POST /api/private/article/delete', '删除', 'th-large', '2022-04-27 14:15:17', '2022-04-27 14:15:17', 3, 'POST /api/private/article/delete');
INSERT INTO `mg_menus` VALUES (36, 16, 'POST /api/private/menus/create', '添加', 'th-large', '2022-04-27 15:50:26', '2022-04-27 15:50:26', 3, 'POST /api/private/menus/create');
INSERT INTO `mg_menus` VALUES (37, 16, 'POST /api/private/menus/list', '查询', 'th-large', '2022-04-27 15:50:43', '2022-04-27 15:50:43', 3, 'POST /api/private/menus/list');
INSERT INTO `mg_menus` VALUES (38, 16, 'POST /api/private/menus/delete', '删除', 'th-large', '2022-04-27 15:51:10', '2022-04-27 15:51:10', 3, 'POST /api/private/menus/delete');
INSERT INTO `mg_menus` VALUES (39, 16, 'POST /api/private/menus/update', '更新', 'th-large', '2022-04-27 15:51:28', '2022-04-27 15:51:28', 3, 'POST /api/private/menus/update');
INSERT INTO `mg_menus` VALUES (40, 15, 'POST /api/private/roles/update', '更新', 'th-large', '2022-04-27 15:52:04', '2022-04-27 15:53:55', 3, 'POST /api/private/roles/update');
INSERT INTO `mg_menus` VALUES (41, 15, 'POST /api/private/roles/list', '查询', 'th-large', '2022-04-27 15:52:37', '2022-04-27 15:52:37', 3, 'POST /api/private/roles/list');
INSERT INTO `mg_menus` VALUES (42, 15, 'POST /api/private/roles/delete', '删除', 'th-large', '2022-04-27 15:52:59', '2022-04-27 15:52:59', 3, 'POST /api/private/roles/delete');
INSERT INTO `mg_menus` VALUES (43, 15, 'POST /api/private/roles/create', '添加', 'th-large', '2022-04-27 15:54:15', '2022-04-27 15:54:15', 3, 'POST /api/private/roles/create');
INSERT INTO `mg_menus` VALUES (44, 14, 'POST /api/private/users/create', '添加', 'th-large', '2022-04-27 15:54:43', '2022-04-27 15:54:43', 3, 'POST /api/private/users/create');
INSERT INTO `mg_menus` VALUES (45, 14, 'POST /api/private/users/list', '查询', 'th-large', '2022-04-27 15:55:13', '2022-04-27 15:55:13', 3, 'POST /api/private/users/list');
INSERT INTO `mg_menus` VALUES (46, 14, 'POST /api/private/users/delete', '删除', 'th-large', '2022-04-27 15:55:34', '2022-04-27 15:55:34', 3, 'POST /api/private/users/delete');
INSERT INTO `mg_menus` VALUES (47, 14, 'POST /api/private/users/update', '更新', 'th-large', '2022-04-27 15:55:55', '2022-04-27 15:55:55', 3, 'POST /api/private/users/update');
INSERT INTO `mg_menus` VALUES (48, 5, 'POST /api/private/sort/update', '更新', 'navicon', '2022-04-27 15:56:27', '2022-04-27 15:56:27', 3, 'POST /api/private/sort/update');
INSERT INTO `mg_menus` VALUES (49, 5, 'POST /api/private/sort/list', '查询', 'navicon', '2022-04-27 15:56:45', '2022-04-27 15:56:45', 3, 'POST /api/private/sort/list');
INSERT INTO `mg_menus` VALUES (50, 5, 'POST /api/private/sort/create', '添加', 'navicon', '2022-04-27 15:57:08', '2022-04-27 15:57:08', 3, 'POST /api/private/sort/create');
INSERT INTO `mg_menus` VALUES (51, 5, 'POST /api/private/sort/delete', '删除', 'navicon', '2022-04-27 15:58:06', '2022-04-27 15:58:06', 3, 'POST /api/private/sort/delete');
INSERT INTO `mg_menus` VALUES (52, 6, 'POST /api/private/friends/delete', '删除', 'th-large', '2022-04-27 15:58:30', '2022-04-27 15:58:30', 3, 'POST /api/private/friends/delete');
INSERT INTO `mg_menus` VALUES (53, 6, 'POST /api/private/friends/create', '添加', 'th-large', '2022-04-27 15:59:05', '2022-04-27 15:59:05', 3, 'POST /api/private/friends/create');
INSERT INTO `mg_menus` VALUES (54, 6, 'POST /api/private/friends/update', '更新', 'th-large', '2022-04-27 15:59:34', '2022-04-27 15:59:34', 3, 'POST /api/private/friends/update');
INSERT INTO `mg_menus` VALUES (55, 6, 'POST /api/private/friends/list', '查询', 'th-large', '2022-04-27 15:59:52', '2022-04-27 15:59:52', 3, 'POST /api/private/friends/list');
INSERT INTO `mg_menus` VALUES (56, 7, 'POST /api/private/website/list', '查询', 'th-large', '2022-04-27 16:00:22', '2022-04-27 16:00:22', 3, 'POST /api/private/website/list');
INSERT INTO `mg_menus` VALUES (57, 7, 'POST /api/private/website/create', '添加', 'th-large', '2022-04-27 16:00:42', '2022-04-27 16:00:42', 3, 'POST /api/private/website/create');
INSERT INTO `mg_menus` VALUES (58, 7, 'POST /api/private/website/delete', '删除', 'th-large', '2022-04-27 16:01:06', '2022-04-27 16:01:06', 3, 'POST /api/private/website/delete');
INSERT INTO `mg_menus` VALUES (59, 7, 'POST /api/private/website/update', '更新', 'th-large', '2022-04-27 16:01:29', '2022-04-27 16:01:29', 3, 'POST /api/private/website/update');
INSERT INTO `mg_menus` VALUES (60, 8, 'POST /api/private/about/delete', '删除', 'th-large', '2022-04-27 16:01:56', '2022-04-27 16:01:56', 3, 'POST /api/private/about/delete');
INSERT INTO `mg_menus` VALUES (61, 8, 'POST /api/private/about/list', '查询', 'th-large', '2022-04-27 16:02:16', '2022-04-27 16:02:16', 3, 'POST /api/private/about/list');
INSERT INTO `mg_menus` VALUES (62, 8, 'POST /api/private/about/create', '添加', 'th-large', '2022-04-27 16:02:44', '2022-04-27 16:02:44', 3, 'POST /api/private/about/create');
INSERT INTO `mg_menus` VALUES (63, 8, 'POST /api/private/about/update', '更新', 'th-large', '2022-04-27 16:03:03', '2022-04-27 16:03:03', 3, 'POST /api/private/about/update');
INSERT INTO `mg_menus` VALUES (64, 9, 'POST /api/private/message/update', '更新', 'th-large', '2022-04-27 16:03:36', '2022-04-27 16:03:36', 3, 'POST /api/private/message/update');
INSERT INTO `mg_menus` VALUES (65, 9, 'POST /api/private/message/list', '查询', 'th-large', '2022-04-27 16:03:56', '2022-04-27 16:03:56', 3, 'POST /api/private/message/list');
INSERT INTO `mg_menus` VALUES (66, 9, 'POST /api/private/message/delete', '删除', 'th-large', '2022-04-27 16:05:20', '2022-04-27 16:05:20', 3, 'POST /api/private/message/delete');
INSERT INTO `mg_menus` VALUES (67, 9, 'POST /api/private/message/create', '添加', 'th-large', '2022-04-27 16:05:40', '2022-04-27 16:05:40', 3, 'POST /api/private/message/create');
INSERT INTO `mg_menus` VALUES (68, 10, 'POST /api/private/comments/create', '创建', 'th-large', '2022-04-27 16:05:59', '2022-04-27 16:05:59', 3, 'POST /api/private/comments/create');
INSERT INTO `mg_menus` VALUES (69, 10, 'POST /api/private/comments/list', '查询', 'th-large', '2022-04-27 16:06:18', '2022-04-27 16:06:18', 3, 'POST /api/private/comments/list');
INSERT INTO `mg_menus` VALUES (70, 10, 'POST /api/private/comments/delete', '删除', 'th-large', '2022-04-27 16:06:57', '2022-04-27 16:06:57', 3, 'POST /api/private/comments/delete');
INSERT INTO `mg_menus` VALUES (71, 10, 'POST /api/private/comments/update', '更新', 'th-large', '2022-04-27 16:08:48', '2022-04-27 16:08:48', 3, 'POST /api/private/comments/update');
INSERT INTO `mg_menus` VALUES (72, 11, 'POST /api/private/socials/update', '更新', 'th-large', '2022-04-27 16:09:21', '2022-04-27 16:09:21', 3, 'POST /api/private/socials/update');
INSERT INTO `mg_menus` VALUES (73, 11, 'POST /api/private/socials/list', '查询', 'th-large', '2022-04-27 16:10:19', '2022-04-27 16:10:19', 3, 'POST /api/private/socials/list');
INSERT INTO `mg_menus` VALUES (74, 11, 'POST /api/private/socials/delete', '删除', 'th-large', '2022-04-27 16:10:39', '2022-04-27 16:10:39', 3, 'POST /api/private/socials/delete');
INSERT INTO `mg_menus` VALUES (75, 11, 'POST /api/private/socials/create', '添加', 'th-large', '2022-04-27 16:10:58', '2022-04-27 16:10:58', 3, 'POST /api/private/socials/create');
INSERT INTO `mg_menus` VALUES (80, 12, '/icon/list', '图标列表', 'gear', '2022-04-28 12:08:51', '2022-04-28 12:15:09', 2, '');

-- ----------------------------
-- Table structure for mg_message
-- ----------------------------
DROP TABLE IF EXISTS `mg_message`;
CREATE TABLE `mg_message`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '留言邮箱',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '留言内容',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_message
-- ----------------------------
INSERT INTO `mg_message` VALUES ('05de8f90-4a4c-4011-a9ef-d4af05fb0cf1', '1840354092@qq.com', '123465', '2022-04-20 23:19:31', '2022-04-20 23:19:31');
INSERT INTO `mg_message` VALUES ('3d0c08eb-4da0-44e3-8406-985c023946e0', '1840354092@qq.com', '1236fdsflkd发电量数据粉红色的艰苦奋斗是:rage:', '2022-04-20 23:21:07', '2022-04-28 20:44:56');
INSERT INTO `mg_message` VALUES ('8017ec04-7aac-44bd-8945-053e07f2e2c1', '1840354092@qq.com', '123465', '2022-04-20 23:19:56', '2022-04-20 23:19:56');
INSERT INTO `mg_message` VALUES ('8cb46963-8dc4-46ce-af00-859be07de463', '1840354092@qq.com', '你撒娇和水果和反馈是否规范打算开个饭店', '2022-04-20 23:18:28', '2022-04-20 23:18:28');

-- ----------------------------
-- Table structure for mg_roles
-- ----------------------------
DROP TABLE IF EXISTS `mg_roles`;
CREATE TABLE `mg_roles`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `role_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色名称',
  `role_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_roles
-- ----------------------------
INSERT INTO `mg_roles` VALUES ('86deca84-5bdb-4ec4-8979-a72abcbc27bb', 'editer', '访客', '2022-04-28 10:23:17', '2022-04-28 10:23:17');
INSERT INTO `mg_roles` VALUES ('af709d7f-883d-4f94-884c-b6010e0a415c', 'admin', '超级管理员', '2022-04-26 11:49:25', '2022-04-26 11:49:25');

-- ----------------------------
-- Table structure for mg_roles_menus
-- ----------------------------
DROP TABLE IF EXISTS `mg_roles_menus`;
CREATE TABLE `mg_roles_menus`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色ID',
  `menuIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单ID',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_roles_menus
-- ----------------------------
INSERT INTO `mg_roles_menus` VALUES ('0ddd20a2-fb20-4e3e-84f7-f533bcdfb922', 'af709d7f-883d-4f94-884c-b6010e0a415c', '36', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('155604a0-ca15-48bb-b8f9-a13d426a46a2', 'af709d7f-883d-4f94-884c-b6010e0a415c', '41', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('1bead876-fb24-444b-a564-1dc6c8c713c1', 'af709d7f-883d-4f94-884c-b6010e0a415c', '47', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('1d59d18d-de24-4234-bb71-7bc8ce6daf4b', 'af709d7f-883d-4f94-884c-b6010e0a415c', '42', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('211f47e3-87bc-497a-be7e-dd5cca58bbd0', 'af709d7f-883d-4f94-884c-b6010e0a415c', '60', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('24ec7bea-a91c-486c-bb41-9bbdce5e50bb', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '11', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('251c5b79-90ce-41ae-be15-2e0ace1bf247', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '65', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('25e41a88-4b63-4fc1-98a9-54fc0b4aa9f4', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '13', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('2e0cffe0-1588-4682-9a1b-782a75fd746c', 'af709d7f-883d-4f94-884c-b6010e0a415c', '65', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('33030fd8-4394-4a46-b031-fd127f71ef17', 'af709d7f-883d-4f94-884c-b6010e0a415c', '74', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('332d19f0-470a-4e36-9f96-e336832ab3a1', 'af709d7f-883d-4f94-884c-b6010e0a415c', '6', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('3425da24-d5df-45d7-aaea-ac170bb857ae', 'af709d7f-883d-4f94-884c-b6010e0a415c', '64', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('3738dcd0-7cc8-4284-8d66-41bb90bb3b71', 'af709d7f-883d-4f94-884c-b6010e0a415c', '72', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('383e4be8-a7a8-4a83-b51f-2d9f23868b46', 'af709d7f-883d-4f94-884c-b6010e0a415c', '48', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('3c50d113-641f-4c3d-a387-1384d70cd1a8', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '33', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('3f010c87-2028-43d5-a429-dbadbf93b1a4', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '80', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('42a5a2fd-80fc-4c99-9c3a-563996bcac94', 'af709d7f-883d-4f94-884c-b6010e0a415c', '35', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('46adc9d7-9dd9-4626-b080-8dc7fe7c84ce', 'af709d7f-883d-4f94-884c-b6010e0a415c', '67', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('47b73bcf-d2a3-462b-9aef-d6a7626e02ea', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '9', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('4cd64f92-d2e8-4a0b-9ecb-a5fa85106cc0', 'af709d7f-883d-4f94-884c-b6010e0a415c', '52', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('4dff32d0-990b-43a7-94fb-0062dc436dcc', 'af709d7f-883d-4f94-884c-b6010e0a415c', '45', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('54fc9ae1-755c-4daa-bb49-4951b09c5643', 'af709d7f-883d-4f94-884c-b6010e0a415c', '73', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('571c94b1-5655-47ae-83b7-f44b0ee5b1da', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '6', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('5b5fddc0-a4a4-4f81-89c7-0340109ad2cc', 'af709d7f-883d-4f94-884c-b6010e0a415c', '58', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('5d40f92c-4dac-4ee2-bf15-f277e234d47b', 'af709d7f-883d-4f94-884c-b6010e0a415c', '40', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('5ee704d8-9393-437a-8e51-2e460486acd1', 'af709d7f-883d-4f94-884c-b6010e0a415c', '33', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('61be0a01-201e-4c8f-9550-6580c4b574f1', 'af709d7f-883d-4f94-884c-b6010e0a415c', '59', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('62a91da2-8a8a-4bb4-b8b7-e2a264476193', 'af709d7f-883d-4f94-884c-b6010e0a415c', '80', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('634be76c-9441-4074-a1e3-0bc0f5ef6bf9', 'af709d7f-883d-4f94-884c-b6010e0a415c', '5', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('67b590a9-d4dc-4108-b5b8-94b4ec1b4624', 'af709d7f-883d-4f94-884c-b6010e0a415c', '38', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('6a159c41-fbce-456f-b86a-1cd57a6b3ab1', 'af709d7f-883d-4f94-884c-b6010e0a415c', '3', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('6b9aa4d2-1cc5-44a1-ad9c-09d0110ace3f', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '3', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('6ece5fbf-1d1a-4fb6-b30d-637bda5a2504', 'af709d7f-883d-4f94-884c-b6010e0a415c', '68', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('712ef07f-a963-49bb-bf3b-9022021320c2', 'af709d7f-883d-4f94-884c-b6010e0a415c', '66', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('753b9b98-5e20-43e1-a1b0-4fd2b4fef8bd', 'af709d7f-883d-4f94-884c-b6010e0a415c', '13', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('77f0d167-2a98-48ca-84de-6d32da51681d', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '5', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('77f3b32b-87ca-4772-bc63-0c982b0ef37c', 'af709d7f-883d-4f94-884c-b6010e0a415c', '2', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('780a6787-1b1e-415d-8363-7d8119215cf8', 'af709d7f-883d-4f94-884c-b6010e0a415c', '16', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('785f7228-e9d1-4e26-b75a-928f848ad236', 'af709d7f-883d-4f94-884c-b6010e0a415c', '15', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('7fdb5189-2387-42f4-a187-8cc3fac94474', 'af709d7f-883d-4f94-884c-b6010e0a415c', '46', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('83765680-b708-4489-9f0c-3fff58852e31', 'af709d7f-883d-4f94-884c-b6010e0a415c', '12', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('88579cf1-1418-4b1c-bd8a-fc63f6db3025', 'af709d7f-883d-4f94-884c-b6010e0a415c', '54', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('8f5c9646-a2bc-4b08-92d0-44fbf4d79fa0', 'af709d7f-883d-4f94-884c-b6010e0a415c', '39', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('8f6599b8-3664-4b03-9792-887b4bcc4477', 'af709d7f-883d-4f94-884c-b6010e0a415c', '9', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('9089e4b7-2f11-44f2-a318-1ad5b0ab225e', 'af709d7f-883d-4f94-884c-b6010e0a415c', '57', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('932868b5-268d-4666-873b-8ccc4f91e209', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '49', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('9842ca06-fec1-42b4-bb8f-826eabf14b24', 'af709d7f-883d-4f94-884c-b6010e0a415c', '49', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('997c2314-f704-44c2-8c71-6c4a7fe48ceb', 'af709d7f-883d-4f94-884c-b6010e0a415c', '75', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('9c65afd1-0ae1-4cc1-ad57-99d1eadb4b9d', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '7', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('a1302daf-fa9c-4c32-ab45-be73e8b35907', 'af709d7f-883d-4f94-884c-b6010e0a415c', '62', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('aa7a6c92-1d0c-4afa-b0e6-70850803d092', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '56', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('aae0a72e-2922-4a84-88ed-e76ee6e4038d', 'af709d7f-883d-4f94-884c-b6010e0a415c', '51', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('ac653e99-1025-4053-b04e-7544d0a7f739', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '8', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('af2d39e7-2174-458c-9993-d8009723035e', 'af709d7f-883d-4f94-884c-b6010e0a415c', '31', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('b34426f1-0ba9-4039-97ec-89066136ba0a', 'af709d7f-883d-4f94-884c-b6010e0a415c', '44', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('b3977855-fa40-4616-a193-e9555cc6f521', 'af709d7f-883d-4f94-884c-b6010e0a415c', '11', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('b47d2d3b-bd22-4646-9b81-5e0d1d7d5035', 'af709d7f-883d-4f94-884c-b6010e0a415c', '8', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('b6dbfaec-c584-4708-bbca-6ed8374f5082', 'af709d7f-883d-4f94-884c-b6010e0a415c', '56', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('bd830a85-a3b3-4f44-b486-84de1fc1c736', 'af709d7f-883d-4f94-884c-b6010e0a415c', '53', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('bef96c7d-c879-4acd-9c14-b9a0d0adecb3', 'af709d7f-883d-4f94-884c-b6010e0a415c', '7', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('c32a6301-df90-42ed-8323-3fa8df553704', 'af709d7f-883d-4f94-884c-b6010e0a415c', '37', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('c49e396d-772f-4da8-a14f-292488c3630c', 'af709d7f-883d-4f94-884c-b6010e0a415c', '61', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('c6084cc5-6c54-4585-8305-998150a31795', 'af709d7f-883d-4f94-884c-b6010e0a415c', '63', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('c633db47-23a5-4169-8bba-07feb8350dd3', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '55', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('c63f4889-6c60-4fcc-b37f-781e4900f73c', 'af709d7f-883d-4f94-884c-b6010e0a415c', '71', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('d22ab79b-34eb-4cae-af71-e8c1b8a56fda', 'af709d7f-883d-4f94-884c-b6010e0a415c', '14', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('d6ead274-5015-45b1-b3d1-438c366f7a7c', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '31', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('d923a549-b9d0-439f-92f2-9a83e2513ab4', 'af709d7f-883d-4f94-884c-b6010e0a415c', '69', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('dbc8696d-551f-4624-b9a4-a678e66ed450', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '73', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('de0c4691-ef86-4529-97de-0164e612c75c', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '61', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('de6e72a5-3fc5-4bca-a0af-84da51108f23', 'af709d7f-883d-4f94-884c-b6010e0a415c', '10', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('e2a17309-685f-4491-9009-57db4c8a087d', 'af709d7f-883d-4f94-884c-b6010e0a415c', '43', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('e406ef17-670b-4a52-a99e-23e89ca3cc47', 'af709d7f-883d-4f94-884c-b6010e0a415c', '34', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('e656c1d2-7537-4a73-9230-eddee978039b', 'af709d7f-883d-4f94-884c-b6010e0a415c', '32', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('ebaa3791-3430-4d02-ba36-b3d81a368f67', 'af709d7f-883d-4f94-884c-b6010e0a415c', '55', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('f0acdb23-57f7-47cc-8104-9f37721020c2', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '2', '2022-04-28 18:01:37', '2022-04-28 18:01:37');
INSERT INTO `mg_roles_menus` VALUES ('f2871885-f308-4c98-b11a-dc60cf8590a0', 'af709d7f-883d-4f94-884c-b6010e0a415c', '70', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('f2c58ac2-3060-4562-91fb-e2463dc737f9', 'af709d7f-883d-4f94-884c-b6010e0a415c', '50', '2022-04-28 14:05:05', '2022-04-28 14:05:05');
INSERT INTO `mg_roles_menus` VALUES ('fa8aa461-605d-4da4-a509-7d939ab0ef1d', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', '12', '2022-04-28 18:01:37', '2022-04-28 18:01:37');

-- ----------------------------
-- Table structure for mg_socials
-- ----------------------------
DROP TABLE IF EXISTS `mg_socials`;
CREATE TABLE `mg_socials`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '社交图标提示title',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '社交个体的图标iconfont',
  `color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标颜色',
  `href` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '社交链接',
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '社交文字说明',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '社交图片',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_socials
-- ----------------------------
INSERT INTO `mg_socials` VALUES ('90490802-b8c3-4766-85b5-82904a27cd5e', 'Gitee', 'icon-gitee', '#ff6d6d', 'https://gitee.com/Z568_568', '', '', '2022-04-24 10:55:49', '2022-04-24 10:55:49');

-- ----------------------------
-- Table structure for mg_sorts
-- ----------------------------
DROP TABLE IF EXISTS `mg_sorts`;
CREATE TABLE `mg_sorts`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `sort_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `sort_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类描述',
  `sort_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类页面路径',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_sorts
-- ----------------------------
INSERT INTO `mg_sorts` VALUES ('1ba60c63-9cf9-4e98-9858-c934f44aa511', '后端', '后端相关文章', '/comment/index', '2022-04-17 11:11:26', '2022-04-26 14:08:23');
INSERT INTO `mg_sorts` VALUES ('9a58d27b-ed33-4cfa-a1a7-af4e8d46e9c6', '前端', '前端相关文章', '/comment/index', '2022-04-17 11:26:37', '2022-04-26 14:08:06');

-- ----------------------------
-- Table structure for mg_tags
-- ----------------------------
DROP TABLE IF EXISTS `mg_tags`;
CREATE TABLE `mg_tags`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tag_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签名称',
  `tag_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标签描述',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_tags
-- ----------------------------
INSERT INTO `mg_tags` VALUES ('141b1b1e-b233-4182-bfb1-876cd88cd690', '测试威威标签', 'vue蒂摩艾殊', '2022-04-17 11:06:40', '2022-04-17 11:06:40');
INSERT INTO `mg_tags` VALUES ('bb2bcdff-249d-4663-b95c-426c9e4ac5db', '测试标签', 'vue蒂摩艾殊', '2022-04-16 21:36:42', '2022-04-16 21:36:42');
INSERT INTO `mg_tags` VALUES ('beaea537-24ad-45a1-93e3-cac43f2a735e', 'vue.js', 'vue蒂摩艾殊', '2022-04-16 20:46:36', '2022-04-16 20:46:36');
INSERT INTO `mg_tags` VALUES ('c12dc649-f95f-4b17-9a38-82f6cbd1d2e5', '幅度萨芬看签', 'vue蒂摩艾殊', '2022-04-17 11:25:42', '2022-04-17 11:25:42');
INSERT INTO `mg_tags` VALUES ('e973bae4-a895-4c6e-8400-c52ce2594cb0', '123456', '看符尽快发货的四个', '2022-04-17 11:15:04', '2022-04-17 11:15:25');
INSERT INTO `mg_tags` VALUES ('f78f1211-08e6-4cac-8ec4-8a9878f9d0cb', 'react.js', 'vue蒂摩艾殊', '2022-04-16 20:50:13', '2022-04-16 20:50:13');

-- ----------------------------
-- Table structure for mg_users
-- ----------------------------
DROP TABLE IF EXISTS `mg_users`;
CREATE TABLE `mg_users`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'admin' COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Vchs0bbdk2pr/Ac6DsHruw==' COMMENT '密码',
  `nickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'John Doe' COMMENT '昵称',
  `verificationCode` int(11) NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL COMMENT '创建时间',
  `updatedAt` datetime NOT NULL COMMENT '更新时间',
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色ID',
  `state` tinyint(1) NULL DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_users
-- ----------------------------
INSERT INTO `mg_users` VALUES ('c1310297-443e-44f6-83f1-8a416e6a2973', 'ZYFK', 'LxlrAAx6eAI8vDHriZVzPqA77y76YaZYh0kxTFT3cXgROwVI5zUnZs9ZI41d0/+n', 'ZYFK', NULL, '2022-04-26 23:10:08', '2022-04-28 17:42:29', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', 1);
INSERT INTO `mg_users` VALUES ('cb404a29-c68f-495f-97f0-d3d0e8369853', 'editor', 'Vchs0bbdk2pr/Ac6DsHruw==', 'Editor', NULL, '2022-04-28 17:49:36', '2022-04-28 17:49:36', '86deca84-5bdb-4ec4-8979-a72abcbc27bb', 1);
INSERT INTO `mg_users` VALUES ('e5d03ffa-39ee-42d5-a9e3-2bba1c987bd1', 'admin', 'Vchs0bbdk2pr/Ac6DsHruw==', '芒果快熟', NULL, '2022-04-26 21:53:54', '2022-04-26 21:53:54', 'af709d7f-883d-4f94-884c-b6010e0a415c', 1);

-- ----------------------------
-- Table structure for mg_website
-- ----------------------------
DROP TABLE IF EXISTS `mg_website`;
CREATE TABLE `mg_website`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '站点主头像',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '站点名称',
  `slogan` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '站点格言',
  `domain` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '站点主页',
  `notice` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '站点通知',
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '站点描述',
  `globalStyle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '站点全局样式：公祭日置灰等',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of mg_website
-- ----------------------------
INSERT INTO `mg_website` VALUES ('7d5a2521-9a6d-410d-8531-f07afe4c3b92', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_130iiorSSjF1RWgNBX7qy3evKv2HKsH0g&usqp=CAU', 'MG′blog', 'Be encouraged in time, time waits for no one.', 'https://www.zhouyi.run', '及时当勉励，岁月不待人。', '一个It技术的探索者', NULL, '2022-04-23 13:00:04', '2022-04-28 17:07:12');

SET FOREIGN_KEY_CHECKS = 1;
