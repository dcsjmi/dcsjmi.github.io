import "../stylesheets/Placement.css";
import "../Global.css";
import importAll from "../middleware/dynamicImport";
import PDFViewer from "../components/PDFViewer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ColorHash from "color-hash";
import ExpandIcon from "../images/placement/expand.png";
import CollapseIcon from "../images/placement/collapse.png";
import PlacementRecords from "../data/placementRecords.json";
import PlacementSummary from "../data/PlacementSummary.json";
import PlacementTeamData from "../data/placementTeam.json";
import brochureData from "../data/BrochureLinks.json";
import { useState } from "react";
import emailIcon from "../images/core/email.png";
import linkedinIcon from "../images/core/linkedin.png";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartDataLabels
);

function PlacementStats() {
  const [reRenderKeys, setReRenderKeys] = useState(
    Object.keys(PlacementRecords).map(() => 0)
  );
  const [reRender, setReRender] = useState(0);
  const YearlySummaryData = (year) => {
    let rand_color = new ColorHash();
    return {
      labels: PlacementRecords[year]["Companies"],
      datasets: [
        {
          label: "Distribution of Package Offered",
          data: PlacementRecords[year]["PackageOffered"],
          backgroundColor: PlacementRecords[year]["Companies"].map((val) =>
            rand_color.hex(val)
          ),
          borderColor: ["rgba(0, 0, 0, 0.2)"],
          borderWidth: 1,
          hoverOffset: 20,
        },
      ],
    };
  };

  const YearlySummaryOptions = {
    responsive: true,
    animation: { delay: 0, duration: 2000 },
    layout: { padding: 0 },
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "white", font: { size: 12 } },
        onClick: function (e) {
          e.stopPropagation();
        },
      },
      datalabels: {
        display: true,
        anchor: "center",
        clamp: true,
        align: "center",
        offset: 10,
        padding: 10,
        backgroundColor: "#ffffff00",
        color: "white",
        font: { size: 10 },
        /*formatter: function(value, context) {
                    return context.chart.data.labels[context.dataIndex];
                }*/
      },
    },
  };

  const summaryYears = Object.keys(PlacementSummary);
  const Summarydata = {
    labels: summaryYears,
    datasets: [
      {
        label: "Minimum Salary",
        data: summaryYears.map((val) => PlacementSummary[val]["Min"]),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Mean Salary",
        data: summaryYears.map((val) => PlacementSummary[val]["Mean"]),
        backgroundColor: "rgba(100, 255, 132, 1)",
      },
      {
        label: "Maximum Salary",
        data: summaryYears.map((val) => PlacementSummary[val]["Max"]),
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  };

  const SummaryChartOptions = {
    responsive: true,
    animation: { delay: 0, duration: 2000 },
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "rgb(10,10,10)", font: { size: 12 } },
        onClick: function (e) {
          e.stopPropagation();
        },
      },
      title: {
        display: true,
        text: "Salary Offered in Last 6 Years",
        color: "#09526f",
        font: { size: 20 },
      },
      datalabels: {
        display: true,
        anchor: "end",
        clamp: true,
        align: "start",
        offset: -5,
        padding: 10,
        backgroundColor: "#ffffff00",
        color: "white",
        font: { size: 10 },
      },
    },
  };

  let yearlyStatsElements = [];

  const expandChart = (event) => {
    let chartSection = event.target.parentNode.parentNode.nextSibling;
    if (chartSection.className === "RecordsCharts latestYear") return;
    if (
      chartSection.className === "RecordsCharts" ||
      chartSection.className === "RecordsCharts collpase"
    ) {
      chartSection.className = "RecordsCharts expand";
      event.target.src = CollapseIcon;
      reRenderKeys[event.target.id]++;
      setReRenderKeys(reRenderKeys);
      setReRender(reRender + 1);
    } else {
      chartSection.className = "RecordsCharts collpase";
      event.target.src = ExpandIcon;
    }
  };

  let recordYears = Object.keys(PlacementRecords).reverse();
  for (let year of recordYears) {
    yearlyStatsElements.push(
      <div className="PlacementRecordsContainer" key={year}>
        <div className="RecordSummaryContainer">
          <div className="RecordsYear">Year {year}</div>
          <div className="RecordsSummary">
            Companies Visited: {PlacementRecords[year]["Companies"].length}
            <br />
            Offers Made: {PlacementRecords[year]["TotalOffers"]}
          </div>
          <div className="ExpandChartsButton">
            <img
              id={yearlyStatsElements.length}
              src={ExpandIcon}
              alt="Show More"
              onClick={expandChart}
            />
          </div>
        </div>
        <div
          className={
            yearlyStatsElements.length ? "RecordsCharts" : "RecordsCharts"
          }
        >
          <div
            className="PieChartContainer"
            key={reRenderKeys[yearlyStatsElements.length]}
          >
            <Doughnut
              data={YearlySummaryData(year)}
              options={YearlySummaryOptions}
            />
          </div>
          <div>
            <h5>*CTC offered in LPA</h5>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="PlacementSectionBody">
      <div className="PlacementSummaryContainer">
        <div className="SummaryChart">
          <Bar data={Summarydata} options={SummaryChartOptions} />
        </div>
      </div>
      <div className="subheading-container">
        <h2>Yearwise Summary</h2>
        <div className="subheading-border"></div>
      </div>
      {yearlyStatsElements}
    </div>
  );
}

function Recruiters() {
  const images = importAll(
    require.context("../images/placement/logos/", false, /\.(png|jpe?g|svg)$/)
  );
  let recruiters = [];
  for (let imgs of Object.keys(images)) {
    recruiters.push(
      <div key={imgs} className="recruiters">
        <img src={images[imgs]} alt="" />
      </div>
    );
  }

  return <div className="recruitersContainer">{recruiters}</div>;
}

function Brochure() {
  const [isPDFOpen, setPDFOpen] = useState(false);
  const thumbs = importAll(
    require.context("../data/brochure_thumb/", false, /\.(png|jpe?g|svg)$/)
  );

  const BrochureCards = [];

  for (let brochureDetails in brochureData) {
    BrochureCards.push(
      <div key={brochureDetails}>
        <div
          className="BrochureCard"
          onClick={(e) => setPDFOpen(brochureDetails)}
        >
          <h1>{brochureDetails}</h1>
          <h2>
            Placement Brochure Batch {brochureData[brochureDetails]["Batch"]}
          </h2>
          <img
            src={thumbs[brochureData[brochureDetails]["Image"]]}
            alt="Brochure"
          />
          <h3>Click to Open</h3>
        </div>
        <PDFViewer
          fileLink={brochureData[brochureDetails]["Link"]}
          visible={isPDFOpen === brochureDetails ? true : false}
          onHide={() => setPDFOpen(false)}
        />
      </div>
    );
  }

  return <div className="BrochureLinksContainer">{BrochureCards}</div>;
}

function PlacementTeam() {
  const ContributorImages = importAll(
    require.context(
      "../data/profiles_contributors/",
      false,
      /^\.\/.*\.(png|jpe?g|svg)$/
    )
  );

  const ContributorElement = (Category) => {
    let CategoryElement = [];
    for (let subCategory in PlacementTeamData[Category]) {
      for (let member of PlacementTeamData[Category][subCategory]) {
        CategoryElement.push(
          <div key={member.Name} className="contributorProfileContainer">
            <img
              className="ContributorCardImage"
              src={ContributorImages[member.Image]}
              alt={member.Name}
            />
            <div className="ContributorCardContent">
              <div className="ContributorAboutSection">
                <h1>{member.Name}</h1>
                <h2>{member.Designation + ", " + subCategory}</h2>
                <a href={"tel:" + member.Phone}>
                  <h3>{member.Phone}</h3>
                </a>
              </div>
              <div className="ContributorContactSection">
                <div className="ContributorSectionBorder"></div>
                <div>
                  <a href={member.Linkedin} target="_blank" rel="noreferrer">
                    <img
                      className="ContributorContactIcon"
                      src={linkedinIcon}
                      alt="linkedin"
                    />
                  </a>
                  <a
                    href={"mailto:" + member.Email}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="ContributorContactIcon"
                      src={emailIcon}
                      alt="email"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return CategoryElement;
  };

  return (
    <div id="contributors">
      <div className="subheading-container">
        <h2>Teacher Placement Coordinator</h2>
        <div className="subheading-border"></div>
      </div>
      <div className="PlacementCoordinatorContainer OnlyOneCard">
        {ContributorElement("Coordinator")}
      </div>
      <div className="subheading-container">
        <h2>MCA</h2>
        <div className="subheading-border"></div>
      </div>
      <div className="PlacementCoordinatorContainer">
        {ContributorElement("MCA")}
      </div>
      {/* <div className="subheading-container">
                <h2>MSc Bioinformatics</h2>
                <div className="subheading-border"></div>
            </div>
            <div className="PlacementCoordinatorContainer">
                {ContributorElement("MSC")}
            </div> */}
    </div>
  );
}

export default function Placement(props) {
  return (
    <div id="PlacementPage" className="PlacementPage">
      <div className="PlacementPageSection">
        <div className="heading-container">
          <h1>Placement Statistics</h1>
          <div className="heading-border"></div>
        </div>
        <PlacementStats />
      </div>
      <div>
        <div className="heading-container">
          <h1>Our Recruiters</h1>
          <div className="heading-border"></div>
        </div>
        <Recruiters />
      </div>
      <div>
        <div id="brochure" className="heading-container">
          <h1>Placement Brochure</h1>
          <div className="heading-border"></div>
        </div>
        <Brochure />
      </div>
      <div>
        <div id="contributors" className="heading-container">
          <h1>Placement Team</h1>
          <div className="heading-border"></div>
        </div>
        <PlacementTeam />
      </div>
    </div>
  );
}
