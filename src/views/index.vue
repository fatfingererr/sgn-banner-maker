<script>
import { removeBackgroundFromImageBase64 } from "remove.bg";
import { ArrowUpIcon, ArrowRightIcon, HashIcon } from "vue-feather-icons";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Testimonial from "@/components/testimonial";
import Team from "@/components/team";

import mergeImages from 'merge-images';

import bg1Img from "../assets/background/bg1.png";
import bg2Img from "../assets/background/bg2.png";
import bg3Img from "../assets/background/bg3.png";
import bg4Img from "../assets/background/bg4.png";

const REMOVEBG_APIKEY = "8aWVUJpKE4szpiKnjAwKS9Fk";

const IPFSIO_BASEURL = 'https://ipfs.io/ipfs/';
const IPFS_URL = 'ipfs://ipfs/';
const IPFS_SGN = 'QmSDdbLq2QDEgNUQGwRH7iVrcZiTy6PvCnKrdawGbTa7QD';

/**
 * Index-developer component
 */
export default {
  name: 'qrcode-in-poster',
  components: {
    Navbar,
    Footer,
    ArrowUpIcon,
    ArrowRightIcon,
    Testimonial,
    Team,
  },
  data() {
    return {
      finalImgb64: null,
      metadatas: [],
      sgns: [],
      nobgsgns: [],
      sgnselects: [],
      bgselect: 'bg1Img',
      sgnnum: null,
      isAdding: false,
      errorMessage: ""
    }
  },
  watch: {
    bgselect: function (newVal, oldVal) {
      if (newVal === 'bg1Img') {
        this.updateImage(bg1Img)
      } else if (newVal === 'bg2Img') {
        this.updateImage(bg2Img)
      } else if (newVal === 'bg3Img') {
        this.updateImage(bg3Img)
      } else if (newVal === 'bg4Img') {
        this.updateImage(bg4Img)
      }
    }
  },
  methods: {
    base64ToImageData(buffer, width, height) {
      return new Promise(resolve => {
        var image = new Image();
        image.addEventListener('load', function (e) {
          var canvasElement = document.createElement('canvas');
          canvasElement.width = width;
          canvasElement.height = height;
          var context = canvasElement.getContext('2d');
          context.drawImage(e.target, 0, 0, width, height);
          resolve(context.getImageData(0, 0, width, height));
        });
        image.src = buffer;
        document.body.appendChild(image);
        setTimeout(() => {
          document.body.removeChild(image);
        }, 1);
      });
    },
    checkSGNNum() {
      this.sgnnum = Math.max(Math.min(Math.floor(this.sgnnum), 500), 1)
    },
    removeSGN(index) {
      this.metadatas.splice(index, 1);
      this.sgns.splice(index, 1);
      this.nobgsgns.splice(index, 1);
    },
    addSGN() {
      this.checkSGNNum();
      const id = this.sgnnum;
      this.errorMessage = "";
      this.isAdding = true
      fetch(`${IPFSIO_BASEURL}/${IPFS_SGN}/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            this.metadatas.push({ id, ...data })
            const sgnurl = String(data.image).replace(IPFS_URL, IPFSIO_BASEURL)
            fetch(sgnurl).then(async (res) => {
              return new Promise(async (resolve) => {
                const blob = await res.blob()
                let objectUrl = URL.createObjectURL(blob);
                this.sgns.push(objectUrl)
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                  resolve(reader.result);
                };
              });
            })
              .then(base64img => {
                removeBackgroundFromImageBase64({
                  base64img,
                  apiKey: REMOVEBG_APIKEY,
                  size: "preview",
                  type: "person",
                  scale: "50%",
                  crop: true,
                }).then(async (result) => {
                  const base64Response = await fetch(`data:image/png;base64, ${result.base64img}`);
                  const blob = await base64Response.blob();
                  const imgurl = URL.createObjectURL(blob)
                  this.nobgsgns.push(imgurl)
                  await this.updateSGN()
                  this.isAdding = false
                }).catch((errors) => {
                  this.isAdding = false
                  this.metadatas.pop()
                  this.sgns.pop()
                  if (errors[0].code === 'insufficient_credits') {
                    this.errorMessage = "⚠️ 同时间太多人在去除背景，触及服务器处理上限，请稍等再试"
                  }
                  console.error(JSON.stringify(errors));
                });
              })
          }
        }).catch((err) => {
          this.isAdding = false
          this.errorMessage = "⚠️ IPFS 偶尔会响应失败，请再尝试 3-5 次"
          console.error(err);
        })
    },
    updateImage(bgImg) {
      this.selectbg = bgImg
      mergeImages([
        { src: bgImg, x: 0, y: 0 }])
        .then(b64 => { this.finalImgb64 = b64 });
    },
    async updateSGN() {
      const layers = [{ src: this.selectbg, x: 0, y: 0 }]
      const ydefault = 130
      const xcenter = 550
      const xshift = 300
      const xdefault = 550 - ((this.nobgsgns.length - 1) * xshift)
      const xstep = 200
      for (var i = 0; i < this.nobgsgns.length; i++) {
        layers.push({
          src: this.nobgsgns[i],
          x: xdefault + i * xstep,
          y: ydefault
        })
      }
      const b64 = await mergeImages(layers);
      this.finalImgb64 = b64
    }
  },
  mounted() {
    this.updateImage(bg1Img)
  }
};
</script>

<template>
  <div>
    <Navbar />



    <!-- Start -->
    <section class="section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12 col-md-12">
            <div class="position-relative">
              <img :src="finalImgb64" class="rounded img-fluid mx-auto d-block shadow rounded" alt="" />
            </div>
          </div>
          <!--end col-->
        </div>
        <div class="row align-items-center pt-4">
          <div class="col-3">
            <input name="sgnid" id="sgnid" type="number" class="form-control" placeholder="SGN ID (1 - 500)" required
              aria-describedby="addsgn" v-model="sgnnum" @blur="checkSGNNum()" v-on:keyup.enter="addSGN()"
              v-if="!isAdding" />
            <input name="sgnid" id="sgnid" type="number" class="form-control" placeholder="SGN ID (1 - 500)" required
              aria-describedby="addsgn" :value="sgnnum" disabled v-else />
          </div>
          <div class="col-6">
            <button class="btn btn-primary btn-sm submitBnt" @click="addSGN()" type="submit" id="addsgn" v-if="!isAdding">
              Add
            </button>
            <button class="btn btn-primary btn-sm submitBnt" @click="addSGN()" type="submit" id="addsgn" disabled v-else>
              Adding...
            </button>
            <span class="title mb-4 ml-3" v-if="errorMessage.length > 0">{{ errorMessage }}</span>
          </div>
        </div>
        <div class="row align-items-center pt-4">
          <div class="col-2" v-for="(sgn, index) in sgns" :key="`sgn-${index}`">
            <div class="custom-control custom-control-inline">
              <div class="form-group mb-0">
                <button class="btn btn-icon btn-pills btn-sm btn-secondary" @click="removeSGN(index)"
                  v-if="!isAdding">X</button>
                <button class="btn btn-icon btn-pills btn-sm btn-secondary" disabled v-else>X</button>
                &nbsp;&nbsp;<label>SGN #{{ metadatas[index].id }}</label>

                <img :src="sgn" class="rounded img-fluid d-block mt-2 ml-1" alt="" width="100" />
              </div>
            </div>
          </div>
        </div>
        <div class="row align-items-center pt-4">
          <div class="col-3">
            <div class="custom-control custom-radio custom-control-inline">
              <div class="form-group mb-0">
                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" value="bg1Img"
                  v-model="bgselect" />
                <label class="custom-control-label" for="customRadio1">1.</label>
                <img src="../assets/background/bg1.png" class="rounded img-fluid mx-auto d-block shadow rounded" alt=""
                  width="100%" />
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="custom-control custom-radio custom-control-inline">
              <div class="form-group mb-0">
                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" value="bg2Img"
                  v-model="bgselect" />
                <label class="custom-control-label" for="customRadio2">2.</label>
                <img src="../assets/background/bg2.png" class="rounded img-fluid mx-auto d-block shadow rounded" alt=""
                  width="100%" />
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="custom-control custom-radio custom-control-inline">
              <div class="form-group mb-0">
                <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" value="bg3Img"
                  v-model="bgselect" />
                <label class="custom-control-label" for="customRadio3">3.</label>
                <img src="../assets/background/bg3.png" class="rounded img-fluid mx-auto d-block shadow rounded" alt=""
                  width="100%" />
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="custom-control custom-radio custom-control-inline">
              <div class="form-group mb-0">
                <input type="radio" id="customRadio4" name="customRadio" class="custom-control-input" value="bg4Img"
                  v-model="bgselect" />
                <label class="custom-control-label" for="customRadio4">4.</label>
                <img src="../assets/background/bg4.png" class="rounded img-fluid mx-auto d-block shadow rounded" alt=""
                  width="100%" />
              </div>
            </div>
          </div>
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </section>
    <!--end section-->
    <!-- End -->

    <Footer />
    <!-- Footer End -->
    <!-- Back to top -->
    <a href="javascript: void(0);" class="btn btn-icon btn-primary back-to-top" id="back-to-top" v-scroll-to="'#topnav'">
      <arrow-up-icon class="icons"></arrow-up-icon>
    </a>
    <!-- Back to top -->
  </div>
</template>

<style>
.modal-content {
  background-color: transparent;
}
</style>
