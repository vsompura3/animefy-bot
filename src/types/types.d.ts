type SubpleaseAnimeResponse = {
  [name: string]: {
    time?: string
    release_date: string
    show: string
    episode: string
    downloads: [
      {
        res: string
        magnet: string
      },
    ]
    xdcc: string
    image_url: string
    page: string
  }
}
type Individual = {
  time?: string
  release_date: string
  show: string
  episode: string
  downloads: [
    {
      res: string
      magnet: string
    },
  ]
  xdcc: string
  image_url: string
  page: string
}
export { SubpleaseAnimeResponse }
