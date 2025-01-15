import { ref } from 'vue'

export function useClipboard() {
  const clipboardSuccess = ref(false)
  const clipboardError = ref<Error | null>(null)

  const copyToClipboard = (text: string) => {
    clipboardSuccess.value = false
    clipboardError.value = null

    const tempTextArea = document.createElement('textarea')
    tempTextArea.value = text
    tempTextArea.style.position = 'absolute'
    tempTextArea.style.opacity = '0'
    document.body.appendChild(tempTextArea)

    tempTextArea.select()
    // for mobile devices cases
    tempTextArea.setSelectionRange(0, 99999)

    try {
      document.execCommand('copy')
      clipboardSuccess.value = true
      console.log('Text copied to clipboard')
    } catch (err) {
      clipboardError.value = err as Error
      console.error('Failed to copy text: ', err)
    } finally {
      document.body.removeChild(tempTextArea)
    }
  }

  return {
    copyToClipboard,
    clipboardSuccess,
    clipboardError,
  }
}
