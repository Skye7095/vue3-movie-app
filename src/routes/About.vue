<template>
  <div class="about">
    <div class="logo">
      <img src="~assets/logo.png" :alt="name">
    </div>
    <div class="name">{{ name }}</div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('about', [
      'name',
      'email',
      'blog',
      'phone'
    ])
  }
}
</script>

<style lang="scss">
.about {
  text-align: center;
  .logo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
      padding: 10px;
    }
  }
  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
}
</style>