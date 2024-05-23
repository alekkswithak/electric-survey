import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ data, width = 400, height = 400 }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous render

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .range([0, chartWidth])
      .padding(0.1)
      .domain(data.map((d) => d.label));

    const y = d3
      .scaleLinear()
      .range([chartHeight, 0])
      .domain([0, d3.max(data, (d) => d.value)]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("d")));

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => chartHeight - y(d.value))
      .attr("fill", "#36A2EB");
  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height} />;
};

export default BarChart;
