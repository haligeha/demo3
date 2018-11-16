<template>
  <div id="page-wrapper" >
    <div class="header">
      <h1 class="page-header">
        入廊作业
      </h1>
      <ol class="breadcrumb">
        <li><a href="#">主页</a></li>
        <li><a href="#">入廊作业</a></li>
        <li class="active">数据</li>
      </ol>

      </div>

  <div id="pageBody">
    <el-table
      :data="tableData.filter(data=>!search||data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width:98%;left: 20px;">
      <el-table-column
      label="序号"
      prop="id">
      </el-table-column>
      <el-table-column
        label="工期"
        prop="duration">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="施工人员数量"
        prop="work_number">
      </el-table-column>
      <el-table-column
        label="活动范围"
        prop="activity_range">
      </el-table-column>
      <el-table-column
        label="评价"
        prop="evaluation">
      </el-table-column>
      <el-table-column
        width="300"
        align="right">
        <template slot="header" slot-scope="slot">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleCheck(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            @click="handleEvaluate(scope.$index, scope.row)">评价</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</div>

</template>

<script>

    export default {
      data() {
        return {
          tableData: [],
          getUrl: 'http://10.112.17.185:8100/api/v1/info/entranceWork',
          search: ''
        }
      },
      created: function () {
        this.getTableData()
      },
      methods: {
        getTableData: function () {
          var vm = this
          //var self = this.tableData;
          $.ajax({
            type: "GET",
            dataType: "JSON",
            //  header:"Access-Control-Allow-Origin:  http://10.112.17.185:8100",
            url: "http://10.112.17.185:8100/api/v1/info/entranceWork",
            success: function (msg) {
              vm.tableData = msg;
            },
            error: function (err) {
              alert("加载0000失败");
            }
          });
        },
        handleEdit() {
        },
        handleCheck(){

        },
        handleDelete() {
        },
        handleEvaluate(){}
      }
    }


</script>
