export interface UnsplashPhoto {
    id: string
    alt_description: string | null
    urls: { small: string; regular: string }
    user: { name: string; username: string; profile_image: { medium: string } }
    links: { download: string }
}

export interface PhotoDetails {
    id: string
    alt_description: string | null
    urls: { small: string, full: string, regular: string }
    user: { name: string; username: string; profile_image: { medium: string } }
    links: { download: string }
}