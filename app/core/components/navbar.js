import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import { Link } from "@mui/material"
import logo from "../../../public/logoOnly.png"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import { Suspense, useState } from "react"
import { useSession, Routes, Link as LinkBlitz, useMutation } from "blitz"

import { Image, useRouter } from "blitz" //user router es para usar react
import { borderRadius, width } from "@mui/system"
import logout from "app/auth/mutations/logout"

import Gravatar from "react-gravatar"

const ResponsiveAppBar = () => {
  const pages = [
    {
      name: "Inicio",
      path: Routes.Home(),
    },
    {
      name: "Crear Curriculum",
      path: Routes.NewCurriculumPage(),
    },
    {
      name: "Ver Curriculums",
      path: Routes.CurriculaPage(),
    },
    {
      name: "Mis Plantillas",
      path: Routes.TemplatesPage(),
    },
  ]

  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const currentUser = useCurrentUser()

  let settings = ["Inicio"]
  if (currentUser) {
    settings = [
      "Perfil",
      "Todos mis curriculums",
      "Todos mis datos",
      "Todas mis plantillas",
      "Logout",
    ]
  } else {
    settings = ["Registrarse", "Login"]
  }

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (e) => {
    // try {
    //   console.log(e.currentTarget.firstChild.innerHTML)
    //   const targetPage = e.currentTarget.firstChild.innerHTML
    //   window.location.href = `/${targetPage}/ `
    // } catch (error) {}
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = (e) => {
    try {
      //console.log(e.currentTarget.firstChild.innerHTML)

      const targetPage = e.currentTarget.firstChild.innerHTML
      switch (targetPage) {
        case "Logout":
          logoutMutation()
          break
        case "Todos mis curriculums":
          router.push(Routes.CurriculaPage())
          break
        case "Perfil":
          //window.location.href = `/users/${currentUser?.id}/edit`
          router.push(Routes.EditUserPage({ userId: currentUser?.id }))

          break
        case "Todos mis datos":
          router.push(Routes.ShowUserPage({ userId: currentUser?.id }))
          break
        case "Todas mis plantillas":
          router.push(Routes.TemplatesPage())
          break
        case "Registrarse":
          router.push(Routes.RegisterPage())
          break
        case "Login":
          router.push(Routes.LoginPage())
          break

        default:
          break
      }
    } catch (error) {}

    setAnchorElUser(null)
  }

  return (
    <AppBar position="static" style={{ backgroundColor: "#3A298F" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <div
              className="navbarLogo"
              style={{ width: "50px", padding: "4px", borderRadius: "5px" }}
            >
              <Image src={logo} alt="logo" />
            </div>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i}>
                  <LinkBlitz href={page.path.pathname}>
                    <Typography>{page.name}</Typography>
                  </LinkBlitz>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <div
              className="navbarLogo"
              style={{ width: "50px", padding: "4px", borderRadius: "5px" }}
            >
              <Image src={logo} alt="logo" />
            </div>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {
              //desktop version
            }

            {pages.map((page, i) => (
              <LinkBlitz key={i} href={page.path.pathname}>
                <MenuItem>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>{page.name}</Button>
                </MenuItem>
              </LinkBlitz>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Gravatar
                  email={currentUser?.email}
                  alt={"imagen" + currentUser?.name}
                  style={{ borderRadius: "50%" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
