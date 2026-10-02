/**
 * 
 *  - The JSON to display 
 * should have filter 
 * 
 * inspiration
 * 
 * export const features = tableFeatures({
 
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },

 */
import type {
 
  PostResponsePayload,
  
} from "@blog/lib";

type PostTable = {
    posts: PostResponsePayload[]
}

export function PostTable(posts: PostTable) {

    const headers = [
        
    ]


return(
    <table>

        
    </table>
)

}
