import Assignment from "./Assignment.js"
import AssignmentTag from "./AssignmentTag.js";

export default {
  components: { Assignment, AssignmentTag },

  template: `
    <section v-show="assignments.length">
      <div class="flex justify-between">
        <h2 class="font-bold mb-2">{{ title }}</h2>
        <span>({{ assignments.length }})</span>
      </div>

     <assignment-tag
      v-model:currentTag="currentTag"
      :initial-tags="assignments.map(a => a.tag)"
     />

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
    }
  }
}