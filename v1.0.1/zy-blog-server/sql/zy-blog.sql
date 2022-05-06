/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : zy_blog

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 06/05/2022 18:39:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for zy_admin_role
-- ----------------------------
DROP TABLE IF EXISTS `zy_admin_role`;
CREATE TABLE `zy_admin_role`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户ID',
  `roleName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名称',
  `roleKey` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `roleAuth` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '权限表',
  `insertTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '插入时间',
  `updateTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of zy_admin_role
-- ----------------------------
INSERT INTO `zy_admin_role` VALUES ('6da94bcd2d2910614193adde637860f7', '普通用户', 'edit', NULL, '2022-02-18 21:59:17', '2022-03-17 15:42:59');
INSERT INTO `zy_admin_role` VALUES ('99184f1015be3e2c4008ba78630494ad', '超级管理员', 'admin', NULL, '2022-02-18 21:58:23', '2022-02-20 15:36:33');

-- ----------------------------
-- Table structure for zy_admin_user
-- ----------------------------
DROP TABLE IF EXISTS `zy_admin_user`;
CREATE TABLE `zy_admin_user`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户ID',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名称',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户密码',
  `insertTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '插入时间',
  `updateTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of zy_admin_user
-- ----------------------------
INSERT INTO `zy_admin_user` VALUES ('6711a54f8b076f4ebf3322d5ed4eca42', 'ZYQX', '147258', '2022-02-20 23:18:46', '');
INSERT INTO `zy_admin_user` VALUES ('99184f1015be3e2c4008ba78630494ad', 'admin', '123456', '2022-02-18 21:58:23', '2022-03-15 09:38:21');

-- ----------------------------
-- Table structure for zy_article
-- ----------------------------
DROP TABLE IF EXISTS `zy_article`;
CREATE TABLE `zy_article`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章id',
  `classId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类ID',
  `isPublish` int(1) NULL DEFAULT NULL COMMENT '是否发布',
  `classValue` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类值',
  `className` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章标题',
  `summary` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章介绍',
  `commentsCount` int(255) NULL DEFAULT NULL COMMENT '评论总数',
  `viewsCount` int(255) NULL DEFAULT NULL COMMENT '热度数量',
  `img` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章图片',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '文章内容',
  `isTop` int(1) NULL DEFAULT NULL COMMENT '是否置顶',
  `isHot` int(1) NULL DEFAULT NULL COMMENT '是否火热',
  `pubTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '发布时间',
  `insertTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '插入时间',
  `updateTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改时间',
  `catetypeId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章类型id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of zy_article
-- ----------------------------
INSERT INTO `zy_article` VALUES ('0aee5066c479e98ef9e65849261cc3d8', '9e3a470dc5930039fd08b1abbbaaf3e0', 1, '4', '随笔', 'Express 连接  MySql 公共连接池封装', ' 公共连接池封装 ', 0, 22, 'http://localhost:5220/zy-server/public/images?id=1644655142222f250f577a67bf.jpg', '<pre class=\"language-java\"><code>let $webSqlMap = require(\'../../sqlMap/web\') // sql语句\nlet comMethods = require(\'../../utils/common\') // 引入公共连接池\nlet tools = require(\'../../utils/tools\') // 引入工具模块\n\n/**\n *@author ZY\n *@date 2022/2/12 15:11\n *@Description:web端博文\n */\n//查询文章列表\nexports.webArticleList = async (req, res, next) =&gt; {\n    try {\n        let params = req.body, sql = \'\', total = 0;\n        let queryTotal = $webSqlMap.articleOpt.count + ` WHERE isPublish=1`\n        //多条件查询\n        if (params.params.title) {\n            sql = $webSqlMap.articleOpt.list + ` WHERE isPublish=\'${1}\' AND title=\'${params.params.title}\' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`\n        }else {\n            sql = $webSqlMap.articleOpt.list + ` WHERE isPublish=\'${1}\' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`\n        }\n        comMethods.queryCount(queryTotal).then(data =&gt; {\n            total = data\n        })\n        comMethods.commonQuery(sql, params).then(data =&gt; {\n            let resData = data || {}\n            resData.total = total\n            res.json(resData)\n        }).catch(err =&gt; {\n            console.log(\'--查询文章列表错误--\', err)\n        })\n\n    } catch (err) {\n        next(err)\n    }\n}\n//查询文章详情\nexports.webArticleDetail = async (req, res, next) =&gt; {\n    try {\n        let params = req.body, sql = $webSqlMap.articleOpt.list + ` WHERE id=\'${params.id}\'`\n\n        comMethods.commonQuery(sql).then(data =&gt; {\n            let resData = data || {}\n            res.json(resData)\n        }).catch(err =&gt; {\n            console.log(\'--查询文章详情错误--\', err)\n        })\n\n    } catch (err) {\n        next(err)\n    }\n}\n//修改文章\nexports.webArticleUpdate = async (req, res, next) =&gt; {\n    try {\n        let params = req.body,\n            sql = $webSqlMap.articleOpt.update,\n            queryClassData = $webSqlMap.articleClassOpt.list + ` WHERE id=\'${params.classId}\'`\n\n        //查询分类数据\n        comMethods.commonQuery(queryClassData).then(data =&gt; {\n            let resData = data || {}\n            if (data.error) {\n                res.json(resData)\n            } else {\n                let updateParams = [\n                    resData.records[0].id,\n                    resData.records[0].className,\n                    resData.records[0].classValue,\n                    params.isPublish,\n                    params.title,\n                    params.summary, 0, 0, params.img,\n                    params.content, params.isTop, params.isHot, params.pubTime,\n                    params.insertTime,\n                    tools.getDate(),\n                    params.id,\n                ]\n                comMethods.commonQuery(sql, updateParams).then(data =&gt; {\n                    let realRes = data || {}\n                    res.json(realRes)\n                })\n            }\n        })\n\n    } catch (err) {\n        next(err)\n    }\n}\n\n</code></pre>', 1, 1, '2022-02-12 13:56:16', '2022-02-12 13:46:04', '2022-02-12 22:11:42', NULL);
INSERT INTO `zy_article` VALUES ('2df8c9315be2732c1e21829df096412b', '5c041d73cd4b0d8a5e63fc71d65c84b8', 1, '3', 'JavaScript', '孩子平时很懂事，很少向我索要礼物，最近孩子想要买一个玩具但价格实在太贵，一个月工资，怎么处理更好？', '孩子平时很懂事，很少向我索要礼物，最近孩子想要买一个玩具但价格实在太贵，一个月工资，怎么处理更好？', 1, 23, 'http://localhost:5220/zy-server/public/images?id=1644655206538658b02c536fb2.jpg', '<div><br />\n<div>\n<blockquote>\n<p data-pid=\"SIMi-LGe\"><strong>在香港，如果条件允许，餐饮、酒吧、茶馆、咖啡厅等尽可能设室外座位，以减少室内集聚。在室外保持隔位距离，缩短停留时间，被感染的机会将大幅降低。</strong></p>\n</blockquote>\n<p data-pid=\"d2E3-N0w\">在香港，<strong>室内外温差相差不大时，应该打开所有室内积聚的公共场所的窗户进行开窗通风</strong>，这样就可以创造一个类似于室外空气流通的室内外通风的室内积聚环境，持续大风量用室外空气置换室内空气，防止室内空气中新冠病毒气溶胶的积累，就可能减少积聚性感染事件的发生。</p>\n<p data-pid=\"aj-yLbP0\">在室内公共积聚场所，除了打开所有窗户进行大风量室内外通风，并且戴好口罩，减少停留时间等必要的措施以外，在有固定座位并且没法戴口罩的室内场所，如餐饮、酒吧、茶馆、咖啡厅等室内场所，能够保障吸入前杀死空气中的新冠病毒，使其不具传染能力，就能大幅度减少积聚时感染新冠肺炎事件发生。</p>\n<p data-pid=\"JLVRCqVm\">在香港，<strong>室内外温差相差不大时，应该打开所有家中的窗户进行开窗通风</strong>，创造一个类似于室外空气流通的室内外通风居家环境，持续大风量用室外空气置换室内空气，防止室内空气中新冠病毒气溶胶的积累，就可能减少家庭感染事件的发生。</p>\n<p data-pid=\"8T_hevOc\"><strong>在任何时候做好个人防疫措施都十分重要，无论你所在的地区有疫情，还是没疫情。个人防疫措施无非就是接种疫苗、戴口罩、勤洗手、勤通风、不集聚、保持社交距离。</strong></p>\n<p data-pid=\"tElijM9U\"><strong>身体有了发热、干咳、乏力等与新冠肺炎症状类似不适，及早就医，既便于感染了新冠病毒早发现、早治疗；也避免把新冠病毒传染给家人、同事；更有利于及早查清传染链，为防疫做贡献。发热、干咳、乏力等症状是官方防疫公布的新冠病毒感染症状。</strong></p>\n</div>\n</div>', 1, 1, '2022-02-11 21:37:13', '2022-02-11 21:36:57', '2022-02-12 17:32:42', NULL);
INSERT INTO `zy_article` VALUES ('40d2db26576299fa5dd78c56759d740e', 'db42f532df39d23937f85ae264f7f89d', 1, '6', '公务员', '公务员考试中的行测有哪些答题技巧？', '希望分享一下公务考试的学习方法和答题技巧！', 0, 15, 'http://localhost:5220/zy-server/public/images?id=16448116313130f6214982596e.jpg', '<div>\n<div>\n<blockquote>\n<p data-pid=\"xxgjubWH\">今年的国考笔试后天就要拉开帷幕了，再说题目本身已经没有意义，我想跳出题目，从宏观角度来说说行测的答题技巧。</p>\n</blockquote>\n<p data-pid=\"-CkwMzhd\"><strong><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgid4Xu0Jt6X4gBPqoL_bQBfcKRuG3yuuoQA&amp;usqp=CAU\" alt=\"国家公务员\" width=\"920\" height=\"409\" /></strong></p>\n<h3 data-pid=\"-CkwMzhd\"><strong>一、学会偷时间</strong></h3>\n<p data-pid=\"b-7MIbAl\">行测是非常考验速度和正确率的考试，120分钟内需要答至少120道题并涂答题卡和复查，这种高强度和密度的测试决定了每一秒钟都有可能助你K掉一个竞争对手，因此你需要充分利用好时间。第一招就是教你如何去&ldquo;偷时间&rdquo;：</p>\n<p data-pid=\"4T9OBKq8\">行测的考试时间为9：00-11：00，监考老师会在8：55左右发放试卷和答题卡，但规定直到考试铃声响才能动笔。这五分钟对于行测这种争分夺秒的考试来说异常珍贵，傻子才老实巴交呆坐着不动呢，写完了名字、涂完了准考证号后，<strong>你可以充分利用这5分钟时间，目视试卷上的常识类、图形类题等不需要心算的题，并飞快地转动你的脑子思考正确答案。</strong>不要试图去翻阅试卷，动作太大会引起监考老师的注意，引起接下来的特别关照就不好了。</p>\n<p data-pid=\"GOPYs8eW\">11：00考试结束的铃声响后，监考老师会马上说&ldquo;考试结束，请停止答题&rdquo;，如果你还没答完（尤其是还在涂答题卡的傻孩子），千万别傻乎乎地马上听话和停笔，因为那时候大家都还在奋笔疾书，他也顾不得你一个人，你尽管再写1分钟左右，直至他下最后通牒为止。脸皮不厚，怎么立足！</p>\n<p class=\"ztext-empty-paragraph\">&nbsp;</p>\n<h3 data-pid=\"upOuFJUW\"><strong>二、合理布局做题顺序</strong></h3>\n<p data-pid=\"payAqSag\">在临场考试状态下，你的神经会绷得异常紧张，脑子也会较平时不那么灵光。因此我强烈建议，你上来先攻克常识判断题、言语理解题这种不太费脑子的，等大脑适应了考试节奏、进入状态后，再来攻克需要烧脑的版块。</p>\n<p data-pid=\"-Gorc68f\">每个人对于行测的几大板块都有自己的擅长和软肋。由于绝大部分人都难以完成行测所有板块，你必须对自己的做题时间有一个合理的布局<strong>，优先保证自己擅长的板块有充足的时间，而最末顺序就留给那些即使好好去做<a class=\"css-1occaib\" href=\"https://www.zhihu.com/search?q=%E6%AD%A3%E7%A1%AE%E7%8E%87&amp;search_source=Entity&amp;hybrid_search_source=Entity&amp;hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A272961827%7D\" target=\"_blank\" rel=\"noopener\" data-za-not-track-link=\"true\">正确率</a>也不会高到哪儿去的题吧</strong>。事实上，这也是行测考查的重点之一：在资源紧张的前提下，懂得根据自己的特点制定量体裁衣的策略，方可实现资源优化配置和利益最大化！</p>\n<p data-pid=\"9gAuMLuh\">就我个人而言，我的数学很烂，因此把<a class=\"css-1occaib\" href=\"https://www.zhihu.com/search?q=%E6%95%B0%E9%87%8F%E5%85%B3%E7%B3%BB&amp;search_source=Entity&amp;hybrid_search_source=Entity&amp;hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A272961827%7D\" target=\"_blank\" rel=\"noopener\" data-za-not-track-link=\"true\">数量关系</a>类题放到最后一部分（资料分析却是相反，建议平时多联系并在考试时先做，因为掌握套路以后你会发现，都是送分题！），这样即使最后随便乱涂几个，也不会比我认真去做要差到哪儿去，我还为自己擅长的逻辑推理和言语理解部分争取了宝贵的战略时间！</p>\n<p class=\"ztext-empty-paragraph\">&nbsp;</p>\n<h3 data-pid=\"BHNRaKbW\"><strong>三、要有全面战略眼光，不要恋战</strong></h3>\n<p data-pid=\"kO6D2eWm\">上面已经提过，行测考试中120分钟要做至少120题，平均1 题的思考和答题时间还不到1分钟，其中还包括通常比较耗时的数量关系。如果你想将整张卷子漂亮地答完，就不能在某一题上纠结太久。一个数量关系题可能只有1.6分，即使你耗费了10分钟算出了正确答案，你也已经是输了，因为这10分钟你本可以去在其它题目上拿到8分或许更多。</p>\n<p data-pid=\"9lDm7wIe\">行测的考查方式决定了：只有当你具备了舍小取大的魄力，方可赢得大局胜利。用人话说出来就是，<strong>如果一道题你初步读下来判断自己不会做，或者需要耗费大量时间才做得出来，请果断放弃之，不要思缠烂打</strong>！先随便选一个答案并做出显眼的记号，最后若全部题目答完、答题卡涂完还有剩余时间（机会渺茫，所以第一眼几乎就是永别了baby），再回来思考这些弃儿。</p>\n<p class=\"ztext-empty-paragraph\">&nbsp;</p>\n<h3 data-pid=\"fK7UkEp_\"><strong>四、涂答题卡要以版块为单位来涂</strong></h3>\n<p data-pid=\"RXaxIBGf\">我在高中时的一次知识竞赛上曾吃过血淋淋的亏：认真地将整张试卷的题目做完，答案全部写在试卷上，当我得意洋洋发准备将这些漂亮的答案一个个誊到答题卡上时，铃声响了，还有10分钟。我慌了，抓紧时间涂，然而我绝望地发现10分钟根本涂不完100多个小框并保证正确率！最后在监考老师的强取豪夺下，我交了一张空白了一半的答题卡。</p>\n<p data-pid=\"V7-14BW-\">幸好我的那次只是一次知识竞赛，我的人生轨迹不会因为一次失败的考试而改变。我是幸运的，以零试错成本买到了这及其重要的教训：任何需要涂答题卡的考试，<strong>坚决不能最后再涂答题卡</strong>！</p>\n<p data-pid=\"cNbxGjts\">可悲的是，这么几年的公考笔试巡考当下来，每年我都会发现考场上坐着好几个当年的自己：铃声响了才慌不迭去涂答题卡，最后所有努力和机会都随着那张近乎于空的答题卡而付诸东流。</p>\n<p data-pid=\"0wBbR8MT\">除了不能最后一道涂，为避免思维被频繁打断，我也不建议你做一个题涂一个答题卡，最佳办法是<strong>做完一个板块誊一个板块的答题卡</strong>，誊写的时候一定要注意每个题的序号，千万别看串了，一错便是一溜。当你终于发现错误并拿橡皮擦掉再重新去涂时，你的对手已经做了好几道题了。</p>\n<p data-pid=\"kpxwbWme\">最后，不管考试时间如何紧张，请务必带个手表，密切关注考试时间，在最后拿出至少5分钟来用核对有没有涂错答案。</p>\n<p class=\"ztext-empty-paragraph\">&nbsp;</p>\n<h3 data-pid=\"mDRuhVA4\"><strong>五、关于猜答案的小技巧</strong></h3>\n<p data-pid=\"pY5NSxZ2\">这是我作为一个数学学渣，为了尽可能地多拿到分，根据多年考试总结出来的歪门秘籍，现在供你参考：</p>\n<p data-pid=\"2ih2JQbs\">如果ABCD中A与B像，C与D像，答案一定不在A上。因为随手乱涂最有可能涂到A，而出题者在这么迷惑人的一道题上，是不希望你靠随便乱猜就拿到分的。</p>\n<p data-pid=\"TQeaFhMf\">如果ABCD中A与C很像，B和D却完全游离，那通常答案就在A与C中间，因为另一个答案是为了迷惑你而存在，而B和D就是来不专业地打酱油的。</p>\n<p data-pid=\"MXepfKCd\">如果ABC都很像，只有D完全不同，首先就可以排除D这个酱油身份。因为所的干扰选项都是围绕正确答题而产生的，不会出现这种正确答案被孤立的情况。</p>\n<p data-pid=\"F29Kbxd8\">在数量关系题中，如果ABCD都是数字，一般来说正确答题不会是最大的数，也不会是最小的数，只会是中不溜的那两个，答案同上。</p>\n<p data-pid=\"70I6PMCK\">怎么写出来感觉像绕口令一样&hellip;&hellip;你看懂了吗？</p>\n<h3 data-pid=\"jhZA4458\"><strong>六、打酱油者请降低鼾声，不要影响他人</strong></h3>\n<p data-pid=\"dHlmCM-E\">喂，你不要笑好吗，我是认真的。每年巡考都会遇到这样的家伙，也不知道是不是被家里拿枪逼着来考试的，拿到试卷10分钟内还假装做做题，不到半小时就原形毕露趴桌上见周公去了。公考又不能提前交卷，这样的态度，你和你周围的考生，以及监考老师都很痛苦好吗！所以如果一定要睡觉，请穿多些别感冒了，还有尽量不要打鼾和磨牙，绿色睡眠，造福他人！</p>\n<p class=\"ztext-empty-paragraph\">&nbsp;</p>\n<p data-pid=\"VpF_vcBc\">话说有一年巡考时，下午申论考试天气异常闷热，特别催眠。我亲眼见到坐在窗边一个漂漂亮亮的小姑娘化了个大浓妆，趴在桌上睡了2小时，被监考老师叫醒起来迷迷糊糊交卷时，眼线晕得像熊猫，头发乱得像鸟窝&hellip;&hellip;简直不要太有style了！</p>\n</div>\n</div>', 1, 1, '2022-02-14 12:09:20', '2022-02-14 12:09:01', '2022-02-14 12:13:03', NULL);
INSERT INTO `zy_article` VALUES ('5d4968c2cb2b8c90c58fd95506cba45d', '59930dbd9a8201dc84aa5795b624af7f', 1, '1', 'CSS3', 'js数组常用的方法有哪些？', '双重循环 + slice，找出重复的元素。虽然只要求找出重复元素，但应该注意要顺便去重，否则外循环还是会对重复元素进行一遍检查；用 flag 记录重复次数，只在第一次重复的时候将元素放入新数组', 0, 11, 'http://localhost:5220/zy-server/public/images?id=164466183089025c842ff5fae3.jpg', '<h2>前言</h2>\n<p data-pid=\"7u3aXfsA\">数组是 JavaScript 中常见数据类型之一，关于它的一些操作方法，我在这里做一下简单记录和总结。</p>\n<p data-pid=\"i12q6MhT\">今天主要介绍：</p>\n<ul>\n<li data-pid=\"WkfeATxN\">如何找出数组中的重复/非重复元素</li>\n<li data-pid=\"1GnHdzgs\">数组扁平化方法</li>\n</ul>\n<h2>找出数组中的重复元素或非重复元素</h2>\n<p data-pid=\"z0KodDWb\">&nbsp; &nbsp; &nbsp;双重循环 + slice，找出重复的元素。虽然只要求找出重复元素，但应该注意要顺便去重，否则外循环还是会对重复元素进行一遍检查；用 flag 记录重复次数，只在第一次重复的时候将元素放入新数组</p>\n<pre class=\"language-javascript\"><code>function search(arr){\n    let res = []\n    let flag = 0\n    for(let i = 0;i &lt; arr.length;i++){\n        for(let j = i+1;j&lt;arr.length;j++){\n        	if(arr[i] === arr[j]){\n                flag++\n                if(flag == 1) res.push(arr[i])\n                arr.splice(j,1)\n            }    \n        }\n        flag = 0\n    }\n    return res\n}\n</code></pre>\n<div><br />\n<div>\n<p data-pid=\"zTGZSFc_\">map + filter，记录每个元素出现的次数。有了重复次数，就可以筛选出重复元素、重复次数最多元素或者非重复元素：</p>\n<div class=\"highlight\">\n<pre class=\"language-javascript\"><code>function search(arr){\n    const map = new Map()\n    for(item of arr){\n        if(!map.has(item)){\n            map.set(item,1)\n        } else {\n            map.set(item,map.get(item)+1)\n        }\n    }\n    // 找出重复元素，即出现次数大于1\n    return [...map.entries()].filter(item =&gt; item[1] &gt; 1).map(item =&gt; item[0])\n    // 找出非重复元素，即出现次数等于1\n    return [...map.entries()].filter(item =&gt; item[1] == 1).map(item =&gt; item[0])\n    // 找出重复次数最多的元素\n    return [...map.entries()]\n        .filter(item =&gt; item[1] == Math.max(...map.values()))\n    	.map(item =&gt; item[0])\n}</code></pre>\n</div>\n<h2>数组扁平化 / 数组降维</h2>\n<p data-pid=\"LtKZkJtF\"><a class=\"css-1occaib\" href=\"https://www.zhihu.com/search?q=%E4%BA%8C%E7%BB%B4%E6%95%B0%E7%BB%84&amp;search_source=Entity&amp;hybrid_search_source=Entity&amp;hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2337060474%7D\" target=\"_blank\" rel=\"noopener\" data-za-not-track-link=\"true\">二维数组</a>，以 <span style=\"background-color: #f0f0f0;\"><code>[[],[{a:1}],[],[3,4],5]</code></span> 为例，降维后得到 <span style=\"background-color: #ebe6e6;\"><code>[{a:1},3,4,5]</code></span></p>\n<h2>二维数组：双重循环</h2>\n<p data-pid=\"gx1M8DCN\">需要检查是否每个元素都是数组</p>\n<div class=\"highlight\">\n<pre class=\"language-javascript\"><code>function flatten(arr){\n    const res = []\n    for(let i = 0;i &lt; arr.length; i++){\n        if(Array.isArray(arr[i])){\n			for(let j = 0;j &lt; arr[i].length;j++){\n            	res.push(arr[i][j])\n        	}            \n        } else {\n            res.push(arr[i])\n        }      \n    }\n    return res\n}</code></pre>\n</div>\n</div>\n</div>', 1, 1, '2022-02-12 16:54:39', '2022-02-12 16:54:24', '2022-02-12 19:03:04', NULL);
INSERT INTO `zy_article` VALUES ('7ecdc4879bc110c0223fa377e7c69f90', '5c041d73cd4b0d8a5e63fc71d65c84b8', 1, '3', 'JavaScript', 'nodejs使用 svg-captcha 做验证码及验证', 'nodejs使用 svg-captcha 做验证码及验证', 0, 0, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAABJCAMAAAAwl0llAAAAwFBMVEX///8zMzMvLy9QUFAhISE+hj0qKipyqWJ0rGRnoFx3r2NtpV9YllKpqal7e3t4s2J3tlyjo6N1uFgAAABdmVjw9fBycnJxulI4ODjn7+eUuZGIsYRvvE+uyasQEBBtvUton2NPkEmWlpbO3s0ZGRllZWW70bnt7e2zs7PU1NRZWVlUoEVxpGx/rHvE18LIyMiGhoYygTJSmEigwJ0mfCWdxpBqp1dfnVK4163O5cfa5tlFRUXj8d+Exmud0IxguTeDGchbAAAE0UlEQVRoge2Yb3eiOBTGAYHW8WrHGhzFAUEQ/APYQrfO0t3t9/9WGyBACCA7p0rP2dP7wiOE8Mu9N8l9Asdd1zaH/ZXf+N9sIuoT9zO4Mi+Lm0/h8rwo7z6Fy/P60+dwhcEX94v7xf3i/h+549PF5nh5sdl1L3LdtpfvBNvettdO5Y/Xc3QBO03rXyt3I+qDJkmwH9j4eVlvq52/vj/c3wEELc2nhYjrn3DaCo3cE4+bhVlNErhzO+uA25tq55+Pjw/f7u9GyPTihmZ3S7qL5C1V7n6rZ7dlcVrpt9Gz8KRmv7Hx+Ovv9eP3hHs3RMPzSmGxT3T3Gtd9mglFAw5J0bBLYkR30ud0PJR/3tc/CHeE0HB41irUnSDyrFHcqVgdlL7N3NofbIHtRkukX+/v65+EOxoNU/CwTHM2L1q5p7faoGQ7ESPTWY2axkPOXI7X7+t1lYvBw7OXBdudN3cnXHfb2CyLJ47NTAHOZoB/XFe5qcMYnC2pST3ENHestzS/cfSVTb2FcD2zzk3Akpo2z6lhy9T/nEu9UKaHuKC4+mE/LudAwT0y3BQMzxHDFfTJRC+CWuMK+mZHkUuuLCcT3J3ksyTnhtDElViumCy+co6xXPuQTJdNMbCCK2zz+Wkz3POR4QJCUOOOyZpq5uJ5xMV49bmDDIzldT7ecb4wZhXuXRiefzJcQBLDLUZd3GD85TgVkGdxm/Q4IeItcXGZex+G4ZHhmubvc5dgGEhNuLKYniW6uMcwNH+wXEz+XS4yDCNKqhIpeZ3c41GSPspdcIqBDNBwscz3/g7ut+MxlKQjG2eWe8h7bxu5Iv6v+RXZ0M2VsHVweTmrJG5+zXCFRa24dnAfEnclKWTnFcPl5dmGLqdsfgWbFRudXCm1Li7usKBKT32fZIprJzfDSuHFdURezV/g8sz3hwUZbDEYspkRrvZCwK8V7vOLlT084xtNn6TNe7tS7kT5VOFW1dx+oFMBiCEjhzT3xcvn5k5sqISyncsotj7bh3IdCfackXmJ8CkD70jPqcMFVwKLevjJllnqpOJFRc7gNGf3+UZZu7H1cXmlvmCySbhnsyqvWJ909svZjhdpLtliJs2ffNw5Le+XHg72OeWGak1OZuK5nsLSi3x9CXWt2mEWTjPmnqlNhz62jLOa3vbJjMhzsb59dJv2cn4dlYm1PBMo1xORLMzYiVIanqyiPW1rvWiKWiZ26QOoHgCV6v3hcgx3mw9/t1QiAB+fVxwEhtX9+LXMMQAF5QAun06vZrEHiAr4CsyGGX51UxJOxUPLAMNJB2Q1HRWvYw5A/SCqIcDHlthybgZWzMw19raKJVsQR8u2U/lHbQkqIaU/VhBkHipoxcWBEtzK35wbPVs40yYArk0a4WLwzfKbczVckVbI1wInQuAQ7g2N4ipgpH8t8PrmZsspinrlcj5C3koLUnifXE71UDKxkNUzF1/GgeYjWPbJDTxSiVQIeuUCQa2w733G2UC+EwTOChn95lfxAW9YJvhKH9xVwcVXVuBYvawjDqFUXmgV5c4FBmgtHa5kiZ6LlrEBVOmPfbg1FluANwu8UxXXigrmqheJ5fh++b1fwwKkR0nJOamLAdZ4TQLkZoYPC1GW7B60JG04zQZKxXvPpmjGRxL7LxBqj9UsYqvuAAAAAElFTkSuQmCC', '<h2>一、需求</h2>\n<p>使用 nodejs 做后端开发，需要请求验证码，但是不想装C++这种依赖，因此比较著名的几个 nodejs 验证码库都没法使用。</p>\n<p>在 github 上看到了&nbsp;<code>svg-captcha</code>&nbsp;这个库，发现他是将 text 转 svg 进行返回的，安全性也有保证，不会被识别成文字。</p>\n<ul>\n<li><a href=\"https://github.com/lemonce/svg-captcha\">https://github.com/lemonce/svg-captcha</a></li>\n</ul>\n<h2>二、基本使用</h2>\n<p>安装：</p>\n<pre class=\"line-numbers  language-javascript\"><code>yarn add svg-captcha</code></pre>\n<h3>1） 创建普通验证码：</h3>\n<pre class=\"line-numbers  language-javascript\"><code>const svgCaptcha = require(\'svg-captcha\');\n\nconst cap = svgCaptcha.create();\nconsole.log(cap);\n// {data: \'&lt;svg.../svg&gt;\', text: \'abcd\'}</code></pre>\n<p>调用&nbsp;<code>create()</code>&nbsp;之后，会返回一个对象，结构如下：<code>{data:\'\',text:\'\'}</code>。</p>\n<ul>\n<li><code>data</code>：验证码 svg 图片</li>\n<li><code>text</code>: 验证码字符</li>\n</ul>\n<p><strong>create()的参数如下：</strong></p>\n<ul>\n<li><code>size</code>: 4 // 验证码长度</li>\n<li><code>ignoreChars</code>: \'0o1i\' // 验证码字符中排除 0o1i</li>\n<li><code>noise</code>: 1 // 干扰线条的数量</li>\n<li><code>color</code>: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有</li>\n<li><code>background</code>: \'#cc9966\' // 验证码图片背景颜色</li>\n</ul>\n<p>示例：</p>\n<p><img class=\"wscnph\" style=\"width: 150px; height: 150px;\" src=\"http://114.117.164.181:5220/zy-server/public/images?id=1645167682751da3dcbb9edc0d.jpg\" /></p>\n<h3>2） 创建算数式验证码</h3>\n<pre class=\"line-numbers  language-javascript\"><code>const cap = svgCaptcha.createMathExpr(options)</code></pre>\n<p>示例：</p>\n<p><img class=\"wscnph\" style=\"width: 150px; height: 150px;\" src=\"http://114.117.164.181:5220/zy-server/public/images?id=1645167696167dac4727cfaca9.jpg\" /></p>\n<h2>三、在 express 中使用</h2>\n<p>在网页中使用验证码的时候，无非是请求一个 URL ，返回一个验证码图片。</p>\n<h3>1） express 中构建一个&nbsp;<code>/captcha</code>&nbsp;的路由：</h3>\n<pre class=\"line-numbers  language-javascript\"><code>\nconst express = require(\'express\');\nconst captcha = require(\'svg-captcha\');\nconst router = express.Router();\n\nrouter.get(\'/\',(req,res)=&gt;{\n  const cap = captcha.createMathExpr();\n  req.session.captcha = cap.text; // session 存储\n  res.type(\'svg\'); // 响应的类型\n  res.send(cap.data);\n});</code></pre>\n<h3>2） 前端使用</h3>\n<pre class=\"line-numbers  language-javascript\"><code>  &lt;img src=\"/captcha\" onclick={$(event.target).attr(\'src\',\'/captcha?\'+Math.random())}&gt;</code></pre>\n<p><img class=\"wscnph\" style=\"width: 150px; height: 150px;\" src=\"http://114.117.164.181:5220/zy-server/public/images?id=16451677107259e3c513d8bd16.jpg\" /></p>', 1, 0, '2022-02-18 15:02:30', '2022-02-18 15:01:56', '2022-03-17 15:33:59', NULL);
INSERT INTO `zy_article` VALUES ('9ee979ab7b1c781cdce14088ff2c8b23', '5c041d73cd4b0d8a5e63fc71d65c84b8', 1, '3', 'JavaScript', '10 个解决JavaScript实际问题的 ES6 代码片段', '10 个解决JavaScript实际问题的 ES6 代码片段', 0, 33, 'http://localhost:5220/zy-server/public/images?id=164481355672933e2233d556c5.png', '<section><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://res.cloudinary.com/practicaldev/image/fetch/s--mY622Qoc--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/398a310kjdiv647cld1y.jpg\" alt=\"es6\" width=\"800\" height=\"300\" /></section>\n<hr />\n<section></section>\n<section><strong>我从 30 seconds of code 网站中挑选了一些我认为有用的短代码片段，这是一个很棒的学习资源，有兴趣的话，可以多上去看看。</strong></section>\n<section><strong>在今天的内容中，我尝试根据它们的实际用途对它们进行排序，解决我们在项目中可能遇到的常见问题：</strong></section>\n<blockquote>\n<section><strong>1、隐藏指定的所有元素</strong></section>\n</blockquote>\n<section>\n<pre class=\"language-javascript\"><code>const hide = (...el) =&gt; [...el].forEach(e =&gt; (e.style.display = \'none\'));\n\n// Example\nhide(document.querySelectorAll(\'img\')); // Hides all &lt;img&gt; elements on the page</code></pre>\n<blockquote>\n<p><strong>2、检查元素是否有指定的类</strong></p>\n</blockquote>\n<pre class=\"language-javascript\"><code>const hasClass = (el, className) =&gt; el.classList.contains(className);\n\n// Example\nhasClass(document.querySelector(\'p.special\'), \'special\'); // true</code></pre>\n<blockquote>\n<p><strong>3、如何切换元素的类</strong></p>\n</blockquote>\n<pre class=\"language-javascript\"><code>const toggleClass = (el, className) =&gt; el.classList.toggle(className);\n\n// Example\ntoggleClass(document.querySelector(\'p.special\'), \'special\'); \n// The paragraph will not have the \'special\' class anymore</code></pre>\n<blockquote>\n<p><strong>4、如何获取当前页面的滚动位置</strong></p>\n</blockquote>\n<pre class=\"language-javascript\"><code>const getScrollPosition = (el = window) =&gt; ({\n  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,\n  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop\n});\n\n// Example\ngetScrollPosition(); // {x: 0, y: 200}</code></pre>\n<blockquote>\n<p><strong>5、如何平滑滚动到页面顶部</strong></p>\n</blockquote>\n<pre class=\"language-javascript\"><code>const scrollToTop = () =&gt; {\n  const c = document.documentElement.scrollTop || document.body.scrollTop;\n  if (c &gt; 0) {\n    window.requestAnimationFrame(scrollToTop);\n    window.scrollTo(0, c - c / 8);\n  }\n};\n\n// Example\nscrollToTop();</code></pre>\n</section>\n<blockquote>\n<p><strong>6、如何检查父元素是否包含子元素</strong></p>\n</blockquote>\n<section class=\"code-snippet__fix code-snippet__js\">\n<pre class=\"language-javascript\"><code>const elementContains = (parent, child) =&gt; parent !== child &amp;&amp; parent.contains(child);\n\n// Examples\nelementContains(document.querySelector(\'head\'), document.querySelector(\'title\')); \n// true\nelementContains(document.querySelector(\'body\'), document.querySelector(\'body\')); // false</code></pre>\n</section>\n<blockquote>\n<p><strong>7、如何检查指定的元素在视口中是否可见</strong></p>\n</blockquote>\n<section class=\"code-snippet__fix code-snippet__js\">\n<pre class=\"language-javascript\"><code>const elementIsVisibleInViewport = (el, partiallyVisible = false) =&gt; {\n  const { top, left, bottom, right } = el.getBoundingClientRect();\n  const { innerHeight, innerWidth } = window;\n  return partiallyVisible\n    ? ((top &gt; 0 &amp;&amp; top &lt; innerHeight) || (bottom &gt; 0 &amp;&amp; bottom &lt; innerHeight)) &amp;&amp;\n        ((left &gt; 0 &amp;&amp; left &lt; innerWidth) || (right &gt; 0 &amp;&amp; right &lt; innerWidth))\n    : top &gt;= 0 &amp;&amp; left &gt;= 0 &amp;&amp; bottom &lt;= innerHeight &amp;&amp; right &lt;= innerWidth;\n};\n\n// Examples\nelementIsVisibleInViewport(el); // (not fully visible)\nelementIsVisibleInViewport(el, true); // (partially visible)</code></pre>\n</section>\n<blockquote>\n<p><strong>8、如何获取元素内的所有图像</strong></p>\n</blockquote>\n<section class=\"code-snippet__fix code-snippet__js\">\n<pre class=\"language-javascript\"><code>const getImages = (el, includeDuplicates = false) =&gt; {\n  const images = [...el.getElementsByTagName(\'img\')].map(img =&gt; img.getAttribute(\'src\'));\n  return includeDuplicates ? images : [...new Set(images)];\n};\n\n// Examples\ngetImages(document, true); // [\'image1.jpg\', \'image2.png\', \'image1.png\', \'...\']\ngetImages(document, false); // [\'image1.jpg\', \'image2.png\', \'...\']</code></pre>\n</section>\n<blockquote>\n<p><strong>9、如何判断设备是移动设备还是台式机/笔记本电脑</strong></p>\n</blockquote>\n<section class=\"code-snippet__fix code-snippet__js\">\n<pre class=\"language-javascript\"><code>const detectDeviceType = () =&gt;\n  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)\n    ? \'Mobile\'\n    : \'Desktop\';\n\n// Example\ndetectDeviceType(); // \"Mobile\" or \"Desktop\"</code></pre>\n</section>\n<blockquote>\n<p><strong>10、如何获取当前网址</strong></p>\n</blockquote>\n<pre class=\"language-javascript\"><code>const currentURL = () =&gt; window.location.href;\n\n// Example\ncurrentURL(); // \'https://google.com\'</code></pre>\n<blockquote>\n<p><strong>写在最后</strong></p>\n</blockquote>\n<p>以上就是我在工作与学习中收集整理下来的24个代码片段，对我来讲，还是非常有用的，因此，我将它分享出来，也希望对您有所帮助。</p>\n<p>最后，感谢您的阅读，如果您觉得非常有用，您也可以将它分享给您身边做开发的朋友，非常感谢。</p>', 1, 1, '2022-02-14 12:39:51', '2022-02-14 12:39:22', '2022-02-14 12:42:45', NULL);
INSERT INTO `zy_article` VALUES ('c49c909ab9692a2e04d4aaeb6b36d20c', '4474eb61ee85e9882d1287a9e1742767', 1, '2', 'Vue.js', '谷爱凌的商业价值到底有多大，是否已经超越巅峰期的刘翔？', '2021~2022赛季自由式滑雪，谷爱凌包揽了所有分站赛冠军，在37天内狂揽6金2银1铜共9枚奖牌。目前代言品牌已达23个，包括：京东、中国移动、雅诗兰黛、元气森林、科勒、维多利亚的秘密以及路易威登、蒂芙尼、IWC万国表等奢侈品牌。如果北京冬奥会谷爱凌顺利夺冠，她的商业价值还会翻倍。', 0, 2, 'http://localhost:5220/zy-server/public/images?id=16446552139286bc28df832637.jpg', '<p>2021~2022赛季自由式滑雪，谷爱凌包揽了所有分站赛冠军，在37天内狂揽6金2银1铜共9枚奖牌。目前代言品牌已达23个，包括：京东、中国移动、雅诗兰黛、元气森林、科勒、维多利亚的秘密以及路易威登、蒂芙尼、IWC万国表等奢侈品牌。如果北京冬奥会谷爱凌顺利夺冠，她的商业价值还会翻倍。</p>\n<p>对比巅峰期的刘翔，2008年奥运前，刘翔身负14个代言，当年收入跃至1.63亿元。当年运动员商业价值仅次于姚主席。</p>\n<p>美少女白皮外貌+北京腔的标签换取了空前的关注度，如果在漂亮国她只是一名滑雪运动员，入籍中国，给她带来了空前的商业名利。</p>\n<p>预祝谷爱凌能够在冬奥赛场顺利夺冠。</p>\n<p>谷爱凌商业价值到底达到哪个高度？是否已经是国内现役排名第一，最终能超越姚明、刘翔、李娜等顶级运动明星？</p>', 0, 1, '2022-02-11 21:33:09', '2022-02-11 21:22:38', '2022-02-12 16:40:15', NULL);
INSERT INTO `zy_article` VALUES ('c4db600ee5d7c3e6a191441bf79aa827', '53955a5a63c4da2d17bd306a5cade40d', 1, '0', '其他', '更广泛的股市大幅', '广泛大使馆犯得上', 0, 2, 'http://localhost:5220/zy-server/public/images?id=1644636864494ade46da3fb7a7.png', '<p><img class=\"wscnph\" style=\"width: 150px; height: 150px;\" src=\"http://localhost:5220/zy-server/public/images?id=1644636895031a6a31bae08a35.png\" /></p>\n<pre class=\"language-javascript\"><code>import React, { Component } from \'react\'\nimport { Shake } from \'reshake\'\n\nclass App extends Component {\n  render () {\n    return (\n      &lt;Shake \n        h={5}\n        v={5}\n        r={3}\n        dur={300}\n        int={10}\n        max={100}\n        fixed={true}\n        fixedStop={false}\n        freez={false}&gt;\n        &lt;h1&gt;&amp;lt;Shake /&amp;gt;&lt;/h1&gt;\n      &lt;/Shake&gt;\n    )\n  }\n}</code></pre>', 1, 1, '2022-02-12 11:30:37', '2022-02-12 11:30:16', '2022-02-12 11:34:59', NULL);

-- ----------------------------
-- Table structure for zy_article_class
-- ----------------------------
DROP TABLE IF EXISTS `zy_article_class`;
CREATE TABLE `zy_article_class`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类id',
  `query` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '路由参数',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '前端路径',
  `className` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '分类名称',
  `classValue` int(1) NULL DEFAULT NULL COMMENT '分类值',
  `insertTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '插入时间',
  `updateTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of zy_article_class
-- ----------------------------
INSERT INTO `zy_article_class` VALUES ('4474eb61ee85e9882d1287a9e1742767', 'Vue.js', '/category/', 'Vue.js', 2, '2022-02-11 23:11:54', '2022-02-11 23:17:26');
INSERT INTO `zy_article_class` VALUES ('53955a5a63c4da2d17bd306a5cade40d', '其他', '/category/', '其他', 0, '2022-02-11 23:18:17', '');
INSERT INTO `zy_article_class` VALUES ('59930dbd9a8201dc84aa5795b624af7f', 'CSS3', '/category/', 'CSS3', 1, '2022-02-11 23:16:57', '2022-02-12 13:59:02');
INSERT INTO `zy_article_class` VALUES ('5c041d73cd4b0d8a5e63fc71d65c84b8', 'JavaScript', '/category/', 'JavaScript', 3, '2022-02-11 22:59:57', '2022-02-11 23:17:40');
INSERT INTO `zy_article_class` VALUES ('9e3a470dc5930039fd08b1abbbaaf3e0', '随笔', '/category/', '随笔', 4, '2022-02-12 00:41:44', '2022-02-13 20:36:25');
INSERT INTO `zy_article_class` VALUES ('db42f532df39d23937f85ae264f7f89d', '公务员', '/category/', '公务员', 6, '2022-02-14 12:05:26', '');

-- ----------------------------
-- Table structure for zy_comments
-- ----------------------------
DROP TABLE IF EXISTS `zy_comments`;
CREATE TABLE `zy_comments`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论ID',
  `postId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章ID',
  `parentId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父级ID',
  `fromUserId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '提交评论的用户ID',
  `fromUserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '提交评论的用户名称',
  `fromUserAvatar` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '提交评论的用户头像',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '评论内容',
  `toUserId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '回复对象ID',
  `toUserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '回复对象名称',
  `toUserAvatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '回复对象头像',
  `createTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `updateTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of zy_comments
-- ----------------------------

-- ----------------------------
-- Table structure for zy_web_about
-- ----------------------------
DROP TABLE IF EXISTS `zy_web_about`;
CREATE TABLE `zy_web_about`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ID',
  `aboutTitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `aboutContent` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '关于博主描述',
  `insertTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updateTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of zy_web_about
-- ----------------------------
INSERT INTO `zy_web_about` VALUES ('6c72acc3c0e0ccfa933d23ad96455cc9', '关于博客', '<blockquote>\n<p>生活总是千变万化，总有那么多不如意，总有那么多不顺心，只要自己坚守自己的理想，就不会被打倒，再大的风浪阻挡不了我们前进的方向，<a href=\"https://www.52000.net/\" target=\"_blank\" rel=\"noopener\">坚持</a>就是胜利，无论怎样，都不认输。</p>\n</blockquote>\n<pre class=\"language-css\"><code>.info-card {\n      min-height: 100px;\n      padding: 5px;\n      border-radius: 3px;\n      margin: 10px 0 30px 0;\n      /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/\n      p {\n        line-height: 1.7rem;\n      }\n    }</code></pre>', '2022-02-14 21:44:26', '2022-02-15 10:00:37');

-- ----------------------------
-- Table structure for zy_web_music
-- ----------------------------
DROP TABLE IF EXISTS `zy_web_music`;
CREATE TABLE `zy_web_music`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '歌曲名称',
  `artist` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '作者',
  `url` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '歌曲地址',
  `cover` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '歌曲封面',
  `lrc` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '歌词',
  `insertTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updateTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of zy_web_music
-- ----------------------------
INSERT INTO `zy_web_music` VALUES ('2489354370881dc628804ad0bb6456df', 'Lawrence', 'Lawrence', 'http://f3.htqyy.com/play9/759/mp3/6', NULL, NULL, '2022-02-15 09:54:59', '');
INSERT INTO `zy_web_music` VALUES ('97af09bb8736f9acb70db385faf0923d', '以父之名', '周杰伦', 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_28386348&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3', 'http://img1.kuwo.cn/star/starheads/240/42/97/3914752958.jpg?param=300y300', '[00:18.80]以父之名 \n[00:35.80]周杰伦 \n[00:52.80]制作人：秋晓之 QQ：285552115 \n[01:09.80] \n[01:26.56]微凉的晨露沾湿黑礼服 \n[01:29.67]石板路有雾父在低诉 \n[01:32.52]无奈的觉悟只能更残酷 \n[01:35.33]一切都为了通往圣堂的路 \n[01:38.02]吹不散的雾隐没了意图 \n[01:40.67]谁轻柔踱步停住 \n[01:43.34]还来不及哭穿过的子弹就带走温度 \n[01:47.15] \n[01:48.69]我们每个人都有罪 \n[01:50.44]犯着不同的罪 \n[01:51.77]我能决定谁对 \n[01:53.15]谁又该要沉睡 \n[01:54.53]争论不能解决 \n[01:55.76]在永无止境的夜 \n[01:57.35]关掉你的嘴 \n[01:58.69]唯一的恩惠 \n[01:59.88]挡在前面的人都有罪 \n[02:01.18]后悔也无路可退 \n[02:02.64]以父之名判决 \n[02:03.96]那感觉没有适合词汇 \n[02:05.59]就像边笑边掉泪 \n[02:07.04]凝视着完全的黑 \n[02:08.42]阻挡悲剧蔓延的悲剧会让我沉醉 \n[02:10.72]低头亲吻我的左手 \n[02:12.17]换取被宽恕的承诺 \n[02:13.50]老旧管风琴在角落 \n[02:14.93]一直一直一直伴奏 \n[02:16.25]黑色帘幕被风吹动 \n[02:17.66]阳光无言地穿透 \n[02:19.18]洒向那群被我驯服后的 兽 \n[02:21.88]沉默地喊叫沉默地喊叫 \n[02:23.55]孤单开始发酵 \n[02:24.88]不停对着我嘲笑 \n[02:26.29]回忆逐渐燃烧 \n[02:27.66]曾经纯真的画面 \n[02:28.77]残忍地温柔出现 \n[02:30.21]脆弱时间到 \n[02:31.33]我们一起来祷告 \n[02:32.95]仁慈的父我已坠入 \n[02:35.73]看不见罪的国度 \n[02:38.77]请原谅我的自负 \n[02:41.68] \n[02:43.77]没人能说没人可说 \n[02:46.59]好难承受 \n[02:48.67]荣耀的背后刻着一道孤独 \n[02:52.52] \n[02:54.66]闭上双眼我又看见 \n[02:57.67]当年那梦的画面 \n[03:00.59]天空是蒙蒙的雾 \n[03:03.56] \n[03:05.76]父亲牵着我的双手 \n[03:08.66]轻轻走过 \n[03:10.67]清晨那安安静静的石板路 \n[03:14.58] \n[03:46.34]低头亲吻我的左手 \n[03:47.88]换取被宽恕的承诺 \n[03:49.21]老旧管风琴在角落 \n[03:50.68]一直一直一直伴奏 \n[03:52.21]黑色帘幕被风吹动 \n[03:53.55]阳光无言地穿透 \n[03:54.88]洒向那群被我驯服后的 兽 \n[03:57.56]沉默地喊叫沉默地喊叫 \n[03:59.21]孤单开始发酵 \n[04:00.68]不停对着我嘲笑 \n[04:01.77]回忆逐渐燃烧 \n[04:03.33]曾经纯真的画面 \n[04:04.54]残忍地温柔出现 \n[04:05.69]脆弱时间到 \n[04:06.88]我们一起来祷告 \n[04:08.65]仁慈的父我已坠入 \n[04:11.90]看不见罪的国度 \n[04:14.58]请原谅我的自负 \n[04:17.97] \n[04:19.88]没人能说没人可说 \n[04:22.85]好难承受 \n[04:24.66]荣耀的背后刻着一道孤独 \n[04:27.67] \n[04:30.84]仁慈的父我已坠入 \n[04:36.44]看不见罪的国度 \n[04:42.07]请原谅我 我的自负 \n[04:47.36]刻着一道孤独 \n[04:52.74]仁慈的父我已坠入 \n[04:55.56]看不见罪的国度 \n[04:58.28]请原谅我的自负 \n[05:01.75] \n[05:03.58]没人能说没人可说 \n[05:06.49]好难承受 \n[05:08.66]荣耀的背后刻着一道孤独 \n[05:12.29] \n[05:14.32]那斑驳的家徽 我擦拭了一夜(闭上双眼我又看见) \n[05:17.45]孤独的光辉 我才懂的感觉(当年那梦的画面) \n[05:20.13]烛光 不 不 停的 摇晃(天空是蒙蒙的雾) \n[05:22.41]猫头鹰在 窗棂上 对著远方眺望 \n[05:25.50]通向 大厅的长廊 (父亲牵着我的双手) \n[05:28.42]一样 说不出的沧桑(轻轻走过)', '2022-02-15 09:57:47', '2022-03-17 15:42:43');
INSERT INTO `zy_web_music` VALUES ('ac970ad47f88a1f35c5087f025ae0602', '这一路走来 (cover: 杨宗纬) - 竹之颜', '杨宗纬', 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_150691890&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3', 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', NULL, '2022-02-15 09:55:33', '');
INSERT INTO `zy_web_music` VALUES ('c3749d3af4388e412bcc15f54aff1e08', '听妈妈的话', '周杰伦', 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_138243&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3', 'http://img1.kuwo.cn/star/starheads/240/42/97/3914752958.jpg', '[00:11.64]小朋友 你是否有很多问号 \n[00:14.26]为什么 别人在那看漫画 \n[00:16.89]我却在学画画 对这钢琴说话 \n[00:19.37]别人在玩游戏 我却靠在墙壁背我的ABC \n[00:22.38]我说我要一架大大的飞机 \n[00:24.91]我却得到一只旧旧螺旋机 \n[00:27.48]为什么要听妈妈的话 \n[00:29.79]长大后你就会开始懂得这段话 哼 \n[00:32.26]长大后我开始明白 \n[00:35.23]为什么我 跑得比别人快 \n[00:36.64]飞得比别人高 \n[00:37.88]将来大家看的都是我画的漫画 \n[00:40.23]大家唱的都是 我写的歌 \n[00:42.95]妈妈的辛苦 不让你看见 \n[00:45.57]温暖的事都在她心里面 \n[00:48.01]有空就得多摸摸她的手 \n[00:50.70]把手牵着一起梦游 \n[00:53.10]听妈妈的话 别让她受伤 \n[01:03.14]想快快长大 才能保护她 \n[01:12.93]美丽的白发 幸福中发芽 \n[01:23.96]天使的魔法 温暖中慈祥 \n[01:34.43]在你的未来 音乐是你的王牌 \n[01:36.21]那王牌谈的恋爱 \n[01:37.68]而我不想把你教坏 \n[01:39.21]还是听妈妈的话吧 \n[01:40.52]晚点在恋爱吧 \n[01:41.96]我知道你未来的路 \n[01:44.09]干嘛比我更清楚 \n[01:45.40]你因为太多学习的同学 \n[01:46.53]在这块写东写西 \n[01:47.50]但我建议最好听妈妈 \n[01:49.10]我会用功读书 \n[01:50.23]用功读书怎么会从我嘴巴说出 \n[01:52.34]不想你输所以要叫你用功读书 \n[01:55.47]妈妈挑给你的毛病你要好好的收着 \n[01:57.56]因为不知道是我要告诉她我还留着 \n[01:59.91]对了 我会遇到了周润发 \n[02:02.31]所以你可以跟同学炫耀 \n[02:03.38]赌神未来是你爸爸 \n[02:04.47]我找不到你写的情书 \n[02:06.94]你喜欢的要承认 \n[02:08.02]因为我会了解你会在操场上牵她 \n[02:09.40]你会开始喜欢唱流行歌 \n[02:12.81]因为张学友开始准备唱吻别 \n[02:15.43]听妈妈的话 别让她受伤 \n[02:26.22]想快快长大 才能保护她 \n[02:36.16]美丽的白发 幸福中发芽 \n[02:46.66]天使的魔法 温暖中慈祥 \n[02:56.68]听妈妈的话 别让她受伤 \n[03:07.46]想快快长大 才能保护她 \n[03:17.27]长大后我开始明白 为什么我 \n[03:20.81]跑得比别人快 飞得比别人高 \n[03:22.56]将来大家看的都是我画的漫画 \n[03:25.52]大家唱的都是我写的歌 \n[03:28.31]妈妈的辛苦她不让你看见 \n[03:30.72]温暖的事都在她心里面 \n[03:33.31]有空就得多摸摸她的手 \n[03:36.15]把手牵着一起梦游 \n[03:38.34]听妈妈的话 别让她受伤 \n[03:48.72]想快快长大 才能保护她 \n[03:59.10]美丽的白发 幸福中发芽 \n[04:09.32]天使的魔法 温暖中慈祥', '2022-02-15 09:56:25', '');
INSERT INTO `zy_web_music` VALUES ('e3e8169837405aa27858ef31697460c8', '安静', 'Lawrence', 'http://f3.htqyy.com/play9/236/mp3/6', '', NULL, '2022-02-15 09:54:43', '');

-- ----------------------------
-- Table structure for zy_web_site_info
-- ----------------------------
DROP TABLE IF EXISTS `zy_web_site_info`;
CREATE TABLE `zy_web_site_info`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ID',
  `avatar` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '网站主页头像',
  `slogan` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '主页的标语',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '网站名称',
  `domain` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '个人主页',
  `notice` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '网站通知',
  `psc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '网站描述',
  `insertTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `updateTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of zy_web_site_info
-- ----------------------------
INSERT INTO `zy_web_site_info` VALUES ('2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxqAy0WbzjwGQbMhTMWzTn15sJ_aP8e3aO2A&usqp=CAU', 'The way up is not crowded, and most chose ease. ', 'ZY′blog', '', '人生天地间，皆为过客。', '一个It技术的探索者', '2022-03-17', '2022-03-17 15:51:10');

-- ----------------------------
-- Table structure for zy_web_socials
-- ----------------------------
DROP TABLE IF EXISTS `zy_web_socials`;
CREATE TABLE `zy_web_socials`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ID',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '社交方式名称',
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '方式的图标',
  `color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图标颜色',
  `href` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '社交跳转地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of zy_web_socials
-- ----------------------------
INSERT INTO `zy_web_socials` VALUES ('1', 'QQ', 'iconqq', '#1AB6FF ', NULL);
INSERT INTO `zy_web_socials` VALUES ('2', '微信', 'icon-weixin', '#00c800 ', NULL);
INSERT INTO `zy_web_socials` VALUES ('3', 'Gitee', 'icongitee', '#d81e06', NULL);
INSERT INTO `zy_web_socials` VALUES ('4', 'GitHub', 'icongithub', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
