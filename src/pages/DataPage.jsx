import React, { useEffect } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import "../styles/DataPage.css";

const employmentData = {
  2019: { employed: 5, continuingEducation: 2, seekingEmployment: 0, other: 0 },
  2020: { employed: 7, continuingEducation: 2, seekingEmployment: 8, other: 0 },
  2021: {
    employed: 15,
    continuingEducation: 4,
    seekingEmployment: 3,
    other: 0,
  },
  2022: {
    employed: 14,
    continuingEducation: 2,
    seekingEmployment: 1,
    other: 1,
  },
  2023: {
    employed: 11,
    continuingEducation: 0,
    seekingEmployment: 1,
    other: 1,
  },
};

const numberOfInterns2023 = [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3];
const internData = { 0: 2, 1: 6, 2: 3, 3: 1 };
const topEmployers = [
  "Allegion",
  "Calix Inc",
  "FGLIstudents.org",
  "GXO Logistics, inc",
  "Industrial Electric Inc",
  "Kado Properties",
  "Pet Smart",
  "Purdue University",
  "UKG",
  "Google",
  "Rockfish Interactive",
  "Allstate Insurance",
];
const averageSalary2022 = 58444;
const addTooltip = (svg) => {
  return d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "1px solid black")
    .style("padding", "5px")
    .style("border-radius", "5px")
    .style("font-size", "12px")
    .style("color", "black");
};
const DataPage = () => {
  const createWordCloudWithForce = () => {
    d3.select(".word-cloud-container").selectAll("svg").remove();
    const margin = { top: 40, right: 40, bottom: 100, left: 80 };
    const width = 700;
    const height = 500;
    const maxFontSize = 50;
    const minFontSize = 20;

    const fontSizeScale = d3
      .scaleLinear()
      .domain([0, topEmployers.length - 1])
      .range([maxFontSize, minFontSize]);

    // Create word data
    const words = topEmployers.map((employer, index) => ({
      text: employer,
      size: fontSizeScale(index),
    }));

    // Create the initial word cloud layout
    cloud()
      .size([width, height])
      .words(words)
      .padding(10)
      .rotate(0)
      .font("Impact")
      .fontSize((d) => d.size)
      .on("end", (cloudWords) => {
        // Set up SVG
        const svg = d3
          .select(".word-cloud-container")
          .append("svg")
          .attr("viewBox", `0 0 ${width} ${height}`)
          .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // Add force simulation for the word cloud
        const simulation = d3
          .forceSimulation(cloudWords)
          .force(
            "center",
            d3.forceCenter(0, 0) // Keep words centered
          )
          .force(
            "boundingBox", // Custom bounding box force to keep words within the container
            () => {
              cloudWords.forEach((d) => {
                d.x = Math.max(
                  -width / 2 + d.size / 2,
                  Math.min(d.x, width / 2 - d.size / 2)
                );
                d.y = Math.max(
                  -height / 2 + d.size / 2,
                  Math.min(d.y, height / 2 - d.size / 2)
                );
              });
            }
          )
          .force(
            "collide",
            d3.forceCollide((d) => d.size / 2 + 5) // Prevent overlap by adding collision force
          )
          .on("tick", () => {
            const text = svg
              .selectAll("text")
              .data(cloudWords)
              .enter()
              .append("text")
              .style("font-size", (d) => `${d.size}px`)
              .style("fill", (d, i) => d3.schemeCategory10[i % 10])
              .attr("text-anchor", "middle")
              .attr("transform", (d) => `translate(${d.x},${d.y})`)
              .text((d) => d.text);

            text.attr("transform", (d) => `translate(${d.x},${d.y})`);
          });
      })
      .start();

  };

  // Function to create the employment stacked bar chart
  const createEmploymentBarChart = () => {
    // Remove any existing SVG
    d3.select(".employment-chart-container").selectAll("svg").remove();
    const tooltip = addTooltip();
    const data = Object.keys(employmentData).map((year) => {
      const total =
        employmentData[year].employed +
        employmentData[year].continuingEducation +
        employmentData[year].seekingEmployment +
        employmentData[year].other;

      return {
        year,
        employed: (employmentData[year].employed / total) * 100,
        continuingEducation:
          (employmentData[year].continuingEducation / total) * 100,
        seekingEmployment:
          (employmentData[year].seekingEmployment / total) * 100,
        other: (employmentData[year].other / total) * 100,
      };
    });

    const margin = { top: 40, right: 40, bottom: 100, left: 80 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const categories = [
      "employed",
      "continuingEducation",
      "seekingEmployment",
      "other",
    ];
    const color = d3
      .scaleOrdinal()
      .domain(categories)
      .range(d3.schemeTableau10);
    const svg = d3
      .select(".employment-chart-container")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.2);
    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]); // Scale for 100% bars

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("font-size", "14px");
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "14px");
    svg
      .append("text")
      .text("Percentage")
      .attr("transform", `translate(${-40},${height / 2})rotate(-90)`)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "#000");

    // Stack the data
    const stack = d3
      .stack()
      .keys(["employed", "continuingEducation", "seekingEmployment", "other"]);
    const stackedData = stack(data);

    const categoryNames = {
      employed: "Employed",
      continuingEducation: "Continuing Education",
      seekingEmployment: "Seeking Employment",
      other: "Other",
    };
    // Add the stacked bars
    svg
      .selectAll(".layer")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "layer")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.data.year))
      .attr("y", (d) => yScale(d[1])) // d[1] is the top of the segment
      .attr("height", (d) => yScale(d[0]) - yScale(d[1])) // d[0] is the bottom of the segment
      .attr("width", xScale.bandwidth())
      .on("mouseover", function (event, d) {
        const category = d3.select(this.parentNode).datum().key;
        const categoryName = categoryNames[category];
        tooltip
          .style("visibility", "visible")
          .html(
            `Year: ${d.data.year}<br>${categoryName}: ${(d[1] - d[0]).toFixed(
              2
            )}%`
          );
        d3.select(this).attr("opacity", 0.8);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY + 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function (event, d) {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("opacity", 1);
      });

      //Add title
      svg.append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style('font-weight', 'bold')
      .text("Plans After Graduation");
    // Add a legend
    const legend = svg
      .selectAll(".legend")
      .data(categories)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => {
        return i === 1
          ? `translate(${i * (width / categories.length) - 30}, ${height + 40})`
          : i === 3
          ? `translate(${i * (width / categories.length + 10)}, ${height + 40})`
          : `translate(${i * (width / categories.length)}, ${height + 40})`;
      }); // Position below the chart

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => color(d));

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("font-size", "12px")
      .text((d) => categoryNames[d]);
  };

  // Function to create the intern histogram
  const createInternBars = () => {
    const tooltip = addTooltip();
    // Remove any existing SVG
    d3.select(".intern-histogram-container").selectAll("svg").remove();
    const margin = { top: 20, right: 30, bottom: 80, left: 80 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(".intern-histogram-container")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    // Define x and y scales
    const xScale = d3
      .scaleBand()
      .domain(Object.keys(internData))
      .range([0, width])
      .padding(0.2);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(Object.values(internData))])
      .range([height, 0]);

    // Add x-axis and y-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("font-size", "14px");
    svg
      .append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll("text")
      .style("font-size", "14px");
    svg
      .append("text")
      .text("No. of Students")
      .attr("transform", `translate(${-40},${height / 2})rotate(-90)`)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "#000");
    svg
      .append("text")
      .text("No. of Interns")
      .attr("transform", `translate(${width / 2},${height + 50})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "#000");
    // Create the bars
    svg
      .selectAll(".bar")
      .data(Object.entries(internData))
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d[0]))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d[1]))
      .attr("fill", "#4e79a7")
      .on("mouseover", function (event, d) {
        tooltip
          .style("visibility", "visible")
          .html(`Number of students: ${d[1]}`);
        d3.select(this).attr("opacity", 0.6);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY + 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function (event, d) {
        tooltip.style("visibility", "hidden");
        d3.select(this).attr("opacity", 1);
      });
  };

  // Function to create the intern pie chart
  const createInternPieChart = () => {
    // Remove any existing SVG
    d3.select(".intern-piechart-container").selectAll("svg").remove();
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 3;

    // Create SVG for the pie chart
    const svg = d3
      .select(".intern-piechart-container")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
    const hasIntern = numberOfInterns2023.filter((d) => d > 0).length;
    const noIntern = numberOfInterns2023.length - hasIntern;
    // Define data for pie chart (correct the format)
    const data = { "Had Intern": hasIntern, "No Intern": noIntern };
    // Create a color scale
    const color = d3
      .scaleOrdinal()
      .domain(Object.keys(data))
      .range(["#4e79a7", "#e15759"]);

    // Create the pie and arc generator
    const pie = d3
      .pie()
      .value((d) => d[1])
      .startAngle(Math.PI / 2) // Rotate the chart by -45 degrees (top-right position)
      .endAngle(Math.PI * 2 + Math.PI / 2); // Full rotation; // We use d[1] because `Object.entries` returns an array of key-value pairs.
    const dataReady = pie(Object.entries(data)); // Convert the data to a format suitable for d3.pie

    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    // Label arc for positioning labels
    const labelArc = d3
      .arc()
      .outerRadius(radius +82)
      .innerRadius(radius - 0);
    // Append arcs to the SVG and bind the data
    svg
      .selectAll("slice")
      .data(dataReady)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data[0])) // Use d.data[0] for the key (label)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.8);
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("opacity", 1);
      });

    // Add labels to the pie chart
    svg
      .selectAll("text")
      .data(dataReady)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`) // Position the labels
      .attr("dy", "0.35em") // Vertical alignment
      .style("text-anchor", "middle") // Center-align the text
      .style("font-size", "14px")
      .text((d) => `${d.data[0]}: ${Math.round((d.data[1] / 12) * 100)}%`); // Display category name and value as percentage with no decimal
  };

  useEffect(() => {
    createEmploymentBarChart();
    createInternBars();
    createInternPieChart();
    createWordCloudWithForce();
  }, []);

  return (
    <div className="data-page animated-headline">
      <section>
        <h1>Student Employment Data</h1>
        <div className="employment-container flex-container">
          <div className="employment-bar-chart-container column">
            <div className="employment-chart-container"></div>
          </div>
          <div className="employment-employer-container column">
            <div className="word-cloud-container"></div>
          </div>
        </div>
      </section>

      <section>
        <h2>Internship Data</h2>
        <div className="intern-graph-container flex-container">
          <div className="intern-histogram-container column"></div>
          <div className="intern-piechart-container column"></div>
        </div>
      </section>
    </div>
  );
};

export default DataPage;
