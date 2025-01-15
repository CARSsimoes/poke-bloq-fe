import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useClipboard } from './useClipboard'

let originalExecCommand: typeof document.execCommand

beforeEach(() => {
  originalExecCommand = document.execCommand
  document.execCommand = vi.fn(() => true)
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  document.execCommand = originalExecCommand
  vi.restoreAllMocks()
})

describe('useClipboard ->', () => {
  it('should copy text to clipboard successfully', () => {
    const { copyToClipboard, clipboardSuccess, clipboardError } = useClipboard()

    copyToClipboard('Hello, Clipboard!')

    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(clipboardSuccess.value).toBe(true)
    expect(clipboardError.value).toBe(null)
  })

  it('should clean up the temporary textarea element after copying', () => {
    const { copyToClipboard } = useClipboard()

    copyToClipboard('Hello, Clipboard!')

    const tempTextArea = document.querySelector('textarea')
    expect(tempTextArea).toBeNull()
  })
})
