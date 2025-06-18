import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRandomPhotos, searchPhotos } from '../api/unsplash'
import { UnsplashPhoto } from '../types'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import ImageCard from '../components/ImageCard'
import { Container, Box, CircularProgress, Typography } from '@mui/material'

const Home: React.FC = () => {
    const [input, setInput] = useState('')
    const [term, setTerm] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => setTerm(input.trim()), 500)
        return () => clearTimeout(timeout)
    }, [input])

    const randomQuery = useQuery<UnsplashPhoto[], Error>({
        queryKey: ['randomPhotos'],
        queryFn: getRandomPhotos,
    })

    const searchQuery = useQuery<UnsplashPhoto[], Error>({
        queryKey: ['searchPhotos', term],
        queryFn: () => searchPhotos(term),
        enabled: term.length > 0,
    })

    const isSearching = term.length > 0
    const { data, isLoading, isError } = isSearching ? searchQuery : randomQuery
    const bannerUrl = 'https://www.sciencealert.com/images/2024/09/the-starry-night-turbulence.jpg'
    return (
        <>
            <Header />
            <Box
                sx={{
                    backgroundImage: `url(${bannerUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    py: 6
                }}
            >
                <Container maxWidth="sm">
                    <SearchBar value={input} onChange={setInput} />
                </Container>
            </Box>
            <Container maxWidth="lg">
                {isLoading && (
                    <Box display="flex" justifyContent="center" mt={10}>
                        <CircularProgress />
                    </Box>
                )}
                {!isLoading && isError && (
                    <Box textAlign="center" mt={10}>
                        <Typography color="error">Ошибка при загрузке</Typography>
                    </Box>
                )}
                {!isLoading && !isError && data && data.length > 0 && (
                    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3} py={4}>
                        {data.map(photo => (
                            <Box key={photo.id} flex="1 1 250px" maxWidth="300px">
                                <ImageCard photo={photo} />
                            </Box>
                        ))}
                    </Box>
                )}
                {!isLoading && !isError && (!data || data.length === 0) && (
                    <Typography textAlign="center" mt={6}>
                        {isSearching ? 'Ничего не найдено' : 'Нет изображений'}
                    </Typography>
                )}
            </Container>
        </>
    )
}

export default Home
