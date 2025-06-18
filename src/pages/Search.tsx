import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchPhotos } from '../api/unsplash';
import { useQuery } from '@tanstack/react-query';
import {
    Box,
    Container,
    Typography,
    CircularProgress,
} from '@mui/material';
import ImageCard from '../components/ImageCard';
import { UnsplashPhoto } from '../types';

const Search: React.FC = () => {
    const [params] = useSearchParams();
    const query = params.get('q') || '';

    const { data, isLoading, isError } = useQuery<UnsplashPhoto[], Error>({
        queryKey: ['searchPhotos', query],
        queryFn: () => searchPhotos(query),
        enabled: !!query,
    });

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={10}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Typography color="error" textAlign="center">
                    Ошибка при загрузке результатов
                </Typography>
            ) : (
                <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
                    {data && data.length > 0 ? (
                        data.map((photo) => (
                            <Box key={photo.id} flex="1 1 250px" maxWidth="300px">
                                <ImageCard photo={photo} />
                            </Box>
                        ))
                    ) : (
                        <Typography textAlign="center">Ничего не найдено</Typography>
                    )}
                </Box>
            )}
        </Container>
    );
};

export default Search;
