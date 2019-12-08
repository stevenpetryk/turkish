const fetch = require("node-fetch")
const cheerio = require("cheerio")

exports.handler = function(event, context, callback) {
  const word = event.queryStringParameters.word

  console.log(`https://tureng.com/en/turkish-english/${word}`)

  const response = fetch(`https://tureng.com/en/turkish-english/${word}`)

  response
    .then((r) => r.text())
    .then((html) => {
      const def = extractDefinition(html)

      callback(null, {
        statusCode: 200,
        body: def,
      })
    })
}

function extractDefinition(html) {
  const $ = cheerio.load(html)

  return $(".searchResultsTable td.en.tm").html() || "nope"
}
