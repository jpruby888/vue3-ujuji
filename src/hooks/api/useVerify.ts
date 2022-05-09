import { reqVerify } from '@/api/verifyApi'
import { ref } from 'vue'
import { OK_CODE } from '@/app/keys'

const useVerify = () => {
  const image = ref('')
  const imageID = ref('')
  const refresh = () => {
    reqVerify().then(({ code, data }) => {
      if (code === OK_CODE) {
        image.value = data.img
        imageID.value = data.id
      }
    })
  }

  refresh()

  return {
    refresh,
    image,
    imageID,
  }
}

export default useVerify
