<script>
import Store from '@/store'

export default {
  name: 'ScoreboardShow',
  data() {
    return {
      store: Store
    }
  },

  created() {
    if (this.store.empty) this.store.fetchData()
  },

  computed: {
    loading() {
      return this.store.loading
    },

    error() {
      return this.store.error
    },

    category_name() {
      return this.$route.params.category.toLowerCase()
    },

    category() {
      return this.store.sections.find( el => { return el.name.toLowerCase() === this.category_name } )
    },

    category_id() {
      return this.category.id
    },

    page() {
      return this.$route.params.page
    },

    rank_range_start() {
      return (this.page - 1) * 10
    },

    rank_range_end() {
      return this.page * 10
    },

    competitors() {
      return this.store.competitors.filter ( el => {
        return el.rank > this.rank_range_start &&
          el.rank <= this.rank_range_end &&
          el.section_id === this.category_id
      })
    }
  }
}
</script>

<template>
  <div class="scoreboard">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div class="error" v-if="error">
      <h1>Error during loading scoreboard data</h1>
      <h3>{{ error.message }}</h3>
      <p>{{ error.stack }}</p>
    </div>

    <div class="scoreboard__table" v-if="!loading">
      <table>
        <thead>
          <tr>
            <th class="rank">#</th>
            <th class="th-competitor">Competitor</th>
            <th class="th-country">Country</th>
            <th class="th-result">Dist R1</th>
            <th class="th-result">Dist R2</th>
            <th class="th-result">Speed R1</th>
            <th class="th-result">Speed R2</th>
            <th class="th-result">Time R1</th>
            <th class="th-result">Time R2</th>
            <th>Total score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="competitor in competitors">
            <td class="rank">{{ competitor.rank }}</td>
            <td class="text-left">{{ competitor.name }}</td>
            <td>{{ competitor.country_code }}</td>
            <td>{{ competitor.distance(1, '') }}</td>
            <td>{{ competitor.distance(2, '') }}</td>
            <td>{{ competitor.speed(1, '') }}</td>
            <td>{{ competitor.speed(2, '') }}</td>
            <td>{{ competitor.time(1, '') }}</td>
            <td>{{ competitor.time(2, '') }}</td>
            <td>{{ competitor.total_points > 0 ? competitor.total_points : '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.scoreboard {
  height: 720px;
  width: 1152px;
  background-color: #00fe57;
  padding-top: 100px;
  padding-bottom: 30px;
}

.scoreboard__table {
  padding: 5px;
  background-color: white;
  width: 915px;
  margin-left: auto;
  margin-right: auto;
}

table {
  border-collapse: collapse;
  box-sizing: border-box;
  width: 915px;
}

th {
  white-space: nowrap;
  text-align: center;
  padding: 5px 8px;
  border: 1px solid #eee;
  box-sizing: border-box;
}

td {
  white-space: nowrap;
  font-size: 18px;
  padding: 8px 8px;
  border: 1px solid #eee;
  box-sizing: border-box;
}

.th-country {
  width: 60px;
}

.rank {
  width: 30px;
}

.th-result {
  width: 80px;
}

.th-competitor {
  width: 200px;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}
</style>
