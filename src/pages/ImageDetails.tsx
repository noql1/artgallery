import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPhotoById } from '../api/unsplash'
import { PhotoDetails } from '../types'
import Header from '../components/Header'
import { useFavoritesStore } from '../store/favoritesStore'
import {
    Box,
    Container,
    CircularProgress,
    Typography,
    IconButton,
    Button,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DownloadIcon from '@mui/icons-material/Download'

const ImageDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { data: photo, isLoading, isError } = useQuery<PhotoDetails, Error>({
        queryKey: ['photo', id],
        queryFn: () => getPhotoById(id!),
        enabled: !!id,
    })
    const { favorites, toggleFavorite } = useFavoritesStore()
    const isFav = photo && favorites.some(p => p.id === photo.id)

    if (isLoading) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />
    }
    if (isError || !photo) {
        return <Typography textAlign="center" mt={10}>Ошибка загрузки</Typography>
    }

    return (
        <Box
            sx={{
                position: 'relative',
                height: '70vh',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${photo.urls.regular})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%)',
                    zIndex: 0,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(0,0,0,0.4)',
                    zIndex: 1,
                }}
            />

            {/* all your actual page content */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Header showSearchNav />

                <Container sx={{ pt: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Box
                                component="img"
                                src={photo.user.profile_image.medium}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    mr: 1,
                                    border: '2px solid #fff',
                                }}
                            />
                            <Box>
                                <Typography variant="h6" color="white">
                                    {photo.user.name}
                                </Typography>
                                <Typography variant="body2" color="white">
                                    @{photo.user.username}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                            <IconButton
                                onClick={() => toggleFavorite(photo)}
                                sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}
                            >
                                <FavoriteIcon color={isFav ? 'error' : 'disabled'} />
                            </IconButton>

                            <Button
                                variant="contained"
                                startIcon={<DownloadIcon />}
                                sx={{ bgcolor: '#FFD700', color: '#000' }}
                                onClick={() => window.open(photo.links.download, '_blank')}
                            >
                                Download
                            </Button>
                        </Box>
                    </Box>
                </Container>

                <Container sx={{ mt: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box
                            component="img"
                            src={photo.urls.full}
                            sx={{
                                width: '100%',
                                maxHeight: '60vh',
                                objectFit: 'contain',
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default ImageDetails
