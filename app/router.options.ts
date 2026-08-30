import type { RouterConfig } from '@nuxt/schema'

// noinspection JSUnusedGlobalSymbols
export default <RouterConfig>{
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0, left: 0 }
  }
}
