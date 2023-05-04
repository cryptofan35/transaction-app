import React, { useState, useEffect } from "react";

export default function ChildTable({ children, parentData }) {
  const sortedChildren = [...children].sort((a, b) => a.id - b.id);

  return (
    <div className="container">
      <h2>Child Table for Parent ID: {children[0].parentId}</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedChildren.map((child) => (
            <tr key={child.id}>
              <td>{child.id}</td>
              <td>{parentData.sender}</td>
              <td>{parentData.receiver}</td>
              <td>{parentData.totalAmount}</td>
              <td>{child.paidAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/">Back</a>
    </div>
  );
}
