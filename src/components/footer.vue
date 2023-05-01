<script>
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
  MailIcon,
} from "vue-feather-icons";
export default {
  data() {
    return {};
  },
  components: {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    LinkedinIcon,
    MailIcon,
  },
};
</script>

<template>
  <div>
    <!-- Footer Start -->
    <!-- <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
            <a href="#" class="logo-footer">
              <img src="images/logo-light.png" height="24" alt="" />
            </a>
            <p class="mt-4">
              SeeDAO 是一个基于区块链的数字城邦，其表现形态为去中心化的数字网络和映射在全球各地的物理据点，由SeeDAO成员共建、共治、共享。
            </p>
            <ul class="list-unstyled social-icon social mb-0 mt-4">
              <li class="list-inline-item">
                <a href="javascript:void(0)" class="rounded">
                  <facebook-icon class="fea icon-sm fea-social"></facebook-icon>
                </a>
              </li>
              <li class="list-inline-item ml-1">
                <a href="javascript:void(0)" class="rounded">
                  <instagram-icon class="fea icon-sm fea-social"></instagram-icon>
                </a>
              </li>
              <li class="list-inline-item ml-1">
                <a href="javascript:void(0)" class="rounded">
                  <twitter-icon class="fea icon-sm fea-social"></twitter-icon>
                </a>
              </li>
              <li class="list-inline-item ml-1">
                <a href="javascript:void(0)" class="rounded">
                  <linkedin-icon class="fea icon-sm fea-social"></linkedin-icon>
                </a>
              </li>
            </ul>
            
          </div>

          <div class="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h5 class="text-light footer-head">SeeDAO</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <router-link to="/page-aboutus" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> About
                  us</router-link>
              </li>
              <li>
                <router-link to="/page-services" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i>
                  Services</router-link>
              </li>
              <li>
                <router-link to="/page-team" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> Team
                </router-link>
              </li>
              <li>
                <router-link to="/page-pricing" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i>
                  Pricing</router-link>
              </li>
              <li>
                <router-link to="/page-portfolio-modern" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i>
                  Project</router-link>
              </li>
              <li>
                <router-link to="/page-jobs" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i>
                  Careers</router-link>
              </li>
              <li>
                <router-link to="/page-blog-grid" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> Blog
                </router-link>
              </li>
              <li>
                <router-link to="/auth-cover-login" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> Login
                </router-link>
              </li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h5 class="text-light footer-head">Usefull Links</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <router-link to="/page-terms" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> Terms of
                  Services</router-link>
              </li>
              <li>
                <router-link to="/page-privacy" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i> Privacy
                  Policy</router-link>
              </li>
              <li>
                <router-link to="/documentation" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i>
                  Documentation</router-link>
              </li>
              <li>
                <router-link to="/changelog" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i>
                  Changelog</router-link>
              </li>
              <li>
                <router-link to="/components" class="text-foot"><i class="mdi mdi-chevron-right mr-1"></i>
                  Components</router-link>
              </li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h5 class="text-light footer-head">Newsletter</h5>
            <p class="mt-4">Sign up and receive the latest tips via email.</p>
            <form>
              <div class="row">
                <div class="col-lg-12">
                  <div class="foot-subscribe form-group">
                    <label>Write your email
                      <span class="text-danger">*</span></label>
                    <div class="position-relative">
                      <mail-icon class="fea icon-sm icons"></mail-icon>
                      <input type="email" name="email" id="emailsubscribe" class="form-control pl-5 rounded"
                        placeholder="Your email : " required />
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <input type="submit" id="submitsubscribe" name="send" class="btn btn-soft-primary btn-block"
                    value="Subscribe" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer> -->
    <!--end footer-->
    <footer class="footer footer-bar">
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col-sm-6">
            <div class="text-sm-left">
              <p class="mb-0">
                © 2021 - {{ new Date().getFullYear() }} SeeDAO. 
              </p>
            </div>
          </div>
          <!--end col-->

          <div class="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <ul class="list-unstyled text-sm-right mb-0">
              <li class="list-inline-item">
                <a href="https://discord.gg/GREQRVSTE4"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30px" height="30px"><path fill="#8c9eff" d="M42,45l-9-7.001L34,41H10c-2.761,0-5-2.238-5-5V10c0-2.762,2.239-5,5-5h27c2.762,0,5,2.238,5,5V45z"/><path fill="#fff" d="M32.59,16.24c0,0-2.6-2.01-5.68-2.24l-0.27,0.55c2.78,0.67,4.05,1.64,5.38,2.83 C29.73,16.21,27.46,15,23.5,15s-6.23,1.21-8.52,2.38c1.33-1.19,2.85-2.27,5.38-2.83L20.09,14c-3.23,0.31-5.68,2.24-5.68,2.24 S11.5,20.43,11,28.62c2.94,3.36,7.39,3.38,7.39,3.38l0.92-1.23c-1.57-0.54-3.36-1.51-4.9-3.27c1.84,1.38,4.61,2.5,9.09,2.5 s7.25-1.12,9.09-2.5c-1.54,1.76-3.33,2.73-4.9,3.27L28.61,32c0,0,4.45-0.02,7.39-3.38C35.5,20.43,32.59,16.24,32.59,16.24z M20,27 c-1.1,0-2-1.12-2-2.5s0.9-2.5,2-2.5s2,1.12,2,2.5S21.1,27,20,27z M27,27c-1.1,0-2-1.12-2-2.5s0.9-2.5,2-2.5s2,1.12,2,2.5 S28.1,27,27,27z"/></svg></a>
              </li>
              <li class="list-inline-item ml-1">
                <a href="https://twitter.com/see_dao"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30px" height="30px"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"/></svg></a>
              </li>
            </ul>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </footer>
    <!--end footer-->
  </div>
</template>
