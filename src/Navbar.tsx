import { Box, Container, Toolbar } from '@mui/material';
import Typography from "@mui/material/Typography";

const Navbar = () => {
   return (
       <Box sx={{
           width: "100%",
           height: "auto",
           backgroundColor: "primary.light",
       }}>
           <Container maxWidth="xl">
               <Toolbar disableGutters>
                   <Typography variant="h6"
                               noWrap
                               sx={{
                                   mr: 2,
                                   display: { xs: "none", md: "flex" }
                               }}>
                       XState Guides
                   </Typography>
               </Toolbar>
           </Container>
       </Box> )
}

export default Navbar;