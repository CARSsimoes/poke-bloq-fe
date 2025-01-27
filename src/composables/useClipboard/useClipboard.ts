import { ref } from 'vue'

export function useClipboard() {
  const clipboardSuccess = ref(false)
  const clipboardError = ref<Error | null>(null)

  const copyToClipboard = async (text: string) => {
    clipboardSuccess.value = false
    clipboardError.value = null

    try {
      await navigator.clipboard.writeText(text)
      clipboardSuccess.value = true
    } catch (err) {
      clipboardError.value = err as Error
    }
  }

  return {
    copyToClipboard,
    clipboardSuccess,
    clipboardError,
  }
}
