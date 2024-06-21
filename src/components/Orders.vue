<template>
  <div class="orders-container">
    <h1>全部订单</h1>
    <el-input
        v-model="searchKeyword"
        placeholder="输入用户ID搜索订单"
        @input="handleInputChange"
        @keydown.enter="handleSearch"
        prefix-icon="el-icon-search"
    ></el-input>
    <table class="orders-table">
      <thead>
      <tr>
        <th @click="handleSort('orderid')" :class="{ 'sortable': true, 'sorted-asc': sortBy === 'orderid' && sortOrder === 'asc', 'sorted-desc': sortBy === 'orderid' && sortOrder === 'desc' }">
          订单编号
          <span class="arrow" v-if="sortBy === 'orderid'"></span>
        </th>
        <th>用户ID</th>
        <th>总价</th>
        <th>用户号码</th>
        <th>订单完成状态</th>
        <th>支付状态</th>
        <th>地址</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.orderid">
        <td>{{ order.orderid }}</td>
        <td>{{ order.orderuserid }}</td>
        <td>¥{{ order.totalprice }}</td>
        <td>{{ order.userphone }}</td>
        <td>{{ order.donestatus }}</td>
        <td>{{ order.paystatus }}</td>
        <td>{{ order.address }}</td>
        <td>
          <el-button type="primary" size="small" @click="handleEdit(order)">详情</el-button>
          <el-button type="primary" size="small" @click="handleEdit(order)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(order)">删除</el-button>
        </td>
      </tr>
      </tbody>
    </table>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
    ></el-pagination>
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="tableform">
        <el-form-item label="订单编号" prop="orderid">
          <el-input v-model="tableform.orderid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单完成状态" prop="donestatus">
          <el-select v-model="tableform.donestatus">
            <el-option label="未完成" value="未完成"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogOk">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {
  ElMessageBox,
  ElMessage,
  ElPagination,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
} from 'element-plus';

const orders = ref([]);
const dialogFormVisible = ref(false);
const tableform = ref({});
const dialogType = ref('edit');
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const searchKeyword = ref('');
const dialogTitle = ref('编辑订单完成状态');
const sortBy = ref('orderid'); // 默认按订单编号排序
const sortOrder = ref('asc'); // 默认升序排序

const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:8080/order/findByPage', {
      params: {
        pageNum: currentPage.value,
        pageSize: pageSize.value,
        orderuserid: searchKeyword.value.trim() || undefined,
        orderBy: sortBy.value,
        order: sortOrder.value,
      },
    });
    orders.value = response.data.records;
    total.value = response.data.total;
  } catch (error) {
    console.error('获取订单失败:', error);
  }
};

const handleEdit = (row) => {
  dialogFormVisible.value = true;
  tableform.value = { ...row };
  dialogType.value = 'edit';
};

const handleDelete = (order) => {
  ElMessageBox.confirm('此操作将永久删除该订单, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        axios
            .delete(`http://localhost:8080/order/${order.orderid}`)
            .then(() => {
              ElMessage.success('订单删除成功');
              fetchOrders();
            })
            .catch((error) => {
              console.error('删除订单出错:', error);
              ElMessage.error('删除订单失败');
            });
      })
      .catch(() => {
        ElMessage.info('已取消删除');
      });
};

const dialogOk = () => {
  if (dialogType.value === 'edit') {
    axios
        .put(`http://localhost:8080/order/${tableform.value.orderid}`, tableform.value)
        .then(() => {
          ElMessage.success('订单更新成功');
          fetchOrders();
          dialogFormVisible.value = false;
        })
        .catch((error) => {
          console.error('更新订单出错:', error);
          ElMessage.error('更新订单失败');
        });
  }
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchOrders();
};

const handleInputChange = (value) => {
  searchKeyword.value = value;
  if (!value.trim()) {
    fetchOrders();
  }
};

const handleSearch = () => {
  fetchOrders();
};

const handleSort = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'asc';
  }
  fetchOrders();
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.orders-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.orders-table th,
.orders-table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  position: relative;
}

.orders-table th {
  background-color: #f0f0f0;
  user-select: none; /* 防止文字选中 */
}

.orders-table th .arrow {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 4px;
  vertical-align: middle;
  border: 4px solid transparent;
}

.orders-table th.sorted-asc .arrow {
  border-bottom-color: #333; /* 箭头颜色 */
}

.orders-table th.sorted-desc .arrow {
  border-top-color: #333; /* 箭头颜色 */
}

.orders-table th.sortable:hover {
  background-color: #eaeaea; /* 鼠标悬停时的背景色 */
}
</style>

