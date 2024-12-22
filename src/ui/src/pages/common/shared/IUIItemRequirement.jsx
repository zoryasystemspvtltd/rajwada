import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from "react-bootstrap";
import api from "../../../store/api-service";

const IUIItemRequirement = (props) => {
    const module = "asset";
    const uomModule = "uom";
    const [uomData, setUomData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [selectedItemRows, setSelectedItemRows] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const pageOptions = { recordPerPage: 0 };
            const response = await api.getData({ module: uomModule, options: pageOptions });
            setUomData(response?.data?.items);
        }

        fetchData();
    }, [uomModule]);

    useEffect(() => {
        async function fetchData() {
            const pageOptions = {
                recordPerPage: 0
            }

            const response = await api.getData({ module: module, options: pageOptions });
            const selectedParamObj = {};
            response?.data?.items?.forEach((param) => {
                selectedParamObj[param.name] = {
                    'id': param.id,
                    'name': param.name,
                    'quantity': 0,
                    'uomId': param.uomId
                }
            });
            setItemData(response?.data?.items);
            setSelectedItems(selectedParamObj);
        }

        fetchData();
    }, [module]);

    const onitemRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => itemData.find((item) => item.id === id));
        setRowSelectionModel(selectedRowsData.map((param) => param.id));
        setSelectedItemRows(selectedRowsData);
    };

    const handleItemSelectionChange = (event) => {
        const { name, value } = event.target;
        const param = name.split("-")[0];
        const type = name.split("-")[1];
        value ? selectedItems[param][type] = parseInt(value) : selectedItems[param][type] = value;
        setSelectedItems({
            ...selectedItems
        });
        if (!props?.readonly) {
            const modifiedEvent = {
                target: {
                    id: props?.id,
                    value: JSON.stringify(Object.values(selectedItems).filter(item => selectedItemRows?.map(item => item.name).includes(item.name)))
                },
                preventDefault: function () { }
            };
            props.onChange(modifiedEvent);
        }
    };

    const itemColumns = [
        {
            field: "code",
            headerName: "Item Code",
            headerAlign: 'center',
            align: 'center',
            width: 200,
            renderCell: (params) => {
                return params.code
            }
        },
        {
            field: "name",
            headerName: "Item Name",
            headerAlign: 'center',
            align: 'center',
            width: 406,
            renderCell: (params) => {
                return params.name
            }
        },
        {
            field: "quantity",
            width: 400,
            headerName: "Item Quantity",
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <Form.Group className="mb-1" controlId={`${params.row.name}-quantity`}>
                        <Form.Control type="number"
                            style={{ height: "2%" }}
                            name={`${params.row.name}-quantity`}
                            placeholder="Enter Item Quantity"
                            value={selectedItems[params.row.name]['quantity']}
                            onKeyUp={handleItemSelectionChange}
                            onChange={handleItemSelectionChange}
                        />
                    </Form.Group>
                );
            }
        },
        {
            field: "uom",
            headerName: "Item UOM",
            headerAlign: 'center',
            align: 'center',
            width: 200,
            renderCell: (params) => {
                return uomData?.find(item => item.id == params.row.uomId)?.name
            }
        },
    ];

    return (
        <div className="main-card mb-3 card">
            <div className="card-body">
                <Row>
                    <Col>
                        <Box
                            m="0 0 0 0"
                            height="50vh"
                            sx={{
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                    "& .MuiDataGrid-row": {
                                        '&.Mui-selected': {
                                            backgroundColor: '#4FC44B !important',
                                            '&:hover': {
                                                backgroundColor: '#4FC44B !important',
                                            }
                                        }
                                    }
                                },
                                "& .name-column--cell": {
                                    color: "#2e7c67",
                                },
                                '& .MuiDataGrid-cell': {
                                    borderRight: '1px solid #c4bebe', // Add right border to cells
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "#009EF7",
                                    borderBottom: "none",
                                    color: "white",
                                    fontWeight: "bold",
                                    height: "30px !important",
                                },
                                '& .MuiDataGrid-columnHeader': {
                                    borderRight: '1px solid white', // Optional: border under the header
                                    backgroundColor: "#009EF7",
                                    height: "30px !important",
                                },
                                "& .MuiIconButton-root": {
                                    color: "white",
                                },
                                "& .MuiDataGrid-columnHeaderTitle": {
                                    fontWeight: "bold"
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: "#f2f0f0",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    borderTop: "none",
                                    backgroundColor: "#009EF7",
                                    height: "45px !important"
                                },
                                "& .MuiCheckbox-root": {
                                    color: `#1e5245 !important`,
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: `#141414 !important`,
                                },
                                "& .MuiTablePagination-selectLabel": {
                                    marginBottom: 0,
                                    color: "white"
                                },
                                "& .MuiTablePagination-select": {
                                    color: "white"
                                },
                                "& .MuiDataGrid-selectedRowCount": {
                                    color: "white"
                                },
                                "& .MuiTablePagination-displayedRows": {
                                    marginBottom: 0,
                                    color: "white"
                                }
                            }}
                        >
                            <DataGrid
                                rowHeight={35}
                                rows={itemData}
                                getRowId={(row) => row.id}
                                columns={itemColumns}
                                checkboxSelection={!props?.readonly}
                                disableRowSelectionOnClick
                                rowSelectionModel={rowSelectionModel}
                                onRowSelectionModelChange={(ids) => onitemRowsSelectionHandler(ids)}
                                pageSize={5}
                            />
                        </Box>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default IUIItemRequirement;