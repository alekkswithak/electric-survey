import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PieChart = ({ data, width = 400, height = 400 }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous render

    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal().range(["#36A2EB", "#FF6384", "#FFCE56"]);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3.arc().outerRadius(radius).innerRadius(0);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label));

    arcs
      .filter((d) => d.data.value > 0) // Only append text for non-zero values
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text((d) => d.data.label);
  }, [data, width, height]);

  return <svg ref={ref} width={width} height={height} />;
};

export default PieChart;
