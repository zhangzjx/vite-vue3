import { watch } from 'vue'
import { useConfigStore } from '@/store/config'
const userStore = useConfigStore()

export const watchLang = (...cbs) => {
  watch(
    () => userStore.lang,
    () => {
      cbs.forEach((cb) => cb(userStore.lang))
    },
    { deep: true }
  )
}
