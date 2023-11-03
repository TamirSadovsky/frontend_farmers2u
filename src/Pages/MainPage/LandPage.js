import { Box, IconButton } from "@mui/material";
import Guide from "./Guide";
import NewHeaderTop from "./NewHeaderTop";
import { Link } from "react-scroll";
import { ExpandMore } from "@mui/icons-material";

function LandPage() {
  return (
    <>
      <NewHeaderTop />
      <Box display= 'flex' justifyContent={"space-around"} sx={{mt: '-11rem', boxSizing: "border-box"}}>
                <Link to='place_to_visit' smooth={true}>
                  <IconButton sx={{fontSize: '80px', color: 'white', display: 'flex', justifyContent: 'center', justifyItems: 'center', zIndex:'3'}}>
                    <ExpandMore sx={{width: '100%', fontSize: '70px', alignItems: 'center', alignSelf: 'center'}}/>
                  </IconButton>
                </Link>
      </Box>
      <div className="place_to_visit">
        <Guide />
      </div>
      
    </>
  );
}

export default LandPage;