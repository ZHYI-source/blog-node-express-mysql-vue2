<template>
  <div class="feature">
    <div class="feature-c" @click="$emit('click')">
      <div class="feature-title"><span class="foverlay">{{ data.title }}</span></div>
      <img :src="data.img">
    </div>
  </div>
</template>

<script>
export default {
  name: "feature",
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          title: 'Akina',
          img: 'https://cdn.zhebk.cn/usr/themes/Akina//images/feature/feature1.jpg',
          href: 'https://zhebk.cn/Web/Akina.html'
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.feature {
  width: inherit;
  position: relative;
  cursor: pointer;

  img {
    height: 160px;
    width: 257px;
    object-fit: cover;
    border-radius: 5px;
  }

  .feature-c:hover .foverlay {
    opacity: 1;
  }

  .foverlay {
    position: absolute;
    z-index: 2;
    width: 257px;
    height: 160px;
    text-align: center;
    line-height: 160px;
    background: #BBE2DB;
    color: white;
    font-size: 16px;
    opacity: 0;
    border-radius: 5px;

    -moz-transition: opacity .4s ease-out;
    -o-transition: opacity .4s ease-out;
    -webkit-transition: opacity .4s ease-out;
    transition: opacity .4s ease-out;
  }
}
</style>