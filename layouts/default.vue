<template>
  <div class="container-layout">
    <header class="header-layout">
      <img
        class="logo"
        src="@/assets/images/default-monochrome-black.svg"
        alt="Office translation tool logo"
      >
    </header>
    <main class="main-layout">
      <document-translation-flow />
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container-layout {
  width: 100%;
  background: var(--gray-50);

  > .header-layout {
    position: fixed;
    width: 100%;
    background: rgb(255, 255, 255);
    padding: 16px 7.5%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    z-index: 10;
  }

  > .main-layout {
    width: 85%;
    margin: auto;
    padding-top: 13vh;
  }
}
.header-layout {
  .logo {
    width: 50%px;
    height: 50px;
  }
}
</style>
