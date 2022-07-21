const tableBody = $('#tableBody')

let flights = [
  {
    time: '8:11',
    destination: 'OMAN',
    flight: 'OX 203',
    gate: 'A 01',
    remarks: 'ON TIME',
  },
  {
    time: '12:39',
    destination: 'LONDON',
    flight: 'CL 320',
    gate: 'C 31',
    remarks: 'CANCELLED',
  },
  {
    time: '13:21',
    destination: 'DUBAI',
    flight: 'DBX 201',
    gate: 'A 19',
    remarks: 'CANCELLED',
  },
  {
    time: '14:01',
    destination: 'FRANKFURT',
    flight: 'FR 402',
    gate: 'B 02',
    remarks: 'ON TIME',
  },
  {
    time: '15:22',
    destination: 'TOKYO',
    flight: 'TK 211',
    gate: 'A 32',
    remarks: 'DELAYED',
  },
]

const destinations = [
  'TOKYO',
  'FRANKFURT',
  'LONDON',
  'OMAN',
  'DUBAI',
  'BEIRUT',
  'BEIJING',
  'NEW YORK',
  'MIAMI',
  'LOS ANGELES',
  'ROME',
  'OTTOWA',
  'NAIROBI',
  'BISSAU',
  'ASTANA',
  'YAMOUSSOUKRO',
  'PRAGUE',
  'VICTORIA',
]
const remarks = ['ON TIME', 'DELAYED', 'CANCELLED']
let hour = 15

function populateTable() {
  for (const flight of flights) {
    const tableRow = $('<tr>')
    for (const flightDetails in flight) {
      const tableCell = $('<td>').appendTo(tableRow)
      const word = Array.from(flight[flightDetails])

      for (const [index, letter] of word.entries()) {
        setTimeout(() => {
          $('<div>').addClass('flip').text(letter).appendTo(tableCell)
        }, 100 * index)
      }
    }
    tableRow.appendTo(tableBody)
  }
}
populateTable()

function generateTime() {
  let displayHour = hour

  if (hour < 24) {
    hour++
  }
  if (hour >= 24) {
    hour = 1
    displayHour = hour
  }
  if (hour < 10) {
    displayHour = `0${hour}`
  }
  return `${displayHour}:${generateRandomNumber(5)}${generateRandomNumber()}`
}
function generateRandomLetter() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}
function generateRandomNumber(maxNum) {
  const numbers = '0123456789'
  if (maxNum) {
    const newNums = numbers.slice(0, maxNum)
    return newNums.charAt(Math.floor(Math.random() * newNums.length))
  }
  return numbers.charAt(Math.floor(Math.random() * numbers.length))
}

function shuffleUp() {
  flights.shift()
  flights.push({
    time: generateTime(),
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    flight: `${generateRandomLetter()}${generateRandomLetter()} ${generateRandomNumber()}${generateRandomNumber()}${generateRandomNumber()}`,
    gate: `${generateRandomLetter()} ${generateRandomNumber()}${generateRandomNumber()}`,
    remarks: remarks[Math.floor(Math.random() * remarks.length)],
  })

  tableBody.text('')
  populateTable()
}

setInterval(shuffleUp, 5000)
