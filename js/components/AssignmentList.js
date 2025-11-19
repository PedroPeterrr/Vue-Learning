import Assignment from "./Assignment.js"

export default {
  components: { Assignment },

  template: `
    <section v-show="assignments.length">
      <div class="flex justify-between">
        <h2 class="font-bold mb-2">{{ title }}</h2>
        <span>({{ assignments.length }})</span>
      </div>

      <div class="flex gap-2">
        <button 
          v-for="tag in tags"
          class="border rounded px-1 py-px text-sm"
          @click="currentTag = tag"
          :class="{
            'border-blue-500 text-blue-500': tag === currentTag
          }"
          >{{tag}}</button>
      </div>

      <ul class="border-gray-400 border divide-y divide-gray-400 mt-6">
        <assignment
          v-for="assignment in filteredAssignments"
          :key="assignment.id"
          :assignment="assignment"
        ></assignment>
      </ul>
    </section>
  `,

  props: {
    assignments: Array,
    title: String
  },

  data(){
    return {
      currentTag: 'all'
    };
  },

  computed: {
    filteredAssignments(){
      if(this.currentTag === 'all'){
        return this.assignments;
      }
      return this.assignments.filter(a => a.tag === this.currentTag)
    },

    tags() {
      return ['all', ...new Set(this.assignments.map(a => a.tag))];
    }
  }
}