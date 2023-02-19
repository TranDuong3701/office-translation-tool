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
      <slot />
    </main>
    <footer class="footer-layout">
      <div class="left">
        <img src="@/assets/images/isolated-monochrome-black.svg" alt="">
      </div>
      <div class="social-icons">
        <Button
          icon="pi pi-github"
          class="p-button-outlined p-button-rounded p-button-secondary"
        />
        <Button
          icon="pi pi-facebook"
          class="p-button-outlined p-button-rounded p-button-secondary"
        />
        <Button
          icon="pi pi-youtube"
          class="p-button-outlined p-button-rounded p-button-secondary"
        />
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.container-layout {
  width: 100%;
  background: var(--gray-50);
  font-family: "Roboto";

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
    padding-top: 10vh;
    margin-bottom: 32px;
    min-height: 86vh;
    overflow: hidden;
  }

  > .footer-layout {
    border-top: 3px solid #111;
    margin: auto;
    display: flex;
    justify-content: space-between;
    padding: 16px 7%;
    background: #fff;
  }
}
.header-layout {
  .logo {
    width: 50%px;
    height: 50px;
  }
}

.footer-layout {
  margin-top: 32px;
  height: 80px;

  > .social-icons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
