import { describe, it, expect, vi } from 'vitest'
import useExportCSV from './useExportCSV'
import { mockIPokemonDetail1, mockIPokemonDetail2 } from '@/mocks/pokemon'
import type { IPokemonDetail } from '@/shared/types/pokemon'

describe('useExportCSV', () => {
  it('convertToCSV returns the correct CSV string when data is provided', () => {
    const { convertToCSV } = useExportCSV()

    const data: IPokemonDetail[] = [mockIPokemonDetail1({ caught: true }), mockIPokemonDetail2]
    const convertedData: Record<string, unknown>[] = data.map((item) => ({ ...item }))

    const result = convertToCSV(convertedData)

    const expected = [
      'name,id,height,weight,hp,attack,defense,specialAttack,specialDefense,speed,types,image,caught,timestamp',
      '"pikachu",25,0.4,60,35,55,40,50,50,90,"[{"slot":1,"type":{"name":"electric","url":"fake_url"}}]","pikachu_image_url",true,""',
      '"bulbasaur",1,0.7,6.9,45,49,49,65,65,45,"[{"slot":1,"type":{"name":"grass","url":"fake_url_grass"}},{"slot":2,"type":{"name":"poison","url":"fake_url_poison"}}]","bulbasaur_image_url",false,""',
    ].join('\n')

    expect(result).toBe(expected)
  })

  it('convertToCSV returns an empty string when no data is provided', () => {
    const { convertToCSV } = useExportCSV()

    const result = convertToCSV([])

    expect(result).toBe('')
  })

  it('downloadCSV does nothing when no data is provided', () => {
    const { downloadCSV } = useExportCSV()

    const createObjectURLSpy = vi.fn()
    vi.stubGlobal('URL', { createObjectURL: createObjectURLSpy })

    const link = document.createElement('a')
    document.body.appendChild(link)

    downloadCSV([], 'pokemons.csv')

    expect(createObjectURLSpy).not.toHaveBeenCalled()

    document.body.removeChild(link)

    vi.unstubAllGlobals()
  })
})
