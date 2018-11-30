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

    <div class="filter-container">
      <el-select v-model="listQuery.sort" style="width:120px; left:20px" class="filter-item"  @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"></el-option>
      </el-select>
      <el-select v-model="listQuery.activityRange" clearable style="width: 120px;left:10px" class="filter-item">
        <el-option v-for="item in rangeOptions" :key="item.key" :label="item" :value="item"></el-option>
      </el-select>
      <el-button class="filter-item" type="mini" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button size="mini" @click="dialogAddVisible=true">添加</el-button>
    </div>

  <div id="pageBody">
    <el-table
      :data="tableData"
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
        label="创建时间"
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
        label="操作"
        width="300"
        align="left">
        <!--<template slot="header" slot-scope="slot">-->
          <!--<el-button size="mini" @click="dialogAddVisible=true">添加</el-button>-->
          <!--<el-input-->
            <!--v-model="search"-->
            <!--size="mini"-->
            <!--placeholder="Type to search"/>-->
        <!--</template>-->
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            @click="handleCheck(scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button
            size="mini"
            @click="handleEvaluate(scope.row)">评价</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加记录":visible.sync="dialogAddVisible">
      <el-form>
        <el-form-item label="工期（天）":label-width="formLabelWidth">
          <el-input v-model="form.duration" prop="duration" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="施工人员数量":label-width="formLabelWidth">
          <el-input v-model="form.work_number" prop="work_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动范围":label-width="formLabelWidth">
          <el-select v-model="form.activity_range" prop="activity_range" placeholder="请选择活动区域">
            <el-option label="管廊1号" value="管廊1号"></el-option>
            <el-option label="管廊2号" value="管廊2号"></el-option>
            <el-option label="管廊3号" value="管廊3号"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible=false">取消</el-button>
        <el-button type="primary" @click="handleAdd">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看详细信息":visible.sync="dialogCheckVisible">
      <el-form>
        <el-form-item label="序号":label-width="formLabelWidth">
          <el-input v-model="form.id" prop="id" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="工期（天）":label-width="formLabelWidth">
          <el-input v-model="form.duration" prop="duration" autocomplete="off" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间":label-width="formLabelWidth">
          <el-input v-model="form.date" prop="date" autocomplete="off" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="施工人员数量":label-width="formLabelWidth">
          <el-input v-model="form.work_number" prop="work_number" autocomplete="off" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="活动范围":label-width="formLabelWidth">
          <el-select v-model="form.activity_range" prop="activity_range" placeholder="请选择活动区域" disabled="true">
            <el-option label="管廊1号" value="管廊1号"></el-option>
            <el-option label="管廊2号" value="管廊2号"></el-option>
            <el-option label="管廊3号" value="管廊3号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评价":label-width="formLabelWidth">
          <el-input v-model="form.evaluation" prop="evaluation" autocomplete="off" disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCheckVisible=false">取消</el-button>
        <el-button type="primary" @click="handleCheckConfirm()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑信息":visible.sync="dialogEditVisible">
      <el-form>
        <el-form-item label="序号":label-width="formLabelWidth">
          <el-input v-model="form.id" prop="id"></el-input>
        </el-form-item>
        <el-form-item label="工期（天）":label-width="formLabelWidth">
          <el-input v-model="form.duration" prop="duration" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间":label-width="formLabelWidth">
          <el-input v-model="form.date" prop="date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="施工人员数量":label-width="formLabelWidth">
          <el-input v-model="form.work_number" prop="work_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动范围":label-width="formLabelWidth">
          <el-select v-model="form.activity_range" prop="activity_range" placeholder="请选择活动区域">
            <el-option label="管廊1号" value="管廊1号"></el-option>
            <el-option label="管廊2号" value="管廊2号"></el-option>
            <el-option label="管廊3号" value="管廊3号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评价":label-width="formLabelWidth">
          <el-input v-model="form.evaluation" prop="evaluation" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible=false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogDeleteVisible" width="30%">
      <span>确认删除这条记录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible=false">取消</el-button>
        <el-button type="primary" @click="handleDeleteConfirm()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="作业评价":visible.sync="dialogEvaluateVisible">
      <el-form>
        <el-form-item label="评价">
          <el-input v-model="form.evaluation" prop="evaluation" type="textarea" placeholder="Please input evaluation"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEvaluateVisible=false">取消</el-button>
        <el-button type="primary" @click="handleEvaluateConfirm()">确定</el-button>
      </span>
    </el-dialog>
  </div>

</div>

</template>

<script>
    export default {
      data() {
        return {
          tableData: [],
          getUrl: 'http://10.112.17.185:8100/api/v1/info/entranceWork',
          search: '',
          transID:undefined,
          listQuery:{
            sort:'+id',
            activityRange:undefined
          },
          sortOptions:[{label:'ID Ascending',key:'+id'},{label:'ID Descending',key:'-id'}],
          rangeOptions:['管廊1号','管廊2号','管廊3号'],
          dialogCheckVisible: false,
          dialogAddVisible:false,
          dialogEditVisible:false,
          dialogDeleteVisible:false,
          dialogEvaluateVisible:false,
          form:{
            id:undefined,
            startDate:'',
            endDate:'',
            UserId:undefined

          },
          formLabelWidth:"120px"
        };
      },
      created: function () {
        this.getTableData()
      },
      methods: {
        getTableData() {
          var vm = this;
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
        resetForm(){
          this.form={
            id:undefined,
            duration:'',
            work_number:'',
            activity_range:'',
            evaluation:''
          }
        },
        handleAdd(){
          var vm=this
          this.form.date=new Date().getTime();
          var dataPost ={};
          dataPost.work_number = this.form.work_number;
          dataPost.duration = this.form.duration;
          dataPost.activity_range = this.form.activity_range;
          dataPost.date = this.form.date;
          console.log(dataPost);
          var dataPostString = JSON.stringify(dataPost);
          $.ajax({
            url:"http://10.112.17.185:8100/api/v1/info/entranceWork",
            type:"POST",
            contentType: "application/json;charset=utf-8",
            dataType:"JSON",
            data:dataPostString,
            success:function(msg){
              console.log("success");
              vm.getTableData();
              vm.dialogAddVisible=false;
              vm.resetForm();
              /*dialogAddVisible=false,
              vm.tableData=msg;
              this.resetForm();
              this.$nextTick(()=>{
                this.$refs['dataForm'].clearValidate()
              });*/
            },
            error:function (err) {
              alert("加载0001失败")
            }
          })

        },
        handleFilter(){

        },
        handleEdit(row) {
          var vm=this;
          const index=this.tableData.indexOf(row);
          this.transID=this.tableData[index].id;
          var dataEdit={}
          dataEdit.entranceId=this.transID;
          console.log(dataEdit);
          $.ajax({
            url:"http://10.112.17.185:8100/api/v1/info/entranceWorkById",
            type:"GET",
            contentType:"application/json",
            dataType:"JSON",
            data:dataEdit,
            success:function (msg) {
              vm.form.id=msg.id;
              vm.form.duration=msg.duration;
              vm.form.date=msg.date;
              vm.form.work_number=msg.work_number;
              vm.form.activity_range=msg.activity_range;
              vm.form.evaluation=msg.evaluation;
              vm.dialogEditVisible=true;
              console.log("查看编辑信息成功")
            },
            error:function (err) {
              alert("加载0005失败")
            }
          })
        },
        handleEditConfirm(){
          var vm=this;
          console.log(this.form);
          var editForm=JSON.stringify(this.form);
          $.ajax({
            url:"http://10.112.17.185:8100/api/v1/info/entranceWork",
            type:"PUT",
            contentType:"application/json",
            dataType:"JSON",
            data:editForm,
            success:function () {
              vm.dialogEditVisible=false;
              vm.getTableData();
              vm.resetForm()
            },
            error:function (err) {
              alert("加载0006失败")
            }
          })


        },
        handleCheck(row){
          var vm=this;
          const index = this.tableData.indexOf(row);
          this.transID=this.tableData[index].id;
          var dataGet={};
          dataGet.entranceId=this.transID;
          console.log(dataGet)
          $.ajax({
            url:"http://10.112.17.185:8100/api/v1/info/entranceWorkById",
            type:"GET",
            contentType:"application/json",
            dataType:"JSON",
            data:dataGet,
            success:function (msg) {
              vm.form.id=msg.id;
              vm.form.duration=msg.duration;
              vm.form.date=msg.date;
              vm.form.work_number=msg.work_number;
              vm.form.activity_range=msg.activity_range;
              vm.form.evaluation=msg.evaluation;
              vm.dialogCheckVisible=true;
              console.log("查看成功");
            },
            error:function (err) {
              alert("加载0002失败")
            }
          })

        },
        handleCheckConfirm(){
          this.dialogCheckVisible=false
        },
        handleDelete(row) {
          var vm=this;
          this.dialogDeleteVisible=true
          const index=this.tableData.indexOf(row)
          var currRow=index+1;
          this.transID=this.tableData[currRow-1].id;

          console.log(this.transID)
        },
        handleDeleteConfirm(){
          var vm=this;
          var dataDelete={}
          dataDelete.WorkId=this.transID;
          console.log(dataDelete)
          $.ajax({
            url:"http://10.112.17.185:8100/api/v1/info/entranceWorkById?WorkId="+dataDelete.WorkId,
            type:"DELETE",
            contentType:"application/json",
            dataType:"text",
            success:function () {
              vm.dialogDeleteVisible=false;
              vm.getTableData();
              console.log("删除成功")
            },
            error:function (err) {
              alert("加载0003失败")
            }

          })
        },
        handleEvaluate(row){
          var vm=this;
          const index=this.tableData.indexOf(row)
          this.transID=this.tableData[index].id;
          var dataEvaluate={};
          dataEvaluate.entranceId=this.transID;
          console.log(dataEvaluate)
          $.ajax({
            url:"http://10.112.17.185:8100/api/v1/info/entranceWorkById",
            type:"GET",
            contentType:"application/json",
            dataType:"JSON",
            data:dataEvaluate,
            success:function (msg) {
              vm.form.id=msg.id;
              vm.form.evaluation=msg.evaluation;
              vm.dialogEvaluateVisible=true;
              console.log("查看评价成功")
            },
            error:function (err) {
              alert("加载0006失败")
            }
          })
        },
        handleEvaluateConfirm(){
          var vm=this;
          var dataEvaluate={}
          dataEvaluate.id=this.form.id;
          dataEvaluate.evaluation=this.form.evaluation;
          var dataEvaluateString=JSON.stringify(dataEvaluate);
          console.log(dataEvaluate);
          $.ajax({
            url:"http://10.112.17.185:8100/api/v1/info/entranceWorkEvaluation",
            type:"PUT",
            contentType:"application/json;charset=utf-8",
            dataType:"text",
            data:dataEvaluateString,
            success:function(){
              vm.dialogEvaluateVisible=false;
              vm.getTableData();
              vm.resetForm()
              console.log("评价成功")
            },
            error:function (err) {
              alert("加载0004失败")
            }
          })
        }
      }
    }


</script>
