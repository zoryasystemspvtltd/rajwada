import React, { useEffect } from "react";
import $ from "jquery";  // Import jQuery
import "smartwizard/dist/css/smart_wizard_all.min.css";  // SmartWizard CSS
import "smartwizard/dist/js/jquery.smartWizard.min.js"; // SmartWizard JS

const IUIActivityWizard = () => {
    const customNextStepLogic = () => {
        // Custom logic goes here
        console.log("Running custom logic before proceeding to the next step.");
        // For example, you could validate inputs or save data here
        return true; // Return true to allow moving to the next step, or false to prevent it
    };

    useEffect(() => {
        // Initialize SmartWizard
        if ($ && $("#smartwizard").length) {
            $("#smartwizard").smartWizard({
                selected: 0,
                theme: "dots",  // Set theme
                colors: "green",
                transitionEffect: "fade",  // Set transition effect
                showStepURLhash: false,  // Show step URL hash
                toolbar: {
                    position: 'bottom', // none|top|bottom|both
                    showNextButton: true, // show/hide a Next button
                    showPreviousButton: false, // show/hide a Previous button
                    extraHtml: '' // Extra html to show on toolbar
                },
                onStepChanging: function (event, currentIndex, newIndex) {
                    console.log("onStepChanging triggered!");
                    console.log("Current Step Index:", currentIndex);
                    console.log("Next Step Index:", newIndex);
                    // Call custom function before proceeding to the next step
                    if (currentIndex < newIndex) {
                        // If moving to the next step, call the custom function
                        const result = customNextStepLogic();
                        if (!result) {
                            // If the custom logic fails, prevent moving to the next step
                            return false;
                        }
                    }
                    // Allow the step change if no issues with custom logic
                    return true;
                }
            });

            // Check if the custom button already exists
            if (!$("#customBtn").length) {
                // Add a custom button to the toolbar manually
                $("#smartwizard")
                    .find(".sw-toolbar-elm")
                    .append('<button id="customBtn" class="btn btn-info">Custom Button</button>');

                // Define custom button behavior
                $("#customBtn").on("click", function (e) {
                    e.preventDefault();
                    alert("Custom button clicked!");
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
                    <li className="nav-item">
                        <a className="nav-link" href="#step-1">
                            <div className="num">1</div>
                            Step Title
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#step-2">
                            <span className="num">2</span>
                            Step Title
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#step-3">
                            <span className="num">3</span>
                            Step Title
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="#step-4">
                            <span className="num">4</span>
                            Step Title
                        </a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="step-1" className="tab-pane" role="tabpanel" aria-labelledby="step-1">
                        Step content
                    </div>
                    <div id="step-2" className="tab-pane" role="tabpanel" aria-labelledby="step-2">
                        Step content
                    </div>
                    <div id="step-3" className="tab-pane" role="tabpanel" aria-labelledby="step-3">
                        Step content
                    </div>
                    <div id="step-4" className="tab-pane" role="tabpanel" aria-labelledby="step-4">
                        Step content
                    </div>
                </div>


                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: "0%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    );
};

export default IUIActivityWizard;