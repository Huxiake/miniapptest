const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 根据value查出数组的key
 */
const evalKey = (arr, val) => {
  console.log('arr:',arr)
  console.log('val:',val)
  const len = arr.lenght
  var key = 0
  for (let i = 0; i < len; i++) {
    if (val === arr[i]) {
      key = i
    }
  }
  return key
}

module.exports = {
  formatTime: formatTime,
  evalKey: evalKey
}
