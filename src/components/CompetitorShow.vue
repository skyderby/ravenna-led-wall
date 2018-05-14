<script>
import Store from '@/store'

export default {
  name: 'CompetitorShow',

  data() {
    return {
      store: Store
    }
  },

  created() {
    if (this.store.empty) this.store.fetchData()
  },

  computed: {
    loading () {
      return this.store.loading
    },

    id() {
      return this.$route.params.id
    },

    competitor() {
      return this.store.competitors.find( el => { return el.id == this.id } )
    },

    rank() {
      return this.competitor.rank
    },

    total_points() {
      return this.competitor.total_points
    },

    round1() {
      return this.competitor.results.filter( el => { return el.round == "1" } )
    },

    distance1() {
      return this.round1.find( el => { return el.discipline === "distance" } )
    }
  }
}
</script>

<template>
  <div class="competitor">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div class="competitor__data" v-if="!loading">
      <div class="competitor__rank">Rank: {{ this.rank }}</div>
      <div class="competitor__points">Total points: {{ this.total_points }}</div>
      <div class="round">

        <div class="result">Distance 1 {{ this.distance1.result }} m</div>
      </div>
    </div>
  </div>
</template>
