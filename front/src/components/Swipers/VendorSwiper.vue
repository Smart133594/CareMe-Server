<template>
  <div class="sc-outer pl-0 pr-0">
    <div class="row">
      <div class="col-12 wow move-up">
        <div class="flexible-image-slider-wrap">
          <div class="swiper-container">
            <swiper :options="swiperOption">
              <div
                class="swiper-slide"
                v-for="(item, index) in filterItem"
                :key="`${index}_item_vendor`"
              >
                <vendor-item :vendor="item"></vendor-item>
              </div>
            </swiper>
            <div
              class="swiper-pagination swiper-pagination-2 swiper-pagination-vendors section-space--mt_20"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VendorItem from "Components/Shop/VendorItem";

export default {
  name: "VendorSwiper",
  components: {
    VendorItem,
  },
  props: {
    items: {
      require: true,
    },
    filter: {
      require: false,
      default:null,
    },
    baseUrl: {
      require: true,
    },
  },
  computed: {
    ...mapGetters(["selectedLocale"]),

    filterItem(){
      if(this.filter == null){
        return this.items
      } else{
        return this.items.filter(item => item.category_id == this.filter.id)
      }
    }
  },
  data() {
    return {
      swiperOption: {
        speed: 500,
        loop: false,
        autoplay: true,
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination-vendors",
          clickable: true,
        },
        breakpoints: {
          1499: {
            slidesPerView: 3,
          },

          991: {
            slidesPerView: 1,
          },
        },
      },
    };
  },

  methods: {
    selectedItem(item) {
    },
  },
};
</script>
