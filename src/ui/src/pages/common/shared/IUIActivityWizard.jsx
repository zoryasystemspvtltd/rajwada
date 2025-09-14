import $ from "jquery"; // Import jQuery
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "smartwizard/dist/css/smart_wizard_all.min.css"; // SmartWizard CSS
import "smartwizard/dist/js/jquery.smartWizard.min.js"; // SmartWizard JS
import api from '../../../store/api-service';
import IUIPage from "../IUIPage";


const IUIActivityWizard = (props) => {
    const wizardRef = useRef(null);
    const [sequence, setSequence] = useState([]);
    const [alreadyCreationNote, setAlreadyCreationNote] = useState("");
    const schema = props?.schema;
    const dependencyData = props?.dependencyData
    // console.log(dependencyData);
    const [isCreationSuccessful, setIsCreationSuccessful] = useState(true);
    const navigate = useNavigate();
    const [unitOfWorkSchema, setUnitOfWorkSchema] = useState({
        parentId: -1,
        parent: {
            module: 'plan',
            filter: 'planId',
        },
        module: 'unitOfWork'
    });
    const tabContentRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const customNextStepLogic = () => {
        // Custom logic goes here
        if (isCreationSuccessful) {
            return true;
        }
        else {
            return false;
        }
    };


    // Define the custom function to be triggered on step changing
    const handleStepChanging = (event, anchorObject, stepIndex, stepDirection, stepPosition) => {
        event.stopImmediatePropagation();
        // Call custom function before proceeding to the next step
        if (stepIndex < stepDirection) {
            // If moving to the next step, call the custom function
            const result = customNextStepLogic();
            if (!result) {
                // If the custom logic fails, prevent moving to the next step
                return false;
            }
        }
        // Allow the step change if no issues with custom logic
        return true;
    };


    const updateUnit = async (unit, newActivityId) => {
        if (unit?.activityId === null) {
            const payload = { ...unit, activityId: parseInt(newActivityId) };
            await api.editData({ module: unitOfWorkSchema?.module, data: payload });
            return;
        }
    };


    const updateUnitsOfWork = async (newActivityId) => {
        const pageOptions = { recordPerPage: 0 };
        const response = await api.getData({
            module: unitOfWorkSchema?.module,
            options: pageOptions,
        });


        const items = response?.data?.items || [];
        const filteredUnits = items.filter(
            (item) => item?.[unitOfWorkSchema?.parent?.filter] === parseInt(unitOfWorkSchema?.parentId)
        );


        const updatePromises = filteredUnits.map((unit) => updateUnit(unit, newActivityId));
        await Promise.all(updatePromises);
        return;
    }


    const activityCallback = async (callbackResponse) => {
        setIsCreationSuccessful(callbackResponse?.status);
        if (callbackResponse?.id !== -1) {
            await updateUnitsOfWork(callbackResponse?.id);
        }
    };


    const baseQueryConstructor = (data) => {
        let baseQuery = {};
        if (data?.workflowId && data?.projectId && data?.towerId && !data?.floorId && !data?.flatId) {
            baseQuery = {
                name: 'workflowId',
                value: parseInt(data?.workflowId),
                and: {
                    name: 'projectId',
                    value: parseInt(data?.projectId),
                    and: {
                        name: 'towerId',
                        value: parseInt(data?.towerId),
                        and: {
                            name: 'floorId',
                            value: null,
                            and: {
                                name: 'flatId',
                                value: null,
                            }
                        }
                    }
                }
            };
            setUnitOfWorkSchema({ ...unitOfWorkSchema, parentId: parseInt(data?.towerId) })
        }
        else if (data?.workflowId && data?.projectId && data?.towerId && data?.floorId && !data?.flatId) {
            baseQuery = {
                name: 'workflowId',
                value: parseInt(data?.workflowId),
                and: {
                    name: 'projectId',
                    value: parseInt(data?.projectId),
                    and: {
                        name: 'towerId',
                        value: parseInt(data?.towerId),
                        and: {
                            name: 'floorId',
                            value: parseInt(data?.floorId),
                            and: {
                                name: 'flatId',
                                value: null,
                            }
                        }
                    }
                }
            };
            setUnitOfWorkSchema({ ...unitOfWorkSchema, parentId: parseInt(data?.floorId) })
        }
        else {
            baseQuery = {
                name: 'workflowId',
                value: parseInt(data?.workflowId),
                and: {
                    name: 'projectId',
                    value: parseInt(data?.projectId),
                    and: {
                        name: 'towerId',
                        value: parseInt(data?.towerId),
                        and: {
                            name: 'floorId',
                            value: parseInt(data?.floorId),
                            and: {
                                name: 'flatId',
                                value: parseInt(data?.flatId),
                            }
                        }
                    }
                }
            };
            setUnitOfWorkSchema({ ...unitOfWorkSchema, parentId: parseInt(data?.flatId) })
        }
        return baseQuery;
    }




    // Filter out works items whose activity has already been created
    useEffect(() => {


        // Function to filter out all grouping activities
        async function filterGroupActivities() {
            const item = await api.getSingleData({ module: 'workflow', id: props?.dependencyData?.workflowId });
            let inputDependency = item.data;
            const nodes = JSON.parse(inputDependency?.data)?.nodes;


            const filtered = nodes.filter(node => {
                if (node?.node?.parentId !== null) {
                    // it's a child node
                    return true;
                } else {
                    // check if node has children
                    const hasChildren = nodes?.some(n => n?.node?.parentId === node?.node?.id);
                    return !hasChildren; // include only if no children
                }
            })?.map(node => node?.data?.label);
            return filtered;
        }

        async function fetchActivities() {
            let baseQuery = baseQueryConstructor(props?.dependencyData);


            // console.log(props?.dependencyData)
            const pageOptions = {
                recordPerPage: 0,
                searchCondition: baseQuery
            }
            const response = await api.getData({ module: 'activity', options: pageOptions });
            let activities = response?.data?.items || [];


            if (activities?.length > 0) {
                // find already existing activities for workitems
                let finalSequence = [];




                // Check for already created activities for a selected Dependency
                props?.sequence?.forEach((workItem) => {
                    let existingActivities = activities?.filter((activity) => activity?.name?.includes(workItem?.label) || activity?.description?.includes(workItem?.label))
                    if (existingActivities?.length === 0) {
                        finalSequence.push(workItem);
                    }
                });


                // Updated logic for no planning for group activities
                const groupActivities = await filterGroupActivities();
                setSequence(finalSequence?.filter(activity => groupActivities.includes(activity?.label)));
                if (finalSequence?.length === 0) {
                    setAlreadyCreationNote("Activities have already been created for the selected Tower, Floor, Flat and Dependency details !");
                }
            }
            else {
                // Updated logic for no planning for group activities
                const groupActivities = await filterGroupActivities();
                setSequence(props?.sequence?.filter(activity => groupActivities.includes(activity?.label)));
            }
        }


        if (props?.sequence && props?.dependencyData) {
            fetchActivities();
        }
    }, [props?.sequence, props?.dependencyData]);


    useEffect(() => {
        if (wizardRef.current) {
            $(wizardRef.current).smartWizard({
                selected: 0,
                theme: "dots",
                colors: "green",
                transitionEffect: "fade",
                enableUrlHash: false,
                toolbar: {
                    position: "bottom",
                    showNextButton: true, // Next button initially enabled (but we disable it below)
                    showPreviousButton: false,
                    extraHtml: "",
                },
            });


            // Handle step changes
            $(wizardRef.current).on("leaveStep", handleStepChanging);


            // Handle step visibility
            $(wizardRef.current).on("showStep", (e, anchorObject, stepNumber, stepDirection, stepPosition) => {
                setIsCreationSuccessful(false); // Reset success state on step change
                setActiveIndex(stepNumber)

                if (stepPosition === "last") {
                    $(".sw-btn-next").hide(); // Hide Next button on last step
                    $("#finish-btn").fadeIn();
                } else {
                    $(".sw-btn-next").show().prop("disabled", !isCreationSuccessful); // Show & disable Next button if needed
                    $("#finish-btn").fadeOut();
                }
            });


            // Style Next button
            $(".sw-btn-next")
                .addClass("btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary")
                .removeClass("sw-btn")
                .prop("disabled", !isCreationSuccessful); // Initially disable Next button


            // Add Finish Button if not already present
            if (!$("#finish-btn").length) {
                $(".sw-toolbar-elm").append(
                    `<button id="finish-btn" class="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-dark ml-2" disabled>Finish</button>`
                );


                $("#finish-btn").on("click", (e) => {
                    e.preventDefault();
                    navigate(`/${schema?.path}`);
                });
            }
        }
    }, [navigate, schema?.path, sequence?.length, isCreationSuccessful]);  // Empty dependency array ensures it runs only once


    // Effect to update the button states dynamically
    useEffect(() => {
        $(".sw-btn-next").prop("disabled", !isCreationSuccessful); // Disable Next button if needed
        $("#finish-btn").prop("disabled", !isCreationSuccessful); // Disable Finish button if needed
    }, [isCreationSuccessful]);


    return (
        <div>
            {
                (sequence?.length > 0) ? (
                    <div id="smartwizard" ref={wizardRef}>
                        <ul className="nav">
                            {
                                sequence?.map((activity, index) => (
                                    <li className="nav-item" key={`li-${activity}-${index}`}>
                                        <a className="nav-link" href={`#step-${index + 1}`}>
                                            <div className="num">{index + 1}</div>
                                            {activity?.label}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>


                        <div
                            className="tab-content"
                            ref={tabContentRef}
                            style={{
                                overflowX: 'hidden',
                                overflowY: 'auto', // optional if you want vertical scroll
                            }}
                        >
                            {sequence?.map((activity, index) => (
                                <div
                                    id={`step-${index + 1}`}
                                    className={`tab-pane ${index === activeIndex ? 'active' : ''}`}
                                    role="tabpanel"
                                    aria-labelledby={`step-${index + 1}`}
                                    key={`tab-${activity?.label}-${index}`}
                                >
                                    <IUIPage
                                        key={`activity-${activity?.activityId}`}
                                        schema={schema}
                                        activityCallback={activityCallback}
                                        defaultValues={{ ...dependencyData, dependencyId: activity?.activityId }}
                                    />
                                </div>
                            ))}
                        </div>


                        {/* style property added to middle align progress bar */}
                        <div className="progress" style={{ margin: "auto", width: "50%" }}>
                            <div className="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">
                        <strong>{alreadyCreationNote}</strong>
                    </p>
                )
            }
        </div>
    );
};


export default IUIActivityWizard;
