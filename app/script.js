const timesDo = function(number, func) {
  let count = 0
  while(count < number) {
    func(count)
    count++
  }
}

const width = 200
const height = 100
const delay = 20
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
  E: { left: 'N', right: 'S' },
  W: { left: 'S', right: 'N' },
  N: { left: 'W', right: 'E' },
  S: { left: 'E', right: 'W' }
}

const Colors = ['black', 'green', 'red', 'blue', 'yellow', 'orange', 'purple', 'pink']
Colors.selectors = Colors.map(c=>`.${c}`).join(',')

function resetClassList(el) {
  el.classList.remove('on', ...Colors)
}

class Ant {
  constructor({
    x = Math.floor(width / 2),
    y = Math.floor(height / 2),
    color = 'black'
  }) {
    this.x = x
    this.y = y
    this.color = color
    this.heading = Headings.E
    this.currentCell().classList.add(this.color)
  }

  currentCell() {
    return document.querySelector(`#cell-${(this.x)}-${this.y}`)
  }

  move() {
    const el = this.currentCell()
    if(el.classList.contains('on')) {
      this.changePosition('left')
      this.heading = Headings[this.heading.left]
      resetClassList(el)
    } else {
      this.changePosition('right')
      this.heading = Headings[this.heading.right]
      el.classList.add('on', this.color)
    }
  }

  changePosition(direction) {
    switch(this.heading[direction]) {
      case 'N': this.y--; break
      case 'S': this.y++; break
      case 'W': this.x--; break
      case 'E': this.x++
    }
  }
}

const ants = []

let interval
function stop() {
  clearInterval(interval)
  interval = undefined
}

document.querySelector('#go').addEventListener('click', () => {
  if (!interval) {
    interval = setInterval(() => {
      try {
        ants.forEach(ant => ant.move())
      } catch (e) {
        alert(`An ant made it to the edge! ~FIN~`)
        clearInterval(interval)
      }
    }, delay)
  }
})
document.querySelector('#stop').addEventListener('click', stop)
document.querySelector('#reset').addEventListener('click', () => {
  stop()
  const colorsSelector = `.on,${Colors.selectors}`
  document.querySelectorAll(colorsSelector).forEach(el => resetClassList(el))
  ants.splice(0, ants.length)
})
document.querySelectorAll('.cell').forEach(el => el.addEventListener('click', event => {
  const el = event.target
  el.classList.add('start')
  const idBits = el.id.split('-')
  const options = {
    x: idBits[1],
    y: idBits[2],
    color: Colors[ants.length % Colors.length]
  }
  ants.push(new Ant(options))
}))
