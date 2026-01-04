import { useParams } from "react-router-dom";
import IUIPage from "../../common/IUIPage";

export const EditFlatTemplateMapping = () => {
    const schema = {
        module: 'flatTemplateDetails',
        title: 'Room',
        path: 'flat-template-mappings',
        back: true,
        defaultFields: [
            {
                field: "flatTemplateId",
                type: "lookup"
            }
        ],
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Type', field: 'roomId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'room' }
                    },
                    { text: 'Count', field: 'roomCount', type: 'text', width: 4, required: true },
                    {
                        text: 'Flat Template', field: 'flatTemplateId', type: 'lookup', required: true, width: 4, readonly: true,
                        schema: { module: 'flatTemplate' }
                    },
                ]
            },
        ]
    }
    const { templateId } = useParams();

    return (<IUIPage schema={schema} defaultValues={{ flatTemplateId: templateId }} />)
}
