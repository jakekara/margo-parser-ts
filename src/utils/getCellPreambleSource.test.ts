import getCellPreambleSource from './getCellPreambleSource'

test('can parse empty cell', () => {
    const preambleSource = getCellPreambleSource('')
    expect(preambleSource).toBe('')
})

test('can parse cell without preamble', () => {
    const preambleSource = getCellPreambleSource(`
    ## This code
    ## has no 
    ## preamble
    
    say_hello()
    `)
    expect(preambleSource).toBe('')
})

test('some of the dependent logic is sound', () => {
    const lines = `
    # :: cell_id : "cell-123" ::
    # :: it doesn't matter if the code is valid 
    `.split('\n')

    expect(lines.length).toBe(4)
    expect(lines[1].trim()).toBe('# :: cell_id : "cell-123" ::')
    expect(lines[1].trim().startsWith('# :: ')).toBe(true)
    expect(lines[1].trim().slice(5)).toBe('cell_id : "cell-123" ::')
})

test('can get margo comment lines', () => {
    const preambleSource = getCellPreambleSource(`
    # :: cell_id : "cell-123" ::
    # :: it doesn't matter if the code is valid
    `)
    expect(preambleSource).toBe(
        'cell_id : "cell-123" ::\nit doesn\'t matter if the code is valid',
    )
    expect(preambleSource.split('\n').length).toBe(2)
})
