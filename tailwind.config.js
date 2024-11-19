import defaultTheme from "tailwindcss/defaultTheme";
import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                extendfont1: ['"Bebas Neue"', ...defaultTheme.fontFamily.sans],
                extendfont2: ['"Cinzel"', ...defaultTheme.fontFamily.sans],
                extendfont3: [
                    '"Cormorant Garamond"',
                    ...defaultTheme.fontFamily.sans,
                ],
                extendfont4: ['"Oswald"', ...defaultTheme.fontFamily.sans],
                extendfont5: [
                    '"Rethink Sans"',
                    ...defaultTheme.fontFamily.sans,
                ],
                extendfont6: ['"Righteous"', ...defaultTheme.fontFamily.sans],
                extendfont7: ['"Sen"', ...defaultTheme.fontFamily.sans],
                extendfont8: ['"Sevillana"', ...defaultTheme.fontFamily.sans],
                extendfont9: ['"Whisper"', ...defaultTheme.fontFamily.sans],
                extendfont10: ['"forum"', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                hero1: `url('/src/assets/Images/BannerImg/Herosection.jpg')`,
                hero2: `url('/src/assets/Images/BannerImg/Hero2.jpg')`,
                hero3: "url('/src/assets/Images/BannerImg/Hero3.jpg')",
                hero4: "url('/src/assets/Images/BannerImg/Hero4.jpg')",
                hero5: "url('/src/assets/Images/BannerImg/Hero5.jpg')",
                hero6: "url('/src/assets/Images/BannerImg/Hero6.jpg')",
            },
            colors: {
                primary: "#F8F6F7",
                secondry: "#C6A98F",
                thirdly: "#F5F3F2",
                forth: "#030712",
                blue:'#3C50E0',
                purple:'#615EFE',
            },
        },
    },
    plugins: [

    ],
};
