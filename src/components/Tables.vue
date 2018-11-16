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
      <button class="btn btn-primary btn-lg" style="position: absolute; left: 200px; top: 40px;" data-toggle="modal" data-target="#myModal">添加</button>
      </div>
      <div class="page-inner">
                      <div class="row">
                          <div class="col-md-12">
                  <div class="card">

                      <!--Modal-->
                      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
                          <div class="modal-dialog">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                      <h4 class="modal-title" id="myModalLabel">基本信息登记</h4>
                                  </div>
                                  <div class="modal-body">
                                      <form class="form-horizontal" role="form">
                                          <div class="form-group">
                                              <label for="timelimit" class="col-sm-2 control-label">工期（日）</label>
                                              <div class="col-sm-9">
                                                  <input type="text" id="timelimit" name="timelimit" class="form-control well" placeholder="请输入工期"/>
                                              </div>
                                          </div>
                                          <div class="form-group">
                                              <label for="starttime" class="col-sm-2 control-label">开始时间</label>
                                              <div class="col-sm-9">
                                                  <input type="text" id="starttime" name="starttime" class="form-control well" placeholder="请输入开始时间"/>
                                              </div>
                                          </div>
                                          <div class="form-group">
                                              <label for="builder" class="col-sm-2 control-label">施工单位</label>
                                              <div class="col-sm-9">
                                                  <input type="text" id="builder" name="builder" class="form-control well" placeholder="请输入施工单位"/>
                                              </div>
                                          </div>
                                          <div class="form-group">
                                              <label for="arealimit" class="col-sm-2 control-label">活动范围（km）</label>
                                              <div class="col-sm-9">
                                                  <input type="text" id="arealimit" name="arealimit" class="form-control well" placeholder="请输入活动范围"/>
                                              </div>
                                          </div>
                                      </form>
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                      <button type="button" class="btn btn-primary">提交更改</button>
                                  </div>
                              </div>
                          </div>

                      </div>
                      <div class="card-content">
                          <div class="table-responsive">


                  <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                      <thead>
                      <tr>
                          <th>序号</th>
                          <th>工期</th>
                          <th>时间</th>
                          <th>施工单位</th>
                          <th>活动范围</th>
                          <th>操作</th>
                      </tr>
                      </thead>>

                      <tbody>
                      <tr>
                          <td>1</td>
                          <td>20</td>
                          <td>2018-10-10</td>
                          <td>BUPT</td>
                          <td>2</td>
                          <td><button data-toggle="modal" data-target="#edititem">修改</button><button>查看</button><button>删除</button><button>评价</button></td>
                      </tr>
                      <tr>
                          <td>2</td>
                          <td>30</td>
                          <td>2018-10-15</td>
                          <td>BUPT</td>
                          <td>20</td>
                          <td><button data-toggle="modal" data-target="#edititem">修改</button><button>查看</button><button>删除</button><button>评价</button></td>
                      </tr>
                      <tr>
                          <td>3</td>
                          <td>30</td>
                          <td>2018-10-25</td>
                          <td>BUPT</td>
                          <td>10</td>
                          <td><button data-toggle="modal" data-target="#edititem">修改</button><button>查看</button><button>删除</button><button>评价</button></td>
                      </tr>
                      <tr>
                          <td>4</td>
                          <td>30</td>
                          <td>2018-10-15</td>
                          <td>BUPT</td>
                          <td>20</td>
                          <td><button data-toggle="modal" data-target="#edititem">修改</button><button>查看</button><button>删除</button><button>评价</button></td>
                      </tr>
                      <tr>
                          <td>5</td>
                          <td>30</td>
                          <td>2018-10-15</td>
                          <td>BUPT</td>
                          <td>20</td>
                          <td><button data-toggle="modal" data-target="#edititem">修改</button><button>查看</button><button>删除</button><button>评价</button></td>
                      </tr>
                      </tbody>


                  </table>
                              <!--Modal-->
                              <div class="modal fade" id="edititem" tabindex="-1" role="dialog" aria-labelledby="edititem" aria-hidden="true">
                                  <div class="modal-dialog">
                                      <div class="modal-content">
                                          <div class="modal-header">
                                              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                              <h4 class="modal-title" id="edititemLabel">基本信息登记</h4>
                                          </div>
                                          <div class="modal-body">
                                              <form class="form-horizontal" role="form">
                                                  <div class="form-group">
                                                      <label for="edittimelimit" class="col-sm-2 control-label">工期（日）</label>
                                                      <div class="col-sm-9">
                                                          <input type="text" id="edittimelimit" name="edittimelimit" class="form-control well" placeholder="请输入工期"/>
                                                      </div>
                                                  </div>
                                                  <div class="form-group">
                                                      <label for="editstarttime" class="col-sm-2 control-label">开始时间</label>
                                                      <div class="col-sm-9">
                                                          <input type="text" id="editstarttime" name="editstarttime" class="form-control well" placeholder="请输入开始时间"/>
                                                      </div>
                                                  </div>
                                                  <div class="form-group">
                                                      <label for="editbuilder" class="col-sm-2 control-label">施工单位</label>
                                                      <div class="col-sm-9">
                                                          <input type="text" id="editbuilder" name="editbuilder" class="form-control well" placeholder="请输入施工单位"/>
                                                      </div>
                                                  </div>
                                                  <div class="form-group">
                                                      <label for="editarealimit" class="col-sm-2 control-label">活动范围（km）</label>
                                                      <div class="col-sm-9">
                                                          <input type="text" id="editarealimit" name="editarealimit" class="form-control well" placeholder="请输入活动范围"/>
                                                      </div>
                                                  </div>
                                              </form>
                                          </div>
                                          <div class="modal-footer">
                                              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                              <button type="button" class="btn btn-primary">提交更改</button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      </div>
                          </div>
                      </div>
      </div>



  </div>

</template>

<script>

    export default {
        name: "Tables"
    }

</script>
