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

class Cell {
  constructor(x, y, color) {
    this.element = document.querySelector(`#cell-${(x)}-${y}`)
    this.setColor(color)
  }

  setColor(color) {
    this.color = color
    this.element.classList.add(color)
  }

  activate() {
    this.element.classList.add('on', this.color)
  }
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
    this.cell = new Cell(x, y, color)
  }

  move() {
    const el = this.cell.element
    if(el.classList.contains('on')) {
      this.changePosition('left')
      this.heading = Headings[this.heading.left]
      resetClassList(el)
    } else {
      this.changePosition('right')
      this.heading = Headings[this.heading.right]
      this.cell.activate()
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
function go() {
  if(!interval) {
    interval = setInterval(() => {
      try {
        ants.forEach(ant => ant.move())
      } catch (e) {
        alert(`An ant made it to the edge! ~FIN~`)
        clearInterval(interval)
      }
    }, delay)
  }
}

function stop() {
  clearInterval(interval)
  interval = undefined
}

function reset() {
  stop()
  const colorsSelector = `.on,${Colors.selectors}`
  document.querySelectorAll(colorsSelector).forEach(el => resetClassList(el))
  ants.splice(0, ants.length)
}

document.querySelector('#go').addEventListener('click', go)
document.querySelector('#stop').addEventListener('click', stop)
document.querySelector('#reset').addEventListener('click', reset)
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
