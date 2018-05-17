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

    best_score() {
      return this.competitor.results
        .map( el => { return parseFloat(el.points) } )
        .reduce( (max, value) => { return Math.max(max, value) } )
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
      <div class="competitor__points">{{ this.best_score.toFixed(1) }}</div>

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
  position: absolute;
  top: 66px;
  left: 0px;
  width: 100px;
  text-align: center;
  font-size: 48px;
}

.competitor__points {
  position: absolute;
  text-align: center;
  top: 208px;
  left: 196px;
  width: 86px;
  font-size: 34px;
}

</style>
