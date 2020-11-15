import * as nearley from 'nearley'
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
    return sourceParser.results[0]
}
