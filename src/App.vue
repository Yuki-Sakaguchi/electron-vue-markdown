<template>
  <div class="wrap" id="app">
    <nav class="container" id="nav">
      <img class="nav__logo" src="./assets/images/logo.png" alt="LOGO">
      <ul class="nav-list">
        <li v-for="item in textList" :key="item.id" class="nav-list__item">
          <i class="fas fa-file"></i>{{ item.title }}
        </li>
      </ul>
    </nav>
    <div class="resize-bar"></div>
    <div class="container" id="main">
      <router-view/>
    </div>
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

    const elContainer = document.querySelectorAll('.container')
    const elResizebar = document.querySelector('.resize-bar')
    let isResize = false
    let columnCnt = elContainer.length

    function setFlexGrow (width) {
      const r = width / (window.innerWidth/columnCnt)
      elContainer[0].style.flexGrow = r
      elContainer[1].style.flexGrow = columnCnt - r
    }
    
    // resize処理の開始
    elResizebar.addEventListener('mousedown', () => {
      isResize = true
    })

    // elResizebarにすると判定が外れやすいのでwindow
    window.addEventListener('mousemove', (e) => {
      if (!isResize) return false
      setFlexGrow(e.clientX)
    })
    // 値変更の処理をwindowに追加しているので、解除もwindow
    window.addEventListener('mouseup', () => {
      isResize = false
    })
    setFlexGrow(200)
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
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 22px;
    z-index: 99999;
    -webkit-app-region: drag; // ドラッグできるようにする
  }
}

#nav {
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

.wrap {
  height: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
}

.container {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: visible;
  // min-width: 200px;
}

.resize-bar {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 12px;
    left: -7px;
    top: 0;
    bottom: 0;
    cursor: col-resize;
    z-index: 3;
  }
}
</style>
