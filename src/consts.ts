import type {Site, Page, Links, Socials} from "@types"

// Global
export const SITE: Site = {
    TITLE: "Ivan Garcia Vega",
    DESCRIPTION: "Bienvenido al portafolio de Ivan Garcia Vega",
    AUTHOR: "IGV",
}

// Work Page
export const WORK: Page = {
    TITLE: "Trabajos",
    DESCRIPTION: "Lugares donde he trabajado.",
}

// Blog Page
export const BLOG: Page = {
    TITLE: "Blog",
    DESCRIPTION: "Escribiendo sobre cosas que me interesan.",
}

// Projects Page 
export const PROJECTS: Page = {
    TITLE: "Proyectos",
    DESCRIPTION: "Proyectos donde trabajé.",
}

// Search Page
export const SEARCH: Page = {
    TITLE: "Buscando",
    DESCRIPTION: "Busque todas las publicaciones y proyectos por palabra clave.",
}

// Links
export const LINKS: Links = [
    {
        TEXT: "Inicio",
        HREF: "/",
    },
    {
        TEXT: "Trabajos",
        HREF: "/work",
    },
    {
        TEXT: "Blog",
        HREF: "/blog",
    },
    {
        TEXT: "Proyectos",
        HREF: "/projects",
    },
]

// Socials
export const SOCIALS: Socials = [
    {
        NAME: "Email",
        ICON: "email",
        TEXT: "iva.gar.veg@gmail.com",
        HREF: "mailto:iva.gar.veg@gmail.com",
    },
    {
        NAME: "LinkedIn",
        ICON: "linkedin",
        TEXT: "igarciavega",
        HREF: "https://pe.linkedin.com/in/igarciavega/",
    },
    {
        NAME: "Twitter",
        ICON: "twitter-x",
        TEXT: "ivangarciavega3",
        HREF: "https://twitter.com/ivangarciavega3",
    },
]

