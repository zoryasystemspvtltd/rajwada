import $ from "jquery"; // Import jQuery
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "smartwizard/dist/css/smart_wizard_all.min.css"; // SmartWizard CSS
import "smartwizard/dist/js/jquery.smartWizard.min.js"; // SmartWizard JS
import IUIPage from "../IUIPage";

const IUIActivityWizard = (props) => {
    const sequence = props?.sequence;
    const schema = props?.schema;
    const [isCreationSuccessful, setIsCreationSuccessful] = useState(true);
    const navigate = useNavigate();

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

    const activityCallback = (creationStatus) => {
        setIsCreationSuccessful(creationStatus);
    }

    useEffect(() => {
        // Initialize SmartWizard
        if ($ && $("#smartwizard").length) {
            $("#smartwizard").smartWizard({
                // onStepChange: handleStepChanging,
                selected: 0,
                theme: "dots",  // Set theme
                colors: "green",
                transitionEffect: "fade",  // Set transition effect
                enableUrlHash: false,  // Show step URL hash
                toolbar: {
                    position: 'bottom', // none|top|bottom|both
                    showNextButton: true, // show/hide a Next button
                    showPreviousButton: false, // show/hide a Previous button
                    extraHtml: '' // Extra html to show on toolbar
                }
            });

            $("#smartwizard").on("leaveStep", handleStepChanging);

            $(".sw-btn-next").addClass("btn-wide btn-pill btn-shadow btn-hover-shine btn btn-success").removeClass("sw-btn");

            if (!isCreationSuccessful) {
                $(".sw-btn-next").prop('disabled', true);
            }
            else {
                $(".sw-btn-next").prop('disabled', false);
            }

            // Check if the custom button already exists
            if (!$("#finish-btn").length) {
                // Add a custom button to the toolbar manually
                $("#smartwizard")
                    .find(".sw-toolbar-elm")
                    .append(`<button id="finish-btn" class="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-dark ml-2">Finish</button>`);

            }
            // Define custom button behavior
            $("#finish-btn").on("click", function (e) {
                e.preventDefault();
                // alert("Activities Creation Successful");
                navigate(`/${schema?.path}`)
            });

            $("#smartwizard").on("showStep", function (e, anchorObject, stepNumber, stepDirection, stepPosition) {
                // e.preventDefault();
                setIsCreationSuccessful(false);
                if (stepPosition === 'last') {
                    $("#finish-btn").fadeIn();
                } else {
                    $("#finish-btn").fadeOut();
                }
            });
        }

        // Cleanup when component unmounts
        return () => {
            if ($("#smartwizard").length) {
                $("#smartwizard").smartWizard("destroy");
            }
        };
    }, [navigate, schema?.path, sequence?.length, isCreationSuccessful]);  // Empty dependency array ensures it runs only once

    return (
        <div>
            <div id="smartwizard">
                <ul className="nav">
                    {
                        sequence?.map((activity, index) => (
                            <li className="nav-item" key={`li-${activity}-${index}`}>
                                <a className="nav-link" href={`#step-${index + 1}`}>
                                    <div className="num">{index + 1}</div>
                                    {activity}
                                </a>
                            </li>
                        ))
                    }
                </ul>

                <div className="tab-content">
                    {
                        sequence?.map((activity, index) => (
                            <div id={`step-${index + 1}`} className="tab-pane" role="tabpanel" aria-labelledby={`step-${index + 1}`} key={`tab-${activity}-${index}`}>
                                <IUIPage schema={schema} activityCallback={activityCallback} />
                            </div>
                        ))
                    }
                </div>


                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    );
};

export default IUIActivityWizard;
