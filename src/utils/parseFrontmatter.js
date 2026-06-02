/**
 * Parsea el frontmatter YAML de un archivo Markdown.
 * Soporta strings, strings con comillas simples/dobles y arrays simples [a, b, c].
 *
 * @param {string} raw  - Contenido completo del archivo .md
 * @returns {{ frontmatter: Object, content: string, slug?: string }}
 */
export function parseFrontmatter(raw) {
  const parts = raw.split('---')
  const frontmatter = {}
  let content = raw

  if (parts.length >= 3) {
    parts[1].trim().split('\n').forEach(line => {
      const [key, ...rest] = line.split(':')
      if (key && rest.length) {
        let val = rest.join(':').trim().replace(/^['"]|['"]$/g, '')
        if (val.startsWith('[') && val.endsWith(']')) {
          val = val.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''))
        }
        frontmatter[key.trim()] = val
      }
    })
    content = parts.slice(2).join('---').trim()
  }

  return { frontmatter, content }
}
