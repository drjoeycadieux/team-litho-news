import React, { useState, useEffect } from "react";

const CovidData = () => {
  const [covidData, setCovidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.opencovid.ca/summary");
        const data = await response.json();

        // Assuming the API response structure has a 'summary' property
        setCovidData(data.summary);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <p>Loading data...</p>}

      {error && <p>{error}</p>}

      {covidData && (
        <div>
          <h2>COVID-19 Summary</h2>
          <p>Total Cases: {covidData.total}</p>
          <p>Total Deaths: {covidData.deaths}</p>
          <p>Total Recovered: {covidData.recovered}</p>
          {/* Add more data as needed */}
        </div>
      )}
    </div>
  );
};

export default CovidData;
