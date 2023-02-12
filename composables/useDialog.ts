export const useDialog = () => {
  const isVisible = ref(false)

  const showDialog = () => {
    isVisible.value = true
  }
  const hideDialog = () => {
    isVisible.value = false
  }

  const toggleDialog = () => {
    isVisible.value = !isVisible.value
  }

  return { isVisible, showDialog, hideDialog, toggleDialog }
}
