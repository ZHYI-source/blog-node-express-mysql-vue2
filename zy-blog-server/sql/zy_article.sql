/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50736
 Source Host           : localhost:3306
 Source Schema         : zy-blog

 Target Server Type    : MySQL
 Target Server Version : 50736
 File Encoding         : 65001

 Date: 11/02/2022 17:48:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for zy_article
-- ----------------------------
DROP TABLE IF EXISTS `zy_article`;
CREATE TABLE `zy_article`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章id',
  `isPublish` int(1) NULL DEFAULT NULL COMMENT '是否发布',
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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
