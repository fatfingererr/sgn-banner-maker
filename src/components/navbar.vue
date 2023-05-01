<script>
import VueMetamask from 'vue-metamask';
import ethers from "@/utils/ethers.helper"
/**
 * Navbar component
 */
export default {
  data() {
    return {
      wallet: {
        message: "",
        metaMaskAddress: "",
        netID: -1,
        type: "",
        web3: null
      },
      isConneting: false,
      isCondensed: false,
    };
  },
  props: {
    isWhiteNavbar: {
      type: Boolean,
    },
    navLight: {
      type: Boolean,
    },
    isIcons: {
      type: Boolean,
    },
  },

  components: {
    VueMetamask
  },

  mounted: () => {
    window.onscroll = function () {
      onwindowScroll();
    };

    function onwindowScroll() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        document.getElementById("topnav").classList.add("nav-sticky");
      } else {
        document.getElementById("topnav").classList.remove("nav-sticky");
      }

      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        document.getElementById("back-to-top").style.display = "inline";
      } else {
        document.getElementById("back-to-top").style.display = "none";
      }
    }

    var links = document.getElementsByClassName("side-nav-link-ref");
    var matchingMenuItem = null;
    for (var i = 0; i < links.length; i++) {
      if (window.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");
      var parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add("active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add("active");
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.add("active");
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5.classList.add("active");
            }
          }
        }
      }
    }
  },
  methods: {
    switchNetwork() {
      ethers.switchNetwork()
    },
    shortAddress(addr) {
      if (addr === undefined || addr === '') return '';
      return addr.slice(0, 5) + '...' + addr.slice(addr.length - 5, addr.length);
    },
    connectWallet() {
      this.isConneting = true;
    },
    async setWallet(wallet) {
      console.log('wallet::', wallet)
      this.wallet = wallet;
      await this.switchNetwork()
      localStorage.setItem("WALLET_ADDRESS", wallet.metaMaskAddress);
      localStorage.setItem("WALLET_CHAINID", wallet.netID);
      this.isConnecting = false;

    },
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.isCondensed = !this.isCondensed;
      if (this.isCondensed) {
        document.getElementById("navigation").style.display = "block";
      } else document.getElementById("navigation").style.display = "none";
    },

    /**
     * Menu clicked show the submenu
     */
    onMenuClick(event) {
      event.preventDefault();
      const nextEl = event.target.nextSibling.nextSibling;

      if (nextEl && !nextEl.classList.contains("open")) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove("open");
        }
        nextEl.classList.add("open");
      } else if (nextEl) {
        nextEl.classList.remove("open");
      }
      return false;
    },
  },
};
</script>

<template>
  <div>
    <!-- Navbar STart -->
    <header id="topnav" class="defaultscroll sticky" :class="{ 'bg-white': isWhiteNavbar === true }">
      <div class="container">
        <!-- Logo container-->
        <div>
          <router-link class="logo" to="/" v-if="navLight !== true">
            <img src="images/logo.png" height="64" alt=""  class="mb-2" /><span>SGN Banner Maker</span>
          </router-link>
          <router-link class="logo" to="/" v-else>
            <img src="images/logo.png" class="l-dark mb-1" height="64" alt="" />
            <img src="images/logo.png" class="l-light mb-1" height="64" alt="" />
          </router-link>
        </div>
        <div class="buy-button" v-if="isIcons !== true">
          <a @click="connectWallet" class="btn" :class="{
            'btn-light': navLight === true,
            'btn-primary': navLight !== true,
          }" v-if="wallet.metaMaskAddress === ''">链接钱包</a>
          <a class="logo" v-else>
            <font class="l-dark" size="3" color="black">{{ shortAddress(this.wallet.metaMaskAddress) }}</font>
            <font class="l-light" size="3" color="black">{{ shortAddress(this.wallet.metaMaskAddress) }}</font>
          </a>
        </div>
        <ul class="buy-button list-inline mb-0" v-if="isIcons === true">
          <li class="list-inline-item mb-0 developer-icon">
            <b-dropdown right variant="link" toggle-class="text-decoration-none p-0 pr-2"
              menu-class="dd-menu dropdown-menu-right bg-white shadow rounded border-0 mt-3 py-0">
              <template #button-content>
                <i class="mdi mdi-magnify h4 text-muted"></i>
              </template>
              <div style="width: 300px">
                <form>
                  <input type="text" id="text" name="name" class="form-control border bg-white"
                    placeholder="Search..." />
                </form>
              </div>
            </b-dropdown>
          </li>
          <li class="list-inline-item mb-0 pr-2">
            <a href="#" class="btn btn-icon btn-soft-primary"><i class="mdi mdi-github mdi-18px icons"></i></a>
          </li>
          <li class="list-inline-item mb-0 pr-2">
            <a href="#" class="btn btn-icon btn-soft-primary"><i class="mdi mdi-stack-overflow mdi-18px icons"></i></a>
          </li>
          <li class="list-inline-item mb-0">
            <a href="javascript:void(0)" class="btn btn-icon btn-soft-primary" data-toggle="modal"
              data-target="#productview"><i class="mdi mdi-account-outline mdi-18px icons"></i></a>
          </li>
        </ul>
        <!--end login button-->
        <!--end login button-->
        <!-- End Logo container-->
        <div class="menu-extras">
          <div class="menu-item">
            <!-- Mobile menu toggle-->
            <a class="navbar-toggle" @click="toggleMenu()" :class="{ open: isCondensed === true }">
              <div class="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>
            <!-- End mobile menu toggle-->
          </div>
        </div>

        <!--end navigation-->
      </div>
      <!--end container-->
    </header>
    <!--end header-->
    <!-- Navbar End -->

    <div v-if="isConneting">
      <vue-metamask userMessage="msg" @onComplete="setWallet">
      </vue-metamask>
    </div>
  </div>
</template>
