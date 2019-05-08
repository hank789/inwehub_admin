<template>
    <img class="myImage" :src="imageSrc" ref="img"/>
</template>

<script>
  export default {
    name: 'fallback-image',
    props: ['src', 'srcFallback'],
    data () {
      return {
        imageSrc: this.src,
        errorCount: 0
      }
    },
    mounted() {
      this.loadImage(this.src)
    },
    methods: {
      loadImage (src) {
        const img = new Image();
        img.onerror = this.imageLoadOnError.bind(this);
        img.src = src;
      },
      imageLoadOnError () {
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
    },
    watch: {
      src(newValue) {
        this.imageSrc = newValue
        this.loadImage(this.imageSrc)
      }
    }
  }
</script>
