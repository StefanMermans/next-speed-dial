import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Next speed dial",
        short_name: "Speed dial",
        description: "My custom speed dial in Next.js",
        start_url: "/",
        display: "standalone",
        background_color: "#41bdf5",
        theme_color: "#41bdf5",
        icons: [
            {
                src: "/favicon.ico",
            }
        ],       
    };
}
