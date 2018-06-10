export default class {
  constructor(data) {
    this.data = data
  }

  round_results(round_number) {
    return this.results.filter( el => { return el.round == round_number } )
  }

  distance(round_number, placeholder = '---.-') {
    let entry =
      this.round_results(round_number)
      .find( el => { return el.discipline === "distance" } )

    if (entry === undefined) {
      return placeholder
    } else {
      return parseFloat(entry.result).toFixed()
    }
  }

  speed(round_number, placeholder = '---.-') {
    let entry = this.round_results(round_number).find( el => { return el.discipline === "speed" } )

    if (entry === undefined) {
      return placeholder
    } else {
      return parseFloat(entry.result).toFixed(1)
    }
  }

  time(round_number, placeholder = '--.-') {
    let entry = this.round_results(round_number).find( el => { return el.discipline === "time" } )

    if (entry === undefined) {
      return placeholder
    } else {
      return parseFloat(entry.result).toFixed(1)
    }
  }

  get id() {
    return this.data.id
  }

  get name() {
    return this.data.name
  }

  get country_code() {
    return this.data.country_code
  }

  get suit_name() {
    return this.data.suit_name
  }

  get formated_rank() {
    if (this.results.length === 0) {
      return '--'
    } else {
      return this.rank
    }
  }

  get rank() {
    return this.data.rank
  }

  get section_id() {
    return this.data.section_id
  }

  get results() {
    return this.data.results
  }

  get total_points() {
    return this.data.total_points
  }

  get best_score() {
    if (this.data.results.length == 0) return ''

    return this.data.results
      .map( el => { return parseFloat(el.points) } )
      .reduce( (max, value) => { return Math.max(max, value) } )
      .toFixed(1)
  }
}
