import { parse } from './parser'

export interface IMargoStatement {
    type: 'declaration' | 'builtin'
}

export interface IMargoDeclarationStatement extends IMargoStatement {
    type: 'declaration'
    key: string
    value: unknown
}

export interface IMargoBuiltin extends IMargoStatement {
    type: 'builtin'
    name: 'ignore_cell' | 'split_cell' | 'invalid_statement'
}

export const INVALID_STATEMENT: IMargoBuiltin = {
    type: 'builtin',
    name: 'invalid_statement',
}

export const IGNORE_CELL: IMargoBuiltin = {
    type: 'builtin',
    name: 'ignore_cell',
}

export const SPLIT_CELL: IMargoBuiltin = {
    type: 'builtin',
    name: 'split_cell',
}

export const DECLARATION = (
    key: string,
    value: unknown,
): IMargoDeclarationStatement => {
    return {
        type: 'declaration',
        key,
        value,
    }
}

export interface IMargoBlock {
    statements: Array<IMargoStatement>
}

export const EMPTY_BLOCK: IMargoBlock = {
    statements: [],
}

export class MargoSyntaxError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export function convertToMargoBlock(sourceCode: string): IMargoBlock {
    let parsed: Array<unknown>
    try {
        parsed = parse(sourceCode)
    } catch {
        throw new MargoSyntaxError('Failed to parse code block')
    }
    const statements: Array<IMargoStatement> = []
    parsed.forEach((line: unknown) => {
        if (Array.isArray(line)) {
            const newStatement = convertToMargoStatement(line)
            if (newStatement !== INVALID_STATEMENT) {
                statements.push(newStatement)
            }
        }
    })
    return {
        statements,
    }
}

function unwrapValue(arr: Array<unknown>): unknown {
    if (arr.length !== 2) {
        return
    }

    const value = arr[1]

    return value
}

export function convertToMargoStatement(line: Array<unknown>): IMargoStatement {
    if (line[0] !== 'LINE') {
        return INVALID_STATEMENT
    }

    if (!Array.isArray(line[1])) {
        return INVALID_STATEMENT
    }

    // determine the type of statemnt
    if (line[1][0] === 'IGNORE_CELL') {
        return IGNORE_CELL
    }

    if (line[1][0] == 'SPLIT_CELL') {
        return SPLIT_CELL
    }

    if (Array.isArray(line[1])) {
        if (line[1][0] === 'KEY_VALUE') {
            const [key, val] = line[1][1]
            return DECLARATION(key, unwrapValue(val))
        }
    }

    // return undefined
    return INVALID_STATEMENT
}

export function getDeclaredValue(
    key: string,
    block: IMargoBlock,
): unknown | undefined {
    let ret
    block.statements.forEach((statement: IMargoStatement) => {
        if (statement.type == 'declaration') {
            if ((statement as IMargoDeclarationStatement).key === key) {
                ret = (statement as IMargoDeclarationStatement).value
            }
        }
    })

    return ret
}
