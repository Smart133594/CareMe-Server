<template>
  <div class="sc-outer pl-0 pr-0">
    <div class="row">
      <div class="col-12 wow move-up">
        <div class="flexible-image-slider-wrap">
          <div class="swiper-container shop-wrapper">
            <swiper :options="swiperOption">
              <div
                class="swiper-slide shop-content-wrap"
                v-for="(item, index) in items"
                :key="`${index}_item_product`"
              >
                <product-item :product="item"></product-item>
              </div>
            </swiper>
            <!-- Add Arrows -->
            <div
              class="swiper-pagination swiper-pagination-2 swiper-pagination-products section-space--mt_20"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductItem from "Components/Shop/ProductItem";
export default {
  components: {
    ProductItem,
  },
  name: "ProductSwiper",
  props: {
    items: {
      require: true,
    },
    baseUrl: {
      require: true,
    },
  },
  computed: {
    ...mapGetters(["selectedLocale"]),
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
          el: ".swiper-pagination-products",
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
      console.log(item);
    },
  },
};
</script>
