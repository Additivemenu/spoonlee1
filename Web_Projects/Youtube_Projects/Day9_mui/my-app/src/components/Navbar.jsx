import { AppBar, Toolbar, styled, Typography, Box, InputBase, Badge, Avatar } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import MailIcon from '@mui/icons-material/Mail';
import Mail from "@mui/icons-material/Mail";
import Notifications from '@mui/icons-material/Notifications'

const StyledToolbar = styled(Toolbar)(
    {
        display: "flex",
        justifyContent: "space-between"
    }
);

const Search = styled("div")(({theme}) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%"
}))

const Icons = styled(Box)(({theme}) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    // if size of window is bigger than 'sm', then apply below style
    [theme.breakpoints.up("sm")]:{
        display: "flex"
    }
}))

const UserBox = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]:{
        display: "none"
    }
}))


const Navbar = () => {
    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Typography variant="h6" sx={{
                    display: {xs: "none", sm: "block"}
                }}>
                    Lama DEV
                </Typography>

                <PetsIcon sx={{
                    display: {xs: "block", sm: "none"}
                }}/>

                <Search><InputBase placeholder="search..."></InputBase></Search>

                <Icons>
                    <Badge badgeContent={4} color="primary">
                        <Mail/>
                    </Badge>
                    <Badge>
                        <Notifications />
                    </Badge>
                    <Avatar sx={{width: 30, height: 30}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXISBg6mx942CBTGaGIsAmjWyuNn5rbsPikw&usqp=CAU" />
                </Icons>

                <UserBox>
                    <Avatar sx={{width: 30, height: 30}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXISBg6mx942CBTGaGIsAmjWyuNn5rbsPikw&usqp=CAU" />
                    <Typography>John </Typography>
                </UserBox>

            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar;