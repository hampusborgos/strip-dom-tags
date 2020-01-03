let domParser = null

const stripNode = (node, whitelistedTags, whitelistedAttributes) => {
  let content = node.nodeValue
  if (node.childNodes.length > 0) {
    content = [...node.childNodes]
      .map(element => stripNode(element, whitelistedTags, whitelistedAttributes))
      .join('')
  }

  // Can be `null`-ish
  content = content ? content : ''

  if (whitelistedTags.includes(node.nodeName.toUpperCase())) {
    let attributes = ''
    if (node.attributes.length > 0) {
      ;[...node.attributes].forEach(attribute => {
        if (whitelistedAttributes.includes(attribute.name.toUpperCase())) {
          // No stupid shit in the attributes please
          if (
            !attribute.value.startsWith('javascript:') && // eslint-disable-line no-script-url
            attribute.value.indexOf('"') === -1 &&
            attribute.value.indexOf('\n') === -1
          ) {
            attributes += ` ${attribute.name}="${attribute.value}"`
          }
        }
      })
    }

    return content
      ? `<${node.nodeName}${attributes}>${content}</${node.nodeName}>`
      : `<${node.nodeName}${attributes}/>`
  }

  return content
}

/**
 * Strips passed HTML to only allowed tags and attributes
 *
 * @param {String} html The HTML to strip.
 * @param {String[]} Allowed tags, ie. ['b', 'img']
 * @param {String[]} List of allowed attributes on the tags, ie. ['src']. Starting javascript: will ALWAYS be stripped
 */
const stripTags = (html, whitelistedTags = [], whitelistedAttributes = []) => {
  domParser = domParser || new DOMParser()
  const doc = domParser.parseFromString(html, 'text/html')

  const stripped = stripNode(
    doc.body,
    whitelistedTags.map(tag => tag.toUpperCase()),
    whitelistedAttributes.map(attr => attr.toUpperCase()),
  )

  return stripped
}

module.exports = stripTags
