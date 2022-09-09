import { A } from '@mobily/ts-belt';

import { NavLink } from 'react-router-dom';

import { Box, Container, Link, Toolbar } from '@mui/material';
import Typography from "@mui/material/Typography";

import { routes } from './routes';

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
                   <Box>
                       <Box sx={{
                           display: "flex",
                           flexDirection: "row",
                           justifyContent: "flex-start",
                           alignItems: "center",
                           marginLeft: "1rem",
                       }}>
                           {A.map(routes, (page) => (
                               <Link key={page.key}
                                     component={NavLink}
                                     to={page.path}
                                     color="black"
                                     underline="none"
                                     variant="button"
                                     sx={{
                                         fontSize: "large",
                                         marginLeft: "2rem",
                                     }}>
                                   {page.title}
                               </Link>
                           ))}
                       </Box>
                   </Box>
               </Toolbar>
           </Container>
       </Box> )
}

export default Navbar;