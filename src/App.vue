<template>
  <div id="app">
    <nav class="navbar navbar-default top-navbar" role="navigation">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle waves-effect waves-dark" data-toggle="collapse" data-target=".sidebar-collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand waves-effect waves-dark" href="index.html"><i class="large material-icons">track_changes</i> <strong>信息管理系统</strong></a>

        <div id="sideNav" href=""><i class="material-icons dp48">toc</i></div>
      </div>

      <ul class="nav navbar-top-links navbar-right">
        <li><a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown1"><i class="fa fa-user fa-fw"></i> <b>John Doe</b> <i class="material-icons right">arrow_drop_down</i></a></li>
      </ul>
    </nav>

    <nav class="navbar-default navbar-side" role="navigation">
      <div class="sidebar-collapse">
        <ul class="nav" id="main-menu">
<!--
          <li>
            <a class="active-menu waves-effect waves-dark" href="index.html"><i class="fa fa-dashboard"></i> Dashboard</a>
          </li>
          <li>
            <a href="ui-elements.html" class="waves-effect waves-dark"><i class="fa fa-desktop"></i> UI Elements</a>
          </li>
          <li>
            <a href="chart.html" class="waves-effect waves-dark"><i class="fa fa-bar-chart-o"></i> Charts</a>
          </li>
          <li>
            <a href="tab-panel.html" class="waves-effect waves-dark"><i class="fa fa-qrcode"></i> Tabs & Panels</a>
          </li>

          <li>
            <a href="table.html" class="waves-effect waves-dark"><i class="fa fa-table"></i> Responsive Tables</a>
          </li>
          <li>
            <a href="form.html" class="waves-effect waves-dark"><i class="fa fa-edit"></i> Forms </a>
          </li>

-->

          <li>
            <router-link to="/hello" class="active-menu waves-effect waves-dark"><i class="fa fa-dashboard"></i> 仪表盘</router-link>
          </li>
          <li>
            <router-link to="/uielement"class="waves-effect waves-dark"><i class="fa fa-desktop"></i> 巡检计划</router-link>
          </li>
          <li>
         <!--   <router-link to="/chart" class="waves-effect waves-dark"><i class="fa fa-bar-chart-o"></i> 数据分析</router-link>
          </li>-->
          <li>
            <router-link to="/tables" class="waves-effect waves-dark"><i class="fa fa-qrcode"></i>入廊作业</router-link>
          </li>
          <li>
            <router-link to="/forms" class="waves-effect waves-dark"><i class="fa fa-table"></i> 应急指挥 </router-link>
          </li>

          <li>
          <!--  <router-link to="/empty" class="waves-effect waves-dark"><i class="fa fa-fw fa-file"></i> 员工信息</router-link>
          </li>-->
          <li>
            <a href="#" class="waves-effect waves-dark"><i class="fa fa-sitemap"></i> 预案审批<span class="fa arrow"></span></a>
            <ul class="nav nav-second-level">
              <li>
                <a href="#">未完成审批</a>
              </li>
              <li>
                <a href="#">已完成审批</a>
              </li>
              <li>
                <a href="#">待审核审批<span class="fa arrow"></span></a>
                <ul class="nav nav-third-level">
                  <li>
                    <a href="#">Third Level Link</a>
                  </li>
                  <li>
                    <a href="#">Third Level Link</a>
                  </li>
                  <li>
                    <a href="#">Third Level Link</a>
                  </li>

                </ul>

              </li>
            </ul>
          </li>

        </ul>

      </div>

    </nav>
    <router-view/>
  </div>
</template>

<!-- Metis Menu Js -->


<script>
export default {
  name: 'App'

}
</script>
