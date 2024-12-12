import React, { useEffect } from "react";
import $ from "jquery";  // Import jQuery
import "smartwizard/dist/css/smart_wizard_all.min.css";  // SmartWizard CSS
import "smartwizard/dist/js/jquery.smartWizard.min.js"; // SmartWizard JS

const IUIActivityWizard = (props) => {
    const sequence = props?.sequence;
    const schema = props?.schema;
    const customNextStepLogic = () => {
        // Custom logic goes here
        console.log("Running custom logic before proceeding to the next step.");
        // For example, you could validate inputs or save data here
        return true; // Return true to allow moving to the next step, or false to prevent it
    };

    // Define the custom function to be triggered on step changing
    const handleStepChanging = (event, anchorObject, stepIndex, stepDirection, stepPosition) => {
        event.stopImmediatePropagation();
        console.log("Step Changing Triggered");
        console.log("Step Index:", stepIndex);
        console.log("Step Direction:", stepDirection);
        console.log("Step Position:", stepPosition);

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
                },
                lang: {
                    next: 'Save & Proceed'
                }
            });

            $("#smartwizard").on("leaveStep", handleStepChanging);

            $(".sw-btn-next").addClass("btn-wide btn-pill btn-shadow btn-hover-shine btn btn-success").removeClass("sw-btn");

            // Check if the custom button already exists
            if (!$("#finish-btn").length) {
                // Add a custom button to the toolbar manually
                $("#smartwizard")
                    .find(".sw-toolbar-elm")
                    .append(`<button id="finish-btn" class="btn btn-info">Finish</button>`);

                // Define custom button behavior
                $("#finish-btn").on("click", function () {
                    alert("Custom button clicked!");
                });

                $("#smartwizard").on("showStep", function (e, anchorObject, stepNumber, stepDirection, stepPosition) {
                    if (stepPosition !== 'final') {
                        $("#finish-btn").hide();
                    } else {
                        $("#finish-btn").show();
                    }
                });
            }
        }

        // Cleanup when component unmounts
        return () => {
            if ($("#smartwizard").length) {
                $("#smartwizard").smartWizard("destroy");
            }
        };
    }, []);  // Empty dependency array ensures it runs only once

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
                        sequence?.map((activity, index) => {
                            <div id={`step-${index + 1}`} className="tab-pane" role="tabpanel" aria-labelledby={`step-${index + 1}`} key={`tab-${activity}-${index}`}>
                                Step content
                            </div>
                        })
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
