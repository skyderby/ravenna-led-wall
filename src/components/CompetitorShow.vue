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

    name() {
      return this.competitor.name
    },

    country() {
      return this.competitor.country_code
    },

    suit() {
      return this.competitor.suit_name
    },

    rank() {
      return this.competitor.rank
    },

    total_points() {
      return this.competitor.total_points
    },

    best_score() {
      if (this.competitor.results.length == 0) return ''

      return this.competitor.results
        .map( el => { return parseFloat(el.points) } )
        .reduce( (max, value) => { return Math.max(max, value) } )
        .toFixed(1)
    }
  },

  methods: {
    round_results(round_number) {
      return this.competitor.results.filter( el => { return el.round == round_number } )
    },

    distance(round_number) {
      const PLACEHOLDER = '---.-'

      let entry =
        this.round_results(round_number)
            .find( el => { return el.discipline === "distance" } )

      if (entry === undefined) {
        return PLACEHOLDER
      } else {
        return parseFloat(entry.result).toFixed()
      }
    },

    speed(round_number) {
      const PLACEHOLDER = '---.-'

      let entry = this.round_results(round_number).find( el => { return el.discipline === "speed" } )

      if (entry === undefined) {
        return PLACEHOLDER
      } else {
        return parseFloat(entry.result).toFixed(1)
      }
    },

    time(round_number) {
      const PLACEHOLDER = '--.-'

      let entry = this.round_results(round_number).find( el => { return el.discipline === "time" } )

      if (entry === undefined) {
        return PLACEHOLDER
      } else {
        return parseFloat(entry.result).toFixed(1)
      }
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
      <div class="competitor__rank">{{ this.rank }}</div>
      <div class="competitor__name">{{ this.name }}</div>
      <div class="competitor__country">{{ this.country }}</div>
      <div class="competitor__suit">{{ this.suit }}</div>
      <div class="competitor__points">{{ this.best_score }}</div>

      <div class="round round-1">
        <div class="result">{{ this.distance(1) }} m</div>
        <div class="result">{{ this.speed(1) }} km/h</div>
        <div class="result">{{ this.time(1) }} s</div>
      </div>

      <div class="round round-2">
        <div class="result">{{ this.distance(2) }} m</div>
        <div class="result">{{ this.speed(2) }} km/h</div>
        <div class="result">{{ this.time(2) }} s</div>
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
