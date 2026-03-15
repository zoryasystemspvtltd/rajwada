import api from './api-service';

export const isDeleteAllowed = async (module, id) => {
    switch (module) {
        case "plan":
            const newBaseFilter = {
                name: 'parentId',
                value: parseInt(id),
            }

            const pageOptions = {
                recordPerPage: 0,
                searchCondition: newBaseFilter
            }

            const response = await api.getData({ module: 'plan', options: pageOptions });
            let child = response?.data?.items || [];

            if (child?.length > 0) {
                return false;
            }
            else {
                return true;
            }
        default:
            return true;
    }
}