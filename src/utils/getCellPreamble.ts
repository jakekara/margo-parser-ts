import { convertToMargoBlock, IMargoBlock } from '../api'
import getCellPreambleSource from './getCellPreambleSource'

/**
 * Get an IMargoBlock of the cell's Margo preamble
 * @param {string} cellSource cell source code
 */
export default function getPreamble(cellSource: string): IMargoBlock {
    try {
        return convertToMargoBlock(getCellPreambleSource(cellSource))
    } catch {
        throw new Error('')
    }
}
