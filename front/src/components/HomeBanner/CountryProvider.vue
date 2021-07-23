<template>
	<v-menu offset-y origin="right top" left content-class="country-dropdown" transition="slide-y-transition" nudge-top="-10">
		<template v-slot:activator="{ on }">
			<div v-on="on" class="ml-2 v-step-3 d-flex align-items-center">
				<img class="img-responsive mr-1" :src="`/static/country-icons/${selectedCountry.key}.png`">
				<p>{{selectedCountry.name}}</p>
			</div>
		</template>
		<div class="dropdown-content">
			<v-list class="dropdown-list">
				<v-list-item v-for="country in countries" :key="country.key"  @click="changeCountry(country)">
					<img class="img-responsive mr-3" :src="`/static/country-icons/${country.key}.png`">
					<span>{{ country.name }}</span>
				</v-list-item>
			</v-list>
		</div>
	</v-menu>
</template>

<script>
	export default {
		computed: {
		},
		data() {
			return {
				countries:[
					{name:"Quatar", key:"quatar"}, 
					{name:"United Arab Emirates",  key:"arab"}, 
					{name:"Bahrain", key:"bahrain"}, 
					{name:"Saudi Arabia", key:"saudi"}, 
					{name:"Oman", key:"oman"}, 
				],
				selectedCountry : {}
			};
		},
		methods: {
			changeCountry(country) {
				this.selectedCountry = country
			}
		},
		beforeMount(){
			this.selectedCountry = this.countries[0]
		}
	};
</script>