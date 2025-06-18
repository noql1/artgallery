import React from 'react';
import Header from '../components/Header';
import { useFavoritesStore } from '../store/favoritesStore';
import { Container, Box, Typography } from '@mui/material';
import ImageCard from '../components/ImageCard';

const Favorites: React.FC = () => {
    const favorites = useFavoritesStore(s => s.favorites);

    return (
        <>
            <Header />

            <Container maxWidth="lg">
                {favorites.length > 0 ? (
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        gap={3}
                        py={4}
                    >
                        {favorites.map(photo => (
                            <Box key={photo.id} flex="1 1 250px" maxWidth="300px">
                                <ImageCard photo={photo} />
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography textAlign="center" mt={6}>
                        Нет избранных изображений
                    </Typography>
                )}
            </Container>
        </>
    );
};

export default Favorites;
