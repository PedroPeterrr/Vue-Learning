export default {
  template: `
    <button 
      :class="{
        'px-5 py-2 rounded disabled:cursor-not-allowed': true,
        'bg-blue-600 hover:bg-blue-700': type === 'primary',
        'bg-green-200 hover:bg-green-400': type === 'secondary',
        'bg-red-200 hover:bg-red-400': type === 'danger',
        'is-loading': processing
      }" 
      :disabled="processing"
    >
      <slot />
    </button>
  `,

  props: {
    type: {
      type: String,
      default: 'primary'
    },

    processing: {
      type: Boolean,
      default: false
    }
  },
}