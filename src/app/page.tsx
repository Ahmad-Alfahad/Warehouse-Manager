import Link from "next/link"
export default function MainPage(){
  return(
     <main style={{ padding: 40 }}>
      <h1>Public Inventory System</h1>
      <p>Manage any type of inventory</p>

      <Link href="/inventory">
        Go to Inventory
      </Link>
    </main>
    )
}