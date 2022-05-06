//文本过滤方法
import util from './tool';

const TxtFilterMixin = {
    data() {
      return {
        dic: {
          payType: [
            {
              key: 0,
              val: '农掌银'
            },
            {
              key: 1,
              val: '支付宝'
            },
            {
              key: 2,
              val: '微信'
            },
            {
              key: 3,
              val: '翼支付'
            }],
          payChanel: [
            {
              key: 1,
              val: '翼支付',
            },
            {
              key: 2,
              val: '农行',
            },
            {
              key: 4,
              val: '招行',
            }
          ]
        },
        P: {
          //英文和数字
          plate: /^[a-zA-Z0-9]+$/
        }
      };
    },
    filters: {
      fmtTime(val, str) {
        if (val === '' || val === null || val === undefined) {
          return '';
        }
        let fmt = 'yyyy-MM-dd hh:mm:ss';
        if (str) {
          fmt = str;
        }
        return util.fmtLong2DateTime(parseInt(val), fmt);
      },
      fmtMoney(val) {
        if (val === '' || val === null || val === undefined) {
          return '0.00元';
        }
        let v = val / 100.0;
        return util.fmtVal2Money(v) + '元';//this.fmtVal2Money(v);
      },
      fmtPayType(val) {
        if (val === null) {
          return '';
        }
        switch (val) {
          case 0: {
            return '农掌银';
          }
          case 1: {
            return '支付宝';
          }
          case 2: {
            return '微信';
          }
          case 3: {
            return '翼支付';
          }
        }
      },
      fmtPayState(val) {
        if (val === null) {
          return '';
        }
        switch (val) {
          case 1: {
            return '未支付';
          }
          case 2: {
            return '失败';
          }
          case 3: {
            return '成功';
          }
          case 4: {
            return '退款';
          }
        }
      },
      fmtPayChanel(val) {
        if (val === null) {
          return '';
        }
        switch (val) {
          case 1: {
            return '翼支付';
          }
          case 2: {
            return '农行';
          }
          case 4: {
            return '招行';
          }
        }
      },
      fmtPayStatus(val) {
        if (val === null) {
          return '';
        }
        switch (val) {
          case 0: {
            return '未上线';
          }
          case 1: {
            return '已上线';
          }
          case 2: {
            return '已激活';
          }
        }
      },
      fmtRewardState(val) {
        if (val === null) {
          return '';
        }
        switch (val) {
          case 1: {
            return '红包';
          }
          case 2: {
            return '任务';
          }
          case 3: {
            return '提现';
          }
        }
      },
      fmtSetState(val) {
        if (val === null) {
          return '';
        }
        switch (val) {
          case 0: {
            return '未领取';
          }
          case 1: {
            return '已领取';
          }
        }
      }
    },
    computed: {},
    methods: {
      objEmpty(val) {
        if (val === null || val === undefined || val === '') {
          return true;
        }
        let ret = JSON.stringify(val) === "{}";
        return ret;
      },
      strEmpty(val) {
        if (val === null || val === undefined || val === '') {
          return true;
        }
        return false;
      },
      tableHight() {
        if (this.$refs.ztable) {
          return this.$refs.ztable.clientHeight - this.$refs.ztable.clientTop - 20;
        }
      },
      doPrint(title, html) {
        let openWindow = window.open('', title, 'height=800, width=800,scrollbars=yes,menubar=yes,toolbar=yes');
        let text =
          '<html>' +
          '<head>' +
          '<title>' +
          title +
          '</title>' +
          '<script type="text/javascript"> function printOrder(){window.print();};</script>' +
          '<style>' +
          ' .printTable {' +
          '      font-size: 14px;' +
          '      position: relative;' +
          '    }' +

          '.table{' +
          '	width: 700px;' +
          '	border: 1px solid #000000;' +
          '}' +
          '	.title{' +
          '		font-size: 19px;' +
          '		font-weight: bold;' +
          '		letter-spacing: 2px;' +
          '		padding: 4px 8px;' +
          '		text-align: center;' +
          '		border: 1px solid #000000;' +
          '	}' +
          '	.sub-title-1{' +
          '		padding: 4px 8px;' +
          '		text-align: right;' +
          '		border: 1px solid #000000;' +
          '	}' +
          '	.sub-table{' +
          '		display: grid;' +
          '        grid-template-columns: 20% 30% 20% 30%;' +
          '        box-sizing: border-box;' +
          '	}' +
          '	.sub-table	> * {' +
          '            background-color: #fff;' +
          '            padding: 4px 8px;' +
          '            box-sizing: border-box;' +
          '            border: solid 1px #000000;' +
          '			text-align: center;' +
          '        }' +

          '	.sub-title-2{' +
          '		padding: 4px 8px;' +
          '		font-weight: bold;' +
          '		text-align: left;' +
          '		border: 1px solid #000000;' +
          '	}' +
          '	.info{' +
          '		text-indent: 20px;' +
          '		padding: 4px 8px;' +
          '		border: 1px solid #000000;' +
          '		min-height: 20px;' +
          '	}' +
          '	.last{' +
          '		padding: 4px 8px;' +
          '		display: flex;' +
          '		text-align: right;' +
          '		border: 1px solid #000000;' +
          '	}' +
          '		.name{' +
          '			margin-left: 350px;' +
          '		}' +
          '		.date{' +
          '			margin-left: 120px;' +
          '		}' +
          '.dotted{' +
          '	height: 40px;' +
          '	margin-top: 30px;' +
          '	color: #666666;' +
          '}' +

          '</style>' +
          '</head>' +
          '<body>' +
          html +
          '</body>' +
          '</html>';
        openWindow.document.write(text);
        openWindow.printOrder();
      }
    }
  }
;
export default TxtFilterMixin;
