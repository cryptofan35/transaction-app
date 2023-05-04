import React, { useState, useEffect } from "react";
import Parent from "../mockup/Parent.json";
import Child from "../mockup/Child.json";
import ChildTable from "./ChildTable";

const PAGE_SIZE = 2;

// Parent table component
export default function ParentTable() {
  const [parents, setParents] = useState(Parent.data);
  const [sortedParents, setSortedParents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [children, setChildren] = useState(Child.data);
  const [parent, setParent] = useState([]);

  useEffect(() => {
    // Sort parents by id
    setSortedParents([...parents].sort((a, b) => a.id - b.id));
  }, [parents]);

  const handleSort = () => {
    // Reverse the order of sorted parents
    setSortedParents([...sortedParents].reverse());
  };

  const handleParentClick = (parentData, id) => {
    // Set the selected parent id
    setParent(parentData);
    setSelectedParentId(id);
  };

  const totalPages = Math.ceil(sortedParents.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleParents = sortedParents.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );
  const totalPaid = (id) => {
    // Calculate total paid amount for a parent transaction
    const parentChildren = children.filter((child) => child.parentId === id);
    return parentChildren.reduce((acc, child) => acc + child.paidAmount, 0);
  };

  if (selectedParentId) {
    // If a parent is selected, display the Child table component with the filtered data
    return (
      <ChildTable
        children={children.filter(
          (child) => child.parentId === selectedParentId
        )}
        parentData={parent}
      />
    );
  } else {
    // Otherwise, display the Parent table component
    return (
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Total Amount</th>
              <th onClick={handleSort}>Total Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {visibleParents.map((parent) => (
              <tr
                key={parent.id}
                onClick={() => handleParentClick(parent, parent.id)}
              >
                <td>{parent.id}</td>
                <td>{parent.sender}</td>
                <td>{parent.receiver}</td>
                <td>{parent.totalAmount}</td>
                <td>{totalPaid(parent.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          &nbsp;
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          &nbsp;
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
