
import { Col, Row, Table } from "react-bootstrap";
import IUITree from "../../common/IUITree";

export const PlanCreate = () => {
    const flatSchema = {
        module: 'plan',
        title: 'Flat',
        relationKey: "parentId",
        path: 'flats',
        paging: false,
        searching: false,
        editing: true,
        assign: true,
        adding: false,
        startField:'planStartDate',
        endField:'planEndDate',
        fields: [
            { field: 'name', type: 'link', searching: true, width: 2, },
            { field: 'description', type: 'text', searching: false, width: 4, },
        ],
    }

    const floorSchema = {
        module: 'plan',
        title: 'Floor',
        relationKey: "parentId",
        path: 'floors',
        paging: false,
        searching: false,
        editing: true,
        assign: true,
        adding: false,
        startField:'planStartDate',
        endField:'planEndDate',
        fields: [
            { field: 'name', type: 'link', searching: true, width: 2, },
            { field: 'description', type: 'text', searching: false, width: 4, },
        ],
        schema: flatSchema
    }
    const towerSchema = {
        module: 'plan',
        title: 'Tower',
        relationKey: "type",
        path: 'towers',
        paging: true,
        searching: true,
        editing: true,
        assign: true,
        adding: true,
        startField:'planStartDate',
        endField:'planEndDate',
        fields: [
            { field: 'name', type: 'link', searching: true, width: 2, },
            { field: 'description', type: 'text', searching: false, width: 4, },
        ],
        schema: floorSchema
    }

    const schema = {
        module: 'plan',
        title: 'Tower',
        relationKey: "type",
        path: 'towers',
        paging: true,
        searching: true,
        editing: true,
        assign: true,
        adding: true,
        startField:'planStartDate',
        endField:'planEndDate',
        fields: [
            { field: 'name', type: 'link', searching: true, width: 2, },
            { field: 'description', type: 'text', searching: false, width: 4, },
        ],
        schema: towerSchema
    }

    return (
        <>
            <IUITree schema={schema} />
        </>
    )
}
