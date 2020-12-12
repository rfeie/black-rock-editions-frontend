const path = require(`path`)

const artistsPagePath = path.resolve(`./src/templates/artists.js`)

const associatedLayouts = {
  "artists-page": artistsPagePath,
}

module.exports = {
  associatedLayouts,
}
