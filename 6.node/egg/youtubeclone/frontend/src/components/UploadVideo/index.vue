<template>
  <div class="sc-AxiKw dZbDOR">
    <div class="modal-content">
      <form @submit.prevent="handleSubmit">
        <div class="modal-header">
          <div class="modal-header-left">
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" @click="handleClose">
              <g>
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </g>
            </svg>
            <h3>Upload Video</h3>
          </div>
          <div style="display: block">
            <button class="sc-AxirZ erzyjX">Save</button>
          </div>
        </div>
        <div class="tab video-form">
          <input ref="input-file" required type="file" @change="handleFileChange" />
          <video ref="video-ref" controls></video>
          <input v-model="video.title" required type="text" placeholder="Enter the title" />
          <textarea v-model="video.description" required placeholder="Tell viewers about your video"></textarea>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, useTemplateRef } from 'vue'
import { createUploadVideo, refreshUploadVideo } from '@/api/vod'
import { createVideo } from '@/api/video'
import { useRouter } from 'vue-router'

const router = useRouter()
const file = useTemplateRef('input-file')
const videoEl = useTemplateRef('video-ref')
const video = reactive({
  title: '',
  description: '',
  vodVideoId: ''
})

const emit = defineEmits(['close'])

const handleClose = () => {
  // Emit custom event
  emit('close')
}

const handleFileChange = () => {
  const fileObj = file.value?.files?.[0]
  if (videoEl.value && fileObj) videoEl.value.src = URL.createObjectURL(fileObj)
}

const createUploader = () => {
  const uploader = new window.AliyunUpload.Vod({
    userId: '122',
    partSize: 1048576,
    parallel: 5,
    retryCount: 3,
    retryDuration: 2,
    enableUploadProgress: true,
    onUploadstarted: async function (uploadInfo: any) {
      if (uploadInfo.videoId) {
        const { data } = await refreshUploadVideo(uploadInfo.videoId)
        uploader.setUploadAuthAndAddress(uploadInfo, data.UploadAuth, data.UploadAddress, data.VideoId)
      } else {
        const { data } = await createUploadVideo({
          Title: uploadInfo.file.name,
          FileName: uploadInfo.file.name
        })
        uploader.setUploadAuthAndAddress(uploadInfo, data.UploadAuth, data.UploadAddress, data.VideoId)
      }
    },
    onUploadSucceed: async function (uploadInfo: any) {
      video.vodVideoId = uploadInfo.videoId
      const { data } = await createVideo(video)
      router.push({
        name: 'watch',
        params: {
          videoId: data.video._id
        }
      })
      emit('close')
    },
    onUploadFailed: function (uploadInfo: any, code: any, message: any) {
      console.log('onUploadFailed', uploadInfo, code, message)
    },
    onUploadProgress: function (uploadInfo: any, totalSize: any, loadedPercent: any) {
      console.log('onUploadProgress', `${Math.ceil(loadedPercent * 100)}%`)
    },
    onUploadTokenExpired: async function (uploadInfo: any) {
      const { data } = await refreshUploadVideo(uploadInfo.videoId)
      uploader.resumeUploadWithAuth(data.UploadAuth)
    },
    onUploadEnd: function (uploadInfo: any) {
      console.log('onUploadEnd', uploadInfo)
    }
  })
  return uploader
}

const handleSubmit = async () => {
  const uploader = createUploader()
  const paramData = JSON.stringify({ Vod: {} })
  uploader.addFile((file.value as any).files[0], null, null, null, paramData)
  uploader.startUpload()
}

</script>
