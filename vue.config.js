module.exports = {  
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import 'reset-css';
          @import "@/assets/scss/global.scss";
        `
      }
    }
  }
}