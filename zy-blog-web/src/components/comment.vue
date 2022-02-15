<template>
    <div class="comment" :key="`comment${comment.id}`">
        <div class="comment-head">
            <div class="user-avatar"><img :src="comment.fromUserAvatar" alt=""></div>
            <div class="head-right">
                <section-title>
                    <div style="display: flex;align-items: center;justify-content: space-between;">
                        <div>
                            <span class="from-user user-name">{{comment.fromUserName}}</span>
                            <span class="to-user" v-if="comment.toUserId"><span style="margin: 0 5px;">@</span><span
                                    class="user-name">{{comment.toUserName}}</span></span>
                        </div>
                        <div style="font-size: 13px;">
                            <span style="color: #9c9c9c;margin-right: 20px;">{{comment.createTime}}</span>
                            <span @click.stop="showCommentEditor=true" style="cursor: pointer;">回复</span>
                        </div>
                    </div>
                </section-title>
            </div>
        </div>
        <div class="comment-body">
            <div class="content-text">
                <p v-html="comment.content || '还没有评论，快来评论吧'"></p>
            </div>
            <div v-if="showCommentEditor" @click.stop="">
                <comment-message-editor :key="form.content" :inline="true" buttonText="回复" @submit="submitReply"></comment-message-editor>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import sectionTitle from '@/components/section-title'
    import commentMessageEditor from 'comment-message-editor'
    import {getCreateComment} from "../api/web-blog";

    export default {
        name: "comment",
        props: {
            comment: {
                type: Object,
            }
        },
        data() {
            return {
                form: {},
                showCommentEditor: false
            }
        },
        created() {
            this.form = this.comment || {}
        },
        watch: {
            showCommentEditor(value) {
                if (value) {
                    document.body.addEventListener('click', this.close)
                } else {
                    document.body.removeEventListener('click', this.close)
                }
            }
        },
        components: {
            sectionTitle,
            commentMessageEditor
        },
        methods: {
            reply(id) {
                const ref = `comment${id}`
            },
            submitReply(v) {
                // console.log(v)
                console.log('this.comment', this.form)
                let p = {
                    postId: this.form.postId,//文章id
                    parentId: this.form.id,//父级id
                    fromUserId: '',//用户ID
                    fromUserName: '匿名2',//用户名称
                    fromUserAvatar: 'http://114.117.164.181:5220/zy-server/public/images?id=164466183089025c842ff5fae3.jpg',//用户头像
                    content: v || '',//评论内容
                    toUserId: this.form.fromUserId,//回复对象ID
                    toUserName: this.form.fromUserName,//回复对象名称
                    toUserAvatar: this.form.fromUserAvatar,//回复对象头像
                }
                if (this.form.toUserId) {
                    p.parentId=this.form.parentId
                }

                getCreateComment(p).then(res => {
                    this.$message({
                        message: '回复成功！',
                        type: 'success'
                    });
                    this.showCommentEditor=false //隐藏输入框
                    this.$emit('reply',this.form.postId)
                })
            },
            close() {
                this.showCommentEditor = false
            }
        }
    }
</script>

<style scoped lang="less">
    .comment {
        margin: 20px 0;
    }

    .comment-head {
        display: flex;

        .head-right {
            flex: 1;
        }

        .user-name {
            color: #8fd0cc;
        }
    }

    .comment-body {
        padding-left: 80px;

        .content-text {
            /*padding-bottom: 30px;*/
            margin-bottom: 30px;
            font-size: 14px;
            color: #9c9c9c;
            line-height: 1.3rem;
        }
    }

    .user-avatar {
        width: 50px;
        height: 50px;
        margin-right: 30px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }

    @media (max-width: 600px) {
        .comment-body {
            padding-left: 15px;

            .content-text {
                margin-top: 10px;
            }
        }

        .user-avatar {
            margin-right: 10px;
        }
    }
</style>
