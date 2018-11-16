<template>
<div class="forms">
  <div id="page-wrapper" >
    <div class="header">
      <h1 class="page-header">
        应急预案
      </h1>
      <ol class="breadcrumb">
        <li><a href="#">主页</a></li>
        <li><a href="#">应急预案</a></li>
        <li class="active">数据</li>
      </ol>
    </div>
   <div id="pageBody">
     <el-table
       :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
       style="width:98%;left:20px">
       <el-table-column
         label="ID"
         prop="id">
       </el-table-column>
       <el-table-column
         label="性别"
         prop="gender">
       </el-table-column>
       <el-table-column
         label="电话"
         prop="phone">
       </el-table-column>
       <el-table-column
         label="姓名"
         prop="name">
       </el-table-column>
       <el-table-column
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
             type="danger"
             @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
    <!-- <table>
       <tr>
         <th>ID</th>
         <th>User Name</th>
         <th>Login Name</th>
         <th>Login Password</th>
         <th>Role</th>
       </tr>
      <tr v-for="person in people">
         <td>{{person.id}} </td>
         <td>{{person.userName}}</td>
         <td>{{person.loginName}}</td>
         <td>{{person.loginPwd}}</td>
         <td>{{person.role}}</td>
     <td><input @click="del(index)" type="button" value="删除"><input @click="add(index)" type="button" value="查看"></td>
       </tr>
     </table>-->
   </div>
  </div>
  <!-- /. PAGE WRAPPER  -->
</div>

</template>


<script>
  export default {
    data() {
      return {
        /*  tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],*/
        tableData:[],
        getUrl: 'http://10.8.175.229:8100/api/v1/info/allStaff',
        search: ''
      }
    },
    created: function(){
      this.getTableData()
    },
    methods: {
      getTableData: function () {
        var vm=this
        //var self = this.tableData;
        $.ajax({
          type: "GET",
          dataType: "JSON",
          //  header:"Access-Control-Allow-Origin:  http://10.112.17.185:8100",
          url: "http://10.112.17.185:8100/api/v1/info/allStaff",
          success: function (msg) {
            //alert("加载成功");
            //console.log(msg);
            /*  if (msg.ok) {
                var value = msg.data;
                for (var i = 0; i < value.length; i++) {
                  self.push(value[i]);
                }

              }*/
            vm.tableData=msg;
          },
          error: function (err) {
            alert("加载0000失败");
          }
        });
      },
      handleEdit() {
      },
      handleDelete() {
      }
    }
  }

</script>

