import { parse } from '../parser'
// import MargoParser from '../lib/'
// const parse = MargoParser.parse

test('parses empty block', () => {
    expect(parse('')).toStrictEqual([])
})

test('parses empty line', () => {
    expect(parse('::')).toStrictEqual([['LINE', null]])
})

test('parses ignore-cell', () => {
    expect(parse('ignore-cell::')).toStrictEqual([['LINE', ['IGNORE_CELL']]])
})

test('parses split ---', () => {
    expect(parse('---::')).toStrictEqual([['LINE', ['SPLIT_CELL']]])
})

test('parses split --------', () => {
    expect(parse('--------::')).toStrictEqual([['LINE', ['SPLIT_CELL']]])
})

test('can assign a bunch of values', () => {
    expect(
        parse(
            'a:1:: b.1:"bee one":: value.false:false:: value.true:true:: value.null:null::',
        ),
    ).toStrictEqual([
        ['LINE', ['KEY_VALUE', ['a', ['NUMBER', 1]]]],
        ['LINE', ['KEY_VALUE', ['b.1', ['STRING', 'bee one']]]],
        ['LINE', ['KEY_VALUE', ['value.false', ['BOOLEAN', false]]]],
        ['LINE', ['KEY_VALUE', ['value.true', ['BOOLEAN', true]]]],
        ['LINE', ['KEY_VALUE', ['value.null', ['NULL', null]]]],
    ])
})
