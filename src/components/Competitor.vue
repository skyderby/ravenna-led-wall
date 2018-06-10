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
    }
  },
}
</script>

<template>
  <div class="competitor">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div class="competitor__data" v-if="!loading">
      <div class="competitor__rank">{{ this.competitor.formated_rank }}</div>
      <div class="competitor__name">{{ this.competitor.name }}</div>
      <div class="competitor__country">{{ this.competitor.country_code }}</div>
      <div class="competitor__suit">{{ this.competitor.suit_name }}</div>
      <div class="competitor__points">{{ this.competitor.best_score }}</div>

      <div class="round round-1">
        <div class="result">{{ this.competitor.distance(1) }} m</div>
        <div class="result">{{ this.competitor.speed(1) }} km/h</div>
        <div class="result">{{ this.competitor.time(1) }} s</div>
      </div>

      <div class="round round-2">
        <div class="result">{{ this.competitor.distance(2) }} m</div>
        <div class="result">{{ this.competitor.speed(2) }} km/h</div>
        <div class="result">{{ this.competitor.time(2) }} s</div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'bitsumisiregular';
  src: url('/static/bitsumis.woff2') format('woff2'),
       url('/static/bitsumis.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.competitor {
  height: 720px;
  width: 1152px;
  background-color: #00fe57;
}

.round {
  color: white;
  font-size: 22px;
  line-height: 31px;
  font-family: Arial;
  font-family: Arial;
  text-align: left;
}

.round-1 {
  position: absolute;
  top: 339px;
  left: 140px;
}

.round-2 {
  position: absolute;
  top: 516px;
  left: 140px;
}

.competitor__rank {
  font-family: bitsumisiregular;
  position: absolute;
  top: 70px;
  left: 0px;
  width: 100px;
  text-align: center;
  font-size: 48px;
}

.competitor__points {
  font-family: bitsumisiregular;
  position: absolute;
  text-align: center;
  top: 212px;
  left: 197px;
  width: 86px;
  font-size: 34px;
}

.competitor__name {
  font-family: bitsumisiregular;
  position: absolute;
  top: 60px;
  left: 133px;
  font-size: 40px;
  color: white;
}

.competitor__country {
  font-family: bitsumisiregular;
  position: absolute;
  top: 95px;
  left: 558px;
  font-size: 40px;
  color: white;

}

.competitor__suit {
  position: absolute;
  text-transform: uppercase;
  top: 102px;
  left: 210px;
  font-size: 24px;
  font-weight: bold;
  color: white;
}
</style>
