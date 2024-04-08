<template>
  <view>
    <uni-list :border="true">
      <uni-list-item
        v-for="(item, index) in list"
        :title="item.name"
        :rightText="rightText(item)"
        :key="index"
      ></uni-list-item>
    </uni-list>
  </view>
</template>

<script>
  import {get} from '../../index'
  import {baseUrl} from '../../../../api/index'

  export default {
    data() {
      return {
        userInfo: {},
        list: [
          {
            name: '集团',
            prop: 'companyName',
          },
          {
            name: '中心',
            prop: 'officeName',
          },
          {
            name: '姓名',
            prop: 'name',
          },
          {
            name: '人员编号',
            prop: 'loginName',
          },
          {
            name: '岗位角色',
            prop: 'groupRoleId',
            dict: 'groupRoleId',
            isMultiple: true,
          },
          {
            name: '汇报人',
            prop: 'reportName',
          },
          {
            name: '办公电话',
            prop: 'mobile',
          },
          {
            name: '联系电话',
            prop: 'phone',
          },
          {
            name: '邮箱',
            prop: 'email',
          },
          {
            name: '入职时间',
            prop: 'entryDate',
          },
          {
            name: '是否试用期',
            prop: 'isProbation',
            dict: 'isProbation'
          },
        ],
        dictObj: {
          isProbation: {
            '0': '否',
            '1': '是',
          }
        },
      }
    },
    computed: {
      rightText() {
        return item => {
          if (item.dict && this.dictObj[item.dict] && this.userInfo[item.prop]) {
            if (item.isMultiple) {
              const propArr = this.userInfo[item.prop].split(',');
              const texts = propArr.map(par => this.dictObj[item.dict][par]);
              return texts.join(', ');
            } else {
              return this.dictObj[item.dict][this.userInfo[item.prop]];
            }
          } else if (item.prop && this.userInfo[item.prop]) {
            return this.userInfo[item.prop];
          } else {
            return '';
          }
        }
      },
    },
    mounted() {
      this.getRoleIdDict(); // 新增 - 岗位角色下拉
      this.getUserInfo(); // 个人信息
    },
    methods: {
      getUserInfo() {
        get({
          url: baseUrl + '/sysUser/info'
        }).then(res => {
          if (res.success) {
            this.userInfo = res.data || {};
          }
        }).catch(() => {})
      },
      // 岗位角色
      getRoleIdDict() {
        get({
          url: baseUrl + '/sysRole/list',
          data: {
            roleType: 'position_role'
          }
        }).then(res => {
          if (res.success) {
            let data = res.data || [];
            this.createDictObj('groupRoleId', data, 'name', 'objId');
          }
        }).catch(() => {})
      },
      createDictObj(prop, list, label, value) {
        for (let item of list) {
          if (!this.dictObj[prop]) this.$set(this.dictObj, prop, {});
          this.$set(this.dictObj[prop], item[value], item[label])
        }
      },
    }
  }
</script>

<style>

</style>
