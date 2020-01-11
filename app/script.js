const timesDo = function(number, func) {
  let count = 0
  while(count < number) {
    func(count)
    count++
  }
}

const width = 200
const height = 100
const $grid = document.querySelector('#grid')

timesDo(height, row => {
  const rowDiv = document.createElement('div')
  rowDiv.className = 'row'
  rowDiv.id = `row-${row}`
  $grid.append(rowDiv)

  timesDo(width, col => {
    const cellDiv = document.createElement('div')
    cellDiv.className = 'cell'
    cellDiv.id = `cell-${col}-${row}`
    rowDiv.append(cellDiv)
  })
})

const Headings = {
  E: { left: 'N', right: 'S', moveAxis: 'y' },
  W: { left: 'S', right: 'N', moveAxis: 'y' },
  N: { left: 'W', right: 'E', moveAxis: 'x' },
  S: { left: 'E', right: 'W', moveAxis: 'x' }
}

class Ant {
  x
  y
  color
  heading = Headings.E

  constructor({
    x = Math.floor(width / 2),
    y = Math.floor(height / 2),
    color = 'black'
  }) {
    this.x = x
    this.y = y
    this.color = color
  }

  move() {
    const el = document.querySelector(`#cell-${(this.x)}-${this.y}`)
    if(el.classList.contains('on')) {
      this.changePosition('left')
      this.heading = Headings[this.heading.left]
      el.classList.remove('on', 'black', 'red', 'green', 'blue')
    } else {
      this.changePosition('right')
      this.heading = Headings[this.heading.right]
      el.classList.add('on', this.color)
    }
  }

  changePosition(direction) {
    if (this.heading[direction] === 'N') {
      this.y--
    } else if (this.heading[direction] === 'S') {
      this.y++
    } else if (this.heading[direction] === 'W') {
      this.x--
    } else if (this.heading[direction] === 'E') {
      this.x++
    }
  }
}

const ant = new Ant({x: 110})
const ant2 = new Ant({x: 90, color: 'green'})
const ant3 = new Ant({y: 40, color: 'red'})
const ant4 = new Ant({y: 60, color: 'blue'})
const ants = [ant, ant2, ant3, ant4]

const interval = setInterval(() => {
  try {
    ants.forEach(ant => ant.move())
  } catch (e) {
    console.log(`Error: ${e}`)
    clearInterval(interval)
  }
}, 20)
