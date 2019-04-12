<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 320) + "px";
    };

  // Abort if browser does not support addEventListener
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
// document.addEventListener("DOMContentLoaded", () => {
//   const html = document.querySelector("html");
//   let fontSize = window.innerWidth / 10;
//   fontSize = fontSize > 50 ? 50 : fontSize;
//   html.style.fontSize = fontSize + "px";
// });
export default {
  name: "App"
};
</script>

<style lang="less" scoped>
@import "./assets/styles/reset.less";
</style>

