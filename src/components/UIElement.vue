<template>
  <div class="ui">
  <div id="page-wrapper">
    <div class="header">
      <h1 class="page-header">
        巡检计划
      </h1>
      <ol class="breadcrumb">
        <li><a href="#">主页</a></li>
        <li><a href="#">巡检计划</a></li>
        <li class="active">数据</li>
      </ol>
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
                <div v-if=" dayobject.eventSign.flag===true" class="active"  :class="{error:dayobject.eventSign.arrList.error}" @click="showDetail(dayobject.eventSign.arrList)">
                  {{ dayobject.day.getDate() }}
                  <div class="showUser">{{dayobject.eventSign.arrList.duty_person}}</div>
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
          <div class="id btm">序号:{{event_item.ID}}</div>
          <div class="inspection btm">值班人姓名：{{event_item.inspection_person}}</div>
          <div class="name btm">巡检人员姓名：{{event_item.duty_person}}</div>
          <div class="time btm">巡检日期：{{event_item.create_date}}</div>
          <div class="calendar btm">巡检时间：{{event_item.calendar_date}}</div>
          <div class="condition btm">巡检状况：{{event_item.condition}}</div>
          <div class="summary btm">巡检总结：{{event_item.summary}}</div>
          <div class="abnormal btm">异常项：{{event_item.maintance}}</div>
          <!--  <div class="tel btm">联系电话：{{event_item.tel}}</div>-->

          <!--  <div class="dsc">巡检情况：
              <div class="item" v-for="(item, index) in event_item.dsc " :index="index">{{item}}</div>
            </div>-->
          <br>
          <el-button
            size="mini"
            @click="handleAdd()">添加</el-button>
          <el-button
            size="mini"
            @click="handleEdit()">编辑</el-button>
          <el-button
            size="mini"
            @click="handleView()">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete()">删除</el-button>
        </div>

      </div>
    </div>

  </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        arrDate: [10, 15],
        tempArr: [
          {
            error:true,
            duty_person: "wang",
            create_date: "2018-11-20",
            ID:1,
            inspection_person: "si",
            calendar_date: "9:30",
            condition: "great",
            summary: "normal",
            abnormal: "yes",
            maintance: "no"},
          {
            error:true,
            duty_person: "wang",
            create_date: "2018-11-20",
            ID:3,
            inspection_person: "si",
            calendar_date: "9:30",
            condition: "great",
            summary: "normal",
            abnormal: "yes",
            maintance: "no"}
          /*   { name: '老王', time: '2018-3-4', error: true, dsc: ['大坝无异常情况1', '输、泄水洞无异常情况1'], tel: '1234567',gender:'女' },
             { name: '老王', time: '2018-11-10', error: false, dsc: ['大坝无异常情况2', '输、泄水洞无异常情况2'], tel: '1234567',gender:'女' },
             { name: '老王', time: '2018-12-12', error: true, dsc: ['大坝无异常情况3', '输、泄水洞无异常情况3'], tel: '1234567' ,gender:'女'},
             { name: '老王', time: '2018-3-18', error: false, dsc: ['大坝无异常情况4', '输、泄水洞无异常情况4'], tel: '1234567',gender:'女' },
             { name: '老王', time: '2018-3-23', error: true, dsc: ['大坝无异常情况5', '输、泄水洞无异常情况5'], tel: '1234567' ,gender:'女'}
           ],
           event_item: { name: '老王', time: '2018-3-4', error: true, dsc: ['大坝无异常情况1', '输、泄水洞无异常情况1'], tel: '1234567',gender:'女' }
                }},*/
        ],
        event_item: {
          /* error:true,
           duty_person: "wang",
           create_date: "2018-11-20",
           ID:2,
           inspection_person: "si",
           calendar_date: "9:30",
           condition: "great",
           summary: "normal",
           abnormal: "yes",
           maintance: "no" */}
      }},
    created: function () { // 在vue初始化时调用
      this.initData(null)
    },
    methods: {
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
          var dayobject = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobject.day = d
          var tempTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          // var tempSign=this.isVerDate(d.getDate());
          var tempSign = this.isVerDate(tempTime)
          // console.log(tempSign);
          dayobject.eventSign = tempSign
          this.days.push(dayobject)// 将日期放入data 中的days数组 供页面渲染使用
        }
        // 其他周
        for (var i = 1; i <= 42 - this.currentWeek; i++) {
          var d = new Date(str)
          d.setDate(d.getDate() + i)
          var dayobject = {}
          // dayobject.day=d;
          var tempTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          var tempSign = this.isVerDate(tempTime)
          // console.log(tempSign);
          dayobject = { day: d, eventSign: tempSign }
          this.days.push(dayobject)
        }
      },
      isVerDate (v) {
        var temp = ''
        for (var i = 0; i < this.tempArr.length; i++) {
          if (this.tempArr[i].create_date === v) {
            temp = { flag: true, arrList: this.tempArr[i] }
            break
          } else {
            temp = { flag: false, arrList: '' }
          }
        }
        return temp
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
        console.log(v.row)
        this.event_item = v
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
    color: #f45246;
    border-radius: 50%;
    /*line-height: 70px;
     width:66px;*/
    margin-top:5px;
    line-height:56px;
    width:56px;
    margin-left:25px;
    position: relative;
    cursor: pointer;
    border:1px solid #f45246;
  }

  .days li .error{
    /* background: #f56246;
    border:1px solid #ccc;*/
    color:#f45246;
    margin-top:5px;
    line-height:56px;
    width:56px;
    margin-left:25px;
    border:1px solid #b8bfc1;
  }

  .days li .active .showUser {
    position: absolute;
    right: 0;
    top: 0;
    height: 20px;
    line-height: 20px;
  }
  .days li .other-month {
    /* padding: 5px; */
    color: gainsboro;
    line-height: 60px;
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
    color: #f45246;
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
  .title{
    color:#0f0f0f;
  }
</style>
