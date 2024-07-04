import mjml2html from 'mjml-browser'
import { html as beautifyHtml } from 'js-beautify'

function convertMjmlToHtml(jsonData: any): string {
  try {
    // MJML to HTML conversion
    const { html } = mjml2html(jsonData)

    // Extract only the content within the <body> tags from the generated HTML
    const bodyContent = html.match(/<body[^>]*>([\s\S.]*)<\/body>/i)
    const bodyHtml = bodyContent ? bodyContent[1] : ''

    // Wrap the bodyHtml in a basic HTML5 template structure
    const htmlTemplate = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Generated HTML from MJML</title>
      </head>
      <body>
        ${bodyHtml}
      </body>
      </html>`

    // Beautify the HTML using js-beautify
    const beautifiedHtml = beautifyHtml(htmlTemplate, { indent_size: 2 })

    //console.log('Successfully converted MJML to HTML', beautifiedHtml)

    return beautifiedHtml
  } catch (error) {
    console.error('Error converting MJML to HTML:', error)
    return ''
  }
}

export { convertMjmlToHtml }
