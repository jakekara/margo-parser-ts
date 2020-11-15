// import { parse } from './parser'
// import MargoParser from '../lib/'
// const parse = MargoParser.parse

import * as api from './api'

test('parses empty block', () => {
    expect(api.convertToMargoBlock('')).toMatchObject(api.EMPTY_BLOCK)
})

test('parses empty line', () => {
    expect(api.convertToMargoBlock('::')).toStrictEqual(api.EMPTY_BLOCK)
})

test('parses ignore-cell', () => {
    expect(api.convertToMargoBlock('ignore-cell::')).toMatchObject({
        statements: [api.IGNORE_CELL],
    })
})

test('parses split ---', () => {
    expect(api.convertToMargoBlock('---::')).toMatchObject({
        statements: [api.SPLIT_CELL],
    })
})

test('can assign a bunch of values', () => {
    expect(api.convertToMargoBlock("a:1:: cell.id: '123' ::")).toMatchObject({
        statements: [
            api.DECLARATION('a', 1),
            api.DECLARATION('cell.id', '123'),
        ],
    })
})

test('can retrieve declaration value', () => {
    expect(
        api.getDeclaredValue(
            'cell.id',
            api.convertToMargoBlock(
                "a:1:: cell.id: 'abc' :: cell.id: '123' ::",
            ),
        ),
    ).toStrictEqual('123')
})

test('retrieves undefined if value not declared', () => {
    expect(
        api.getDeclaredValue(
            'cell.name',
            api.convertToMargoBlock(
                "a:1:: cell.id: 'abc' :: cell.id: '123' ::",
            ),
        ),
    ).toStrictEqual(undefined)
})
