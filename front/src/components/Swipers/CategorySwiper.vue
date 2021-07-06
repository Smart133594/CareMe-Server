<template>
  <div class="sc-outer pl-0 pr-0">
    <div class="row">
      <div class="col-12 wow move-up">
        <div class="flexible-image-slider-wrap">
          <div class="swiper-container">
            <swiper :options="swiperOption">
              <div
                class="swiper-slide"
                style=" cursor:pointer;"
                v-for="(item, index) in items"
                :key="`${index}_item_category`"
              >
                <div class="single-flexible-slider wow move-up border" @click="selectedItem(item)">
                  <figure class="img-wrapper mb-0" >
                    <v-img
                      :src="`${baseUrl}uploads/categories/${item.image}`"
                      alt="project-1"
                      style="height: 200px"
                    >
                    </v-img>
                    <figcaption>
                      <h6 class="font-weight--bold text-purple">
                        {{
                          item[
                            selectedLocale.locale == "en"
                              ? "en_name"
                              : "ar_name"
                          ]
                        }}
                      </h6>
                    </figcaption>
                  </figure>
                  <h6 class="font-weight--bold text-purple mt-1 ml-1">
                    {{
                      item[
                        selectedLocale.locale == "en"
                          ? "en_name"
                          : "ar_name"
                      ]
                    }}
                  </h6>
                </div>
              </div>
            </swiper>
            <!-- Add Arrows -->
            <div
              class="swiper-pagination swiper-pagination-2 swiper-pagination-categories section-space--mt_20"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CategorySwiper",
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
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination-categories",
          clickable: true,
        },
        slidesPerView: 4,
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
      this.$router.push(`/vendors/${item.id}/-1`);
    },
  },
};
</script>
