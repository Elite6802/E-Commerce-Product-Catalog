import api from '../api/api';

export const getCategories = async (): Promise<string[]> => {
    const res = await api.get<string[]>('/products/categories');
    return res.data
}