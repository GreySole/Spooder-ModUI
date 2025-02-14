import { useGetCustomSpooderQuery, useGetModThemeQuery } from "../api/themeSlice";

export default function useThemeApi(){
    function getModTheme(user:string){
        const {data, isLoading, error} = useGetModThemeQuery(user);
        return {data, isLoading, error};
    }

    function getCustomSpooder(){
        const {data, isLoading, error} = useGetCustomSpooderQuery(null);
        return {data, isLoading, error};
    }

    return {getModTheme, getCustomSpooder};
}