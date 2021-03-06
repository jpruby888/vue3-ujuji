const useHeadLink = (id: string, type: 'link' | 'script', cnt: string) => {
  //hooks
  //type === script ,cnt=>src
  switch (type) {
    case 'script':
      let script = document.head.querySelector(`#${id}`)
      if (!script) {
        script = document.createElement('script')
        script.setAttribute('id', id)
        document.head.appendChild(script)
      }
      script.setAttribute('src', cnt)
      break
    case 'link':
      let link = document.head.querySelector(`#${id}`)
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('id', id)
        link.setAttribute('rel', 'stylesheet')
        document.head.appendChild(link)
      }
      link.setAttribute('href', cnt)
      break
  }
}

export default useHeadLink
