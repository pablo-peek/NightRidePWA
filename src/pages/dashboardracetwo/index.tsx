import React, { useState, useEffect } from 'react';
import getUserTime from "../../query/raceQuery";
import Loader from "../../components/Loader";
import { Link } from 'react-router-dom';

function DashboardRaceTwo(): JSX.Element {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { racesTime, isFetching: isFetchingStats } = getUserTime({ raceNumber: 2, page, limit });


  if (isFetchingStats) {
    return <Loader visible={isFetchingStats} />;
  }

  const totalPages = Math.ceil(racesTime.total / limit);

  return (
    <div className="flex flex-col items-center justify-center p-6 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-white">Carrera 2</h1>
      <table className="min-w-full bg-gray-800 border border-gray-700 mb-6 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700 text-center">Rank</th>
            <th className="py-2 px-4 border-b border-gray-700 text-center">Nombre de Usuario</th>
            <th className="py-2 px-4 border-b border-gray-700 text-center">Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {racesTime.data.map((user: any, index: number) => (
            <tr key={user._id} className={`hover:bg-gray-700 ${user.isCurrentUser ? 'font-bold' : ''}`}>
              <td className="py-2 px-4 border-b border-gray-700 text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b border-gray-700 text-center">{user.username}</td>
              <td className="py-2 px-4 border-b border-gray-700 text-center">{user.races[0]?.formattedBestTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex space-x-4 justify-end w-full">
        <label className="flex items-center space-x-2 text-white">
          <span>Page:</span>
          <select
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            className="border border-gray-300 rounded p-2 bg-gray-800 text-white"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center space-x-2 text-white">
          <span>Limit:</span>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border border-gray-300 rounded p-2 bg-gray-800 text-white"
          >
            {[20, 40, 100].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4">
        <Link to="/dashboard/race-one">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Ir a Carrera 1
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardRaceTwo;