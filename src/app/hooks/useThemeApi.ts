import { useGetCustomSpooderQuery, useGetModThemeQuery } from "../api/themeSlice";

export default function useThemeApi(){
    function getModTheme(){
        const {data, isLoading, error} = useGetModThemeQuery(null);
        return {data, isLoading, error};
    }

    function getCustomSpooder(){
        const {data, isLoading, error} = useGetCustomSpooderQuery(null);
        return {data, isLoading, error};
    }

    return {getModTheme, getCustomSpooder};
}