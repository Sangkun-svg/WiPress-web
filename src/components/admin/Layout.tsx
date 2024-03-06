import * as React from 'react';
import {
    AppBar
    ,Box
    ,CssBaseline
    ,Divider
    ,Drawer
    ,IconButton
    ,List
    ,ListItem
    ,ListItemButton
    ,ListItemText
    ,Toolbar
    ,Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/navigation";


interface Props  {
    window?: () => Window,
    children?: React.ReactNode
}


const AdminLayout = (props: Props) => {
    const drawerWidth = 240;
    const router = useRouter();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handlePage = (path: string) => { router.push(path) };
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };
    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };
    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
    <div>
        <Toolbar />
        <Divider />
        <List>
        <ListItem disablePadding sx={{cursor: "pointer"}} onClick={() => handlePage("/admin")}>
            <ListItemButton>
                <ListItemText primary={"보도요청"} />
            </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{cursor: "pointer"}} onClick={() => handlePage("/admin/article")}>
            <ListItemButton>
                <ListItemText primary={"전체기사"} />
            </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{cursor: "pointer"}} onClick={() => handlePage("/admin/notice")}>
            <ListItemButton>
                <ListItemText primary={"공지사항"} />
            </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{cursor: "pointer"}} onClick={() => handlePage("/admin/info")}>
            <ListItemButton>
                <ListItemText primary={"자료실"} />
            </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{cursor: "pointer"}} onClick={() => handlePage("/admin/create")}>
            <ListItemButton>
                <ListItemText primary={"글 쓰기"} />
            </ListItemButton>
        </ListItem>
        </List>
    </div>
    );


    return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
        }}
        >
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
            WiPress Admin
            </Typography>
        </Toolbar>
        </AppBar>
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
        >
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
            keepMounted: true,
            }}
            sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </Drawer>
        </Box>
        <Drawer
            variant="permanent"
            sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
        >
            {drawer}
        </Drawer>
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
        <Toolbar />
            {props.children}
        </Box>
    </Box>
    );
};

export default AdminLayout;

