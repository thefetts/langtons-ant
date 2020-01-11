const $ = (selector) => document.querySelector(selector)

Number.prototype.times = function(func) {
  let count = 0
  while(count < this) {
    func(count)
    count++
  }
}

const width = 200
const height = 100
const $grid = $('#grid')

height.times(row => {
  const rowDiv = document.createElement('div')
  rowDiv.className = 'row'
  rowDiv.id = `row-${row}`
  $grid.append(rowDiv)

  width.times(col => {
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
  x = Math.floor(width / 2)
  y = Math.floor(height / 2)
  heading = Headings.E

  move() {
    const el = $(`#cell-${(this.x)}-${this.y}`)

    // Pick a direction to move
    if(el.classList.contains('on')) {
      this.changePosition('left')
      this.heading = Headings[this.heading.left]
      el.classList.remove('on')
    } else {
      this.changePosition('right')
      this.heading = Headings[this.heading.right]
      el.classList.add('on')
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

const ant = new Ant()
const interval = setInterval(() => {
  try {
    ant.move()
  } catch (e) {
    console.log(`Error: ${e}`)
    clearInterval(interval)
  }
}, 20)
