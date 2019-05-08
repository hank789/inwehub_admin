<template>
  <img ref="img" class="myImage" :src="imageSrc">
</template>

<script>
export default {
  name: 'FallbackImage',
  props: ['src', 'srcFallback'],
  data() {
    return {
      imageSrc: this.src,
      errorCount: 0
    }
  },
  watch: {
    src(newValue) {
      this.imageSrc = newValue
      this.loadImage(this.imageSrc)
    }
  },
  mounted() {
    this.loadImage(this.src)
  },
  methods: {
    loadImage(src) {
      const img = new Image()
      img.onerror = this.imageLoadOnError.bind(this)
      img.src = src
    },
    imageLoadOnError() {
      console.log('image error')
      if (this.errorCount < 5) {
        setTimeout(() => {
          if (/\?/.test(this.imageSrc)) {
            this.imageSrc = this.imageSrc + '&time=' + new Date().getTime()
          } else {
            this.imageSrc = this.imageSrc + '?time=' + new Date().getTime()
          }
          this.loadImage(this.src)
        }, 1000)
        this.errorCount++
      } else {
        this.$refs.img.className = 'imageLoadError'
      }
    }
  }
}
</script>
