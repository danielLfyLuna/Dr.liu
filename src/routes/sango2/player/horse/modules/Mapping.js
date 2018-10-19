export const qualityKeys = {
  0: '白',
  1: '绿',
  2: '蓝',
  3: '紫',
  4: '橙',
  5: '红'
}

export const colorKeys = {
  0: 'white',
  1: 'green',
  2: 'DeepSkyBlue',
  3: 'Orchid',
  4: 'orange',
  5: 'red'
}

export const statusKeys = {
  2: '销毁',
  1: '正常'
}

const totalScoreKeys = {
  c: ['c-', 'c', 'c+'],
  b: ['b-', 'b', 'b+'],
  a: ['a-', 'a', 'a+'],
  s: ['s-', 's', 's+'],
  ss: ['ss', 'ss+'],
  sss: ['sss', 'sss+']
}

export const totalScoreFun = (value) => {
  // c
  if (value >= 0 && value <= 2000) {
    return `${totalScoreKeys.c[0]}(${value})`
  }
  if (value > 2000 && value <= 2500) {
    return `${totalScoreKeys.c[1]}(${value})`
  }
  if (value > 2500 && value <= 3000) {
    return `${totalScoreKeys.c[2]}(${value})`
  }

  // b
  if (value > 3000 && value <= 4000) {
    return `${totalScoreKeys.b[0]}(${value})`
  }
  if (value > 4000 && value <= 5000) {
    return `${totalScoreKeys.b[1]}(${value})`
  }
  if (value > 5000 && value <= 6000) {
    return `${totalScoreKeys.b[2]}(${value})`
  }

  // a
  if (value > 6000 && value <= 8000) {
    return `${totalScoreKeys.a[0]}(${value})`
  }
  if (value > 8000 && value <= 10000) {
    return `${totalScoreKeys.a[1]}(${value})`
  }
  if (value > 10000 && value <= 12000) {
    return `${totalScoreKeys.a[2]}(${value})`
  }

  // s
  if (value > 12000 && value <= 14000) {
    return `${totalScoreKeys.s[0]}(${value})`
  }
  if (value > 14000 && value <= 20000) {
    return `${totalScoreKeys.s[1]}(${value})`
  }
  if (value > 20000 && value <= 22000) {
    return `${totalScoreKeys.s[2]}(${value})`
  }


  // ss
  if (value > 22000 && value <= 24000) {
    return `${totalScoreKeys.ss[0]}(${value})`
  }
  if (value > 24000 && value <= 26000) {
    return `${totalScoreKeys.ss[1]}(${value})`
  }

  // sss
  if (value > 26000 && value <= 28000) {
    return `${totalScoreKeys.sss[0]}(${value})`
  }
  if (value > 28000) {
    return `${totalScoreKeys.sss[1]}(${value})`
  }
}
