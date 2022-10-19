import ListaSites from "./ListaSites"
import SitesProvider from "./SitesProvider"


const Sites = () => {
  return (
    <SitesProvider>
      <ListaSites />
    </SitesProvider>
  )
}

export default Sites
