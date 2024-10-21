let touchEventsSupported
if (window.ontouchend === undefined) {
  touchEventsSupported = false
} else {
  const _ontouchend = window.ontouchend
  window.ontouchend = undefined
  touchEventsSupported = window.ontouchend !== undefined
  window.ontouchend = _ontouchend
}
export default touchEventsSupported

