<template>
  <v-container>
    <h1 style="font-size: 30px;font-weight: 700;" class="mb-5 faq">{{$t('message.frequentlyAskedQuestions')}}</h1>
    <b-tabs content-class="mt-3" active-nav-item-class="active-item">
      <b-tab title-link-class="item" :title="$t('message.orderRelated')" active>
        <h1 class="mb-4 mt-5" style="font-size:30px">{{$t('message.orderRelated')}}</h1>
        <div v-for="i in 5" :key="i">
         <p class="text-purple" style="font-weight:600;margin-bottom:1em">{{$t(`message.faqOrderTitle${i}`)}}</p>
         <p class="text-purple" style="margin-bottom:1em">{{$t(`message.faqOrderText${i}`)}}</p>
        </div>
      </b-tab>
      <b-tab title-link-class="item" :title="$t('message.deliveryRelated')">
        <div class="p-3">
          <h1 class="mb-2" style="font-size:30px">{{$t('message.deliveryRelated')}}</h1>
          <p class="text-purple" v-for="i in 3" :key="`pre${i}`" style="margin:0px; font-size:12px">{{$t(`message.preDelivery${i}`)}}</p>
        </div>
        <p class="text-purple mt-5" v-for="i in 7" :key="`text${i}`" style="font-size:14px">{{$t(`message.deliveryText${i}`)}}</p>
      </b-tab>
      <b-tab title-link-class="item" :title="$t('message.accountRelated')">
        <h1 class="mb-4 mt-5" style="font-size:30px">{{$t('message.accountRelated')}}</h1>
        <p class="text-purple mb-0" style="font-weight:600; font-size:15px">{{$t(`message.accountQuestion1`)}}</p>
        <ul style="margin-left:0;padding-left: 15px;list-style: inside; color:#434343 ">
          <li v-for="i in 5" :key="`li1_${i}`">{{$t(`message.accountAnswer1_${i}`)}}</li>
        </ul>

        <p class="text-purple mt-5 mb-0" style="font-weight:600; font-size:15px">{{$t(`message.accountQuestion2`)}}</p>
        <ul style="margin-left:0;padding-left: 15px;list-style: inside; color:#434343 ">
          <li v-for="i in 6" :key="`li1_${i}`">{{$t(`message.accountAnswer2_${i}`)}}</li>
        </ul>
      </b-tab>
    </b-tabs>
  </v-container>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  methods: {},

  beforeMount() {},
  mounted() {},
};
</script>

<style lang="scss">
  .active-item{
    font-weight: 600;
  }
  .item{
    color: #434343 !important;
  }
</style>
