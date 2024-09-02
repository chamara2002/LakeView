import React from "react";

const DynamicTable = ({
  headers,
  data,
  headerToKeyMapping,
  opt,
  clickableRow = false,
  onRowClick = () => {},
  onDelete = () => {},
  onUpdate = () => {},
}) => {
  return (
    <table id="dynamic-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} id={`header-${header.replace(/\s+/g, '-').toLowerCase()}`}>
              {header}
            </th>
          ))}
          {opt === 0 && <th id="edit-column-header">Edit</th>}
          {opt === 1 && <th id="delete-column-header">Delete</th>}
          {opt === 2 && (
            <>
              <th id="edit-column-header">Edit</th>
              <th id="delete-column-header">Delete</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={row._id}
            id={`row-${row._id}`}
            onClick={() => clickableRow && onRowClick(row._id)}
            style={{ cursor: clickableRow ? 'pointer' : 'default' }} // Optional visual cue
          >
            {headers.map((header, colIndex) => (
              <td key={colIndex} id={`cell-${row._id}-${header.replace(/\s+/g, '-').toLowerCase()}`}>
                {row[headerToKeyMapping[header]]}
              </td>
            ))}
            {opt === 0 && (
              <td id={`edit-button-${row._id}`}>
                <button onClick={(e) => { e.stopPropagation(); onUpdate(row._id); }}>Edit</button>
              </td>
            )}
            {opt === 1 && (
              <td id={`delete-button-${row._id}`}>
                <button onClick={(e) => { e.stopPropagation(); onDelete(row._id); }}>Delete</button>
              </td>
            )}
            {opt === 2 && (
              <>
                <td id={`edit-button-${row._id}`}>
                  <button onClick={(e) => { e.stopPropagation(); onUpdate(row._id); }}>Edit</button>
                </td>
                <td id={`delete-button-${row._id}`}>
                  <button onClick={(e) => { e.stopPropagation(); onDelete(row._id); }}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
