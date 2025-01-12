import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { formatDateToDMY } from './formatDate'

describe('formatDateToDMY', () => {
  const mockDate = new Date('2025-01-12 15:45:00')

  beforeAll(() => {
    vi.setSystemTime(mockDate)
  })

  afterAll(() => {
    vi.useRealTimers()
  })
  it('should format the date in DD/MM/YYYY \\n HH:mm format', () => {
    const result = formatDateToDMY()

    expect(result).toBe('12/01/2025 15:45')
  })
})
