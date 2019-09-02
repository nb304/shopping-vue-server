<template>
  <div id="chatInfoDiv">
    <el-row>
      <el-row style="height: 40px;">
        <el-col :span="8">
          <el-input
            size="mini"
            placeholder="请输入内容"
            style="width: 70% !important; margin-left: 10px;">
          </el-input>
        </el-col>
        <el-col :span="16"
                style="padding-left: 20px; font-weight: bold; font-size: 17px;">鹿七七
        </el-col>
        <el-divider style="margin-bottom: 33px !important;"></el-divider>
      </el-row>
      <el-col :span="8">
        <div style="max-height: 500px; min-height: 500px; background: #FAFAFA;" class="title-menu-min2">
          <!-- 单独一条信息 -->
          <el-col :span="24" v-for="o in 100" style="margin: 2px 0; cursor: pointer;">
            <el-card shadow="hover" style="width: 100%; height: 50px; background: #FAFAFA; ">
              <!-- 头像 -->
              <el-col :span="4" style="height: 100% !important;">
                <el-avatar shape="square" :size="40"
                           src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>

              </el-col>
              <!-- 头像End -->

              <!-- 信息内容 -->
              <el-col :span="16">
                <div style="font-weight: bold;">
                  鹿七七
                </div>
                <div class="autocut" style="color: #cccccc; font-size: 12px;">
                  adasd adasd adasd adasd adasd adasd adasd adasd adasd adasd adasd adasd
                </div>
              </el-col>
              <!-- 信息内容End -->

              <!-- 时间以及条数 -->
              <el-col :span="4" style="text-align: center; ">
                <div style="color: #cccccc; font-size: 12px;">
                  9/2 16:18
                </div>
                <div style="margin-top: 7px; ">
                  <el-badge :value="313" :max="99" class="item">
                  </el-badge>
                </div>
              </el-col>
              <!-- 时间以及条数End -->
            </el-card>
          </el-col>
          <!-- 单独一条信息End -->
        </div>
      </el-col>
      <el-col :span="16">
        <div class="chatInfoContent title-menu-min2">
          <p v-for="o in 100">{{o}}</p>
        </div>
        <div>
          <quill-editor ref="text" v-model="content" style="height: 120px; margin-right: 1px;" class="myQuillEditor"
                        :options="editorOption"/>
        </div>
        <div style="width: 6.25rem !important; position: absolute; right: 10px;">
          <el-button size="mini" @click="submit">发送消息</el-button>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import {
    quillEditor
  } from 'vue-quill-editor'
  // 工具栏配置
  const toolbarOptions = [
    ['image', 'video']
  ]
  export default {

    components: {
      quillEditor
    },
    data() {
      return {
        editorOption: {
          modules: {
            toolbar: toolbarOptions
          }
        }
      }
    }

  }
</script>

<style>
  /*新加入隐藏滚动条效果*/
  #chatInfoDiv .title-menu-min2 {
    overflow-y: scroll !important;
    -webkit-overflow-scrolling: touch;
  }

  #chatInfoDiv .title-menu-min2::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  #chatInfoDiv .title-menu-min2::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  #chatInfoDiv .title-menu-min2::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  #chatInfoDiv .title-menu-min2 .el-card__body {
    padding: 5px 5px 0 5px !important;
    height: 100% !important;
  }

  #chatInfoDiv .autocut {
    width: 99%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -icab-text-overflow: ellipsis;
    -khtml-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }

  #chatInfoDiv .chatInfoContent {
    max-height: 330px;
    min-height: 330px;
  }

  #chatInfoDiv .el-divider {
    margin-top: 33px !important;
    margin-bottom: 0px !important;
  }

</style>
