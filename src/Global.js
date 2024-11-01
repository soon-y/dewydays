const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',]
const d = new Date()
const yesterday = new Date(d)
yesterday.setDate(yesterday.getDate() - 1)
const yesterdayDate = yesterday.getDate() +" "+ 
  months[yesterday.getMonth()] +" " + 
  yesterday.getFullYear().toString().slice(2,4)

yesterday.setDate(yesterday.getDate() - 1)
const daybeforeY = yesterday.getDate() +" "+ 
  months[yesterday.getMonth()] +" " + 
  yesterday.getFullYear().toString().slice(2,4)

const GLOBAL = {
  background: '#8fdfff',
  backgroundHell: '#b0e9ff',
  backgroundDunkel: '#5bcefc',
  backgroundDunkeler: '#0898da',
  hover: '#56c5fd',
  fontFamily: "Quicksand",
  fontMain: "Cherry Bomb One",
  iconGap: 0.6,
  strokeColor: 'rgba(87, 190, 238, 1)',
  months : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',],
  days : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  weight: 70,
  age: 2000,
  duration: 60,
  activity: false,
  todaysGoal: 2100,
  currentIntake: 0,
  waterHeight: 100,
  waterPercent: 0,

  cupNum: 1,
  cupAmount: [190,350,600,1000],

  tabNum: 0,
  notification: false,
  repeatMon: false,
  repeatTue: false,
  repeatWed: false,
  repeatThu: false,
  repeatFri: false,
  repeatSat: false,
  repeatSun: false,
  interval: 60,
  timeRangeStart: 9,
  timeRangeEnd: 22,

  filterMon: true,
  filterTue: true,
  filterWed: true,
  filterThu: true,
  filterFri: true,
  filterSat: true,
  filterSun: true,

  alarmData: [
    { hour: 15, min: 0, tags: ['Mon']},
    { hour: 14, min: 0, tags: ['Tue', 'Wed']},
    { hour: 9, min: 30, tags: ['Mon','Tue','Wed','Thu','Fri']},
    { hour: 10, min: 30, tags: ['Sat','Sun']},
  ],

  latitude:  53.55,
  longitude: 10,
  API_KEY: '5e7132d57dd1b1491c308810e615e7ca',

  timelineDataIndex: 0,
  timelineData: [
    { amount: 200, cup: 1, date: yesterdayDate, hour: "09:", min:"00"},
    { amount: 200, cup: 1, date: yesterdayDate, hour: "10:", min:"30" },
    { amount: 200, cup: 2, date: yesterdayDate, hour: "12:", min:"17" },
    { amount: 240, cup: 2, date: yesterdayDate, hour: "14:", min:"30" },
    { amount: 150, cup: 2, date: yesterdayDate, hour: "16:", min:"50" },
    { amount: 350, cup: 3, date: yesterdayDate, hour: "18:", min:"48" },
    { amount: 550, cup: 3, date: yesterdayDate, hour: "19:", min:"50" },
    { amount: 80, cup: 0, date: yesterdayDate, hour: "22:", min:"41" },
    { amount: 100, cup: 0, date: daybeforeY, hour: "06:", min:"00"},
    { amount: 130, cup: 2, date: daybeforeY, hour: "08:", min:"30" },
    { amount: 260, cup: 2, date: daybeforeY, hour: "11:", min:"25" },
    { amount: 200, cup: 2, date: daybeforeY, hour: "13:", min:"31" },
    { amount: 350, cup: 2, date: daybeforeY, hour: "15:", min:"20" },
    { amount: 500, cup: 3, date: daybeforeY, hour: "18:", min:"42" },
    { amount: 150, cup: 1, date: daybeforeY, hour: "20:", min:"30" },
    { amount: 300, cup: 1, date: daybeforeY, hour: "23:", min:"52" },
  ]
}

export { GLOBAL }