<template>
  <div class="forms">
    <div id="page-wrapper" >
      <div class="header">
        <h1 class="page-header">
          应急预案
        </h1>
        <ol class="breadcrumb">
          <li><router-link to="/hello"> <a href="#">主页</a></router-link></li>
          <li><a href="#">应急预案</a></li>
          <li class="active">所有审批预案</li>
        </ol>
      </div>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 98%;left:20px">
        <el-table-column
          label="ID"
          prop="id" width="50px">
        </el-table-column>
        <el-table-column
          label="预案序号"
          prop="planId">
        </el-table-column>
        <el-table-column
          label="用户ID"
          prop="userId" width="100px">
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="userName">
        </el-table-column>
        <el-table-column
          label="审批信息"
          prop="auditInfo">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
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
        search: '',
        transID:undefined,
        formLabelWidth:"120px"
      }
    },
    created: function () { // 在vue初始化时调用//
      this.getTableData();

    },

    methods: {
      getTableData(){
        var vm=this

        $.ajax({
          type: "GET",
          dataType: "JSON",
          url: "http://10.112.17.185:8086/api/v1/info/planAudit",
          success: function (msg) {

            vm.tableData=msg;
          },
          error: function (err) {
            alert("加载0000失败");
          }
        });
      }
    }

  }
</script>

<style scoped>

</style>
