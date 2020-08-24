export function getID(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

export function injectIframe(html: string): string {
  const fragments = html.split(/<figure class="media">|<\/figure>/g)
  const modifiedFragments = fragments.map((fragment) => {
    console.log(fragment)
    if (fragment.includes('<oembed')) {
      const youtubeID = getID(fragment.split('"')[1])
      if (youtubeID !== null)
        return `<iframe style="width: 362px; height: 204px" src="//www.youtube.com/embed/${youtubeID}" frameborder="0" allowfullscreen></iframe>`
      else return fragment
    } else return fragment
  })

  return modifiedFragments.join('')
}
