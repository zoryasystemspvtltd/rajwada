import React, { useState, useEffect } from 'react';
import { getData } from '../../store/api-db';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import * as Icon from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IUIModuleMessage from './shared/IUIModuleMessage';
import IUILookUp from './shared/IUILookUp'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import IUITreeNode from './shared/IUITreeNode';
import IUITreeNodeExtra from './shared/IUITreeNodeExtra';

function ordinal(number) {
    const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
    const ordinals = { one: 'st', two: 'nd', few: 'rd', many: 'th', zero: 'th', other: 'th' }
    return `${number}${ordinals[pr.select(number)]}`;
}

function getDays(start, end) {
    if (!start) {
        return []
    }
    let days = [];
    const _start = new Date(start.valueOf())
    while (_start <= end) {
        days.push(new Date(_start));
        _start.setDate(_start.getDate() + 1);
    }
    return days;
}

function getDaysInMonth(config) {
    if (!config && !config?.start && config?.end) {
        return [];
    }
    let start = config?.start;
    let end = config?.end;
    let arr = [];
    let months = [];
    const dayFormatter = new Intl.DateTimeFormat('en-US', { day: "numeric" });
    const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    arr = getDays(start, end)
    arr.forEach(function (date) { //get array of months
        let m = monthFormatter.formatToParts(date).find((o) => o.type == "month").value;
        const y = date.getFullYear();
        if (!months.includes(`${m} - ${y}`)) {
            months.push(`${m} - ${y}`);
        }
    })

    months.forEach(function (val, index) { //nest an array in each month
        months[index] = [val, []];
    });

    months.forEach(function (month) {
        arr.forEach(function (date) { //fill the nested arrays
            let m = monthFormatter.formatToParts(date).find((o) => o.type == "month").value;
            const y = date.getFullYear();
            if (`${m} - ${y}` === month[0]) {
                let d = dayFormatter.formatToParts(date).find((o) => o.type == "day").value;
                //month[1].push(`${ordinal(d)} ${m}`); //IF YOU WANT 1st May format
                month[1].push(date); //IF YOU WANT THE DATE OBJECT INSTEAD
            }
        });
    })
    return months;
}

export const IUIStripHeader = (props) => {

    const [months, setMonths] = useState([])
    const [config, setConfig] = useState(props?.config)
    const [cellCount, setCellCount] = useState(32)
    const [cellWidth, setCellWidth] = useState(parseFloat(100 / cellCount))

    useEffect(() => {
        if (props?.configuration) {
            setConfig(props?.configuration)
        }
    }, [props?.configuration]);

    useEffect(() => {
        if (config) {
            const newDays = getDaysInMonth(config)
            setMonths(newDays)

            const count = Math.floor(parseInt(config.end - config.start) / (1000 * 60 * 60 * 24) + 1);
            setCellCount(count);
            setCellWidth(parseFloat(100 / count))
        }
    }, [config]);

    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekday_1 = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const weekday_2 = ["S", "M", "T", "W", "T", "F", "S"];

    return (
        <div className='tree-header'>
            {months.map((month, m) => (
                <div key={m} className='float-left tree-month' style={{ width: `${month[1].length * cellWidth}%` }}>
                    <div className='header-title text-center overflow-hidden text-nowrap'>{month[0]}</div>
                    {cellCount <= 32 &&
                        <div>
                            {month[1].map((d, i) => (
                                <div style={{ width: `${cellWidth * cellCount / month[1].length}%` }}
                                    className='tree-cell text-center'
                                    md={1}
                                    key={i} >{cellCount <= 7 ? weekday[d.getDay()] : ''}
                                    {cellCount > 7 && cellCount <= 13 ? weekday_1[d.getDay()] : ''}
                                    {cellCount > 13 && cellCount <= 19 ? weekday_2[d.getDay()] : ''}
                                    &nbsp;{d.getDate()}</div>
                            ))}
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export const IUIMonthStrip = (props) => {
    const [months, setMonths] = useState([])
    const [data, setData] = useState({})
    const [start, setStart] = useState(0)
    const [width, setWidth] = useState(0)
    const [length, setLength] = useState(100)
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [config, setConfig] = useState(props?.config)
    const [original, setOriginal] = useState({})

    const [cellCount, setCellCount] = useState(7)
    const [cellWidth, setCellWidth] = useState(parseFloat(100 / cellCount))
    const [unit, setUnit] = useState(1)
    const parentRef = React.createRef()

    useEffect(() => {
        if (props?.configuration) {
            setConfig(props?.configuration)
        }
    }, [props?.configuration]);

    useEffect(() => {
        if (config) {
            const newDays = getDaysInMonth(config)
            setMonths(newDays)

            const count = Math.floor(parseInt(config.end - config.start) / (1000 * 60 * 60 * 24) + 1);
            setCellCount(count);
            setCellWidth(parseFloat(100 / count))
        }
    }, [config]);

    useEffect(() => {
        if (config) {
            const newDays = getDaysInMonth(config)
            setMonths(newDays)
        }
    }, [config]);

    useEffect(() => {
        const original = props?.data;
        if (props?.data && original?.start && original?.end) {
            const newData = getDays(new Date(original?.start), new Date(original?.end))
            setData(newData)
            setOriginal(props?.data)
        }
    }, [props?.data]);

    useEffect(() => {
        // Monthly
        const today = new Date();
        let firstDateOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        let lastDateOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        if (config) {
            firstDateOfMonth = config.start;
            lastDateOfMonth = config.end;
        }

        //console.log(newData)
        const parent = parentRef.current.offsetWidth
        setLength(parent);
        const count = Math.floor(parseInt(lastDateOfMonth - firstDateOfMonth) / (1000 * 60 * 60 * 24) + 1);
        setUnit(parseInt(parent / count))
        //console.log(count)
        if (data && data.length > 0) {
            const newDays = getDays(firstDateOfMonth, lastDateOfMonth)
            if (newDays && newDays.length > 0) {
                const newDates = newDays.map((d) => { return { date: d, selected: data?.some(s => d.toLocaleDateString() === s.toLocaleDateString()) } })
                //setDates(newDates)

                let start = 0;
                let width = 0;
                let length = 0;
                newDates.forEach(d => {
                    if (width === 0 && !d.selected) {
                        start++
                    } else if (d.selected) {
                        width++
                    }
                    length++
                })

                //Converting percentage to pixel
                if (length === 0) { length = 1 }
                setStart(parseInt(start / length * parent));
                setWidth(parseInt(width / length * parent));

            }
        }

    }, [data, config]);

    const [size, setSize] = useState({ r: 0, l: 0 });

    const onMouseDown = (nativeEvent, type) => {
        const { pageX } = nativeEvent;
        setIsMouseDown(true);
        setSize({ r: 0, l: 0, start: pageX, type: type })
    };

    const onMouseMove = ({ nativeEvent }) => {
        if (!isMouseDown) {
            return;
        }

        const { pageX, offsetX } = nativeEvent;

        const newSize = {
            type: size.type,
            start: size.start,
            r: size.type === -1 ? 0 : pageX - size.start,
            l: size.type === 1 ? 0 : pageX - size.start,
            unit: unit,
        }
        setSize(newSize)
        if (size.type === 1) {

            //console.log(newSize)
            //console.log({ w: width + offsetX, t: size.type })
        }
    };

    const onMouseUp = () => {
        console.log(size?.type)
        setIsMouseDown(false);
        const newSize = {
            type: 0,
            start: size.start,
            r: size.r,
            l: size.l,
            unit: size.unit,
        }
        setSize(newSize)

        if (size.type === 1) { // change end date
            const r = Math.abs(size.r % unit);
            const increment = size.r > 0 ?
                r > unit / 2 ?
                    Math.ceil(size.r / unit) :
                    Math.floor(size.r / unit)
                :
                r > unit / 2 ?
                    Math.floor(size.r / unit) :
                    Math.ceil(size.r / unit)

            console.log({ r: r, i: increment })
            if (r > unit / 2 || r !== 0) {
                // Add increment

                const newDate = new Date(original?.end)
                newDate.setDate(newDate.getDate() + increment)

                if (original?.start && newDate) {

                    const newData = getDays(new Date(original?.start), newDate)
                    //console.log(newData)
                    setData(newData)
                    setOriginal({ ...original, end: newDate })
                    setSize({ ...size, r: 0, l: 0 })
                }
            }
        }
        if (size.type === -1) { // change start date
            const l = Math.abs(size.l % unit);
            const increment = size.l > 0 ?
                l > unit / 2 ?
                    Math.ceil(size.l / unit) :
                    Math.floor(size.l / unit)
                :
                l > unit / 2 ?
                    Math.floor(size.l / unit) :
                    Math.ceil(size.l / unit)

            console.log({ l: l, i: increment })
            if (l > unit / 2 || l !== 0) {
                // Add increment

                const newDate = new Date(original?.start)
                newDate.setDate(newDate.getDate() + increment)

                if (newDate && original?.end) {

                    const newData = getDays(newDate, new Date(original?.end))
                    //console.log(newData)
                    setData(newData)
                    setOriginal({ ...original, start: newDate })
                    setSize({ ...size, r: 0, l: 0 })
                }
            }
        }
    };

    return (
        <>
            {/* <div className='z-1 ' >
                {months.map((month, m) => (
                    <div key={m} className='float-left' style={{ width: `${month[1].length * cellWidth}%` }}>
                        <div>
                            {month[1].map((d, i) => (
                                <div style={{ width: `${cellWidth * cellCount / month[1].length}%` }}
                                    className='tree-cell-hidden text-center'
                                    md={1}
                                    key={i} >&nbsp;</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div> */}
            <div className="z-2 " ref={parentRef} style={{ height: '10px', width: '100%' }}>
                <div className="float-left text-end" role="progressbar"
                    style={{ width: `${start + size.l}px` }}
                    aria-valuenow={start} aria-valuemin="0" aria-valuemax={length}
                    onMouseDown={e => onMouseDown(e, -1)}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}>
                    &nbsp;
                </div>
                {width > 0 &&
                    <>
                        <div className="progress progress-bar progress-bar-striped float-left text-center bg-success " role="progressbar"
                            style={{ width: `16px` }}
                            aria-valuenow={1} aria-valuemin="0" aria-valuemax="5">
                            <i className={`fa-solid `} style={{ cursor: 'e-resize' }}
                                onMouseDown={e => onMouseDown(e, -1)}
                                onMouseUp={onMouseUp}
                                onMouseMove={onMouseMove}
                            >&nbsp;</i>
                        </div>

                        <div className="progress progress-bar progress-bar-striped float-left text-center bg-success"
                            role="progressbar"
                            style={{ width: `${width - size.l + size.r - 32}px`, cursor: 'move' }}
                            aria-valuenow={width - size.l + size.r - 32}
                            aria-valuemin="0" aria-valuemax={length - 32}
                            onMouseDown={e => onMouseDown(e, 0)}
                            onMouseUp={onMouseUp}
                            onMouseMove={onMouseMove}>
                            &nbsp;
                        </div>

                        <div className="progress progress-bar progress-bar-striped float-left text-center bg-success" role="progressbar"
                            style={{ width: `16px` }} aria-valuenow={1} aria-valuemin="0" aria-valuemax="5">
                            <i className={`fa-solid`} style={{ cursor: 'e-resize' }}
                                onMouseDown={e => onMouseDown(e, 1)}
                                onMouseUp={onMouseUp}
                                onMouseMove={onMouseMove}
                            >&nbsp;</i>
                        </div>
                    </>
                }
                <div className="float-left cursor-zoom-in" role="progressbar"
                    style={{ width: `${length - (start + width) - (size.l + size.r)}px` }}
                    aria-valuenow={length - (start + width) - (size.l + size.r)} aria-valuemin="0" aria-valuemax={length}
                    onMouseDown={e => onMouseDown(e, 1)}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}>
                    &nbsp;
                </div>
            </div>

        </>

    )
}

const IUITree = (props) => {
    const schema = props?.schema;
    const module = `${schema?.module}#${props?.filter}`;
    const pageLength = schema?.paging ? 10 : 0;
    const dataSet = useSelector((state) => state.api[module])
    const [baseFilter, setBaseFilter] = useState({})
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    const [privileges, setPrivileges] = useState({});
    const [config, setConfig] = useState({})

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === schema?.module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setPrivileges(access)

        const startDate = new Date();
        const dayOfWeek = startDate.getDay();
        startDate.setDate(startDate.getDate() - dayOfWeek);
        const endDate = new Date();
        endDate.setDate(6 + endDate.getDate() - dayOfWeek);
        // const startDate = new Date(today.getFullYear(), today.getMonth(), 15);
        // const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 16);


        setConfig({ start: startDate, end: endDate })

    }, [loggedInUser, schema?.module]);

    useEffect(() => {
    }, [config])

    useEffect(() => {
        if (props?.filter) {
            const newBaseFilter = {
                name: schema?.relationKey,
                value: props?.filter,
                //operator: 'likelihood' // Default value is equal
            }

            setBaseFilter(newBaseFilter)

            const pageOptions = {
                ...dataSet?.options
                , recordPerPage: pageLength
                , searchCondition: newBaseFilter
            }
            dispatch(getData({ module: module, options: pageOptions }));
        }
    }, [props]);

    const pageChanges = async (e) => {
        e.preventDefault();
        const pageOptions = {
            currentPage: e.target.text
        }
        dispatch(getData({ module: module, options: pageOptions }));
    };

    const sortData = async (e, field) => {
        e.preventDefault();
        const sortOptions = {
            sortColumnName: field,
            sortDirection: !dataSet?.options?.sortDirection
        }

        dispatch(getData({ module: module, options: sortOptions }));
    }

    const handleSearchChange = async (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchText(search)
    }

    const changeDateRange = (value) => {
        if (config) {
            const count = Math.floor(parseInt(config.end - config.start) / (1000 * 60 * 60 * 24) + 1);
            if (count < 7) {
                const newConfig = {
                    ...config, ...{
                        start: new Date(config.start.setDate(config.start.getDate() + count))
                        , end: new Date(config.end.setDate(config.end.getDate() + count))
                    }
                }
                setConfig(newConfig)
            }
            else {
                const newConfig = {
                    ...config, ...{
                        start: new Date(config.start.setDate(config.start.getDate() + value))
                        , end: new Date(config.end.setDate(config.end.getDate() + value))
                    }
                }
                setConfig(newConfig)
            }

        }
    }

    const zoomDateRange = (value) => {
        const count = Math.floor(parseInt(config.end - config.start) / (1000 * 60 * 60 * 24) + 1);
        if (count > value) {
            let newConfig = {
                ...config, ...{
                    start: new Date(config.start.setDate(config.start.getDate() + value))
                    , end: new Date(config.end.setDate(config.end.getDate() - value))
                }
            }

            setConfig(newConfig)
            //console.log(newConfig)
        }
        else {
            const newConfig = {
                ...config, ...{
                    start: new Date(config.start.setDate(config.start.getDate())),
                    end: new Date(config.start.setDate(config.start.getDate()))
                }
            }

            setConfig(newConfig)
            //console.log(newConfig)
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <Row>
                                <Col md={8} className='mb-3'>
                                    {schema.adding &&
                                        <>
                                            {privileges.add &&
                                                <Button
                                                    variant="contained"
                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm"
                                                    onClick={() => navigate(`/${schema.path}/add`)}
                                                >
                                                    Add New
                                                </Button>
                                            }
                                        </>
                                    }
                                    <IUIModuleMessage schema={props.schema} />
                                </Col>
                                <Col md={4}>
                                    {schema.searching &&
                                        <div className="input-group mb-2 justify-content-end " data-mdb-input-init>

                                            <input className="form-control"
                                                type="text"
                                                placeholder="Search"
                                                id="search"
                                                value={search}
                                                onChange={handleSearchChange}
                                            />

                                            <button
                                                type="submit"
                                                onClick={handleSearch}
                                                className="btn btn-primary" data-mdb-ripple-init
                                            >
                                                Search
                                            </button>
                                        </div>
                                    }
                                </Col>
                            </Row >
                            <Row >
                                <Col >
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th width={60}></th>
                                                <th width={200} >
                                                    Project - TODO
                                                </th>
                                                <th>
                                                    <nav aria-label="Page navigation">
                                                        <ul className="pagination">
                                                            <li className="page-item">
                                                                <a className="page-link" aria-label="Previous seven day"
                                                                    onClick={e => changeDateRange(-7)}>
                                                                    <span aria-hidden="true">&laquo;</span>
                                                                </a>
                                                            </li>
                                                            <li className="page-item">
                                                                <a className="page-link" aria-label="Zoom Out"
                                                                    onClick={e => zoomDateRange(3)}>
                                                                    <span aria-hidden="true">-</span>
                                                                </a>
                                                            </li>
                                                            <li className="page-item">
                                                                <a className="page-link" aria-label="Zoom In"
                                                                    onClick={e => zoomDateRange(-3)}>
                                                                    <span aria-hidden="true">+</span>
                                                                </a>
                                                            </li>
                                                            <li className="page-item">
                                                                <a className="page-link" aria-label="Next seven day"
                                                                    onClick={e => changeDateRange(7)}>
                                                                    <span aria-hidden="true">&raquo;</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                    <IUIStripHeader configuration={config} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <IUITreeNode schema={schema.schema} filter="tower" configuration={config} />
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IUITree