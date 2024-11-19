// TableSkeleton.js
import React from 'react';

const TableSkeleton = ({length=5}) => {
	return (
		<div className="overflow-hidden border mt-5 border-gray-200 rounded-lg">
			<table className="min-w-full table-auto">
				<thead className="bg-gray-100">
					<tr>
						{[...Array(8)].map((_, idx) => (
							<th key={idx} className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								<div className="w-24 h-3 bg-gray-300 rounded-full"></div>
							</th>

						))}
					</tr>
				</thead>
				<tbody>
					{[...Array(length)].map((_, idx) => (
						<tr key={idx} className="border-t border-gray-100">
							{[...Array(8)].map((_, idx) => (
								<td key={idx} className="px-6 py-7 whitespace-nowrap">
									<div className="w-24 h-3 bg-gray-300 rounded-full"></div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableSkeleton;
