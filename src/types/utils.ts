import { NextFont } from "next/dist/compiled/@next/font";

export type TPrimaryPallete = {
    title: string;
    class: string;
};

export interface TSecondaryPallete extends TPrimaryPallete {}

export type TFont = {
    title: string;
    class: NextFont;
};

export type TPaginationMeta = {
    limit: number;
    page: number;
    total: number;
};

export interface ITheme {
    primary: TPrimaryPallete;
    secondary: TSecondaryPallete;
    font: TFont;
    logo: string;
}

export interface IBanner {
    id: number;
    name: string;
    image_url: string;
    is_clickable: string;
}
