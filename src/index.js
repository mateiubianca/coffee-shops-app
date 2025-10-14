import { getNearestShops } from '#app'

function main(params) {
  const position = {
    x: process.argv[2],
    y: process.argv[3],
  }

  console.log(position)

  getNearestShops(position)
}

main()
