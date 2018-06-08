const EVENT_ID = '48'

export default {
  empty: true,
  loading: true,
  error: null,

  sections: [],
  competitors: [],

  fetchData () {
    fetch(`https://skyderby.ru/events/${EVENT_ID}/scoreboard.json`, { mode: 'cors' })
      .then( response => { return response.json() } )
      .then( data => {
        this.setData(data)
        this.loading = false
      })
      .catch( error => {
        this.loading = false
        this.error = error
      })
  },

  setData (data) {
    this.empty = false

    this.sections = data.sections
    this.competitors = []

    for (let section of this.sections) {
      let competitors = data.competitors.filter( el => { return el.section_id === section.id } )
      let index = 1
      competitors.forEach( el => {
        el.rank = index
        index += 1
      })

      this.competitors = this.competitors.concat(competitors)
    }
  }
}
