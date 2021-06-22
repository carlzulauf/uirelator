<template>
  <i class="sprite-icon">
    <svg :viewBox="viewBox">
      <use :href="spritePath"/>
    </svg>
  </i>
</template>

<script>
export default {
  data() {
    return {
      viewBox: '',
      spritePath: ''
    }
  },
  props: ['name', 'sheet'],
  created() {
    this.findMatchingIcon();
  },
  methods: {
    findMatchingIcon() {
      const sprites = window.Preloads.icon_sprites;
      let icon;
      let icons = sprites.icons[this.name];
      if (icons) {
        if (this.sheet && this.sheet !== '') {
          icon = icons.find((i) => i.sprite === this.sheet);
        } else {
          icon = icons[0];
        }
      }
      icon = (icon || sprites.icons.exclamation[0]);
      this.viewBox = icon.view_box;
      this.spritePath = `${sprites.sheets[icon.sprite]}#${icon.name}`
    }
  }
}
</script>

<style scoped>
/* none yet */
</style>
