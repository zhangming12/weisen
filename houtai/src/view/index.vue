<template>
  <div class="container">
    <h1>咨询客户数据</h1>
    <div class="box">
      <div class="content-top">
        <Button type="info" @click="getData">刷新</Button>
        <Button @click="exportData" type="primary">导出</Button>
      </div>
      <Table border :columns="columns1" :data="pageData" ref="table"></Table>
    </div>
  </div>
</template>

<script>
import { Button, Table } from "iview";
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "姓名",
          align: "center",
          key: "name"
        },
        {
          title: "电话",
          align: "center",
          key: "phone"
        },
        {
          title: "添加时间",
          align: "center",
          key: "time"
        },
        {
          title: "留言",
          align: "center",
          key: "memo"
        },
        {
          title: "来源",
          align: "center",
          key: "type",
          filters: [
            {
              label: "电脑",
              value: 1
            },
            {
              label: "手机",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.type == "电脑";
            } else if (value === 2) {
              return row.type == "手机";
            }
          }
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  components: {
    Button,
    Table
    // Message
  },
  methods: {
    exportData() {
      this.$refs.table.exportCsv({
        filename: "客户数据"
      });
    },
    getData() {
      // let url = "http://127.0.0.1:9000/getData";
      let url = "http://122.152.208.20:9000/getdata";
      axios
        .post(url)
        .then(res => {
          if (res.status == 200) {
            let data = res.data;
            if (data.status == 1) {
              data.data.forEach(item => {
                item.type = item.type == "P" ? "手机" : "电脑";
              });
              // this
              data.data.reverse();
              this.pageData = data.data;
            } else {
              this.$Message.info(data.errorMsg);
            }
          }
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  }
};
</script>
<style scoped>
h1 {
  margin: 30px;
}
.content-top {
  padding-bottom: 10px;
  text-align: right;
}
.box {
  width: 90%;
  height: auto;
  margin: 0 auto;
}
</style>


