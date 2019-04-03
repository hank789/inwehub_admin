export function getCurTimestamp() {
  return (new Date()).getTime()
}

export function getSevenDayBeforeTimestamp() {
  return _getDateStr(-7)
}

export function getThirtyDayBeforeTimestamp() {
  return _getDateStr(-30)
}

function _getDateStr(dayCount) {
  const dd = new Date()
  dd.setDate(dd.getDate() + dayCount)
  const time = dd.getTime()
  return time + ''
}
