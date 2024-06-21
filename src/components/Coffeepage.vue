<template>
  <div class="coffee-list">
    <div v-for="coffee in coffees" :key="coffee.id" class="coffee-item">
      <img :src="coffee.cfimage" alt="coffee image" />
      <h2>{{ coffee.cfname }}</h2>
      <p>{{ coffee.cfdes }}</p>
      <p>价格: {{ coffee.cfprice }}</p>
      <select v-model="coffee.size">
        <option v-for="size in sizes" :key="size">{{ size }}</option>
      </select>
      <select v-model="coffee.temperature">
        <option v-for="temp in temperatures" :key="temp">{{ temp }}</option>
      </select>
      <select v-model="coffee.sweetness">
        <option v-for="sweet in sweetnessLevels" :key="sweet">{{ sweet }}</option>
      </select>
      <button @click="addToCart(coffee)">添加到购物车</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default{
  computed: {
    ...mapState (['userid'])
  },
  data() {
    return {
      coffees: [],
      sizes: ['小', '中', '大'],
      temperatures: ['热', '冷'],
      sweetnessLevels: ['无糖', '少糖', '正常糖', '多糖'],
      selectedSize: {},
      selectedTemperature: {},
      selectedSweetness: {}
    };
  },
  created() {
    this.fetchCoffees();
  },
  methods: {
    fetchCoffees() {
      axios.get('http://localhost:8080/coffee')
          .then(response => {
            this.coffees = response.data.filter(coffee => coffee.cftype === 'coff');
          })
          .catch(error => {
            console.error("There was an error fetching the coffee data:", error);
          });
    },
    addToCart(coffee) {
      const cartItem = {
        ...coffee,
        cfsize: coffee.size,
        cftem: coffee.temperature,
        cfsweet: coffee.sweetness,
        cartuserid: this.userid
      };
      console.log('Adding to cart:', cartItem);

      axios.post('http://localhost:8080/addcart', cartItem)
          .then(response => {
            console.log('Added to cart:', response.data);
            alert('成功添加到购物车！');
          })
          .catch(error => {
            console.error("There was an error adding the item to the cart:", error);
          });
    }
  }
};
</script>

<style scoped>
.coffee-list {
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

.coffee-item h2 {
  margin-bottom: 8px;
}

.coffee-item p {
  font-size: 14px;
  margin-bottom: 12px;
}

.coffee-item select {
  margin-bottom: 8px;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.coffee-item button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.coffee-item button:hover {
  background-color: #45a049;
}

@media (max-width: 600px) {
  .coffee-item {
    width: 100%;
  }
}
</style>