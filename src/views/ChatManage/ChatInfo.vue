<template>
  <div id="chatInfoDiv">
    <el-row>
      <el-row style="height: 40px;">
        <el-col :span="8">
          <el-input
            size="mini"
            placeholder="搜索"
            v-model="searchContent"
            style="width: 70% !important; margin-left: 10px;"
            suffix-icon="el-icon-search">
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
          <el-backtop ></el-backtop>
          <el-col :span="24" v-for="o in 100" style="margin: 2px 0; cursor: pointer;">
            <div @click="youjiFunction(o)" @contextmenu.prevent="rightClick">
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
            </div>
          </el-col>
          <!-- 单独一条信息End -->
        </div>
      </el-col>
      <el-col :span="16">
        <div class="chatInfoContent title-menu-min2">
          <!-- 一组消息 -->
          <div>
            <!-- 消息的时间 -->
            <span style="text-align: center; display: block; color: #bababa;">2019/9/2 19:46:21</span>

            <!-- 对方 -->
            <!-- 消息的时间 END -->
            <el-row style="margin: 5px 0px;">
              <!-- 头像 -->
              <el-col :span="2">
                <el-avatar shape="square" :size="45"
                           src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
              </el-col>
              <!-- 消息内容 -->
              <el-col :span="18">
                <div style="background-color: #EEEEEE;border-radius: 4px;
                 padding: 3px 10px; min-height: 35px; line-height: 30px;">
                  Element-ui,一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。... 扫码进群大神带你装逼带你飞! ×Close ...
                  element-ui.cn/ - 百度快照
                  Element-UI配置 - 简书
                  2018年9月12日 - 安装ElementUI npm i element-ui -S 按需引入 借助babel-plugin-component,我们可以只引入需要的组件,以达到减小项目体积的目的。
                  首先,安装 babel-pl...
                  简书社区 - 百度快照
                </div>
              </el-col>
            </el-row>
            <!-- 对方 END-->

            <!-- 自己 -->
            <el-row style="margin: 5px 0px;">
              <el-col :span="18" :offset="4">
                <div style="background-color: #2683F5;border-radius: 4px;
                 padding: 3px 10px; min-height: 35px; line-height: 30px; color: #fff;">
                  Element-ui,一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。... 扫码进群大神带你装逼带你飞! ×Close ...
                  element-ui.cn/ - 百度快照
                  Element-UI配置 - 简书
                  2018年9月12日 - 安装ElementUI npm i element-ui -S 按需引入 借助babel-plugin-component,我们可以只引入需要的组件,以达到减小项目体积的目的。
                  首先,安装 babel-pl...
                  简书社区 - 百度快照
                </div>
              </el-col>
              <el-col :span="2" style="text-align: right;">
                <el-avatar shape="square" :size="45"
                           src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
              </el-col>
            </el-row>
            <!-- 自己END -->

            <!-- 对方 -->
            <!-- 消息的时间 END -->
            <el-row style="margin: 5px 0px;">
              <!-- 头像 -->
              <el-col :span="2">
                <el-avatar shape="square" :size="45"
                           src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
              </el-col>
              <!-- 消息内容 -->
              <el-col :span="18">
                <div style="background-color: #EEEEEE;border-radius: 4px;
                 padding: 3px 10px; min-height: 35px; line-height: 30px;">
                  Element-ui,一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。... 扫码进群大神带你装逼带你飞! ×Close ...
                  element-ui.cn/ - 百度快照
                  Element-UI配置 - 简书
                  2018年9月12日 - 安装ElementUI npm i element-ui -S 按需引入 借助babel-plugin-component,我们可以只引入需要的组件,以达到减小项目体积的目的。
                  首先,安装 babel-pl...
                  简书社区 - 百度快照
                </div>
              </el-col>
            </el-row>
            <!-- 对方 END-->

            <!-- 自己 -->
            <el-row style="margin: 5px 0px;">
              <el-col :span="18" :offset="4">
                <div style="background-color: #2683F5;border-radius: 4px;
                 padding: 3px 10px; min-height: 35px; line-height: 30px; color: #fff;">
                  Element-ui,一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。... 扫码进群大神带你装逼带你飞! ×Close ...
                  element-ui.cn/ - 百度快照
                  Element-UI配置 - 简书
                  2018年9月12日 - 安装ElementUI npm i element-ui -S 按需引入 借助babel-plugin-component,我们可以只引入需要的组件,以达到减小项目体积的目的。
                  首先,安装 babel-pl...
                  简书社区 - 百度快照
                </div>
              </el-col>
              <el-col :span="2" style="text-align: right;">
                <el-avatar shape="square" :size="45"
                           src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
              </el-col>
            </el-row>
            <!-- 自己END -->

            <!-- 自己 -->
            <el-row style="margin: 5px 0px;">
              <el-col :span="18" :offset="4">
                <div style="background-color: #2683F5;border-radius: 4px;
                 padding: 3px 10px; min-height: 35px; line-height: 30px; color: #fff;">
                  Element-ui,一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。... 扫码进群大神带你装逼带你飞! ×Close ...
                  element-ui.cn/ - 百度快照
                  Element-UI配置 - 简书
                  2018年9月12日 - 安装ElementUI npm i element-ui -S 按需引入 借助babel-plugin-component,我们可以只引入需要的组件,以达到减小项目体积的目的。
                  首先,安装 babel-pl...
                  简书社区 - 百度快照
                </div>
              </el-col>
              <el-col :span="2" style="text-align: right;">
                <el-avatar shape="square" :size="45"
                           src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
              </el-col>
            </el-row>
            <!-- 自己END -->
          </div>
          <!-- 一组消息END -->

        </div>
        <div>
          <quill-editor
            ref="text" v-model="content" style="height: 120px; margin-right: 1px;"
            :options="editorOption"/>
        </div>
        <div style="width: 6.25rem !important; position: absolute; right: 10px;">
          <el-button size="mini">发送消息</el-button>
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
        // 聊天的内容
        content: '',
        menuVisible: false,
        // 搜索
        searchContent: '',
        // 富文本数据
        editorOption: {
          modules: {
            toolbar: toolbarOptions
          },
          placeholder: "请输入您要发送的消息"
        }
      }
    },
    methods: {
      youjiFunction(obj) {
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
    padding: 10px;
  }

  #chatInfoDiv .el-divider {
    margin-top: 33px !important;
    margin-bottom: 0px !important;
  }

</style>
