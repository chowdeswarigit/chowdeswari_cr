import React from "react";
import PinaculoSvg from "../PinaculoSvg"; // Ensure this path is correct
import "./PinaculoChartComponent.css";
import { useTranslation } from "../../utils/i18n/LanguageContext"; // Ensure this path is correct
import leftDecoration from "../../assets/img/Lleft.png";
import rightDecoration from "../../assets/img/Lright.png";
import leftDownDecoration from "../../assets/img/image3.png";
import rightDownDecoration from "../../assets/img/Lright.png.png";
const PinaculoChartComponent = ({ pinaculo, numerologicalCycles }) => {
  const { t } = useTranslation(); // Get translation function

  // Safely process numerological cycles
  let numeroObj = [];
  let numeroObj1 = [];
  if (
    numerologicalCycles &&
    numerologicalCycles.length > 0 &&
    numerologicalCycles[0].phases
  ) {
    try {
      numeroObj = numerologicalCycles[0].phases.map((phaseString) => {
        // Basic check for the expected format
        if (typeof phaseString !== "string" || !phaseString.includes(" to ")) {
          console.error("Invalid phase string format:", phaseString);
          return { start: "N/A", end: "N/A" }; // Handle error gracefully
        }
        const parts = phaseString.split(" to ");
        const start = parseInt(parts[0], 10);
        const end = parseInt(parts[1], 10);

        // Check if parsing was successful
        if (isNaN(start) || isNaN(end)) {
          console.error(
            "Could not parse numbers from phase string:",
            phaseString
          );
          return { start: "N/A", end: "N/A" }; // Handle error gracefully
        }

        return { start, end };
      });
    } catch (error) {
      console.error("Error processing numerological cycles:", error);
      // numeroObj remains empty or partially filled, depending on where the error occurred
    }
  } else {
    console.warn("Numerological cycles data is missing or invalid.");
  }

  if (
    numerologicalCycles &&
    numerologicalCycles.length > 1 &&
    numerologicalCycles[1].phases
  ) {
    try {
      numeroObj1 = numerologicalCycles[1].phases.map((phaseString) => {
        // Basic check for the expected format
        if (typeof phaseString !== "string" || !phaseString.includes(" to ")) {
          console.error("Invalid phase string format:", phaseString);
          return { start: "N/A", end: "N/A" }; // Handle error gracefully
        }
        const parts = phaseString.split(" to ");
        const start = parseInt(parts[0], 10);
        const end = parseInt(parts[1], 10);

        // Check if parsing was successful
        if (isNaN(start) || isNaN(end)) {
          console.error(
            "Could not parse numbers from phase string:",
            phaseString
          );
          return { start: "N/A", end: "N/A" }; // Handle error gracefully
        }

        return { start, end };
      });
    } catch (error) {
      console.error("Error processing numerological cycles:", error);
      // numeroObj remains empty or partially filled, depending on where the error occurred
    }
  } else {
    console.warn("Numerological cycles data is missing or invalid.");
  }

  // Optional: Log the result for verification
  console.log("...numeroObj...", numeroObj);
  console.log("...numeroObj1...", numeroObj1);
  return (
    <>
      <div className="pinaculo-image-container">
        <div style={{ width: "50%" }}>
          <img src={leftDecoration} className="Lleft" alt="Left decoration" />
        </div>
        <div class="dotted-vertical-line"></div>
        <div style={{ width: "50%" }}>
          <img
            src={rightDecoration}
            alt="Right decoration"
            className="couple-lright"
          />
        </div>
      </div>
      <div className="pinaculo-chart-container">
        <div className="pinaculo-container">
          <div className="pinaculo-chart">
            {/* Conditionally render SVG only if pinaculo data exists */}
            {pinaculo ? (
              <PinaculoSvg pinaculo={pinaculo} />
            ) : (
              <p>Pinaculo data unavailable.</p>
            )}
          </div>

          {/* Moved outside pinaculo-chart div for better mobile layout */}
          {(numeroObj.length > 0 || numeroObj1.length > 0) && (
            <div className="numerological-cycles">
              <h3>
                {t(
                  "singleBasic.numerologicalCyclesTitle",
                  "Numerological Cycles:"
                )}
              </h3>
              <div className="cycles-table">
                {Math.max(numeroObj.length, numeroObj1.length) > 0 &&
                  Array.from({
                    length: Math.max(numeroObj.length, numeroObj1.length),
                  }).map((_, index) => (
                    <div key={index} className="cycle-row">
                      <span>
                        {numeroObj[index]
                          ? `${numeroObj[index].start} - ${numeroObj[index].end}`
                          : ""}
                      </span>
                      <span>
                        {numeroObj1[index]
                          ? `${numeroObj1[index].start} - ${numeroObj1[index].end}`
                          : ""}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div class="dotted-vertical-line"></div>
        <div className="description-half">
          <p style={{fontFamily:"Inter"}}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur ?</p>
        </div>
      </div>

      <div className="pinaculo-image-container">
        <div style={{ width: "50%" }}>
          <img src={leftDownDecoration} className="Lleft" alt="Left decoration" />
        </div>
        <div class="dotted-vertical-line"></div>
        <div style={{ width: "50%",marginBottom:"10px" }}>
          {/* <h1>Hello rifht</h1> */}
          <img
            src={rightDownDecoration}
            alt="Right decoration"
            className="couple-lright"
          />
        </div>
      </div>
    </>
  );
  return (
    <div className="pinaculo-chart-container">
      <div className="pinaculo-container">
        <div className="col-2 resultado2">
          <img src={leftDownDecoration} className="Lleft" alt="Left decoration" />
        </div>
        <div className="pinaculo-chart">
          {/* Conditionally render SVG only if pinaculo data exists */}
          {pinaculo ? (
            <PinaculoSvg pinaculo={pinaculo} />
          ) : (
            <p>Pinaculo data unavailable.</p>
          )}
        </div>

        {/* Moved outside pinaculo-chart div for better mobile layout */}
        {(numeroObj.length > 0 || numeroObj1.length > 0) && (
          <div className="numerological-cycles">
            <h3>
              {t(
                "singleBasic.numerologicalCyclesTitle",
                "Numerological Cycles:"
              )}
            </h3>
            <div className="cycles-table">
              {Math.max(numeroObj.length, numeroObj1.length) > 0 &&
                Array.from({
                  length: Math.max(numeroObj.length, numeroObj1.length),
                }).map((_, index) => (
                  <div key={index} className="cycle-row">
                    <span>
                      {numeroObj[index]
                        ? `${numeroObj[index].start} - ${numeroObj[index].end}`
                        : ""}
                    </span>
                    <span>
                      {numeroObj1[index]
                        ? `${numeroObj1[index].start} - ${numeroObj1[index].end}`
                        : ""}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <div class="dotted-vertical-line"></div>
      <div className="description-half">
        <h2>Hello</h2>
      </div>
      <div className="couple-col-2">
        <img
          src={rightDecoration}
          alt="Right decoration"
          className="couple-lright"
        />
      </div>
    </div>
  );
};

export default PinaculoChartComponent;
