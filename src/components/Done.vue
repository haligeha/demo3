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
          <li class="active">已审批预案</li>
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
          label="计划名"
          prop="planName">
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
          label="添加日期"
          prop="addDate">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="state">
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
            <el-button
              size="mini"
              @click="check(scope.row)">查看用户信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="查看详细信息":visible.sync="dialogCheckVisible">
        <el-form>
          <el-form-item label="序号":label-width="formLabelWidth">
            <el-input v-model="form.id" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户名":label-width="formLabelWidth">
            <el-input v-model="form.UserName" autocomplete="off" disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="位置":label-width="formLabelWidth">
            <el-input v-model="form.Position"autocomplete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="住所":label-width="formLabelWidth">
            <el-input v-model="form.Department" autocomplete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别":label-width="formLabelWidth">
            <el-input v-model="form.Gender" autocomplete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="年龄":label-width="formLabelWidth">
            <el-input v-model="form.Age" autocomplete="off" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色":label-width="formLabelWidth">
            <el-input v-model="form.Role" autocomplete="off" disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCheckVisible=false">取消</el-button>
          <el-button type="primary" @click="handleCheckConfirm()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogCheckVisible:false,
        tableData: [],
        data:[],
        search: '',
        transID:undefined,
        form:{
          Id:undefined,
          UserName:'',
          Position:'',
          Department:'',
          Gender:'',
          Age:'',
          Role:''
        },
        formLabelWidth:"120px"
      }
    },
    created: function () { // 在vue初始化时调用//
      this.getTableData();

    },

    methods: {
      getTableData(){
        var vm=this
        function Hour(create_date){
          var date= new Date(create_date*1000);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate()+' ';
          var h=date.getHours()+':';
          var m = date.getMinutes();
          return Y + M + D+h+m;
        }
        function changeFormate(a){
          if(a==0){
            a="未审批"
          }
          else if(a==1){
            a="审批通过"
          }
          else{
            a="审批未通过"
          }
          return a
        }
        $.ajax({
          type: "GET",
          dataType: "JSON",
          url: "http://10.112.17.185:8086/api/v1/info/alreadyReservePlan",
          success: function (msg) {

            for (var x = 0; x < msg.length; x++) {
              var mm = {};
              mm.id = msg[x].id;
              mm.planName = msg[x].planName;
              mm.userId = msg[x].userId;
              mm.userName = msg[x].userName;
              mm.addDate = Hour(msg[x].addDate);
              mm.state = changeFormate(msg[x].state);
              vm.tableData.push(mm);
            }
          },
          error: function (err) {
            alert("加载0000失败");
          }
        });
      },
      check(row){
        var vm=this;
        this.transID=JSON.stringify(row).indexOf("id");
        var dataGet={};
        dataGet.id=this.transID;
        console.log(dataGet)
        $.ajax({
          url:"http://10.112.17.185:8086/api/v1/info/userInfoByPlanId",
          type:"GET",
          contentType:"application/json;charset=UTF-8",
          dataType:"JSON",
          data:dataGet,
          success:function (msg) {
            vm.form.id=msg.Id;
            vm.form.UserName=msg.UserName;
            vm.form.Position=msg.Position;
            vm.form.Department=msg.Department;
            vm.form.Gender=msg.Gender;
            vm.form.Age=msg.Age;
            vm.form.Role=msg.Role;
            vm.dialogCheckVisible=true;
            console.log("查看成功");
          },
          error:function (err) {
            alert("加载0002失败")
          }
        })

      },
      handleCheckConfirm(){
        this.dialogCheckVisible=false;
      },
    }

  }
</script>
