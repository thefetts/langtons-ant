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

const Colors = ['black', 'green', 'red', 'blue', 'yellow', 'orange', 'purple', 'pink']

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
  }

  move() {
    const el = document.querySelector(`#cell-${(this.x)}-${this.y}`)
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

const ants = []

let interval
function go() {
  if(!interval) {
    interval = setInterval(() => {
      try {
        ants.forEach(ant => ant.move())
      } catch (e) {
        console.log(`An ant made it to the edge! ~FIN~`)
        clearInterval(interval)
      }
    }, 20)
  }
}

function stop() {
  clearInterval(interval)
  interval = undefined
}

function reset() {
  stop()
  document.querySelectorAll('.on').forEach(el => resetClassList(el))
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
