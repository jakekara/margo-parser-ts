import getCellPreamble from './getCellPreamble'
import * as api from '../api'
test('passes', () => { })
test('can get empty cell preamble', () => {
    const preambleBlock = getCellPreamble('')
    expect(preambleBlock.statements.length).toBe(0)
})

test('can get cell preamble', () => {
    const preambleBlock = getCellPreamble(`
    # :: cell_id : "cell-123" ::
    `)

    expect(preambleBlock.statements[0]).toMatchObject(
        api.DECLARATION('cell_id', 'cell-123'),
    )
})

test('can get cell preamble', () => {
    expect(
        getCellPreamble(`
    # :: XXX
    `),
    ).toThrow()
})
