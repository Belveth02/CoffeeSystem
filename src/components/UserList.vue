<template>
  <div style="padding: 20px;">
    <!-- 搜索框 -->
    <el-input
        v-model="searchName"
        placeholder="请输入姓名搜索"
        @input="handleSearchName"
        :prefix-icon="Search"
    ></el-input>
    <el-button
        type="primary"
        :icon="Plus"
        @click="handleAdd"
        style="margin-left: 20px;"
    >添加数据</el-button>

    <!-- el-table数据表格组件 -->
    <el-table
        :data="userData"
        :header-cell-style="{ background: '#f6f9fa'}"
        @sort-change="handleSortChange"
    >
      <!-- el-table-column列 -->
      <el-table-column prop="userid" label="ID" width="100"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100" sortable></el-table-column>
      <el-table-column prop="password" label="密码" width="100"></el-table-column>
      <el-table-column prop="phone" label="电话" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="100"></el-table-column>
      <el-table-column prop="address" label="地址" width="100"></el-table-column>
      <el-table-column prop="userimage" label="图片" width="100"></el-table-column>
      <el-table-column label="操作" min-width="180">
        <template #default="{ row }">
          <el-button type="primary" size="small" :icon="Edit" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
        background
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
    <!-- 弹窗组件 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="tableform">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="tableform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="tableform.password"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <!--suppress TypeScriptUnresolvedReference -->
          <el-input v-model="tableform.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="tableform.email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="tableform.address"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="userimage">
          <!--suppress TypeScriptUnresolvedReference -->
          <el-input v-model="tableform.userimage"></el-input>
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

<!--suppress TypeScriptUnresolvedReference -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Delete, Edit, Search } from '@element-plus/icons-vue';

const userData = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const searchName = ref('');
const dialogFormVisible = ref(false);
const tableform = ref({});
const dialogType = ref('add');

onMounted(() => {
  getData();
});

const getData = () => {
  axios.get('http://localhost:8080/users/findByPage', {
    params: {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
    }
  })
      .then(response => {
        userData.value = response.data.records; // 根据实际返回数据结构更新
        total.value = response.data.total;
      })
      .catch(error => {
        console.error(error);
      });
};

//处理页码变化点击事件
const handleCurrentChange = (pageNum) => {
  currentPage.value = pageNum;
  getData();
};

//处理每页显示多少条事件
const handleSizeChange = (pagesize) => {
  pageSize.value = pagesize;
  getData();
};

const handleEdit = (row) => {
  dialogFormVisible.value = true;
  tableform.value = { ...row };
  dialogType.value = 'edit';
};

const dialogOk = () => {
  dialogFormVisible.value = false;
  if (dialogType.value === 'add') {
    axios.post('http://localhost:8080/users', tableform.value)
        .then(response => {
          getData();
          ElMessage.success('添加成功！');
        })
        .catch(error => {
          console.error('添加失败', error);
          ElMessage.error('添加失败！');
        });
  } else {
    const userid = tableform.value.userid; // 确保解析 userid
    axios.put(`http://localhost:8080/users/${userid}`, tableform.value)
        .then(response => {
          getData();
          ElMessage.success('修改成功！');
        })
        .catch(error => {
          console.error('修改失败', error);
          ElMessage.error('修改失败！');
        });
  }
};

const handleDelete = (row) => {
  ElMessageBox.confirm(`您确定要删除姓名为【${row.username}】的数据吗?`, '危险操作')
      .then(() => {
        const userid = row.userid; // 确保解析 userid
        axios.delete(`http://localhost:8080/users/${userid}`)
            .then(response => {
              getData();
              ElMessage.success('删除成功！');
            })
            .catch(error => {
              console.error('删除失败', error);
              ElMessage.error('删除失败！');
            });
      })
      .catch(() => {
        ElMessage.info('取消删除！');
      });
};

//字段排序
// 定义 handleSortChange 方法，接收 sortData 参数
const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  userData.value = userData.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
};

const handleSearchName = () => {
  if (searchName.value.trim() !== '') {
    axios.get(`http://localhost:8080/users/search/${searchName.value}`)
        .then(response => {
          userData.value = response.data;
        })
        .catch(error => {
          console.error(error);
        });
  } else {
    getData();
  }
};

const handleAdd = () => {
  dialogFormVisible.value = true;
  dialogType.value = 'add';
  tableform.value = {}; // 清空表单数据
};

const dialogTitle = computed(() => {
  return dialogType.value === 'add' ? '新增数据' : '编辑数据';
});
</script>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 8px;
}
</style>
