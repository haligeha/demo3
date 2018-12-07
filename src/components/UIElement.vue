<template>

  <div class="charts">
    <div id="page-wrapper" >
      <div class="header">
        <h1 class="page-header">
          工作日历
        </h1>
        <ol class="breadcrumb">
          <li><router-link to="/hello"> <a href="#">主页</a></router-link></li>
          <li><a href="#">工作日历</a></li>
          <li class="active">数据</li>
        </ol>
      </div>
      <div class="container">
        <!-- <div class="container">-->
        <div id="calendar">
          <!-- 年份 月份 -->
          <div class="month">
            <ul>
              <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
              <li class="arr" @click="pickPre(currentYear,currentMonth)">❮</li>
              <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                <span class="choose-year">{{ currentYear }}年{{ currentMonth }}月</span>
                <!--    <span class="choose-month">{{ currentMonth }}月</span>-->
              </li>
              <li class="arr" @click="pickNext(currentYear,currentMonth)">❯</li>
            </ul>
          </div>
          <!-- 星期 -->
          <ul class="weekdays">
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>日</li>
            <!-- <li style="color:red">六</li>
             <li style="color:red">日</li>-->
          </ul>
          <!-- 日期 -->
          <ul class="days">
            <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
            <li v-for="dayobject in days">
              <!--本月-->
              <!--如果不是本月  改变类名加灰色-->

              <div v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</div>

              <!--如果是本月  还需要判断是不是这一天-->
              <div v-else>
                <!--今天  同年同月同日-->
                <!--  <div v-if=" dayobject.eventSign.flag===true" class="active" :class="{error:dayobject.eventSign[0].arrList.error}" @click="showDetail(dayobject)">-->
                <div v-if="dayobject.eventSign.length>0" class="active" @click="showDetail(dayobject)">
                  {{ dayobject.day.getDate() }}
                  <!--   <div class="showUser">{{dayobject.eventSign.arrList.duty_person}}</div>-->
                  <!--    <span v-if=" dayobject.eventSign.flag===true" :class="{imp:dayobject.eventSign.arrList.imp}" @click="showDetail(dayobject.eventSign.arrList)" v-show="isShow">


                      </span>-->
                </div>


                <div v-else class="normal">{{ dayobject.day.getDate() }}</div>
              </div>

            </li>
          </ul>
        </div>

        <div class="showEvent">
          <div class="title">巡检情况</div>

          <!--   <div class="name btm">巡检人员姓名：{{event_item.name}}</div>
             <div class="tel btm">联系电话：{{event_item.tel}}</div>
             <div class="gender btm">巡检性别：{{event_item.gender}}</div>
             <div class="time btm">巡检时间：{{event_item.time}}</div>
             <div class="dsc">巡检情况：
               <div class="item" v-for="(item, index) in event_item.dsc " :index="index">{{item}}</div>
             </div>-->
          <!--  <div class="id btm">序号:{{event_item.ID}}</div>
            <div class="inspection btm">值班人姓名：{{event_item.inspection_person}}</div>
            <div class="name btm">巡检人员姓名：{{event_item.duty_person}}</div>
            <div class="time btm">巡检日期：{{event_item.create_date}}</div>
            <div class="calendar btm">巡检时间：{{event_item.calendar_date}}</div>
            <div class="condition btm">巡检状况：{{event_item.condition}}</div>
            <div class="summary btm">巡检总结：{{event_item.summary}}</div>
            <div class="abnormal btm">异常项：{{event_item.maintance}}</div>-->

          <div class="item" v-for="event in items">
            序号:{{event.ID}}<br>
            值班人姓名：{{event.duty_person}}<br>
            巡检人员姓名：{{event.inspection_person}}<br>
            巡检日期：{{event.calendar_date}}<br>
            <!--     巡检时间：{{event.calendar_date}}<br>
                 巡检状况：{{event.condition}}<br>
                 巡检总结：{{event.summary}}<br>
                 异常项：{{event.maintance}}<br>-->
            <div class="buttonstyle">
              <el-button
                size="mini"
                @click="handleEdit(event.ID)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleCheck(event.ID)">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(event.ID)">删除</el-button>
            </div>

          </div>

          <i class="el-icon-circle-plus-outline" size="large" @click="dialogAddVisible=true"></i>

        </div>

        <!--  <div class="tel btm">联系电话：{{event_item.tel}}</div>-->

        <!--  <div class="dsc">巡检情况：
            <div class="item" v-for="(item, index) in event_item.dsc " :index="index">{{item}}</div>
          </div>-->
        <!-- <br>
         <el-button
           size="mini"
           @click="handleAdd()">添加</el-button>
         <el-button
           size="mini"
           @click="handleEdit()">编辑</el-button>
         <el-button
           size="mini"
           type="danger"
           @click="handleDelete()">删除</el-button>-->

        <!--tianjia-->
        <el-dialog title="添加信息":visible.sync="dialogAddVisible">
          <el-form>
            <el-form-item label="值班人":label-width="formLabelWidth">
              <el-input v-model="form.duty_person" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="巡检人员":label-width="formLabelWidth">
              <el-input v-model="form.inspection_person"autocomplete="off"></el-input>
            </el-form-item>
            <!--  <el-form-item label="创建日期":label-width="formLabelWidth">
              <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期":picker-options="pickerOptions0">
              </el-date-picker>
              </el-form-item>-->
            <!-- <el-form-item label="创建时间":label-width="formLabelWidth">
               <el-input v-model="form.calendar_date" autocomplete="off"></el-input>-->
            <!--  <el-time-picker v-model="form.calendar_date" placeholder="任意时间点" value-format="HH:mm" format="HH:mm">
              </el-time-picker>
            </el-form-item>-->
            <el-form-item label="巡检时间" :label-width="formLabelWidth">
              <el-date-picker v-model="form.calendar_date" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="巡检总况" :label-width="formLabelWidth">
              <el-input v-model="form.state" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="巡检内容总结" :label-width="formLabelWidth">
              <el-input v-model="form.summary" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="异常项" :label-width="formLabelWidth">
              <el-input v-model="form.abnormal" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="维护信息" :label-width="formLabelWidth">
              <el-input v-model="form.maintenance" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddVisible=false">取消</el-button>
            <el-button type="primary" @click="handleAdd">确定</el-button>
          </div>
        </el-dialog>

        <!--bianji-->
        <el-dialog title="编辑信息":visible.sync="dialogEditVisible">
          <el-form>
            <el-form-item label="序号":label-width="formLabelWidth">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="值班人":label-width="formLabelWidth">
              <el-input v-model="form.duty_person" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="巡检人员":label-width="formLabelWidth">
              <el-input v-model="form.inspection_person"autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="创建日期":label-width="formLabelWidth" disable="true">
              <el-input v-model="form.create_date" autocomplete="off" >
              </el-input>
            </el-form-item>
            <el-form-item label="巡检时间":label-width="formLabelWidth">
              <el-input v-model="form.calendar_date" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="巡检总况":label-width="formLabelWidth">
              <el-input v-model="form.state" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="巡检内容总结":label-width="formLabelWidth">
              <el-input v-model="form.summary" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="异常项":label-width="formLabelWidth">
              <el-input v-model="form.abnormal" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="维护信息":label-width="formLabelWidth">
              <el-input v-model="form.maintenance" autocomplete="off" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEditVisible=false">取消</el-button>
            <el-button type="primary" @click="handleEditConfirm()">确定</el-button>
          </div>
        </el-dialog>

        <!--xiangqing-->
        <el-dialog title="查看详细信息":visible.sync="dialogCheckVisible">
          <!-- <el-form>
             <el-form-item label="序号":label-width="formLabelWidth">
               <el-input v-model="form.id" disabled="true"></el-input>
             </el-form-item>
             <el-form-item label="值班人":label-width="formLabelWidth">
               <el-input v-model="form.duty_person" autocomplete="off" disabled="true" ></el-input>
             </el-form-item>
             <el-form-item label="巡检人员":label-width="formLabelWidth">
               <el-input v-model="form.inspection_person"autocomplete="off" disabled="true"></el-input>
             </el-form-item>
             <el-form-item label="创建日期":label-width="formLabelWidth">
               <el-input v-model="form.create_date" autocomplete="off" disabled="true"></el-input>
             </el-form-item>
             <el-form-item label="巡检时间":label-width="formLabelWidth">
               <el-input v-model="form.calendar_date" autocomplete="off" disabled="true"></el-input>
             </el-form-item>
             <el-form-item label="巡检总况":label-width="formLabelWidth">
               <el-input v-model="form.state" autocomplete="off" disabled="true"></el-input>
             </el-form-item>
             <el-form-item label="巡检内容总结":label-width="formLabelWidth">
               <el-input v-model="form.summary" autocomplete="off" disabled="true"></el-input>
             </el-form-item>
             <el-form-item label="异常项":label-width="formLabelWidth">
               <el-input v-model="form.abnormal" autocomplete="off"  disabled="true"></el-input>
             </el-form-item>
             <el-form-item label="维护信息":label-width="formLabelWidth">
               <el-input v-model="form.maintenance" autocomplete="off" disabled="true"></el-input>
             </el-form-item>
           </el-form>-->
          <el-form>
            <el-form-item label="序号":label-width="formLabelWidth">
              <el-input v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="值班人":label-width="formLabelWidth">
              <el-input v-model="form.duty_person" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="巡检人员":label-width="formLabelWidth">
              <el-input v-model="form.inspection_person"autocomplete="off" :disabled="true" ></el-input>
            </el-form-item>
            <el-form-item label="创建日期":label-width="formLabelWidth">
              <el-input v-model="form.create_date" autocomplete="off" :disabled="true">
              </el-input>
            </el-form-item>
            <el-form-item label="巡检时间":label-width="formLabelWidth">
              <el-input v-model="form.calendar_date" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="巡检总况":label-width="formLabelWidth">
              <el-input v-model="form.state" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="巡检内容总结":label-width="formLabelWidth">
              <el-input v-model="form.summary" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="异常项":label-width="formLabelWidth">
              <el-input v-model="form.abnormal" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="维护信息":label-width="formLabelWidth">
              <el-input v-model="form.maintenance" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCheckVisible=false">取消</el-button>
            <el-button type="primary" @click="handleCheckConfirm()">确定</el-button>
          </div>
        </el-dialog>
        <!--  <el-dialog title="添加信息":visible.sync="dialogAddVisible">
            <el-form>

              <el-form-item label="值班人":label-width="formLabelWidth">
                <el-input v-model="form.duty_person" prop="duty_person" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="巡检人员":label-width="formLabelWidth">
                <el-input v-model="form.inspection_person" prop="inspection_person" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="巡检总况":label-width="formLabelWidth">
                <el-input v-model="form.condition" prop="condition" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="巡检内容总结":label-width="formLabelWidth">
                <el-input v-model="form.summary" prop="summary" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="异常项":label-width="formLabelWidth">
                <el-input v-model="form.abnormal" prop="abnormal" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="维护信息":label-width="formLabelWidth">
                <el-input v-model="form.maintenance" prop="maintenance" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogAddVisible=false">取消</el-button>
              <el-button type="primary" @click="handleAdd()">确定</el-button>
            </div>
          </el-dialog>-->
        <!--shanchu-->
        <el-dialog title="提示" :visible.sync="dialogDeleteVisible" width="30%">
          <span>确认删除这条记录？</span>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible=false">取消</el-button>
        <el-button type="primary" @click="handleDeleteConfirm()">确定</el-button>
      </span>
        </el-dialog>
      </div>
    </div>
  </div>


</template>
<script>
  export default {
    data() {
      return {
        dialogAddVisible: false,
        dialogDeleteVisible:false,
        dialogCheckVisible:false,
        dialogEditVisible:false,
        transID:undefined,
        tempArr: [],
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        items: [],
        arrDate: [10, 15],
        isShow: false,
        getUrl: 'http://10.112.17.185:8100/api/v1/info/allReport',
        form: {
          id: undefined,
          duty_person: '',
          inspection_person: '',
          create_date: '',
          calendar_date: '',
          state:'',
          summary: '',
          abnormal: '',
          maintenance: ''
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now()-8.64e7;
          }
        },
        formLabelWidth: "120px"
      };


    },

    created: function () { // 在vue初始化时调用//
      this.getTempArr();
      //  this.initData()
    },

    methods: {
      getTempArr: function () {
        var vm = this;

        //   var mm={ID:undefined,duty_person:"",inspeciton_person:"",create_date:""};

        function TimestampToTime(create_date) {
          var date = new Date(create_date * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate();
          return Y + M + D
        }

        $.ajax({
          type: "GET",
          dataType: "JSON",
          //  header:"Access-Control-Allow-Origin:  http://10.112.17.185:8100",
          url: "http://10.112.17.185:8100/api/v1/info/allReport",
          success: function (msg) {
            console.log("hello");
            for (var x = 0; x < msg.length; x++) {
              var mm = {};
              mm.ID = msg[x].id;
              mm.duty_person = msg[x].duty_person;
              mm.inspection_person = msg[x].inspection_person;
              mm.create_date=TimestampToTime(msg[x].create_date)
              mm.calendar_date = TimestampToTime(msg[x].calendar_date);
              console.log(mm.ID + "idddddd")
              console.log(vm.tempArr[0] + "idddd");
              vm.tempArr.push(mm);

            }
            //  vm.tempArr.push(mm);
            console.log(1);
            vm.initData(null);
          },
          error: function (err) {
            alert("加载0000失败");
          }
        });

      },
      initData: function (cur) {
        //    var leftcount = 0
        var date
        if (cur) {
          console.log(cur)
          date = new Date(cur)
        } else {
          var now = new Date()
          var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))
          d.setDate(42)
          date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
        }
        this.currentDay = date.getDate()

        this.currentYear = date.getFullYear()

        this.currentMonth = date.getMonth() + 1
        console.log("223333333" + "    " + this.currentMonth);
        this.currentWeek = date.getDay() // 1...6,0

        if (this.currentWeek === 0) {
          this.currentWeek = 7
        }
        var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个
        // 初始化本周
        for (var i = this.currentWeek - 1; i >= 0; i--) {
          var d = new Date(str)
          d.setDate(d.getDate() - i)
          var dayobject = {}// 用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobject.day = d
          var tempTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          // var tempSign=this.isVerDate(d.getDate());
          var tempSign = this.isVerDate(tempTime)
          // console.log(tempSign);
          dayobject.eventSign = tempSign
          //   this.days.push(dayobject)// 将日期放入data 中的days数组 供页面渲染使用
          if (tempSign.length > 0) {
            // console.log(tempSign);
            dayobject = {day: d, eventSign: tempSign[0]}
            console.log("1111");
            //        dayobject = {day: d, eventSign: tempSign[0]}
            this.days.push(dayobject)
          }
          //    }
          else {
            dayobject = {day: d, eventSign: []}
            this.days.push(dayobject)
          }

        }
        // 其他周
        for (var i = 1; i <= 42 - this.currentWeek; i++) {
          var d = new Date(str)
          d.setDate(d.getDate() + i)

          var dayobject = {}
          // dayobject.day=d;
          var tempTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          var tempSign = this.isVerDate(tempTime)
          //console.log(tempSign[0]);
          var maxy = [];
          var ma = [];
          if (tempSign.length > 0) {
            console.log("12333333" + tempSign.length);
            for (var m = 0; m < tempSign.length; m++) {
              //   dayobject = {day: d, eventSign: tempSign[i]}
              ma = tempSign[m];
              maxy.push(ma);

            }
            dayobject = {day: d, eventSign: maxy}
            console.log(dayobject.eventSign[0].flag + "hahhahahhahahhaha");
            this.days.push(dayobject)
          }
          else {
            dayobject = {day: d, eventSign: []}
            this.days.push(dayobject)
            console.log("cesshshishihi" + d.getDate())
          }


        }
      },
      /*  TimestampToTime:function(timestamp){
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        return Y + '-' + M + '-' +D
      },*/



      isVerDate(v) {
        console.log(2)
        //  console.log(this.tempArr);
        var tem = new Array();
        var temp = ''

        for (var i = 0; i < this.tempArr.length; i++) {
          console.log(this.tempArr[i].create_date + this.tempArr[i].ID + "this.tempArr[0]");
          console.log(v + "this.tempArr[0]");
          if (this.tempArr[i].create_date === v) {

            temp = {flag: true, arrList: this.tempArr[i]}
            console.log("the first time");
            tem.push(temp)
            // break
          } else {
            temp = {flag: false, arrList: ''}
            //    tem.push(temp)
          }
          ;
        }
        //console.log(tem);
        return tem;
      },
      pickPre: function (year, month) {
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        var d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },
      pickNext: function (year, month) {
        var d = new Date(this.formatDate(year, month, 1))
        d.setDate(42)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },
      pickYear: function (year, month) {
        alert(year + ',' + month)
      },

      // 返回 类似 2016-01-02 格式的字符串
      formatDate: function (year, month, day) {
        var y = year
        var m = month
        if (m < 10) m = '0' + m
        var d = day
        if (d < 10) d = '0' + d
        return y + '-' + m + '-' + d
      },


      // 点击显示该日期的数据
      showDetail: function (v) {
        this.items = [];
        console.log(v)
        var m = [];
        //   for(var i=0;i<v.length;i++)this.event_item = v[i];
        for (var i = 0; i < v.eventSign.length; i++) {
          m = v.eventSign[i].arrList;
          //   this.event_item=m;
          this.items.push(m);
          console.log(this.items[i].ID + "wawawawawawaawa");
        }
        //  this.event_item = v;
      },

      handleAdd() {
        var vm = this
        this.form.create_date = Math.round(new Date().getTime()/1000).toString();
        this.form.calendar_date = Math.round(new Date(this.form.calendar_date).getTime()/1000).toString();
        var dataPost = {};
        dataPost.duty_person = this.form.duty_person;
        dataPost.inspection_person = this.form.inspection_person;
        dataPost.create_date = this.form.create_date;
        dataPost.calendar_date = this.form.calendar_date;
        dataPost.state = this.form.state;
        dataPost.summary = this.form.summary;
        dataPost.abnormal = this.form.abnormal;
        dataPost.maintenance = this.form.maintenance;
        console.log(dataPost);
        var dataPostString = JSON.stringify(dataPost);
        $.ajax({
          url: "http://10.112.17.185:8100/api/v1/info/inspection",
          type: "POST",
          contentType: "application/json;charset=utf-8",
          dataType: "text",
          data: dataPostString,
          success: function (msg) {
            console.log("success");
            vm.dialogAddVisible = false;
            vm.resetForm();
            vm.getTempArr();
            window.location.reload();

            /*dialogAddVisible=false,
            vm.tableData=msg;
            this.resetForm();
            this.$nextTick(()=>{
              this.$refs['dataForm'].clearValidate()
            });*/
          },
          error: function (err) {
            alert("加载0001失败")
          }
        })

      },
      resetForm() {

        this.form = {
          id: undefined,
          duty_person: '',
          inspection_person: '',
          create_date: '',
          calendar_date: '',
          state:'',
          summary:'',
          abnormal:'',
          maintenance:''
        }
      },
      /* handleCheck(id){
        function Time(create_date) {
           var date = new Date(create_date * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
           var Y = date.getFullYear() + '-';
           var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
           var D = date.getDate();
           return Y + M + D
         }
         function Hour(create_date){
          var date= new Date(create_date*1000);
           var Y = date.getFullYear() + '-';
           var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
           var D = date.getDate()+' ';*/
      /*   function test(h2) {
           if ( h2< 10) {
           //  h2 = date.getHours() + ':';
             console.log("h2<10");
             h2 = "0" + h2;
           }
           else {
             h2=h2;
             console.log("h2>10");
           }
           return h2;
         }
         var h=test(date.getHours())+':';*/
      //   var h=date.getHours()+':'
      //    console.log(h+"timehour");
      //  var h=date.getHours()+':';
      /*    var m;
          if(date.getMinutes()<10){
            m="0"+date.getMinutes();
          }
          else{
            m=date.getMinutes();
          }*/
      /*  var m = date.getMinutes();
         return Y + M + D+h+m;
        }
        var vm=this;
        this.transID=id;
        var dataGet={};
        dataGet.reportId=this.transID;
        console.log(dataGet)
        $.ajax({
          url:"http://10.112.17.185:8100/api/v1/info/inspectionById",
          type:"GET",
          contentType:"application/json;charset=UTF-8",
          dataType:"JSON",
          data:dataGet,
          success:function (msg) {
            vm.form.id=msg.id;
            vm.form.duty_person=msg.duty_person;
            vm.form.inspection_person=msg.inspection_person;
            vm.form.create_date=Hour(msg.create_date);
            vm.form.calendar_date=Time(msg.calendar_date)
            vm.form.state=msg.state;
            vm.form.summary=msg.summary;
            console.log(msg.summary+"summmmm");
            vm.form.abnormal=msg.abnormal;
            vm.form.maintenance=msg.maintenance;
            vm.dialogCheckVisible=true;
            console.log("查看成功");
          },
          error:function (err) {
            alert("加载0002失败")
          }
        })

      },*/
      handleCheck(id) {
        function Time(create_date) {
          var date = new Date(create_date * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate();
          return Y + M + D;
        }
        function Hour(create_date){
          var date= new Date(create_date*1000);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate()+' ';
          // var h=date.getHours()+':';
          // var m = date.getMinutes();
          function test(h2) {
            if ( h2< 10) {
              //  h2 = date.getHours() + ':';
              console.log("h2<10");
              h2 = "0" + h2;
            }
            else {
              h2=h2;
              console.log("h2>10");
            }
            return h2;
          }
          var h=test(date.getHours())+':';

          var m=test(date.getMinutes());
          return Y + M + D+h+m;
        }
        var vm=this;
        this.transID=id;
        var dataCheck={}
        dataCheck.reportId=this.transID;
        console.log(dataCheck);
        $.ajax({
          url:"http://10.112.17.185:8100/api/v1/info/inspectionById",
          type:"GET",
          //   contentType:"application/json",
          dataType:"JSON",
          data:dataCheck,
          success:function (msg) {
            vm.form.id=msg.id;
            vm.form.duty_person=msg.duty_person;
            vm.form.inspection_person=msg.inspection_person;
            vm.form.create_date=Hour(msg.create_date);
            vm.form.calendar_date=Time(msg.calendar_date);
            vm.form.state=msg.state;
            vm.form.summary=msg.summary;
            vm.form.abnormal=msg.abnormal;
            vm.form.maintenance=msg.maintenance;
            vm.dialogCheckVisible=true;
            console.log("查看信息成功")
          },
          error:function (err) {
            alert("加载0005失败")
          }
        })
      },
      handleCheckConfirm(){
        this.dialogCheckVisible=false;
      },
      handleEdit(id) {
        function Time(create_date) {
          var date = new Date(create_date * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate();
          return Y + M + D;
        }
        function Hour(create_date){
          var date= new Date(create_date*1000);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = date.getDate()+' ';
          // var h=date.getHours()+':';
          // var m = date.getMinutes();
          function test(h2) {
            if ( h2< 10) {
              //  h2 = date.getHours() + ':';
              console.log("h2<10");
              h2 = "0" + h2;
            }
            else {
              h2=h2;
              console.log("h2>10");
            }
            return h2;
          }
          var h=test(date.getHours())+':';

          var m=test(date.getMinutes());

          return Y + M + D+h+m;
        }
        var vm=this;
        this.transID=id;
        var dataEdit={}
        dataEdit.reportId=this.transID;
        console.log(dataEdit);
        $.ajax({
          url:"http://10.112.17.185:8100/api/v1/info/inspectionById",
          type:"GET",
          //   contentType:"application/json",
          dataType:"JSON",
          data:dataEdit,
          success:function (msg) {
            vm.form.id=msg.id;
            vm.form.duty_person=msg.duty_person;
            vm.form.inspection_person=msg.inspection_person;
            vm.form.create_date=Hour(msg.create_date);
            vm.form.calendar_date=Time(msg.calendar_date);
            vm.form.state=msg.state;
            vm.form.summary=msg.summary;
            vm.form.abnormal=msg.abnormal;
            vm.form.maintenance=msg.maintenance;
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
        this.form.calendar_date = Math.round(new Date(this.form.calendar_date).getTime()/1000).toString();
        this.form.create_date = Math.round(new Date(this.form.create_date).getTime()/1000).toString();
        console.log(this.form.calendar_date);
        var dataPost = {};
        dataPost.id = this.form.id;
        dataPost.duty_person = this.form.duty_person;
        dataPost.inspection_person = this.form.inspection_person;
        dataPost.create_date = this.form.create_date;
        dataPost.calendar_date = this.form.calendar_date;
        dataPost.state = this.form.state;
        dataPost.summary = this.form.summary;
        dataPost.abnormal = this.form.abnormal;
        dataPost.maintenance = this.form.maintenance;
        var reportInfo=JSON.stringify(dataPost);
        console.log(reportInfo+"sing a song")
        $.ajax({
          url:"http://10.112.17.185:8100/api/v1/info/inspection",
          type:"PUT",
          contentType:"application/json",
          dataType:"JSON",
          data:reportInfo,
          success:function () {
            vm.dialogEditVisible=false;
            vm.getTempArr();
            window.location.reload();
            vm.resetForm()
          },
          error:function (err) {
            alert("加载0006失败")
          }
        })


      },
      handleDelete(id) {
        var vm=this;
        this.dialogDeleteVisible=true

        this.transID=id;

        console.log(this.transID)
      },
      handleDeleteConfirm(){
        var vm=this;
        var dataDelete={}
        dataDelete.inspectionId=this.transID;
        console.log(dataDelete)
        $.ajax({
          url:"http://10.112.17.185:8100/api/v1/info/inspectionId?inspectionId="+dataDelete.inspectionId,
          type:"DELETE",
          contentType:"application/json",
          dataType:"text",
          //    data: dataDelete,
          success:function () {
            vm.dialogDeleteVisible=false;
            vm.getTempArr();
            window.location.reload();
            console.log("删除成功")
          },
          error:function (err) {
            alert("加载0003失败")
          }

        })
      }


    }
  }
</script>
<style>
  * {
    box-sizing: border-box;
  }
  ul {
    list-style-type: none;
  }
  .container{
    width: 100%;
    height:100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  #calendar {
    width: 100%;
    margin: 0 auto;
    /* box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12); */
  }
  .arr {
    padding: 15px;
  }
  .month {
    width: 100%;
    background: #f45246;
  }
  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }
  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
  }
  .choose-month {
    text-align: center;
    font-size: 1.5rem;
  }
  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }
  .month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    color: #f78989;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }
  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    height: 70px;
    text-align: center;
    font-size: 1rem;
    color: #000;
  }
  .days li .active {
    /*  background: #00B8EC;*/
    /*   color: #f45246;
       border-radius: 50%;
       margin-top:5px;
       line-height:56px;
       width:56px;
       margin-left:25px;
       position: relative;
       cursor: pointer;
       border:1px solid #f45246;*/
    width:56px;
    height:10px;
    border-width:0 0 15px 15px;
    border-style:solid;
    border-color:transparent transparent transparent #6c6;
    margin:30px auto;
    margin-left:5px;
    position:relative;
  }

  .days li .error{
    /* background: #f56246;
    border:1px solid #ccc;*/
    /*   color:#f45246;
       margin-top:5px;
       line-height:56px;
       width:56px;
       margin-left:25px;
       border:1px solid #b8bfc1;*/
    width:56px;
    height:10px;
    border-width:0 0 15px 15px;
    border-style:solid;
    border-color: transparent transparent transparent #ff6f00;
    margin:25px auto;
    margin-left:5px;
    position:relative;
  }
  .days li .imp{

    border-width:0px 0px 15px 15px;
    border-style:solid;
    border-color: transparent transparent  #651fff transparent ;
    margin-left:35px;
    position:relative;
  }

  /* .days li .active .showUser {
     position: absolute;
     right: 0;
     top: 0;
     height: 20px;
     line-height: 20px;
   }*/
  .days li .other-month {
    /* padding: 5px; */
    color: gainsboro;
    line-height: 70px;
  }

  .days li .normal {
    line-height: 70px;
  }

  .days li:hover {
    background: #e1e1e1;
  }

  .container .showEvent{
    min-width: 400px;
  }
  .container .showEvent .title{
    width: 100%;
    height: 55px;
    /* background: rgb(188,143,143);
     background:#d65959;*/
    background:#fff;
    line-height: 55px;
    font-size: 20px;
    color: #bc8f8f;
    font-weight: bold;
    text-align: center;
  }

  .container .showEvent .btm{
    line-height: 40px;
    border-bottom: 1px solid #ccc;

  }
  .container .showEvent>div:not(first){
    padding: 5px 5px;

  }
  .normal{
    font-family: Verdana, sans-serif;
    background: #ffffff;
    /* border:1px solid #ccc*/
  }
  .showEvent{
    border-left:1px solid #ccc;
    background-color:#ffffff;
  }
  .item{
    margin-left:10px;
    padding:50px; width:380px; height:143px;
    line-height:22px;
    border: 0.8px solid #bc8f8f;
    /*background-color: #e0e8f5;*/
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    border-radius:15px;
  }
  .buttonstyle{
    margin-top:5px;
  }
  .title{
    color:#0f0f0f;
  }
  .el-icon-circle-plus-outline{
    font-size:60px;
    color:#f45246;
    position: fixed;
    bottom: 40px;
    right: 50px;

  }
</style>
