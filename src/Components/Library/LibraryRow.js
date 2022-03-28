import React from "react";

export default function LibraryRow(props) {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.cName}</td>
      <td>{props.Strength}</td>
      <td>{props.Dexterity}</td>
      <td>{props.AttackModifier}</td>
      <td>{props.DefenceModifier}</td>
      <td>{props.MaxHP}</td>
      <td>{props.DamageDice}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => props.handleClick(props.id)}
        >
          {props.isInCombat ? "Remove" : "Add"}
        </button>
      </td>
    </tr>
  );
}
