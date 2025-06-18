import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

interface Props { showSearchNav?: boolean }

const Header: React.FC<Props> = ({ showSearchNav = false }) => {
    const nav = useNavigate()

    return (
        <AppBar position="static" sx={{ backgroundColor: '#000', boxShadow: 'none' }}>
            <Box sx={{ mx: 'auto', width: '100%' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{ color: '#fff', cursor: 'pointer', fontWeight: 600 }}
                        onClick={() => nav('/')}
                    >
                        <Box
                            component="span"
                            sx={{ backgroundColor: '#FFD700', color: '#000', px: 1, mr: 1, fontWeight: 700 }}
                        >
                            ART
                        </Box>
                        GALLERY
                    </Typography>

                    {showSearchNav ? (
                        <Box>
                            <IconButton onClick={() => nav('/')}>
                                <SearchIcon sx={{ color: '#fff' }} />
                                <Typography
                                    sx={{
                                        ml: 1,
                                        color: '#fff',
                                        display: { xs: 'none', sm: 'inline-flex' }
                                    }}
                                >
                                    Поиск
                                </Typography>
                            </IconButton>
                            <IconButton onClick={() => nav('/favorites')}>
                                <FavoriteBorderIcon sx={{ color: '#fff' }} />
                                <Typography
                                    sx={{
                                        ml: 1,
                                        color: '#fff',
                                        display: { xs: 'none', sm: 'inline-flex' }
                                    }}
                                >
                                    Избранное
                                </Typography>
                            </IconButton>
                        </Box>
                    ) : (
                        <IconButton onClick={() => nav('/favorites')}>
                            <FavoriteBorderIcon sx={{ color: '#fff' }} />
                        </IconButton>
                    )}
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default Header
