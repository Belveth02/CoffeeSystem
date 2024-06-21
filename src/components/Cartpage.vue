<template>
  <div>
    <p class="total-price">总价值: {{ sumPrice.toFixed(2) }} 元</p>
    <div class="cart-list">
      <div v-for="cart in filteredCarts" :key="cart.cfid" class="coffee-item">
        <img :src="cart.cfimage" alt="coffee image" />
        <div class="coffee-details">
          <h2>{{ cart.cfname }}</h2>
          <p>{{ cart.cfdes }}</p>
          <p>价格: {{ cart.cfprice.toFixed(2) }}</p> <!-- 保留两位小数 -->
        </div>
      </div>
    </div>
    <router-link class="checkout-button" to="/pay">去结算</router-link>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(['userid', 'totalAmount']),
    filteredCarts() {
      return this.carts.filter(cart => cart.cartuserid === this.userid);
    },
    sumPrice() {
      return this.filteredCarts.reduce((total, cartItem) => {
        return total + cartItem.cfprice; // 假设cartItem中包含cfprice属性
      }, 0);
    }
  },
  data() {
    return {
      carts: [],
    };
  },
  mounted() {
    this.getCartCoffees();
    this.updateTotalAmount();
  },
  methods: {
    ...mapActions(['setTotalAmount']),
    getCartCoffees() {
      axios.get('http://localhost:8080/cart')
          .then(response => {
            this.carts = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    updateTotalAmount() {
      // 调用 action 来更新 store 中的 totalAmount
      this.setTotalAmount(this.sumPrice);
    }

  },
  watch: {
    // 如果你希望当 carts 数组变化时自动更新 totalAmount，可以添加一个 watcher
    carts: {
      handler() {
        this.updateTotalAmount();
      },
      deep: true // 因为 carts 是一个数组，所以需要深度监听
    }
  }
};
</script>

<style>
.total-price {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: right;
}

.cart-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.coffee-item {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 16px;
  padding: 16px;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  background-color: #fff;
}

.coffee-item:hover {
  transform: translateY(-5px);
}

.coffee-item img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 12px;
}

.coffee-details {
  padding: 0 10px; /* 调整商品信息的内边距 */
}

.checkout-button {
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none; /* 确保链接样式 */
}

.checkout-button:hover {
  background-color: #45a049;
}
</style>