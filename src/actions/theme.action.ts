import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse } from "@/types/base";
import { ISettingGlobal } from "@/types/setting-global";
import { IHeader, IThemes } from "@/types/themes";
const path = 'themes';

const createSettingThemeHeader = async (value: IHeader) => {
    const response = await axiosClient.post<CustomAxiosResponse<IThemes>>(
        `${path}/create-header`,
        value
    );
    return response.data;
};


const getInfoThemes = async () => {
    const response = await axiosClient.get<CustomAxiosResponse<IThemes[]>>(
        `${path}`,
    );
    return response.data;
};

export { createSettingThemeHeader, getInfoThemes }