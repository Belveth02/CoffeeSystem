<template>
  <el-card class="order-history-card">
    <div slot="header" class="clearfix">
      <span>我的订单</span>
    </div>
    <el-table :data="userOrders" style="width: 100%">
      <el-table-column prop="id" label="订单号" width="180"></el-table-column>
      <el-table-column prop="coffeeType" label="咖啡类型" width="180"></el-table-column>
      <el-table-column prop="quantity" label="数量" width="180"></el-table-column>
      <el-table-column prop="totalPrice" label="总价" width="180"></el-table-column>
      <el-table-column prop="orderTime" label="订单时间" width="180"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ElCard, ElTable, ElTableColumn } from 'element-plus';

export default {
  components: {
    ElCard,
    ElTable,
    ElTableColumn
  },
  setup() {
    const store = useStore();
    const userOrders = computed(() => store.getters.getUserOrders);

    return {
      userOrders
    };
  }
};
</script>

<style scoped>
.order-history-card {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff8dc; /* 米白色 */
}
</style>
