<template>
    <div class="gx-view-html" v-html="content">

    </div>
</template>

<script>
    export default {
        name: "mk-view-html",
        props: {
            html: {
                type: String,
                default() {
                    return '';
                }
            }
        },
        created() {

        },
        methods: {
            loadContent() {
                let html = this.html || '';
                //对多个table进行处理
                if (/<\/?table.*?>/g.test(html)) {
                    //html.match(/<table.*?<\/table>/gi)
                    let matchArr = html.match(/<table(?:(?!<\/?table)[\s\S])*<\/table>/gi);//得到table标签
                    //对多个table进行处理
                    if (matchArr !== null) {
                        for (let matchItem of matchArr) {
                            html = html.replace(matchItem, `<div class="fwb-table">${matchItem}</div>`);
                        }
                    }
                }
                const regex = new RegExp('<img', 'gi');
                html = html.replace(new RegExp(/font-size:.*?;/g), '');
                html = html.replace(new RegExp(/font-family:.*?;/g), '');
                html = html.replace(new RegExp(/line-height:.*?;/g), '');
                html = html.replace(new RegExp(/white-space:.*?;/g), '');
                this.content = html.replace(regex, `<img style="max-width: 100%; height: auto"`);
            }
        },
        watch: {
            html() {
                this.loadContent();
            }
        },
        data() {
            return {
                content: ''
            }
        }
    }
</script>

<style lang="scss">
    p, span {
        word-break: break-all !important;
    }

    .gx-view-html {
        line-height: 28px;
        font-size: 12px;
        text-align: left;
        word-break: break-all !important;
        border: 1px solid $color-border-2;
        border-radius: 4px;
        padding: 5px;
        color: #768189;
        overflow: hidden;

        p, span, div, td, a {
            word-break: break-all;
        }
    }

    .fwb-table {
        border: 1px solid rgba(233, 238, 242, 1);
        padding: 0 22px;

        table {
            width: 100% !important;

            tr:not(:last-of-type) {
                border-bottom: 1px solid rgba(233, 238, 242, 1);
            }

            td {
                color: #3D4349;

                p {
                    min-height: 50px;
                    line-height: 50px;
                }
            }

            .firstRow {

                td {
                    color: #A9B4BC;

                    p {
                        min-height: 40px;
                        line-height: 40px;
                    }
                }
            }

        }
    }

</style>
