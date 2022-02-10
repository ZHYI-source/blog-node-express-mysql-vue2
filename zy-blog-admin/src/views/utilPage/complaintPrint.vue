<template>
  <div>
    <div class="printTable">
      <div class="table">
        <div class="title">投诉处理单</div>
        <div class="sub-title-1">{{formData.orgName + formData.id}}号</div>
        <div class="sub-table">
          <label>驾驶员姓名</label>
          <div>{{formData.driverName}}</div>
          <label>驾驶员资格证号</label>
          <div>{{formData.idCard}}</div>
          <label>时间</label>
          <div>{{tempDate}}</div>
          <label>地点</label>
          <div>{{formData.oncar}}</div>
          <label>车号</label>
          <div>{{formData.plateNo}}</div>
          <label>经办人</label>
          <div>{{formData.dealNickName}}</div>
        </div>
        <div class="sub-title-2">问题内容</div>
        <div class="info">{{formData.complaintContent}}</div>
        <div class="sub-title-2">处理过程</div>
        <div class="info">{{formData.replyInfo}}</div>
        <div class="sub-title-2">处理结果</div>
        <div class="info">{{formData.superReplyInfo}}</div>
        <div class="last">
          <div class="name">驾驶员签字：</div>
          <div class="date">日期：</div>
        </div>
      </div>
      <div class="dotted">---------------------------------------------按虚线撕开---------------------------------------------</div>
      <div class="table">
        <div class="title">投诉处理单</div>
        <div class="sub-title-1">{{formData.orgName + formData.id}}号</div>
        <div class="sub-table">
          <label>驾驶员姓名</label>
          <div>{{formData.driverName}}</div>
          <label>驾驶员资格证号</label>
          <div>{{formData.idCard}}</div>
          <label>时间</label>
          <div>{{tempDate}}</div>
          <label>地点</label>
          <div>{{formData.oncar}}</div>
          <label>车号</label>
          <div>{{formData.plateNo}}</div>
          <label>经办人</label>
          <div>{{formData.dealNickName}}</div>
        </div>
        <div class="sub-title-2">问题内容</div>
        <div class="info">{{formData.complaintContent}}</div>
        <div class="sub-title-2">处理过程</div>
        <div class="info">{{formData.replyInfo}}</div>
        <div class="sub-title-2">处理结果</div>
        <div class="info">{{formData.superReplyInfo}}</div>
        <div class="last">
          <div class="name">驾驶员签字：</div>
          <div class="date">日期：</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tools from '../../utils/tool'
export default {
	props: {
		formData: {
			type: Object
		}
	},
 mounted() {
   this.tempDate = Tools.fmtLong2DateTime(this.formData.complaintTime)
  },
  data() {
		return {
      tempDate:''
    };
	},
	filters: {
		fmtAddr(val){
			return val.length>10? val.substring(0, 10) + '...': val;
		}
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.printTable {
	font-size: 14px;
	position: relative;

	.table {
		width: 700px;
		border: 1px solid #000000;
		.title {
			font-size: 19px;
			font-weight: bold;
			letter-spacing: 2px;
			padding: 4px 8px;
			text-align: center;
			border: 1px solid #000000;
		}
		.sub-title-1 {
			padding: 4px 8px;
			text-align: right;
			border: 1px solid #000000;
		}
		.sub-table {
			display: grid;
			grid-template-columns: 18% 32% 18% 32%;
			box-sizing: border-box;

			> * {
				background-color: #fff;
				padding: 4px 8px;
				box-sizing: border-box;
				border: solid 1px #000000;
				text-align: center;
			}
		}
		.sub-title-2 {
			padding: 4px 8px;
			font-weight: bold;
			text-align: left;
			border: 1px solid #000000;
		}
		.info {
			text-indent: 20px;
			padding: 4px 8px;
			border: 1px solid #000000;
			min-height: 20px;
		}
		.last {
			padding: 4px 8px;
			display: flex;
			text-align: right;
			border: 1px solid #000000;
			.name {
				margin-left: 350px;
			}
			.date {
				margin-left: 120px;
			}
		}
	}
	.dotted {
		height: 40px;
		margin-top: 30px;
		color: #666666;
	}
}
</style>
