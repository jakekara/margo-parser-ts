import * as nearley from 'nearley'
import { MargoSyntaxError } from './api'
// NOTE: grammar.ts file must be generated first;
import grammar from './grammar'

/**
 * get a nearley line parser
 */
export function getParser(): nearley.Parser {
    return new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
}

/**
 * Parse a line of source code
 * @param {string} sourceString source to parse
 */
export function parse(sourceString: string): Array<unknown> {
    const sourceParser = getParser()
    sourceParser.feed(sourceString)
    const result = sourceParser.results[0]
    if (result === undefined) {
        throw new MargoSyntaxError('Failed to parse code')
    }
    return result
}
