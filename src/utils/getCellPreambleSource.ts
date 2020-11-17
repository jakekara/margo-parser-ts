/**
 * Get the margo preamble if any from a cell.
 * @param {string} cellSource a source string
 */
export default function getCellPreambleSource(cellSource: string): string {
    const lines = cellSource.split('\n')
    const preambleLines: Array<string> = []

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trimLeft()
        const isBlank = line.trim().length < 1

        // if it's a margo comment, add it
        if (line.startsWith('# :: ')) {
            preambleLines.push(line.slice(5))
        }

        // skip blank lines
        if (isBlank) {
            continue
        }

        // if it's not blank, and it doesn't start with a '# ::'
        // then it's not part of the preamble, so we're done
        if (!line.startsWith('#')) {
            break
        }
    }

    return preambleLines.join('\n')
}
