<style lang="scss" src="@/assets/css/app.scss"></style>
<template>
  <div class="app-table">
    <complaint-group :groupData="complaintData" ref="complaintGroupId" />
    <div class="app-table-query" v-if="listButton">
      <el-input v-model="queryList.params.orgName" placeholder="组织机构" size="mini" @focus="treeForm = true"></el-input>
      <el-input v-model="queryList.params.plateNo" placeholder="车牌号" size="mini"></el-input>
      <el-input v-model="queryList.params.driverName" placeholder="司机姓名" size="mini"></el-input>
      <el-input v-model="queryList.params.id" placeholder="案件编号" size="mini"></el-input>
      <el-input v-model="queryList.params.userNickName" placeholder="投诉判定人" size="mini"></el-input>
      <el-input v-model="queryList.params.content" placeholder="投诉内容模糊查询" size="mini"></el-input>
    </div>
    <div class="app-table-query" v-if="listButton">
      <el-select size="mini" v-model="queryList.params.status" placeholder="投诉状态">
        <el-option label="全部" value="全部"></el-option>
        <el-option label="待判定" :value="0"></el-option>
        <el-option label="待通知" :value="1"></el-option>
        <el-option label="待申诉" :value="2"></el-option>
        <el-option label="待处理" :value="3"></el-option>
        <el-option label="待结案" :value="4"></el-option>
        <el-option label="已结案" :value="5"></el-option>
        <el-option label="被退回" :value="-1"></el-option>
      </el-select>
      <el-select size="mini" v-model="queryList.params.caseSrc" placeholder="案件来源">
        <el-option label="12345" value="12345"></el-option>
        <el-option label="筑翼行" value="筑翼行"></el-option>
      </el-select>
      <el-select size="mini" v-model="queryList.params.caseType" placeholder="案件类型">
        <el-option label="全部" value="全部"></el-option>
        <el-option label="投诉" value="投诉"></el-option>
        <el-option label="求助" value="求助"></el-option>
        <el-option label="举报" value="举报"></el-option>
        <el-option label="寻物" value="寻物"></el-option>
        <el-option label="补充案卷" value="补充案卷"></el-option>
        <el-option label="内部监督" value="内部监督"></el-option>
        <el-option label="表扬" value="表扬"></el-option>
        <el-option label="危险驾驶" value="危险驾驶"></el-option>
      </el-select>
      <el-select size="mini" v-model="queryList.params.result" placeholder="处理结果">
        <el-option label="全部" value="全部"></el-option>
        <el-option label="待查案件" value="待查案件"></el-option>
        <el-option label="非投诉" value="非投诉"></el-option>
        <el-option label="无效投诉" value="无效投诉"></el-option>
        <el-option label="无责投诉" value="无责投诉"></el-option>
        <el-option label="有责投诉" value="有责投诉"></el-option>
        <el-option label="重复投诉" value="重复投诉"></el-option>
      </el-select>
      <el-date-picker
        v-model="stet"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期" size="mini">
      </el-date-picker>
      <el-button size="mini" icon="el-icon-search" @click="handleFilter()">查询</el-button>
      <el-button @click="doExcelExport" size="mini" icon="el-icon-document" v-if="exportButton">导出</el-button>
      <el-upload
        class="upload-demo"
        accept=".xlsx,.xls"
        :show-file-list="false"
        action="/taxi-file/fileserver/upload/v2"
        :before-upload="beforeImport"
        :on-success="onSuccess"
        :on-progress="onProgress"
        :on-error="onError">
        <el-button size="mini" icon="el-icon-document" v-if="importButton">
          导入
        </el-button>
      </el-upload>
    </div>
    <div class="app-table-contain">
      <div style="height: 100%;" ref="ztable">
        <el-table
          v-loading="loading" :element-loading-text="loadingText"
          :data="tableData.records" :stripe="true" border
          stripe
          style="width: 100%;"
          :header-cell-style="{
                        'text-align': 'center',
                        'background-color': '#f0f4fb',
                        'color': '#23262b',
                        'font-size': '14px'}">
          <el-table-column prop="id" label="用工ID" width="180" align="center">
          </el-table-column>
          <el-table-column prop="id" label="任务ID" width="180" align="center">
          </el-table-column>
          <el-table-column prop="caseSrc" label="任务名称" width="100" align="center">
          </el-table-column>
          <el-table-column prop="complaintContent" label="任务内容" width="400"  align="center">
          </el-table-column>
          <el-table-column prop="complaintContent" label="任务预算" width="400"  align="center">
          </el-table-column>
          <el-table-column prop="orgName" label="需求公司" width="300" align="center">
          </el-table-column>
          <el-table-column prop="decideNickName" label="任务分派人" width="300" align="center">
            <template slot-scope="scope">
              <div :style="{'color':scope.row.decideNickName? '#191970':'#C0CFCF'}">
                {{scope.row.decideNickName | fmtDecideName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="plateNo" label="用户" width="100" align="center">
          </el-table-column>
          <el-table-column prop="driverTel" label="用户手机号" width="150" align="center">
          </el-table-column>
          <el-table-column prop="idCard" label="用户身份证" width="180" align="center">
          </el-table-column>
          <el-table-column prop="complaintTime" label="任务发起时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.complaintTime | fmtTime }}
            </template>
          </el-table-column>
          <el-table-column prop="userTel" label="联系人手机号" width="180" align="center">
          </el-table-column>

          <el-table-column prop="endTm" label="任务截止时间" width="180" align="center">
            <template slot-scope="scope">
              {{scope.row.endTm | fmtTime }}
            </template>
          </el-table-column>
          <el-table-column prop="caseType" label="任务类型" width="180" align="center">
          </el-table-column>
          <el-table-column align="center" label="任务状态" width="100" fixed="right">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status === 0 || scope.row.status === 1 || scope.row.status === -1"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="warning" v-if="scope.row.status === 2"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="primary" v-if="scope.row.status === 3"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="info" v-if="scope.row.status === 4"> {{ scope.row.statusDesc }} </el-tag>
              <el-tag type="success" v-if="scope.row.status === 5"> {{ scope.row.statusDesc }} </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" fixed="right" class-name="small-padding fixed-width" width="250px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-document" v-if="operateButton"
                           @click="handleOperate(scope.row)">操作
                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-document" v-if="changeButton"
                           @click="handleChange(scope.row)">修改
                </el-button>
                <el-button size="mini" type="primary" icon="el-icon-document"
                           v-if="(scope.row.status === 1 || scope.row.status === 5) && backButton"
                           @click="handleBack(scope.row)">回退
                </el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" v-if="deleteButton"
                           @click="handleDelete(scope.row)">删除
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="handleFilter"
        :total="tableData.total" :current-page.sync="tableData.current" :page-size="tableData.size"
        style="flex-shrink: 0;padding: 10px">
      </el-pagination>
    </div>
    <el-dialog title="投诉详情" :visible.sync="operateForm" :close-on-press-escape="false" :close-on-click-modal="false"
               v-loading="operateLoading" element-loading-text="加载中。。。">
      <el-form  ref="dataForm" :model="operateList" :rules="statusRules" label-width="100px" size="mini" style="margin: 20px 30px 40px 10px"
                @submit.native.prevent :hide-required-asterisk="true">
        <el-form-item label="投诉编号" prop="id" >{{ operateList.id }}</el-form-item>
        <el-form-item label="车牌号码" prop="plateNo"
                      v-if="operateList.status === 0 || operateList.status === 1 || operateList.status === -1">
          <el-input v-model="operateList.plateNo" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="车牌号码" prop="plateNo" v-else>
          {{ operateList.plateNo }}
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard"
                      v-if="operateList.status === 0 || operateList.status === 1 || operateList.status === -1">
          <el-input v-model="operateList.idCard" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="司机姓名" prop="driverName"
                      v-if="operateList.status === 0 || operateList.status === 1 || operateList.status === -1">
          <el-input v-model="operateList.driverName" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="司机姓名" prop="driverName" v-else>
          {{ operateList.driverName }}
        </el-form-item>
        <el-form-item label="所属公司" prop="orgName" >{{ operateList.orgName }}</el-form-item>
        <el-form-item label="司机手机" prop="driverTel"
                      v-if="operateList.status === 0 || operateList.status === 1 || operateList.status === -1">
          <el-input v-model="operateList.driverTel" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="司机手机" prop="driverTel" v-else>
          {{ operateList.driverTel }}
        </el-form-item>
        <el-form-item label="投诉状态" prop="statusDesc" >
          <el-tag type="danger"
                  v-if="operateList.status === 0 || operateList.status === 1 || operateList.status === -1" style="margin-right: 20px;">
            {{ operateList.statusDesc }}
          </el-tag>
          <el-tag type="warning" v-if="operateList.status === 2" style="margin-right: 20px;"> {{ operateList.statusDesc }} </el-tag>
          <el-tag type="primary" v-if="operateList.status === 3" style="margin-right: 20px;"> {{ operateList.statusDesc }} </el-tag>
          <el-tag type="info" v-if="operateList.status === 4" style="margin-right: 20px;"> {{ operateList.statusDesc }} </el-tag>
          <el-tag type="success" v-if="operateList.status === 5" style="margin-right: 20px;"> {{ operateList.statusDesc }} </el-tag>
        </el-form-item>
        <el-form-item label="提交时间" prop="complaintTime" >{{ operateList.complaintTime | fmtTime }}</el-form-item>
        <el-form-item label="上车地点" prop="oncar"
                      v-if="operateList.status === 0 || operateList.status === 1 || operateList.status === -1" >
          <el-input v-model="operateList.oncar " style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="上车地点" prop="oncar" v-else>
          {{ operateList.oncar }}
        </el-form-item>

        <el-form-item label="上车时间" prop="oncarTime"
                      v-if="operateList.status === 0 || operateList.status === 1 || operateList.status === -1">
          <el-date-picker
            v-model="operateList.oncarTime" type="datetime" value-format="timestamp"
            placeholder="选择日期时间" style="width: 50%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上车时间" prop="oncarTime" v-else>
          {{ operateList.oncarTime | fmtTime }}
        </el-form-item>
        <el-form-item label="下车地点" prop="offcar"
                      v-if="operateList.status === 0 || operateList.status === 1 || operateList.status === -1">
          <el-input v-model="operateList.offcar " style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="下车地点" prop="offcar" v-else>
          {{ operateList.offcar }}
        </el-form-item>
        <el-form-item label="下车时间" prop="offcarTime"
                      v-if="operateList.status === 0 || operateList.status === 1 || operateList.status === -1">
          <el-date-picker
            v-model="operateList.offcarTime" type="datetime" value-format="timestamp"
            placeholder="选择日期时间" style="width: 50%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="下车时间" prop="offcarTime" v-else>
          {{ operateList.offcarTime | fmtTime}}
        </el-form-item>
        <el-form-item label="投诉类型" prop="sort" >{{ operateList.sort }}</el-form-item>
        <el-form-item label="案件类型" prop="feedback" >{{ operateList.feedback }}</el-form-item>
        <el-form-item label="乘客描述" prop="complaintContent" >
          <div style="width:80%;word-wrap:break-word">
            {{ operateList.complaintContent }}
          </div>
        </el-form-item>
        <el-form-item label="照片依据" prop="complaintContent" v-if="operateList.imageList">
          <div style="display: flex;flex-direction: row" >
            <div  v-for="item in operateList.imageList" style="margin-right: 1%" @click="enlarge(item)">
              <img
                style="width: 100px; height: 100px"
                :src="item"/>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="初步判定" prop="decideInfo" v-if="operateList.decideInfo" >
          <div style="width:80%;word-wrap:break-word">
            {{ operateList.decideTime | fmtTime }}
          </div>
          <div style="width:80%;word-wrap:break-word">
            {{ operateList.decideInfo }}
          </div>
        </el-form-item>
        <el-form-item label="司机申诉" prop="appealInfo" v-if="operateList.appealInfo" >
          <div style="width:80%;word-wrap:break-word">
            {{ operateList.appealTime | fmtTime }}
          </div>
          <div style="width:80%;word-wrap:break-word">
            {{ operateList.appealInfo }}
          </div>
        </el-form-item>
        <el-form-item label="通知司机" v-if="operateList.status !== 0">
          <div style="width:80%;display: flex">
            <el-tag type="warning" v-if="operateList.noticeStatus === 0" style="margin-right: 20px;"> {{ operateList.noticeStatusStr }} </el-tag>
            <el-tag type="success" v-if="operateList.noticeStatus === 1" style="margin-right: 20px;"> {{ operateList.noticeStatusStr }} </el-tag>
            <el-tag type="danger" v-if="operateList.noticeStatus === 2" style="margin-right: 20px;"> {{ operateList.noticeStatusStr }} </el-tag>
            <div style="margin-left: 5px" v-if="operateList.noticeTime">{{ operateList.noticeTime | fmtTime }}</div>
            <el-button size="mini" type="warning"
                       @click="handleAppeal" round
                       v-if="operateList.status === 2 && operateList.noticeStatus === 1 && appealButton"
                       style="margin-left: 20px">到场处理</el-button>
          </div>
          <div style="width:80%;word-wrap:break-word; color: #ff4d51">
            司机需在两个小时内发起申诉超时未发起申诉，默认为放弃申诉
          </div>
        </el-form-item>
        <el-form-item label="公司处理" prop="replyInfo" v-if="operateList.replyInfo" >
          <div style="width:80%;word-wrap:break-word">
            {{ operateList.replyTime | fmtTime }}
          </div>
          <div style="width:80%;word-wrap:break-word">
            {{ operateList.replyInfo }}
          </div>
        </el-form-item>
        <el-form-item label="处罚凭证" prop="voucherImgList" v-if="operateList.voucherImgList">
          <div style="display: flex;flex-direction: row" >
            <div  v-for="item in operateList.voucherImgList" style="margin-right: 1%" @click="enlarge(item)">
              <img
                style="width: 100px; height: 100px"
                :src="item"/>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="沟通录音" prop="soundRecordList"
                      v-if="operateList.soundRecordList && operateList.soundRecordList.length > 0">
          <div style="display: flex;flex-direction: row" >
            <div  v-for="(item,index) in operateList.soundRecordList"  :key="index" style="margin-right: 3%">
              <a style="text-decoration: underline; color: #152ef3" :href = 'item' download="file" title="下载" target="_blank">{{downloadName(index)}}</a>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="结案处理" prop="superReplyInfo" v-if="operateList.superReplyInfo" >
          <div style="width:80%;word-wrap:break-word">
            {{ operateList.superReplyTime | fmtTime }}
          </div>
          <div style="width:80%;word-wrap:break-word">
            {{ operateList.superReplyInfo }}
          </div>
        </el-form-item>
        <el-form-item label="处罚通知书" prop="voucherImg" v-if="operateList.noticeImg" >
          <img
            style="width: 100px; height: 100px"
            @click="enlarge(operateList.noticeImg)"
            :src="operateList.noticeImg"/>
        </el-form-item>
      </el-form>
      <div style="display: flex; width: 100%">
        <div style="display: flex; width: 100%; margin-bottom: 50px;margin-top: 20px">
          <el-button size="medium" type="primary"
                     @click="handleDecide"
                     v-if="(operateList.status === 0 || operateList.status === -1) && decideButton"
                     style="margin: auto">投诉科初步判定</el-button>
          <el-button size="medium" type="primary"
                     @click="handleSend"
                     v-if="operateList.status === 1 && sendButton"
                     style="margin: auto">通知司机</el-button>
          <el-button size="medium" type="success"
                     @click="handleDeal"
                     v-if="operateList.status === 2 && operateList.noticeStatus === 2 && dealButton"
                     style="margin: auto">确认处理</el-button>
          <el-button size="medium" type="success"
                     @click="handleDeal"
                     v-if="operateList.status === 3 && dealButton"
                     style="margin-left:35%">确认处理</el-button>
          <el-button size="medium" type="success"
                     @click="handlePass"
                     v-if="operateList.status === 4 && passButton"
                     style="margin-left:35%">结案处理</el-button>
          <el-button size="medium" type="warning"
                     @click="handlePrint" plain
                     v-if="operateList.status === 3 || operateList.status === 4"
                     style="margin-right: 10%">打印</el-button>
          <el-button size="medium" type="warning"
                     @click="handlePrint" plain
                     v-if="operateList.status === 5"
                     style="margin: auto">打印</el-button>
          <ComplaintPrint ref="complaintPrint" v-show="false" :form-data="operateList"></ComplaintPrint>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="修改投诉" :visible.sync="changeForm" v-loading="changeLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">
      <el-form ref="changeForm" :model="queryChange" :rules="changeRules" label-width="30%" size="mini" @submit.native.prevent
               :hide-required-asterisk="true">
        <el-form-item label="身份证号" prop="idCard" style="margin-top: 5%">
          <el-input v-model="queryChange.idCard" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="车牌号码" prop="plateNo" style="margin-top: 5%">
          <el-input v-model="queryChange.plateNo" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="司机姓名" prop="userRealName" style="margin-top: 5%">
          <el-input v-model="queryChange.userRealName" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="userTel" style="margin-top: 5%">
          <el-input v-model="queryChange.userTel" style="width: 50%;">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="changeData">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="退回提示" :visible.sync="backForm" v-loading="backLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">

      <div style="margin-top: 5%; margin-left: 5%">确定要退回这条投诉吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="backData">
          退回
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="删除提示" :visible.sync="deleteForm" v-loading="deleteLoading" width="30%"
               :close-on-click-modal="false"
               :show-close="false" element-loading-text="处理中。。。">

      <div style="margin-top: 5%; margin-left: 5%">确定要删除这条投诉吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteForm = false">
          取消
        </el-button>
        <el-button type="danger" @click="deleteData">
          删除
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="放大查看图片" :visible.sync="imgForm">
      <img
        style="width: 500px; height: 500px; display: flex;margin: auto"
        :src="showItem"/>
    </el-dialog>

    <el-dialog title="判定意见" :visible.sync="decideForm" :close-on-press-escape="false"
               :close-on-click-modal="false" :show-close="false" v-loading="decideLoading"
                element-loading-text="处理中。。。">
      <el-input
        type="textarea"
        maxlength="250"
        show-word-limit
        :rows="8"
        placeholder="请输入回复内容"
        v-model="queryDecide.replyInfo"
        style="width: 80%; margin-left: 10%; margin-top: 3%; margin-bottom: 2%">
      </el-input>
      <el-radio-group v-model="watchResult"
                      style="display: flex;flex-direction: column; margin-top: 3%; margin-left:10%; margin-bottom: 3%">
        <el-radio :label="0" style="margin-bottom: 3%">经核实，此投诉为有责投诉，请企业3日内处理完毕并反馈。</el-radio>
        <el-radio :label="1" style="margin-bottom: 3%">此案件，由企业自行处理，并在3日内上传结果、通话录音。</el-radio>
        <el-radio :label="2" style="margin-bottom: 3%">此投诉为无责投诉，请企业3日内与乘客解释后反馈。</el-radio>
        <el-radio :label="3" style="margin-bottom: 3%">此投诉待查，请企业3日内与乘客司机核实后处理反馈。</el-radio>
        <el-radio :label="4" style="margin-bottom: 3%">非投诉，请相关单位3日内处理并反馈。</el-radio>
        <el-radio :label="5" style="margin-bottom: 3%">重复投诉。</el-radio>
      </el-radio-group>
      <div v-if="showDealType">
        <div style="margin-left: 10%; margin-top: 3%; margin-bottom: 2%;color: #456074">非投诉处理方式</div>
        <el-radio-group v-model="queryDecide.dealType"
                        style="margin-top: 2%; margin-left:10%; margin-bottom: 3%">
          <el-radio :label="1" style="margin-bottom: 3%">大队处理</el-radio>
          <el-radio :label="2" style="margin-bottom: 3%">出租车公司处理</el-radio>
        </el-radio-group>
      </div>
      <div v-if="showLoginId" style="display: flex;flex-direction: row;margin-left: 12%;margin-bottom: 5%;text-align: center">
        <div style=" margin-right: 3%;margin-top: 1%">选择处理账号</div>
        <el-select v-model="queryDecide.loginId"  placeholder="请选择" size="mini" filterable>
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.userNickName"
            :value="item.userId"/>
        </el-select>
      </div>
      <div v-if="showDealOrg">
        <div style="margin-left: 10%; margin-top: 3%; margin-bottom: 2%;color: #456074">选择处理公司</div>
        <el-input v-model="queryDecide.dealOrgName" placeholder="请选择处理公司" size="mini"
                  @focus="dealTreeForm = true" clearable style="width: 60%; margin-top: 2%; margin-left: 10%; margin-bottom: 2%"></el-input>
      </div>
      <div v-if="showUser">
        <div style="margin-left: 10%; margin-top: 3%; margin-bottom: 2%;color: #456074">选择处理公司用户</div>
        <el-select v-model="queryDecide.loginId"  placeholder="请选择" size="mini"
                   filterable style="width: 60%; margin-top: 2%; margin-left: 10%; margin-bottom: 2%">
          <el-option
            v-for="item in orgUserList"
            :key="item.userId"
            :label="item.userNickName"
            :value="item.userId"/>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDecide">
          取消
        </el-button>
        <el-button type="primary" @click="decideData">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="结案意见" :visible.sync="passForm" :close-on-press-escape="false"
               :close-on-click-modal="false" :show-close="false" v-loading="passLoading" element-loading-text="处理中。。。">
      <el-input
        type="textarea"
        maxlength="250"
        show-word-limit
        :rows="8"
        placeholder="请输入回复内容"
        v-model="queryPass.replyInfo"
        style="width: 80%; margin-left: 10%; margin-top: 3%; margin-bottom: 2%">
      </el-input>
      <div style="margin-left: 10%; margin-top: 3%; margin-bottom: 2%;color: #456074">上传处罚通知书</div>
      <el-upload
        class="avatar-uploader"
        action="/taxi-file/fileserver/upload/v2"
        style="margin-left: 10%; margin-top: 1%; margin-bottom: 5%; width: 30%"
        :limit="1"
        :on-exceed="handleNoticeExceed"
        :on-remove="handleNoticeRemove"
        :on-success="handlePassAvatarSuccess"
        :before-upload="beforePassUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i slot="trigger" v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div style="margin-left: 10%; margin-top: 5%; margin-bottom: 2%;color: #456074">反馈案件类型</div>
      <el-radio-group v-model="queryPass.feedback"
                      style="margin-left: 10%; margin-right: 10%;" @change="test">
        <el-radio label="投诉" style="margin-bottom: 2%;">投诉</el-radio>
        <el-radio label="求助" style="margin-bottom: 2%;">求助</el-radio>
        <el-radio label="举报" style="margin-bottom: 2%;">举报</el-radio>
        <el-radio label="寻物" style="margin-bottom: 2%;">寻物</el-radio>
        <el-radio label="补充案卷" style="margin-bottom: 2%;">补充案卷</el-radio>
        <el-radio label="内部监督" style="margin-bottom: 2%;">内部监督</el-radio>
        <el-radio label="表扬" style="margin-bottom: 2%;">表扬</el-radio>
        <el-radio label="危险驾驶" style="margin-bottom: 2%;">危险驾驶</el-radio>
      </el-radio-group>
      <div style="margin-left: 10%; margin-top: 5%; margin-bottom: 2%;color: #456074">投诉类型修改</div>
      <el-checkbox-group v-model="queryPass.sortInfo"
                         style="margin-left: 10%; margin-right: 10%;" @change="test">
        <el-checkbox label="绕路" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="拒载" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="服务态度差" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="不打表" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="拼车" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="吸烟" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="吃东西" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="打电话" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="甩客" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="议价" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="挑客" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="吐痰" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="疑表" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="预约但未履约" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="未按规提供票据" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="其他" style="margin-bottom: 2%;"></el-checkbox>
      </el-checkbox-group>
      <el-radio-group v-model="complaintType"
                      style="display: flex;flex-direction: column; margin-top: 3%; margin-left:10%; margin-bottom: 2%">
        <el-radio :label="1" style="margin-bottom: 5%">有责投诉</el-radio>
        <!--<el-checkbox-group v-model="queryPass.dealResultList"-->
                           <!--@change="resultListChange"-->
                           <!--style="margin-left: 6%; margin-top: 3%; margin-bottom: 5%">-->
          <!--<el-checkbox label="批评教育" :disabled="toDeal"></el-checkbox>-->
          <!--<el-checkbox label="罚款" :disabled="toDeal"></el-checkbox>-->
          <!--<el-checkbox label="扣分" :disabled="toDeal"></el-checkbox>-->
          <!--<el-checkbox label="停运" :disabled="toDeal"></el-checkbox>-->
        <!--</el-checkbox-group>-->
        <el-radio :label="2" style="margin-bottom: 5%">无责投诉</el-radio>
        <el-radio :label="6" style="margin-bottom: 5%">无效投诉</el-radio>
        <el-radio :label="3" style="margin-bottom: 5%">非投诉</el-radio>
        <el-radio :label="4" style="margin-bottom: 5%">待查案件</el-radio>
        <el-radio :label="5" style="margin-bottom: 5%">驳回，企业再次处理</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePass">
          取消
        </el-button>
        <el-button type="primary" @click="passData">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="处理意见" :visible.sync="dealForm" :close-on-press-escape="false"
               :close-on-click-modal="false" :show-close="false" v-loading="dealLoading" element-loading-text="处理中。。。">
      <div style="margin-left: 10%; margin-top: 5%; margin-bottom: 2%;color: #456074">基础信息</div>
      <el-form ref="form" :model="queryDeal" :rules="rules" label-width="20%" size="mini" @submit.native.prevent
               :hide-required-asterisk="true">
        <el-form-item label="车牌号码" prop="plateNo" style="margin-top: 2%">
          <el-input v-model="queryDeal.plateNo" style="width: 50%;" :disabled="dealPlateNoDisabled">
          </el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard" style="margin-top: 2%">
          <el-input v-model="queryDeal.idCard" style="width: 50%;" :disabled="dealIdCardDisabled">
          </el-input>
        </el-form-item>
        <el-form-item label="上车时间" prop="oncarTime" style="margin-top: 2%">
          <el-date-picker v-model="queryDeal.oncarTime" type="datetime"
                          placeholder="请选择" value-format="timestamp" style="width: 50%;" />
        </el-form-item>
        <el-form-item label="下车时间" prop="offcarTime" style="margin-top: 2%">
          <el-date-picker v-model="queryDeal.offcarTime" type="datetime"
                          placeholder="请选择" value-format="timestamp" style="width: 50%;" />
        </el-form-item>
        <el-form-item label="上车地点" prop="oncar" style="margin-top: 2%">
          <el-input v-model="queryDeal.oncar" style="width: 50%;">
          </el-input>
        </el-form-item>
        <el-form-item label="下车地点" prop="offcar" style="margin-top: 2%">
          <el-input v-model="queryDeal.offcar" style="width: 50%;">
          </el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left: 10%; margin-top: 5%; margin-bottom: 2%;color: #456074">投诉类型修改</div>
      <el-checkbox-group v-model="queryDeal.sortInfo"
                         style="margin-left: 10%; margin-right: 10%;" @change="test">
        <el-checkbox label="绕路" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="拒载" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="服务态度差" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="不打表" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="拼车" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="吸烟" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="吃东西" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="打电话" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="甩客" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="议价" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="挑客" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="吐痰" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="疑表" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="预约但未履约" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="未按规提供票据" style="margin-bottom: 2%;"></el-checkbox>
        <el-checkbox label="其他" style="margin-bottom: 2%;"></el-checkbox>
      </el-checkbox-group>
      <div style="margin-left: 10%; margin-top: 5%; margin-bottom: 2%;color: #456074">处理结果</div>
      <el-input
        type="textarea"
        maxlength="250"
        show-word-limit
        :rows="8"
        placeholder="请输入回复内容"
        v-model="queryDeal.replyInfo"
        style="width: 80%; margin-left: 10%; margin-top: 1%; margin-bottom: 2%">
      </el-input>
      <div style="margin-left: 10%; margin-top: 3%; margin-bottom: 2%;color: #456074">公司处理佐证材料</div>
      <div class="upload-box" style="display: flex; margin-left: 10%">
        <div v-for="(item, index) of imageList" :key="index">
          <div v-if="item">
            <img :src="item" class="avatar">
            <img src="@/icons/deleteImg.png" class="image-close" width="20px" height="20px"
                 @click="deleteImg(item,index)"/>
          </div>
        </div>
        <el-upload
          class="avatar-uploader"
          action="/taxi-file/fileserver/upload/v2"
          style="margin-top: 1%; margin-bottom: 2%"
          :show-file-list="false"
          :on-success="handleDealAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus avatar-uploader-icon" v-if="imageList.length < 5"></i>
        </el-upload>
      </div>
      <div style="margin-left: 10%; margin-top: 3%; margin-bottom: 2%;color: #456074">上传与乘客沟通录音</div>
      <el-upload
        class="avatar-uploader"
        action="/taxi-file/fileserver/upload/v2"
        style="margin-top: 1%; margin-bottom: 2%; margin-left: 10%; width: 30%"
        :show-file-list="true"
        :limit="3"
        :on-exceed="handleSoundExceed"
        :on-success="handleDealSoundSuccess"
        :on-remove="handleSoundRemove"
        :before-upload="beforeSoundUpload">
        <el-button size="small" type="primary">上传音频</el-button>
      </el-upload>
      <div style="margin-left: 10%; margin-top: 3%; margin-bottom: 2%;color: #456074">上传相关视频（小于100M）</div>
      <el-upload
        class="avatar-uploader"
        action="/taxi-file/fileserver/upload/v2"
        style="margin-top: 1%; margin-bottom: 2%; margin-left: 10%; width: 30%"
        :show-file-list="true"
        :limit="3"
        :on-exceed="handleVideoExceed"
        :on-success="handleVideoSuccess"
        :on-remove="handleVideoRemove"
        :before-upload="beforeVideoUpload">
        <el-button size="small" type="primary">上传视频</el-button>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDeal">
          取消
        </el-button>
        <el-button type="primary" @click="dealData">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="通知提示" :visible.sync="sendForm" v-loading="sendLoading"
               :show-close="false" element-loading-text="发送中。。。">
      <el-radio-group v-model="querySend.responsible"
                      style="display: flex;flex-direction: column; margin-top: 5%; margin-left:10%; margin-bottom: 7%">
        <el-radio :label="1" style="margin-bottom: 5%">有责投诉，通知司机申诉。</el-radio>
        <el-radio :label="0">非有责投诉，无需申诉，进入下一步处理流程。</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeSend">
          取消
        </el-button>
        <el-button type="primary" @click="sendData">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="现场处理提示" :visible.sync="appealForm" v-loading="appealLoading"
               :show-close="false" element-loading-text="处理中。。。">
      <div style="margin-left: 10%; margin-top: 5%; margin-bottom: 2%;color: #456074">请选择是否进行申诉</div>
      <el-radio-group v-model="queryAppeal.status"
                      style="display: flex;flex-direction: column; margin-top: 5%; margin-left:10%; margin-bottom: 7%">
        <el-radio :label="1" style="margin-bottom: 5%">进行申诉</el-radio>
        <el-radio :label="0">不进行申诉</el-radio>
      </el-radio-group>
      <div v-if="showAppealInfo">
        <div style="margin-left: 10%; margin-top: 5%; margin-bottom: 2%;color: #456074">申诉内容</div>
        <el-input
          type="textarea"
          maxlength="120"
          show-word-limit
          :rows="4"
          placeholder="请输入申诉内容"
          v-model="queryAppeal.appealInfo"
          style="width: 80%; margin-left: 10%; margin-top: 1%; margin-bottom: 2%">
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="appealForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="appealData">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="机构筛选" :visible.sync="treeForm">
      <el-input v-model="filterText" class="filter-item" placeholder="输入关键字进行过滤" clearable
                style="width: 200px; margin-left: 25px; margin-top: 15px"/>
      <el-tree
        class="filter-tree"
        :data="orgTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :highlight-current="true"
        ref="tree"
        style="margin-left: 25px; margin-top: 10px">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeForm = false">
          取消
        </el-button>
        <el-button type="primary" @click="treeForm = false">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择处理机构" :visible.sync="dealTreeForm"
               v-loading="dealOrgLoading" element-loading-text="机构用户加载中。。。">
      <el-input v-model="filterText" class="filter-item" placeholder="输入关键字进行过滤"
                clearable style="width: 200px; margin-left: 25px; margin-top: 15px"/>
      <el-tree
        class="filter-tree"
        :data="orgTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleDecideNodeClick"
        :expand-on-click-node="false"
        :highlight-current="true"
        ref="tree"
        style="margin-left: 25px; margin-top: 10px">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showOrgUser">
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入提示" :visible.sync="errorForm"  :close-on-click-modal="false" width="30%">
      <div style="margin-top: 5%; margin-left: 5%; margin-bottom: 5%">是否下载错误信息</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="errorForm = false">取 消</el-button>
        <el-button type="primary" @click="downFile">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import ComplaintGroup from './components/ComplaintGroup'
  import ComplaintPrint from '../utilPage/complaintPrint.vue';
  import { getToken } from '@/utils/auth'
  import axios from 'axios'
  import { MessageBox } from "element-ui";
  export default {
    components: {
      ComplaintGroup,
      ComplaintPrint
    },
    data() {
      return {
        queryList: {
          size: 20,
          current: 1,
          params: {
            plateNo: '',
            driverName: '',
            startTime: null,
            endTime: null,
            orgId: '',
            orgName: '',
            status:'',
            id:'',
            caseSrc:'12345',
            caseType:'',
            userNickName:'',
            result:'',
            content:'',
            isSuper: 1
          }
        },
        operateList: {
          id: '',
          idCard: '',
          plateNo: '',
          driverName: '',
          orgName: '',
          driverTel: '',
          userTel: '',
          statusDesc: '',
          status: '',
          complaintTime: '',
          oncar: '',
          oncarTime: '',
          offcar: '',
          offcarTime: '',
          sort: '',
          sortInfo: [],
          noticeStatus: '',
          noticeStatusStr: '',
          complaintContent: '',
          voucherImgList: [],
          noticeImg: '',
          decideInfo: '',
          appealInfo: '',
          replyInfo: '',
          superReplyInfo: '',
          decideTime:'',
          noticeTime: '',
          appealTime: '',
          replyTime: '',
          superReplyTime: ''
        },
        statusRules: undefined,
        changeRules: {
          idCard: [
            // {required: true, message: '身份证不能为空', trigger: 'blur'},
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '身份证格式错误'
            }
          ],
          plateNo: [
            {required: true, message: '车牌号不能为空', trigger: 'blur'},
          ],
          // userRealName: [
          //   {required: true, message: '姓名不能为空', trigger: 'blur'},
          // ],
          userTel: [
            // {required: true, message: '手机号不能为空', trigger: 'blur'},
            {
              pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
              message: '手机号格式错误'
            }
          ]
        },
        decideRules: {
          idCard: [
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '身份证格式错误'
            }
          ],
          driverTel: [
            {
              pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
              message: '手机号格式错误'
            }
          ]
        },
        sendRules: {
          idCard: [
            {required: true, message: '身份证不能为空', trigger: 'blur'},
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '身份证格式错误'
            }
          ],
          plateNo: [
            {required: true, message: '车牌号不能为空', trigger: 'blur'},
          ],
          driverName: [
            {required: true, message: '司机姓名不能为空', trigger: 'blur'},
          ],
          driverTel: [
            // {required: true, message: '手机号不能为空', trigger: 'blur'},
            {
              pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
              message: '手机号格式错误'
            }
          ],
          oncar: [
            {required: true, message: '上车地点不能为空', trigger: 'blur'},
          ],
          offcar: [
            {required: true, message: '下车地点不能为空', trigger: 'blur'},
          ],
          oncarTime: [
            {required: true, message: '上车时间不能为空', trigger: 'blur'},
          ],
          offcarTime: [
            {required: true, message: '下车时间不能为空', trigger: 'blur'},
          ]
        },
        queryTree: {
          orgId: undefined
        },
        queryNumber: {
          orgId: undefined,
          caseSrc:'12345',
	        startTime: null,
	        endTime:null
        },
        queryChange: {
          complaintId: undefined,
          idCard: undefined,
          plateNo: undefined,
          userRealName: undefined,
          userTel: undefined
        },
        queryAppeal: {
          complaintId: undefined,
          idCard: undefined,
          appealInfo: '',
          status: undefined
        },
        queryDelete: {
          complaintId: undefined
        },
        queryBack: {
          complaintId: undefined
        },
        queryDecide:{
          complaintId: undefined,
          userId:undefined,
          nickName: undefined,
          replyInfo: '',
          complaintResult: undefined,
          responsible: 0,
          orgId: '',
          userTel: '',
          driverName: '',
          plateNo: '',
          idCard: undefined,
          driverTel: undefined,
          oncar: undefined,
          offcar: undefined,
          oncarTime: undefined,
          offcarTime: undefined,
          dealType: undefined,
          loginId: undefined,
          dealOrgId: '',
          dealOrgName: ''
        },
        queryPass:{
          complaintId: undefined,
          userId:undefined,
          nickName: undefined,
          replyInfo: '',
          image: '',
          dealResultList: [],
          feedback: '',
          sortInfo: [],
          responsible: '',
          complaintResult: undefined,
          isPass: 0
        },
        queryDeal:{
          complaintId: undefined,
          userId:undefined,
          nickName: undefined,
          plateNo: '',
          idCard: '',
          oncar: '',
          oncarTime: '',
          offcar: '',
          offcarTime: '',
          replyInfo: '',
          // feedback: '',
          sortInfo: [],
          imageList: [],
          soundRecordList: [],
          videoRecordList: []
        },
        querySend:{
          complaintId: undefined,
          dealId: undefined,
          driverName: '',
          plateNo: '',
          idCard: undefined,
          driverTel: undefined,
          oncar: undefined,
          offcar: undefined,
          oncarTime: undefined,
          offcarTime: undefined,
          responsible: 0
        },
        watchResult: undefined,
        tableData: {
          total: 0,
          size: null,
          current: 1,
          records: []
        },
        stet: [],
        uploadHeader: {
          'x-access-token': getToken()
        },
        rules: {
          plateNo: [
            {required: true, message: '车牌号码不能为空', trigger: 'blur'}
          ],
        },
        importFile: new FormData(),
        importUrl: '',
        complaintData: {},
        showItem: '',
        imageUrl: '',
        imageList:[],
        soundList: [],
        userList: [],
        orgUserList: [],
        loadingText: '',
        complaintType: undefined,
        toDeal: true,
        dealStr: '',
        showLoginId: false,
        showDealType: false,
        showDealOrg: false,
        showUser: false,
        showAppealInfo: false,
        dealPlateNoDisabled: false,
        dealIdCardDisabled: false,
        operateLoading: false,
        appealLoading: false,
        changeLoading: false,
        deleteLoading: false,
        dealLoading: false,
        sendLoading: false,
        decideLoading: false,
        passLoading: false,
        backLoading: false,
        dealOrgLoading: false,
        loading: false,
        imgForm: false,
        appealForm: false,
        changeForm: false,
        deleteForm: false,
        decideForm: false,
        dealForm: false,
        operateForm: false,
        sendForm: false,
        passForm: false,
        errorForm: false,
        treeForm: false,
        dealTreeForm: false,
        backForm: false,
        listButton: false,
        dealButton: false,
        sendButton: false,
        appealButton: false,
        operateButton: false,
        decideButton: false,
        passButton: false,
        changeButton: false,
        deleteButton: false,
        exportButton:false,
        importButton:false,
        backButton:false,
        //机构树
        orgTree: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
      };
    },

    watch:{
      watchResult(val){
        if(val === 0){
          this.queryDecide.replyInfo = '经核实，此投诉为有责投诉，请企业3日内处理完毕并反馈。'
          this.queryDecide.complaintResult = 1
          this.queryDecide.responsible = 1
          this.showDealType = false
          this.showLoginId = false
          this.queryDecide.dealType = null
          this.queryDecide.loginId = null
        }
        if(val === 1){
          this.queryDecide.replyInfo = '此案件，由企业自行处理，并在3日内上传结果、通话录音。'
          this.queryDecide.complaintResult = 1
          this.queryDecide.responsible = 1
          this.showDealType = false
          this.showLoginId = false
          this.queryDecide.dealType = null
          this.queryDecide.loginId = null
        }
        if(val === 2){
          this.queryDecide.replyInfo = '此投诉为无责投诉，请企业3日内与乘客解释后反馈。'
          this.queryDecide.complaintResult = 1
          this.queryDecide.responsible = 0
          this.showDealType = false
          this.showLoginId = false
          this.queryDecide.dealType = null
          this.queryDecide.loginId = null
        }
        if(val === 3){
          this.queryDecide.replyInfo = '此投诉待查，请企业3日内与乘客司机核实后处理反馈。'
          this.queryDecide.complaintResult = 1
          this.queryDecide.responsible = 4
          this.showDealType = false
          this.showLoginId = false
          this.queryDecide.dealType = null
          this.queryDecide.loginId = null
        }
        if(val === 4){
          this.queryDecide.replyInfo = '非投诉，请相关单位3日内处理并反馈。'
          this.queryDecide.complaintResult = 1
          this.queryDecide.responsible = 3
          this.showDealType = true
          if( this.queryDecide.dealType ===1){
            this.showLoginId = true
          } else {
            this.showLoginId = false
          }
        }
        if(val === 5){
          this.queryDecide.replyInfo = '此案件属于重复投诉，已合并案件。处理结果请参看此案首次投诉记录。'
          this.queryDecide.complaintResult = 0
          this.queryDecide.responsible = 2
          this.showDealType = false
          this.showLoginId = false
          this.queryDecide.dealType = null
          this.queryDecide.loginId = null
        }
      },
      complaintType(val){
        if(val === 1){
          this.toDeal = false
          this.queryPass.isPass = 1
          this.queryPass.responsible = 1
        }
        if(val === 2){
          this.queryPass.replyInfo = '已对司机进行提高服务质量教育培训。如对处理结果存疑，' +
            '可拨打电话85967077咨询，感谢您对我们工作的支持，祝您生活愉快。'
          this.toDeal = true
          this.queryPass.dealResultList = []
          this.queryPass.isPass = 1
          this.queryPass.responsible = 0
        }
        if(val === 3){
          this.queryPass.replyInfo = '车辆和司机所属公司已与您电话联系并沟通处理 如未接到相关电话，' +
            '可拨打电话85967077咨询 感谢您对我们工作的支持，祝您生活愉快。'
          this.toDeal = true
          this.queryPass.dealResultList = []
          this.queryPass.isPass = 1
          this.queryPass.responsible = 3
        }
        if(val === 4){
          this.queryPass.replyInfo = '在此案件办理过程中，工作人员未能联系到你，或你的联系方式不是投诉人。' +
            '案件办理超时，已作待查结案处理。如有疑问，可拨打电话85967077咨询。感谢您对我们工作的支持，祝您生活愉快。'
          this.toDeal = true
          this.queryPass.dealResultList = []
          this.queryPass.isPass = 1
          this.queryPass.responsible = 4
        }
        if(val === 5){
          this.toDeal = true
          this.queryPass.dealResultList = []
          this.queryPass.isPass = 0
        }
        if(val === 6){
          this.queryPass.replyInfo = '车辆和司机所属公司已与您电话联系并沟通处理 如未接到相关电话，' +
            '可拨打电话85967077咨询 感谢您对我们工作的支持，祝您生活愉快。'
          this.toDeal = true
          this.queryPass.dealResultList = []
          this.queryPass.isPass = 1
          this.queryPass.complaintResult = 0
        }
      },
      'queryList.params.caseSrc': {
        deep: true,
        handler(val) {
          this.queryNumber.caseSrc = val
        }
      },
      'queryAppeal.status': {
        deep: true,
        handler(val) {
          if(val === 1){
            this.showAppealInfo = true
          }else{
            this.showAppealInfo = false
            this.queryAppeal.appealInfo = null
          }
        }
      },
      'queryDecide.dealOrgName': {
        deep: true,
        handler(val) {
          if(val){
            this.showUser = true
            this.queryDecide.loginId = null
          }else{
            this.showUser = false
            this.queryDecide.loginId = null
          }
        }
      },
      'queryDecide.dealType': {
        deep: true,
        handler(val) {
          if(val === 1){
            this.showLoginId = true
            this.showDealOrg = false
            this.queryDecide.dealOrgId = null
            this.queryDecide.dealOrgName = null
            this.queryDecide.loginId = null
          }
          if(val === 2) {
            this.showDealOrg = true
            this.showLoginId = false
            this.queryDecide.dealOrgId = null
            this.queryDecide.dealOrgName = null
            this.queryDecide.loginId = null
          }
        }
      }
    },
    filters:{
      fmtDecideName(val){
        if(!val){
          val = '未判定'
        }
        return val
      },
      fmtDealName(val){
        if(!val){
          val = '尚未确定'
        }
        return val
      }
    },
    methods: {
      test(val){
        this.$forceUpdate()
      },
      getTree() {
        const that = this
        this.request('orgTree', this.queryTree).then(response => {
          console.log(response)
          that.orgTree = response
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.orgName.indexOf(value) !== -1;
      },
      handleNodeClick(data) {
        this.queryList.params.orgId = data.orgId
        this.queryList.params.orgName = data.orgName
        this.queryNumber.orgId = data.orgId
      },
      handleDecideNodeClick(data) {
        this.queryDecide.dealOrgId = data.orgId
        this.queryDecide.dealOrgName = data.orgName
      },
      getPerms() {
        let perms = this.$store.getters.perms
        if (perms.includes('*')) {
          this.listButton = true;
          this.decideButton = true;
          this.passButton = true;
          this.operateButton = true;
          this.dealButton = true;
          this.sendButton = true;
          this.appealButton = true;
          this.exportButton = true;
          this.changeButton = true;
          this.deleteButton = true;
          this.importButton = true;
          this.backButton = true;
        } else {
          if (perms.includes('POST /admin/complaint/superList')) {
            this.listButton = true;
          }
          if (perms.includes('POST /admin/complaint/order')) {
            this.decideButton = true;
          }
          if (perms.includes('POST /admin/complaint/superReply')) {
            this.passButton = true;
          }
          if (perms.includes('POST /admin/complaint/superDetail')) {
            this.operateButton = true;
          }
          if (perms.includes('POST /admin/complaint/superDeal')) {
            this.dealButton = true;
          }
          if (perms.includes('POST /admin/complaint/superSendMsg')) {
            this.sendButton = true;
          }
          if (perms.includes('POST /admin/complaint/superExport')) {
            this.exportButton = true;
          }
          if (perms.includes('POST /admin/complaint/superChangeDriver')) {
            this.changeButton = true;
          }
          if (perms.includes('POST /admin/complaint/superDelete')) {
            this.deleteButton = true;
          }
          if (perms.includes('POST /admin/complaint/superImportComplaint')) {
            this.importButton = true;
          }
          if (perms.includes('POST /admin/complaint/superBack')) {
            this.backButton = true;
          }
          if (perms.includes('POST /admin/complaint/superAppeal')) {
            this.appealButton = true;
          }
        }
      },
      filterPerms(){
        if (this.stet && this.stet.length > 1) {
          this.queryList.params.startTime = this.stet[0].getTime();
          this.queryNumber.startTime = this.stet[0].getTime();
          this.queryList.params.endTime = this.stet[1].getTime();
          this.queryNumber.endTime = this.stet[1].getTime();
        } else {
          this.queryList.params.startTime = null;
          this.queryList.params.endTime = null;
          this.queryNumber.startTime = null;
          this.queryNumber.endTime = null;
        }
        if(this.queryList.params.status === '全部'){
          this.queryList.params.status = null
        }
        if(this.queryList.params.caseType === '全部'){
          this.queryList.params.caseType = null
        }
        if(this.queryList.params.result === '全部'){
          this.queryList.params.result = null
        }
      },
      handleFilter() {
        this.filterPerms()
        if(this.queryList.params.content){
          if(this.queryList.params.startTime && this.queryList.params.endTime){
            let max = this.queryList.params.endTime / 1000 - this.queryList.params.startTime / 1000;
            if(max > 30 * 24 * 3600){
              MessageBox.alert('投诉内容模糊查询时间不能大于30天', '提示', {
                confirmButtonText: '确定',
                type: 'info'
              })
              return
            }
          }else {
            MessageBox.alert('投诉内容模糊查询必须选择时间且不能大于30天', '提示', {
              confirmButtonText: '确定',
              type: 'info'
            })
            return
          }
        }
        this.queryList.current = this.tableData.current
        this.getList();
      },
      getList() {
        this.loadingText = '正在查询中。。。'
        this.loading = true
        this.request('api_admin_complaint_super_list', this.queryList).then((res) => {
          this.tableData = res;
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
        this.request('api_admin_complaint_number', this.queryNumber).then((res) => {
          this.complaintData.openCaseNum = res.openCaseNum
          this.complaintData.notResponsibleNum = res.notResponsibleNum
          this.complaintData.responsibleNum = res.responsibleNum
          this.complaintData.notComplaintNum = res.notComplaintNum
          this.complaintData.investigatedNum = res.investigatedNum
          this.$refs.complaintGroupId.setOptions(this.complaintData)
        }).catch((error) => {
          console.log(error)
        });
      },
      handleOperate(row){
        if(row.status === 1){
          this.statusRules = this.sendRules
        }else {
          this.statusRules = this.decideRules
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        let p = {
          complaintId: row.id
        }
        this.operateLoading = true
        this.request('api_admin_complaint_super_detail',p).then((res) => {
          this.operateList = res;
          this.operateLoading = false
          this.operateForm = true
        }).catch((error) => {
          console.log(error)
          this.operateLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
        });
      },
      handleAppeal(){
        this.queryAppeal.complaintId = this.operateList.id
        this.queryAppeal.idCard = this.operateList.idCard
        this.queryAppeal.appealInfo = ''
        this.queryAppeal.status = undefined
        this.appealForm = true
      },
      appealData(){
        if(!this.queryAppeal.status && this.queryAppeal.status !== 0){
          this.$notify.error({
            title: '错误',
            message: '请选择是否进行申诉'
          })
          return
        }
        if(this.queryAppeal.status === 1 && !this.queryAppeal.appealInfo){
          this.$notify.error({
            title: '错误',
            message: '若进行申诉，请填写申诉内容'
          })
          return
        }
        this.appealLoading = true
        this.request('api_admin_complaint_super_appeal',this.queryAppeal).then((res) => {
          this.appealLoading = false
          this.$notify.success({
            title: '成功',
            message: '到场处理投诉成功'
          })
          this.getList()
          this.appealForm = false
          this.operateForm = false
        }).catch((error) => {
          this.appealLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
          this.appealForm = false
        });
      },
      handleChange(row){
        this.queryChange.complaintId = row.id
        this.queryChange.idCard = row.idCard
        this.queryChange.plateNo = row.plateNo
        this.queryChange.userRealName = row.driverName
        this.queryChange.userTel = row.driverTel
        this.changeForm = true
      },
      changeData(){
        this.$refs['changeForm'].validate(valid => {
          if (valid) {
            this.changeLoading = true
            this.request('api_admin_complaint_super_changeDriver',this.queryChange).then((res) => {
              this.changeLoading = false
              this.$notify.success({
                title: '成功',
                message: '修改投诉成功'
              })
              this.getList()
              this.changeForm = false
            }).catch((error) => {
              this.changeLoading = false
              this.$notify.error({
                title: '失败',
                message: error.msg
              })
            });
          }
        })
      },
      handleBack(row){
        this.queryBack.complaintId = row.id
        this.backForm = true
      },
      backData(){
        this.backLoading = true
        this.request('api_admin_complaint_super_back',this.queryBack).then((res) => {
          this.backLoading = false
          this.$notify.success({
            title: '成功',
            message: '投诉退回成功'
          })
          this.getList()
          this.backForm = false
        }).catch((error) => {
          this.backLoading = false
          this.$notify.error({
            title: '失败',
            message: '投诉退回失败，请重试'
          })
          this.backForm = false
        });
      },
      handleDelete(row){
        this.queryDelete.complaintId = row.id
        this.deleteForm = true
      },
      deleteData(){
        this.deleteLoading = true
        this.request('api_admin_complaint_super_delete',this.queryDelete).then((res) => {
          this.deleteLoading = false
          this.$notify.success({
            title: '成功',
            message: '删除投诉成功'
          })
          this.getList()
          this.deleteForm = false
        }).catch((error) => {
          this.deleteLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
          this.deleteForm = false
        });
      },
      handleDeal(){
        this.imageUrl = ''
        if(this.operateList.replyInfo){
          this.queryDeal.replyInfo = this.operateList.replyInfo
        }else {
          this.queryDeal.replyInfo = ''
        }
        this.queryDeal.complaintId = this.operateList.id

        this.queryDeal.plateNo = this.operateList.plateNo
        this.dealPlateNoDisabled = this.queryDeal.plateNo? true: false;
        this.queryDeal.idCard = this.operateList.idCard
        this.dealIdCardDisabled = this.queryDeal.idCard? true: false;
        if(this.operateList.oncarTime){
          this.queryDeal.oncarTime = this.operateList.oncarTime
        }
        if(this.operateList.offcarTime){
          this.queryDeal.offcarTime = this.operateList.offcarTime
        }
        // this.queryDeal.feedback = this.operateList.feedback
        this.queryDeal.oncar = this.operateList.oncar
        this.queryDeal.offcar = this.operateList.offcar
        if(!this.operateList.sortInfo){
          this.queryDeal.sortInfo = []
        }else{
          this.queryDeal.sortInfo = this.operateList.sortInfo
        }
        this.queryDeal.videoRecordList = []
        this.queryDeal.soundRecordList = []
        this.dealForm = true
      },
      closeDeal(){
        this.dealForm = false
        this.queryDeal.replyInfo = ''
        // this.queryDeal.feedback = ''
        // this.queryDeal.sortInfo = []
      },
      dealData(){
        if(this.queryDeal.sortInfo.length === 0){
          this.$notify.error({
            title: '错误',
            message: '请至少选择一种投诉类型'
          })
          return
        }
        if(!this.queryDeal.replyInfo){
          this.$notify.error({
            title: '错误',
            message: '必须填写处理结果'
          })
          return
        }
        this.dealLoading = true;
        this.request('api_admin_complaint_super_deal', this.queryDeal).then((res) => {
          this.operateForm = false
          this.closeDeal()
          this.getList()
          this.dealLoading = false;
          this.$notify.success({
            title: '成功',
            message: '回复提交成功'
          })
        }).catch((error) => {
          this.dealLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
        });
      },
      handleSend(){
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.querySend.idCard = this.operateList.idCard
            this.querySend.complaintId = this.operateList.id
            this.querySend.driverName = this.operateList.driverName
            this.querySend.plateNo = this.operateList.plateNo
            this.querySend.driverTel = this.operateList.driverTel
            this.querySend.oncar = this.operateList.oncar
            this.querySend.offcar = this.operateList.offcar
            this.sendForm = true
          }
        })
      },
      sendData(){
        if(this.operateList.oncarTime){
          this.querySend.oncarTime = new Date(this.operateList.oncarTime).getTime()
        }
        if(this.operateList.offcarTime){
          this.querySend.offcarTime = new Date(this.operateList.offcarTime).getTime()
        }
        this.sendLoading = true;
        this.request('api_admin_complaint_super_sendMsg', this.querySend).then((res) => {
          this.operateForm = false
          this.sendForm = false
          this.getList()
          this.sendLoading = false;
          this.$notify.success({
            title: '成功',
            message: '发送信息成功'
          })
        }).catch((error) => {
          this.operateForm = false
          this.sendForm = false
          this.sendLoading = false;
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
        });
      },
      closeSend(){
        this.sendForm = false
        this.querySend.responsible = 0
      },
      handleDecide(){
        this.queryDecide.complaintId = this.operateList.id
        this.queryDecide.userTel = this.operateList.userTel
        this.queryDecide.driverName = this.operateList.driverName
        this.queryDecide.plateNo = this.operateList.plateNo
        this.queryDecide.idCard = this.operateList.idCard
        this.queryDecide.driverTel = this.operateList.driverTel
        this.queryDecide.oncar = this.operateList.oncar
        this.queryDecide.offcar = this.operateList.offcar
        this.queryDecide.replyInfo = ''
        this.queryDecide.dealType = undefined
        this.queryDecide.loginId = undefined
        this.queryDecide.complaintResult = undefined
        this.queryDecide.responsible = undefined
        this.queryDecide.dealOrgId = undefined
        this.queryDecide.dealOrgName = undefined
        this.watchResult = undefined
        this.showDealType = false
        this.showLoginId = false
        this.showDealOrg = false
        this.showUser = false

        this.decideForm = true
      },
      closeDecide(){
        this.decideForm = false
        this.queryDecide.replyInfo = ''
        this.queryDecide.loginId = undefined
      },
      decideData(){
        if(!this.queryDecide.complaintResult && this.queryDecide.complaintResult !== 0){
          this.$notify.error({
            title: '错误',
            message: '请至少选择一种判定类型'
          })
          return
        }
        if(this.queryDecide.responsible !== 3 && !this.queryDecide.plateNo){
          this.$notify.error({
            title: '错误',
            message: '若不是“非投诉”类型，必须填写车牌号'
          })
          return
        }
        if(this.queryDecide.responsible === 3 && !this.queryDecide.dealType){
          this.$notify.error({
            title: '错误',
            message: '若选择“非投诉”，必须选择处理方式'
          })
          return
        }
        if(this.queryDecide.responsible === 3 && this.queryDecide.dealType === 1 && !this.queryDecide.loginId){
          this.$notify.error({
            title: '错误',
            message: '若选择“大队处理”，必须选择处理账号'
          })
          return
        }
        if(this.queryDecide.responsible === 3 && this.queryDecide.dealType === 2
          && !this.queryDecide.plateNo && !this.queryDecide.loginId){
          this.$notify.error({
            title: '错误',
            message: '若选择“出租车公司处理”且未填写车牌号，请填写处理公司和用户'
          })
          return
        }
        if(this.operateList.oncarTime){
          this.queryDecide.oncarTime = new Date(this.operateList.oncarTime).getTime()
        }
        if(this.operateList.offcarTime){
          this.queryDecide.offcarTime = new Date(this.operateList.offcarTime).getTime()
        }
        this.decideLoading = true;
        this.request('api_admin_complaint_decide', this.queryDecide).then((res) => {
          this.operateForm = false
          this.decideForm = false
          this.getList()
          this.decideLoading = false;
          this.$notify.success({
            title: '成功',
            message: '投诉判定提交成功'
          })
        }).catch((error) => {
          this.decideForm = false
          this.decideLoading = false
          this.$notify.error({
            title: '失败',
            message: error.msg
          })
        });
      },
      resetPass(){
        this.queryPass = {
            complaintId: undefined,
            userId:this.$store.getters.userId,
            nickName: this.$store.getters.userNickName,
            replyInfo: '',
            image: '',
            dealResultList: [],
            isPass: undefined,
            sortInfo : [],
            feedback:''
        }
        this.imageUrl = ''
        this.complaintType = undefined
      },
      //结案处理
      handlePass(){
        if(this.operateList.superReplyInfo){
          this.queryPass.replyInfo = this.operateList.superReplyInfo
        }else {
          this.queryPass.replyInfo = ''
        }
        this.queryPass.feedback = this.operateList.feedback
        if(!this.operateList.sortInfo){
          this.queryPass.sortInfo = []
        }else{
          console.log(this.operateList.sortInfo)
          // this.queryPass.sortInfo=[]
          // this.$set(this.queryPass.sortInfo,[],this.operateList.sortInfo)
          this.queryPass.sortInfo = this.operateList.sortInfo
          // this.$forceUpdate()
        }
        this.queryPass.complaintId = this.operateList.id
        this.passForm = true
        this.$forceUpdate()
      },
      closePass(){
        this.passForm = false
        this.resetPass()
      },
      passData(){
        if(this.queryPass.isPass === undefined){
          this.$notify.error({
            title: '错误',
            message: '请至少选择一种结案类型'
          })
          return
        }
        this.passLoading = true;
        this.request('api_admin_complaint_superReply', this.queryPass).then((res) => {
          this.operateForm = false
          this.passForm = false
          this.getList()
          this.passLoading = false;
          this.$notify.success({
            title: '成功',
            message: '结案提交成功'
          })
          this.resetPass()
        }).catch((error) => {
          this.operateForm = false
          this.passForm = false
          this.passLoading = false;
          this.$notify.error({
            title: '失败',
            message: '结案提交失败，请重试'
          })
          this.resetPass()
        });
      },
      handlePrint(row){
        let html = null;
        html = this.$refs.complaintPrint.$el.innerHTML;
        this.doPrint('投诉处理单', html);
      },
      enlarge(item){
        console.log(item)
        this.showItem = item
        this.imgForm = true
      },
      deleteImg(item,index){
        // console.log(this.imageList)
        this.imageList.splice(index,1)
      },
      doExcelExport() {
        this.filterPerms()
        this.loadingText = '正在导出，请稍后。。。'
        this.loading = true
        this.queryList.current = this.tableData.current
        this.request('api_admin_complaint_super_export', this.queryList).then((res) => {
          this.loading = false
        }).catch((error) => {
          this.loading = false
        });
      },
      handleDealAvatarSuccess(res, file) {
        this.imageList.push(res[0].url);
        this.queryDeal.imageList = this.imageList
      },
      handleDealSoundSuccess(res, file) {
        this.queryDeal.soundRecordList.push(res[0].url)
      },
      handlePassAvatarSuccess(res, file) {
        this.imageUrl = res[0].url;
        this.queryPass.image = this.imageUrl
      },
      handleVideoSuccess(res, file) {
        this.queryDeal.videoRecordList.push(res[0].url)
      },
      handleSoundExceed(files, fileList) {
        this.$message.error('最多只能上传3个音频文件');
      },
      handleNoticeExceed(files, fileList) {
        this.$message.error('只能上传1张图片');
      },
      handleVideoExceed(files, fileList) {
        this.$message.error('只能上传1个视频');
      },
      handleSoundRemove(file, fileList){
        let i = this.queryDeal.soundRecordList.indexOf(file.response[0].url)
        this.queryDeal.soundRecordList.splice(i,1)
      },
      handleNoticeRemove(file, fileList){
        this.queryPass.image = ''
        this.imageUrl = ''
      },
      handleVideoRemove(file, fileList){
        this.queryDeal.videoRecordList = []
      },
      beforeImport(file){
        if(file){
          this.importFile.append('file',file)
        }else {
          return false
        }
      },
      beforeAvatarUpload(file) {
        console.log('file')
        console.log(file)
        if (this.imageList.length === 5){
          this.$message.error('凭证图片最多只能上传5张！');
          return false;
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
          this.$message.error('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片');
          return false
        }

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      beforePassUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
          this.$message.error('请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片');
          return false
        }

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      beforeSoundUpload(file) {
        const isLt10M = file.size / 1024 / 1024 < 20;
        if (!(file.type === "audio/mpeg" || file.type === "audio/mp3" || file.type === 'audio/flac' || file.type === 'audio/wav')) {
          this.$message.error('请上传格式为mp3、wav、flac的音频文件');
          return false
        }

        if (!isLt10M) {
          this.$message.error('上传音频大小不能超过 20MB!');
        }
        return isLt10M;
      },
      beforeVideoUpload(file) {
        const isLt100M = file.size / 1024 / 1024 < 100;
        console.log(file)
        console.log(file.type)
        if (!(file.type === "video/mp4" || file.type === "video/avi" || file.type === 'video/rmvb')) {
          this.$message.error('请上传格式为mp4、avi、rmvb的视频文件');
          return false
        }

        if (!isLt100M) {
          this.$message.error('上传视频大小不能超过 100MB!');
        }
        return isLt100M;
      },
      resultListChange(){
        this.dealStr = ''
        for (let result of this.queryPass.dealResultList){
          if(this.dealStr.length ===0){
            this.dealStr = result;
          }else{
            this.dealStr = this.dealStr + '、' + result;
          }
        }
        this.queryPass.replyInfo = '已对司机进行' + this.dealStr +
          '。 如对处理结果存疑，可拨打电话85967077咨询 感谢您对我们工作的支持，祝您生活愉快。'
      },
      downloadName(val){
        val += 1
        return '文件下载'+ val
      },
      onSuccess(response, file, fileLile) {
        this.importUrl = response[0].url;
        let queryImport = this.importFile
        queryImport.append('url',this.importUrl)
        axios({
          url:'taxi-server/admin/complaint/superImportComplaint',
          method: 'post',
          data: queryImport,
          headers:{
            'Content-Type':'multipart/form-data',
            'x-access-token': getToken()
          }
        }).then((response)=>{
          this.loading = false
          if (response.data.result === 0) {
            this.errorUrl = response.data.errFile;
            this.errorForm = true;
            console.log(this.errorUrl);
          } else {
            this.$message('导入成功');
          }
          this.getList()
        }).catch((error) => {
          this.loading = false
        });

      },
      onError(err, file, fileList) {
        this.loading = false
      },
      onProgress() {
        this.loadingText = '导入中，请稍后。。。'
        this.loading = true
      },
      downFile() {
        this.errorForm = false;
        let params = {};
        params.fileUrl = this.errorUrl;
        this.request('api_admin_errExcel', params).then((res) => {
          console.log(res);
        }).catch((error) => {
        });
      },
      showOrgUser(){
        if(this.queryDecide.dealOrgId){
          this.dealOrgLoading = true
          let p = {
            orgId: this.queryDecide.dealOrgId
          }
          this.request('api_admin_orgUserList', p).then((res) => {
            this.orgUserList = res;
            this.dealOrgLoading = false
          }).catch((error) => {
            this.dealOrgLoading = false
            this.$notify.error({
              title: '失败',
              message: error.msg
            })
          });
        }
        this.dealTreeForm = false
      },
      getUserList(){
        this.request('api_admin_userList', this.queryTree).then((res) => {
          this.userList = res
        }).catch((error) => {
          console.log(error)
        });
      },
      getUserInfo() {
        this.queryNumber.orgId = this.$store.getters.orgId
        this.queryTree.orgId = this.$store.getters.orgId
        this.queryList.params.orgId = this.$store.getters.orgId
	      this.queryDeal.userId = this.$store.getters.userId
	      this.querySend.dealId = this.$store.getters.userId
        this.queryDeal.nickName = this.$store.getters.userNickName
        this.queryDecide.userId = this.$store.getters.userId
        this.queryDecide.nickName = this.$store.getters.userNickName
        this.queryDecide.orgId = this.$store.getters.orgId
        this.queryPass.userId = this.$store.getters.userId
        this.queryPass.nickName = this.$store.getters.userNickName
      }
    },
    async created() {
      await this.getUserInfo()
      this.getPerms()
      this.getTree()
    },
    mounted() {
      this.getList();
      this.getUserList();
    }

  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    margin: auto;
  }

  .avatar {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    display: block;
  }
  .image-close{
    position: relative;
    top: -82px;
    right: -72px;
    color: red;
  }
</style>

