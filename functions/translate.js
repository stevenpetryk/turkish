const fetch = require("node-fetch")
const cheerio = require("cheerio")

exports.handler = function(event, context, callback) {
  const word = event.queryStringParameters.word
  console.log(word)

  console.log(`https://www.dict.com/?t=tr&set=_tren&w=${word}`)

  const response = fetch(`https://www.dict.com/?t=tr&set=_tren&w=${encodeURIComponent(word)}`)

  response
    .then((r) => r.text())
    .then((html) => {
      let response
      let responseCode

      try {
        const definitions = extractDefinitions(html)
        response = {
          definitions,
        }

        responseCode = 200
      } catch (e) {
        response = {
          error: "Unable to fetch translations",
          error_code: "translation_fetch_failure",
        }

        responseCode = 400
      }

      callback(null, {
        statusCode: responseCode,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(response),
      })
    })
}

function extractDefinitions(html) {
  const $ = cheerio.load(html)

  const definitions = []

  $(".lex_ful_tran").each((_i, translation) => {
    const $translation = $(translation)

    definitions.push({
      definition: $translation.text(),
      part: normalizePartOfSpeech(
        $translation
          .closest("tr")
          .prev()
          .text()
          .trim(),
      ),
    })
  })

  return definitions
}

/**
 * @param {string} partDescription
 */
function normalizePartOfSpeech(partDescription) {
  if (!partDescription) return null

  if (partDescription.match(/\bn\b/)) {
    return "noun"
  } else if (partDescription.match(/\badj\b/)) {
    return "adjective"
  } else if (partDescription.match(/\badv\b/)) {
    return "adverb"
  } else if (partDescription.match(/\bv\b/)) {
    return "verb"
  }

  return partDescription
}
