import axiosClient from "@/libs/helpers/axios-client";
import { CustomAxiosResponse } from "@/types/base";
import { ISettingGlobal } from "@/types/setting-global";
const path = 'setting';

const createSettingGlobal = async (value: ISettingGlobal) => {
    const response = await axiosClient.post<CustomAxiosResponse<ISettingGlobal>>(
        `${path}/create`,
        value
    );
    return response.data;
};


const getInfoSettingSystem = async () => {
    const response = await axiosClient.get<CustomAxiosResponse<ISettingGlobal>>(
        `${path}`,
    );
    return response.data;
};

export { createSettingGlobal, getInfoSettingSystem }