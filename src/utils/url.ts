export const jumpUrI = (url: string) => {
  let win = window.open(url)
  if (!win) {
    location.href = url
  }
}
