<script>
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "vue-feather-icons";

export default {
  props: {
    teamData: {
      type: Array,
      default: [],
    },
  },
  components: {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    LinkedinIcon,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <div class="row">
    <div
      class="col-lg-3 col-md-6 mt-4 pt-2"
      v-for="(item, index) in teamData"
      :key="index"
    >
      <div class="card team text-center border-0">
        <div class="position-relative">
          <img
            :src="`${item.image}`"
            class="img-fluid avatar avatar-ex-large rounded-circle shadow"
            alt=""
          />
          <ul class="list-unstyled team-icon mb-0 mt-4">
           
            <li class="list-inline-item ml-1">
              <a :href="item.positionUrl" target="_blank" class="btn btn-secondary btn-sm">
                岗位说明
              </a>
            </li>&nbsp;
            <li class="list-inline-item">
              <a :href="item.candidateUrl" target="_blank" class="btn btn-secondary btn-sm">
               竞选人
              </a>
            </li>
            <br/>
            <li class="list-inline-item">
              <a :href="item.applicationUrl" target="_blank" class="btn btn-primary btn-sm">
               我要报名
              </a>
            </li>
          </ul>
          <!--end icon-->
        </div>
        <div class="card-body py-3 px-0 content">
          <h5 class="mb-0">
            <a href="javascript:void(0)" class="name text-dark">{{
              item.name
            }}</a>
          </h5>
          <small class="designation text-muted">{{ item.designation }}</small>
        </div>
      </div>
    </div>
    <!--end col-->
  </div>
</template>