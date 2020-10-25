import * as nearley from 'nearley'
// NOTE: grammar.ts file must be generated first;
import grammar from './grammar'

/**
 * get a line parser
 */
export function getParser(): nearley.Parser {
    return new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
}

export function parse(sourceString: string): Array<unknown> {
    const sourceParser = getParser()
    sourceParser.feed(sourceString)
    return sourceParser.results[0]
}
