<template>
  <div class="tool-bar">
    <tool-bar-sort-by class="tool-bar__el tool-bar__el--max-size" />
    <tool-bar-delete class="tool-bar__el" />
    <tool-bar-per-page class="tool-bar__el" />
    <tool-bar-paginator class="tool-bar__el" />
    <tool-bar-columns class="tool-bar__el" />
  </div>
</template>

<script>
import ToolBarSortBy from './ToolBarSortBy.vue'
import ToolBarDelete from './ToolBarDelete.vue'
import ToolBarPerPage from './ToolBarPerPage.vue'
import ToolBarPaginator from './ToolBarPaginator.vue'
import ToolBarColumns from './ToolBarColumns.vue'

export default {
  components: {
    ToolBarSortBy,
    ToolBarDelete,
    ToolBarPaginator,
    ToolBarPerPage,
    ToolBarColumns
  }
}
</script>
