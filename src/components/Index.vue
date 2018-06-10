<script>
import Store from '@/store'

export default {
  name: 'Index',
  data() {
    return {
      store: Store
    }
  },

  created() {
    if (this.store.empty) this.store.fetchData()
  },

  methods: {
    competitors_in_section (section) {
      return this.competitors.filter( el => { return el.section_id === section.id } )
    }
  },

  computed: {
    loading () {
      return this.store.loading
    },

    error () {
      return this.store.error
    },

    sections () {
      return this.store.sections.sort( (val1, val2) => {
        return val1.order > val2.order ? 1 : -1
      })
    },

    competitors () {
      return this.store.competitors
    },

    scoreboards() {
      let result = []

      this.sections.forEach( (section) => {
        const count = this.competitors_in_section(section).length
        if (count === 0) return

        const page_count = (count / 10) + 1

        for (let i = 1; i <= page_count; i++) {
          const rows_count = (i * 10 <= count) ? 10 : (count - i * 10)
          result.push({
            category: section.name,
            page: i,
            presentation: `${section.name} ${(i-1) * 10 + 1}-${i * 10 + rows_count}`
          })
        }
      })

      return result
    }
  }
}
</script>

<template>
  <div class="competitors-index">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div class="error" v-if="error">
      <h1>Error during loading scoreboard data</h1>
      <h3>{{ error.message }}</h3>
      <p>{{ error.stack }}</p>
    </div>

    <div class="index-main" v-if="!loading">
      <h1>Scoreboards</h1>

      <ul class="scoreboards-list">
        <li v-for="scoreboard in scoreboards">
          <router-link :to="{ name: 'Scoreboard', params: { category: scoreboard.category, page: scoreboard.page } }">
            {{ scoreboard.presentation }}
          </router-link>
        </li>
      </ul>

      <h1>Competitors</h1>

      <ul class="sections-list">
        <li v-for="section in sections">
          <span class="section__name">{{ section.name }}</span>
          <ul class="competitors-list">
            <li v-for="competitor in competitors_in_section(section)">
              <router-link :to="{ name: 'Competitor', params: { id: competitor.id } }">
                {{ competitor.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.loading {
  margin-left: auto;
  margin-right: auto;
  padding: 40px;
  font-size: 32px;
}

ul {
  text-align: left;
  line-height: 2;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.sections-list > li {
  padding-top: 20px;
}

.section__name {
  text-transform: uppercase;
  font-weight: bold;
}

.competitors-list {
  margin-left: 20px;
}
</style>
