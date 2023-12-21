import { api } from "../../../lib/api";
import { getManyResourcesRequestParams, transformListResponseGeneric, transformResponseGeneric } from "../../../lib/dataHelper/apiHelper";
import { GenericFilter, GetManyResourceQuery, GetManyResourceQueryResult } from "../../../types/api";
import { ExtensionTypeDTO } from "../../../types/dto/extensionType";
import { RESOURCES } from "../../../types/resources";

const apiExtensionType = api.injectEndpoints({
    endpoints: (builder) => ({
        getOneExtensionType: builder.query<ExtensionTypeDTO, { id: string }>({
            query: ({ id }) => ({
                url: `${RESOURCES.EXTENSION_TYPE}/${id}`,
                method: 'GET',
                useAsync: true,
                useHospitalID: false
            }),
            providesTags: (result, error) => error ? [] : [{ type: RESOURCES.EXTENSION_TYPE, id: result?.id }],
            transformResponse: transformResponseGeneric
        }),
        getExtensionTypeList: builder.query<
            GetManyResourceQueryResult<ExtensionTypeDTO>,
            GetManyResourceQuery<GenericFilter>
        >({
            query: (arg) => {
                const request = getManyResourcesRequestParams(arg, RESOURCES.EXTENSION_TYPE);
                return request;
            },
            providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
                { type: RESOURCES.EXTENSION_TYPE, id: 'LIST' },
                ...result.list.map((item) => ({ type: RESOURCES.EXTENSION_TYPE, id: item.id }))
            ],
            transformResponse: transformListResponseGeneric
        }),
        createExtensionType: builder.mutation<ExtensionTypeDTO, ExtensionTypeDTO>({
            query: (data) => ({
                url: `${RESOURCES.EXTENSION_TYPE}`,
                method: 'POST',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (result, error) => error ? [] : [{ type: RESOURCES.EXTENSION_TYPE, id: 'LIST' }]
        }),
        updateExtensionType: builder.mutation<ExtensionTypeDTO, ExtensionTypeDTO>({
            query: (data) => ({
                url: `${RESOURCES.EXTENSION_TYPE}`,
                method: 'PUT',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (result, error, arg) => error ? [] : [{ type: RESOURCES.EXTENSION_TYPE, id: arg.id }]
        }),
        deleteExtensionType: builder.mutation<ExtensionTypeDTO, { id: string }>({
            query: (data) => ({
                url: `${RESOURCES.EXTENSION_TYPE}/${data.id}`,
                method: 'DELETE',
                data,
                useAsync: true,
                useHospitalID: false
            }),
            invalidatesTags: (result, error, arg) => error ? [] : [{ type: RESOURCES.EXTENSION_TYPE, id: arg.id }]
        })
    })
})

export const {
    useGetOneExtensionTypeQuery,
    useGetExtensionTypeListQuery,
    useCreateExtensionTypeMutation,
    useUpdateExtensionTypeMutation,
    useDeleteExtensionTypeMutation
} = apiExtensionType;