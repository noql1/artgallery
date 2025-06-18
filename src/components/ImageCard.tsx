import React from 'react'
import { Card, CardMedia, IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom'
import { UnsplashPhoto } from '../types'
import { useFavoritesStore } from '../store/favoritesStore'

interface Props { photo: UnsplashPhoto }

const ImageCard: React.FC<Props> = ({ photo }) => {
    const navigate = useNavigate()
    const { favorites, toggleFavorite } = useFavoritesStore()
    const isFav = favorites.some(p => p.id === photo.id)

    return (
        <Card
            onClick={() => navigate(`/photo/${photo.id}`)}
            sx={{ position: 'relative', cursor: 'pointer', borderRadius: 2 }}
        >
            <CardMedia
                component="img"
                height="200"
                image={photo.urls.small}
                alt={photo.alt_description || ''}
                sx={{ objectFit: 'cover' }}
            />
            <IconButton
                onClick={e => { e.stopPropagation(); toggleFavorite(photo) }}
                sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.8)' }}
            >
                <FavoriteIcon color={isFav ? 'error' : 'disabled'} />
            </IconButton>
        </Card>
    )
}

export default ImageCard
