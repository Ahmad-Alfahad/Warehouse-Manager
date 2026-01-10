import { getItems } from "../service/api"
export default  function InventoryPage(){
   const items =  getItems();
    return (
        <div>
            <h1>InventoryPage</h1>
        
        </div>
    )
}