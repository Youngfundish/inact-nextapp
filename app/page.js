"use client";

import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
const lars = { Name: "Lars", Age: 20, ShoeSize: 46, Gender: "M", Children: [] };
const iben = { Name: "Iben", Age: 26, ShoeSize: 38, Gender: "F", Children: [] };
const bente = {
  Name: "Bente",
  Age: 46,
  ShoeSize: 37,
  Gender: "F",
  Children: [lars],
};
const viggo = {
  Name: "Viggo",
  Age: 47,
  ShoeSize: 42,
  Gender: "M",
  Children: [iben],
};
const henning = {
  Name: "Henning",
  Age: 65,
  ShoeSize: 44,
  Gender: "M",
  Children: [viggo, bente],
};

const ChartExample = () => {

// Family Tree
  const renderNode = (node) => (
    <TreeNode
      key={node.Name}
      label={
        <div className="p-1 bg-gray-400 rounded-md border border-gray-300">
          {node.Name}
        </div>
      }
    >
      {node.Children && node.Children.map((child) => renderNode(child))}
    </TreeNode>
  );

// Shoe Size Chart
  const generateChartData = (peopleData) => {
    // Initialize arrays to store labels (names) and data (shoe sizes)
    const labels = [];
    const data = [];

    // Iterate over each person in the data
    peopleData.forEach((person) => {
      // Add the person's name to the labels array
      labels.push(person.Name);

      // Add the person's shoe size to the data array
      data.push(person.ShoeSize);
    });
    

    // Return the formatted chart data
    return {
      labels,
      datasets: [
        {
          label: "Shoe Size",
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          data,
        },
      ],
    };
  };
  
  const chartData = generateChartData([lars, iben, bente, viggo, henning]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Shoe Size of Family",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

// Average Shoe Size For Genders
  const calculateAverageShoeSize = (peopleData, gender) => {
    // Filter the data for the specified gender
    const genderData = peopleData.filter((person) => person.Gender === gender);

    // Calculate the total shoe size for the gender
    const totalShoeSize = genderData.reduce(
      (acc, person) => acc + person.ShoeSize,
      0
    );

    // Calculate the average shoe size
    const averageShoeSize = totalShoeSize / genderData.length;

    return averageShoeSize;
  };

  // Calculate the average shoe size for each gender
  const averageShoeSizeMale = calculateAverageShoeSize(
    [lars, iben, bente, viggo, henning], 'M'
  );
  const averageShoeSizeFemale = calculateAverageShoeSize(
    [lars, iben, bente, viggo, henning], 'F'
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex">
        <section className="mx-auto px-4 max-w-screen-xl md:px-8 grid xl:grid-cols-2 lg:grid-cols-2 gap-7 xs:grid-cols-1">
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-800 px-6 py-8">
            <h1 className="text-base leading-7 text-gray-400">
              Average Shoe Size (Male):
            </h1>
            <p className="order-first text-3xl font-semibold tracking-tight text-gray-600 sm:text-5xl">
              {averageShoeSizeMale}%
            </p>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-800 px-6 py-8">
            <h1 className="text-base leading-7 text-gray-400">
              Average Shoe Size (Female):
            </h1>
            <p className="order-first text-3xl font-semibold tracking-tight text-gray-600 sm:text-5xl">
              {averageShoeSizeFemale}%
            </p>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-800 px-6 py-4">
            <Tree lineColor={"green"} label={<div>{henning.Name}</div>}>
              {henning.Children &&
                henning.Children.map((child) => renderNode(child))}
            </Tree>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-800 px-6 py-4">
            <Bar options={options} data={chartData} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ChartExample;
