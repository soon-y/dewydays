const GLOBAL = {
  background: '#8fdfff',
  backgroundHell: '#b0e9ff',
  backgroundDunkel: '#5bcefc',
  backgroundDunkeler: '#0898da',
  hover: '#56c5fd',
  fontFamily: "Nunito",
  fontMain: "Cherry Bomb One",
  iconGap: 0.6,
  strokeColor: 'rgba(87, 190, 238, 1)',
  months : [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  days : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  weight: 70,
  age: 2000,
  duration: 60,
  activity: false,
  todaysGoal: 2100,

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

  filterMon: false,
  filterTue: false,
  filterWed: false,
  filterThu: false,
  filterFri: false,
  filterSat: false,
  filterSun: false,


  alarmData: [
    { id: 0, hour: 10, min: 0, tags: ['Mon']},
    { id: 1, hour: 9, min: 10, tags: ['Tue', 'Wed']},
    { id: 2, hour: 13, min: 20, tags: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']},
    { id: 3, hour: 14, min: 30, tags: ['Mon', 'Tue']},

  ],


}

export { GLOBAL }