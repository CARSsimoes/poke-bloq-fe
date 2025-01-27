import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useClipboard } from './useClipboard'

beforeEach(() => {
  vi.spyOn(console, 'log').mockImplementation(() => {})

  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useClipboard ->', () => {
  it('should copy text to clipboard successfully', async () => {
    const { copyToClipboard, clipboardSuccess, clipboardError } = useClipboard()

    await copyToClipboard('Hello, Clipboard!')

    expect(clipboardSuccess.value).toBe(true)
    expect(clipboardError.value).toBe(null)
  })

  it('should clean up the temporary textarea element after copying', async () => {
    const { copyToClipboard } = useClipboard()

    await copyToClipboard('Hello, Clipboard!')

    const tempTextArea = document.querySelector('textarea')
    expect(tempTextArea).toBeNull()
  })
})
