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
     <table>
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
      <!--   <td><input @click="del(index)" type="button" value="删除"><input @click="add(index)" type="button" value="查看"></td>-->
       </tr>
     </table>
   </div>
  </div>
  <!-- /. PAGE WRAPPER  -->
</div>

</template>

<script>
    export default {
        name: "Forms",
      data() {
        return {
          people: [{
            id: "1",
            userName: 'hi',
            loginName: 'you',
            loginPwd: 'pwd',
            role: '1'
          }]
        }
      }
    }
  // import Vue from 'vue';

  // new Vue({
    //  el: '#page-wrapper',

 //   });
</script>

