<template>
  <div id="app">
    <nav id="nav">
      <img class="nav__logo" src="./assets/images/logo.png" alt="LOGO">
      <ul class="nav-list">
        <li v-for="item in textList" :key="item.id" class="nav-list__item">
          <i class="fas fa-file"></i>{{ item.title }}
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textList: [
        {
          id: 1,
          title: 'title1',
          body: 'body1',
        },
        {
          id: 2,
          title: 'title2',
          body: 'body2',
        },
      ]
    }
  },
  mounted() {
    var elLoading = document.querySelector('#loading');
    if (elLoading) {
      this.$store.dispatch("get");
      elLoading.classList.add('active');
      setTimeout(() => {
        elLoading.remove();
        var list = this.$store.getters.fileList;
        console.log(list);
        for (var i = 0; i < list.length; i++) {
          console.log(list[i].name);
        }
      }, 2000);
    }
  }
}
</script>

<style lang="scss">
#app {
  background-color: white;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
}

#nav {
  width: 300px;
  height: 100%;
  background-color: $c_main;
  color: white;
  padding: 30px;
}

.nav {
  @include positionCenter;
  &-list {
    &__item {
      margin: 12px 0;
      i {
        margin-right: 6px;
      }
    }
  }
  &__logo {
    width: 100px;
    margin: 0 auto 30px;
    display: block;
  }
}
</style>
